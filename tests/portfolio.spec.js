import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  // Every EmailJS call is intercepted. This suite never sends a real message.
  await page.route("https://api.emailjs.com/**", (route) => route.abort());
});

const routes = ["/", "/sobre", "/projetos", "/experiencias", "/contato"];
for (const width of [320, 375, 768, 1440]) {
  for (const language of ["pt", "en"]) {
    test(`pages render with no overflow at ${width}px in ${language}`, async ({
      page,
    }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.addInitScript(
        (lang) => localStorage.setItem("portfolio-language", lang),
        language,
      );
      const errors = [];
      page.on("pageerror", (error) => errors.push(error.message));
      for (const path of routes) {
        await page.goto(`/#${path}`);
        await expect(page.locator("main h1")).toBeVisible();
        await expect(page.locator("main h1")).toHaveCount(1);
        await expect(page.locator("html")).toHaveAttribute(
          "lang",
          language === "pt" ? "pt-BR" : "en",
        );
        await expect
          .poll(() =>
            page.evaluate(
              () => document.documentElement.scrollWidth <= innerWidth + 1,
            ),
          )
          .toBe(true);
      }
      expect(errors).toEqual([]);
    });
  }
}

test("mobile menu navigates to a separate page and browser history works", async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/#/");
  const menu = page.locator(".menu-toggle");
  await menu.click();
  await expect(menu).toHaveAttribute("aria-expanded", "true");
  await page.locator('#primary-navigation a[href="#/projetos"]').click();
  await expect(page).toHaveURL(/#\/projetos$/);
  await expect(menu).toHaveAttribute("aria-expanded", "false");
  await expect(page.locator(".home-hero")).toHaveCount(0);
  await expect(page.locator("#main-content")).toBeFocused();
  await page.goBack();
  await expect(page.locator(".home-hero")).toBeVisible();
  await page.reload();
  await expect(page.locator(".home-hero")).toBeVisible();
});

test("language persists across navigation and reload", async ({ page }) => {
  await page.goto("/#/sobre");
  await page.getByRole("button", { name: "EN", exact: true }).click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Technology with purpose.",
  );
  await page.locator('#primary-navigation a[href="#/contato"]').click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Shall we build something together?",
  );
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
});

test("project timeline is chronological and filters preserve real repositories", async ({
  page,
}) => {
  await page.goto("/#/projetos");
  const dates = await page
    .locator("time[datetime]")
    .evaluateAll((items) => items.map((item) => item.dateTime));
  expect(dates.length).toBeGreaterThan(1);
  expect(dates).toEqual([...dates].sort());
  await page.getByRole("button", { name: /Full stack/ }).click();
  await expect(page.locator(".projects-timeline-item")).toHaveCount(1);
  await expect(page.locator(".project-actions a").first()).toHaveAttribute(
    "href",
    "https://github.com/Alvarodocxp/Semana-2-Diaw",
  );
  await expect(page.locator(".project-preview img")).toBeVisible();
  await page.locator(".project-gallery-controls button").last().click();
  await expect(page.locator(".project-preview img")).toHaveAttribute(
    "src",
    /auth-register\.png$/,
  );
});

async function fillContact(page) {
  await page.locator("#contact-name").fill("Teste de validação");
  await page.locator("#contact-email").fill("teste@example.com");
  await page.locator("#contact-subject").fill("Verificação do formulário");
  await page
    .locator("#contact-message")
    .fill("Mensagem de teste automatizado; nenhuma entrega real deve ocorrer.");
}

test("invalid contact fields never call EmailJS", async ({ page }) => {
  let requests = 0;
  await page.route("https://api.emailjs.com/**", (route) => {
    requests++;
    return route.abort();
  });
  await page.goto("/#/contato");
  await page.locator(".contact-page__submit").click();
  await expect(page.locator("#contact-name")).toHaveAttribute(
    "aria-invalid",
    "true",
  );
  await expect(page.locator("#contact-name")).toBeFocused();
  await expect(page.locator(".contact-page__status--success")).toHaveCount(0);
  expect(requests).toBe(0);
});

