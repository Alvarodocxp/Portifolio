import test from "node:test";
import assert from "node:assert/strict";
import {
  CONTACT_LIMITS,
  ContactError,
  buildContactMailto,
  buildContactParams,
  classifyContactError,
  getContactConfig,
  sendContactMessage,
  validateContact,
} from "./contact.js";

const env = {
  VITE_EMAILJS_SERVICE_ID: "service_test",
  VITE_EMAILJS_TEMPLATE_ID: "template_test",
  VITE_EMAILJS_PUBLIC_KEY: "public_test",
};
const values = {
  name: "  Teste Visitante  ",
  email: " teste@example.com ",
  subject: " Oportunidade de estágio ",
  message: " Uma mensagem válida para o formulário. ",
};

test("requires every EmailJS setting and rejects example placeholders", () => {
  assert.equal(getContactConfig(env).ready, true);
  assert.deepEqual(
    getContactConfig({ ...env, VITE_EMAILJS_TEMPLATE_ID: "YOUR_TEMPLATE_ID" })
      .missing,
    ["VITE_EMAILJS_TEMPLATE_ID"],
  );
  assert.equal(
    getContactConfig({ ...env, VITE_EMAILJS_PUBLIC_KEY: "seu_public_key_aqui" })
      .ready,
    false,
  );
  assert.equal(
    getContactConfig({ ...env, VITE_EMAILJS_PUBLIC_KEY: "sua_public_key_aqui" })
      .ready,
    false,
  );
  assert.equal(
    getContactConfig({ ...env, VITE_EMAILJS_PUBLIC_KEY: "  " }).ready,
    false,
  );
});

test("rejects whitespace-only fields, invalid email and excessive lengths", () => {
  assert.deepEqual(validateContact(values), {});
  assert.equal(validateContact({ ...values, name: "  " }).name, "required");
  assert.equal(
    validateContact({ ...values, email: "bad@example" }).email,
    "emailInvalid",
  );
  assert.equal(
    validateContact({ ...values, message: "Olá" }).message,
    "messageShort",
  );
  assert.equal(
    validateContact({
      ...values,
      message: "x".repeat(CONTACT_LIMITS.message + 1),
    }).message,
    "tooLong",
  );
});

test("maps the example variables and previous form aliases to trimmed visitor values", () => {
  const params = buildContactParams(values, new Date("2026-10-14T12:00:00Z"));
  assert.equal(params.name, "Teste Visitante");
  assert.equal(params.user_name, params.name);
  assert.equal(params.from_name, params.name);
  assert.equal(params.email, "teste@example.com");
  assert.equal(params.user_email, params.email);
  assert.equal(params.from_email, params.email);
  assert.equal(params.reply_to, params.email);
  assert.equal(params.title, "[Portfólio] Oportunidade de estágio");
  assert.match(params.time, /09:00:00/);
  assert.equal(params.message, values.message.trim());
});

test("missing configuration and invalid form never call the delivery service", async () => {
  let requests = 0;
  const client = {
    send: async () => {
      requests += 1;
      return { status: 200 };
    },
  };
  await assert.rejects(
    sendContactMessage({ client, config: getContactConfig({}), values }),
    { code: "configuration" },
  );
  await assert.rejects(
    sendContactMessage({
      client,
      config: getContactConfig(env),
      values: { ...values, email: "" },
    }),
    { code: "validation" },
  );
  assert.equal(requests, 0);
});

test("uses one receiver template and reports success only after service confirmation", async () => {
  let captured;
  const client = {
    send: async (...args) => {
      captured = args;
      return { status: 200, text: "OK" };
    },
  };
  const result = await sendContactMessage({
    client,
    config: getContactConfig(env),
    values,
  });
  assert.equal(result.status, 200);
  assert.equal(captured[0], env.VITE_EMAILJS_SERVICE_ID);
  assert.equal(captured[1], env.VITE_EMAILJS_TEMPLATE_ID);
  assert.deepEqual(captured[3], { publicKey: env.VITE_EMAILJS_PUBLIC_KEY });
  assert.equal(captured[2].reply_to, values.email.trim());
  await assert.rejects(
    sendContactMessage({
      client: { send: async () => undefined },
      config: getContactConfig(env),
      values,
    }),
    { code: "sendFailed" },
  );
  await assert.rejects(
    sendContactMessage({
      client: { send: async () => ({}) },
      config: getContactConfig(env),
      values,
    }),
    { code: "sendFailed" },
  );
  await assert.rejects(
    sendContactMessage({
      client: { send: async () => ({ status: 400 }) },
      config: getContactConfig(env),
      values,
    }),
    { code: "sendFailed" },
  );
});

test("a network rejection stays a failure and service statuses produce useful error codes", async () => {
  const failure = new TypeError("Failed to fetch");
  await assert.rejects(
    sendContactMessage({
      client: {
        send: async () => {
          throw failure;
        },
      },
      config: getContactConfig(env),
      values,
    }),
    failure,
  );
  assert.equal(classifyContactError(failure), "network");
  assert.equal(classifyContactError({ status: 429 }), "rateLimit");
  assert.equal(classifyContactError({ status: 403 }), "configuration");
  assert.equal(classifyContactError({ status: 412 }), "service");
  assert.equal(classifyContactError({ status: 422 }), "template");
  assert.equal(
    classifyContactError({ status: 400, text: "The Public Key is invalid" }),
    "configuration",
  );
  assert.equal(
    classifyContactError({
      status: 400,
      text: "The recipients address is empty",
    }),
    "template",
  );
  assert.equal(
    classifyContactError("The service ID is required"),
    "configuration",
  );
  assert.equal(
    classifyContactError(new ContactError("configuration")),
    "configuration",
  );
});

test("direct email preserves the draft without claiming that a message was sent", () => {
  const href = buildContactMailto("owner@example.com", values);
  assert.ok(href.startsWith("mailto:owner@example.com?"));
  const params = new URLSearchParams(href.split("?")[1]);
  assert.equal(params.get("subject"), "[Portfólio] Oportunidade de estágio");
  assert.ok(params.get("body").includes("E-mail: teste@example.com"));
  assert.ok(params.get("body").includes(values.message.trim()));
});
