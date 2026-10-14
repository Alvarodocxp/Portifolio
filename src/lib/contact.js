export const CONTACT_LIMITS = Object.freeze({
  name: 100,
  email: 254,
  subject: 160,
  message: 2000,
});

const CONFIG_NAMES = {
  serviceId: "VITE_EMAILJS_SERVICE_ID",
  templateId: "VITE_EMAILJS_TEMPLATE_ID",
  publicKey: "VITE_EMAILJS_PUBLIC_KEY",
};

const isPlaceholder = (value) =>
  /^(?:your(?:_|\b)|(?:seu|sua)(?:_|\b)|change_me|placeholder|<|\$\{)/i.test(
    value,
  );

/** Receives Vite's public environment only; private EmailJS keys are never used. */
export function getContactConfig(env = {}) {
  const config = Object.fromEntries(
    Object.entries(CONFIG_NAMES).map(([field, name]) => [
      field,
      String(env[name] ?? "").trim(),
    ]),
  );
  const missing = Object.entries(CONFIG_NAMES)
    .filter(([field]) => !config[field] || isPlaceholder(config[field]))
    .map(([, name]) => name);

  return { ...config, ready: missing.length === 0, missing };
}

export function normalizeContact(values = {}) {
  return Object.fromEntries(
    Object.keys(CONTACT_LIMITS).map((field) => [
      field,
      String(values[field] ?? "").trim(),
    ]),
  );
}

/** Error codes stay independent of the selected interface language. */
export function validateContact(values) {
  const contact = normalizeContact(values);
  const errors = {};

  for (const [field, max] of Object.entries(CONTACT_LIMITS)) {
    if (!contact[field]) errors[field] = "required";
    else if (contact[field].length > max) errors[field] = "tooLong";
  }

  if (!errors.name && contact.name.length < 2) errors.name = "nameShort";
  if (!errors.subject && contact.subject.length < 3)
    errors.subject = "subjectShort";
  if (!errors.message && contact.message.length < 10)
    errors.message = "messageShort";
  if (!errors.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email))
    errors.email = "emailInvalid";

  return errors;
}

/** Supports the supplied example's template variables and existing form templates. */
export function buildContactParams(values, date = new Date()) {
  const { name, email, subject, message } = normalizeContact(values);
  return {
    name,
    email,
    subject,
    message,
    title: `[Portfólio] ${subject}`,
    time: date.toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" }),
    user_name: name,
    user_email: email,
    from_name: name,
    from_email: email,
    reply_to: email,
  };
}

export class ContactError extends Error {
  constructor(code) {
    super(code);
    this.name = "ContactError";
    this.code = code;
  }
}

export function classifyContactError(error) {
  if (error instanceof ContactError) return error.code;
  const status = Number(error?.status);
  const detail = String(
    error?.text ?? (typeof error === "string" ? error : ""),
  );
  if (
    /public\s*key|service\s*id|template\s*id|origin|domain.*(?:allow|block)|access\s+denied/i.test(
      detail,
    )
  )
    return "configuration";
  if (status === 429) return "rateLimit";
  if (status === 401 || status === 403 || status === 404)
    return "configuration";
  if (status === 412) return "service";
  if (status === 451) return "blocked";
  if (status === 400 || status === 422) return "template";
  if (error instanceof TypeError || status === 0) return "network";
  return "sendFailed";
}

/** Only resolves after EmailJS confirms the request, with no simulated mailto success. */
export async function sendContactMessage({ client, config, values, date }) {
  if (!config?.ready) throw new ContactError("configuration");
  if (Object.keys(validateContact(values)).length)
    throw new ContactError("validation");

  const response = await client.send(
    config.serviceId,
    config.templateId,
    buildContactParams(values, date),
    { publicKey: config.publicKey },
  );

  const responseStatus = Number(response?.status);
  if (
    !Number.isFinite(responseStatus) ||
    responseStatus < 200 ||
    responseStatus >= 300
  ) {
    throw new ContactError("sendFailed");
  }

  return response;
}

export function buildContactMailto(recipient, values) {
  const { name, email, subject, message } = normalizeContact(values);
  const params = new URLSearchParams({
    subject: subject ? `[Portfólio] ${subject}` : "Contato pelo portfólio",
    body: `Nome: ${name}\nE-mail: ${email}\n\n${message}`,
  });
  return `mailto:${recipient}?${params.toString()}`;
}