test("contact success waits for EmailJS confirmation and prevents duplicate sending", async ({
  page,
}) => {
  let requests = 0;
  let release;
  const confirmation = new Promise((resolve) => {
    release = resolve;
  });
  await page.route(
    "https://api.emailjs.com/api/v1.0/email/send",
    async (route) => {
      requests++;
      const payload = route.request().postDataJSON();
      expect(
        Boolean(payload.service_id && payload.template_id && payload.user_id),
      ).toBe(true);
      expect(payload.template_params.name).toBe("Teste de validação");
      expect(payload.template_params.reply_to).toBe("teste@example.com");
      expect(payload.template_params.title).toBe(
        "[Portfólio] Verificação do formulário",
      );
      await confirmation;
      await route.fulfill({
        status: 200,
        contentType: "text/plain",
        body: "OK",
      });
    },
  );
  await page.goto("/#/contato");
  await fillContact(page);
  await page.locator(".contact-page__submit").click();
  await expect(page.locator(".contact-page__submit")).toBeDisabled();
  await expect(page.locator(".contact-page__status--success")).toHaveCount(0);
  await page
    .locator("form")
    .evaluate((form) =>
      form.dispatchEvent(
        new Event("submit", { bubbles: true, cancelable: true }),
      ),
    );
  expect(requests).toBe(1);
  release();
  await expect(page.locator(".contact-page__status--success")).toBeVisible();
  await expect(page.locator("#contact-message")).toHaveValue("");
});

for (const failure of ["network", "rateLimit", "configuration"]) {
  test(`contact ${failure} preserves the draft and offers retry`, async ({
    page,
  }) => {
    await page.route(
      "https://api.emailjs.com/api/v1.0/email/send",
      async (route) => {
        if (failure === "network") return route.abort("connectionfailed");
        return route.fulfill({
          status: failure === "rateLimit" ? 429 : 400,
          contentType: "text/plain",
          body:
            failure === "rateLimit"
              ? "Too Many Requests"
              : "The Public Key is invalid",
        });
      },
    );
    await page.goto("/#/contato");
    await fillContact(page);
    await page.locator(".contact-page__submit").click();
    await expect(page.locator(".contact-page__status--error")).toBeVisible();
    await expect(page.locator("#contact-message")).toHaveValue(
      /Mensagem de teste/,
    );
    await expect(page.locator(".contact-page__status--success")).toHaveCount(0);
    await expect(page.locator(".contact-page__submit")).toBeEnabled();
    await expect(
      page.locator(".contact-page__status--error a"),
    ).toHaveAttribute("href", /mailto:silvaalvarobf@gmail.com\?/);
  });
}

test("assistant dialog traps focus, closes on Escape and restores the trigger", async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 812 });
  await page.goto("/#/");
  const trigger = page.locator(".ask-floating");
  await trigger.click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(dialog).toHaveAttribute("aria-modal", "true");
  const headerFits = await dialog.evaluate((el) => {
    const user = el.querySelector(".ask-header-user").getBoundingClientRect();
    const actions = el
      .querySelector(".ask-header-actions")
      .getBoundingClientRect();
    return user.right <= actions.left;
  });
  expect(headerFits).toBe(true);
  await expect
    .poll(() => page.evaluate(() => document.body.style.overflow))
    .toBe("hidden");
  await page.waitForTimeout(200);
  for (let i = 0; i < 15; i++) {
    await page.keyboard.press("Tab");
    expect(
      await dialog.evaluate((el) => el.contains(document.activeElement)),
    ).toBe(true);
  }
  await page.keyboard.press("Escape");
  await expect(dialog).toHaveCount(0);
  await expect(trigger).toBeFocused();
});
