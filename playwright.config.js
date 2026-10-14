import { existsSync } from "node:fs";
import { defineConfig } from "@playwright/test";

const systemChromium = "/usr/bin/chromium";
export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  workers: 2,
  use: {
    baseURL: "http://127.0.0.1:5173",
    headless: true,
    launchOptions: {
      executablePath:
        process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH ||
        (existsSync(systemChromium) ? systemChromium : undefined),
      args: ["--no-sandbox"],
    },
    screenshot: "only-on-failure",
    trace: "retain-on-failure",
  },
  webServer: {
    command: "npm run dev -- --host 127.0.0.1 --port 5173 --strictPort",
    url: "http://127.0.0.1:5173",
    reuseExistingServer: !process.env.CI,
    env: {
      VITE_EMAILJS_SERVICE_ID: "service_test",
      VITE_EMAILJS_TEMPLATE_ID: "template_test",
      VITE_EMAILJS_PUBLIC_KEY: "public_test_key",
    },
  },
});
