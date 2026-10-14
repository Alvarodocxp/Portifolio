import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import Icon from "../components/Icon";
import { RESUME_DATA } from "../data/alvaroProfile";
import {
  CONTACT_LIMITS,
  buildContactMailto,
  classifyContactError,
  getContactConfig,
  sendContactMessage,
  validateContact,
} from "../lib/contact";
import "./ContactPage.css";

const COPY = {
  pt: {
    title: "Contato",
    channels: "Canais de contato",
    email: "E-mail",
    phone: "WhatsApp",
    location: "Localização",
    locationText: "Nova Lima · MG",
    formTitle: "Formulário de contato",
    name: "Nome",
    subject: "Assunto",
    message: "Mensagem",
    namePlaceholder: "",
    emailPlaceholder: "voce@exemplo.com",
    subjectPlaceholder: "",
    messagePlaceholder: "",
    send: "Enviar mensagem",
    sending: "Enviando…",
    retry: "Tentar novamente",
    success: "Mensagem enviada. Obrigado!",
    privacy: "Seus dados serão usados apenas para responder.",
    direct: "Enviar por e-mail",
    copy: "Copiar e-mail",
    copied: "E-mail copiado",
    copyFailed: "Não foi possível copiar. Use o link acima.",
    required: "Preencha este campo.",
    tooLong: "O texto ultrapassa o limite.",
    nameShort: "Informe pelo menos 2 caracteres.",
    subjectShort: "Informe pelo menos 3 caracteres.",
    messageShort: "Escreva pelo menos 10 caracteres.",
    emailInvalid: "Informe um e-mail válido.",
    validation: "Revise os campos indicados.",
    configuration: "Envio indisponível. Use o e-mail abaixo.",
    service: "Não foi possível enviar. Tente mais tarde.",
    template: "Mensagem recusada. Tente novamente ou use o e-mail abaixo.",
    blocked: "Envio bloqueado. Use o e-mail abaixo.",
    rateLimit: "Aguarde um minuto e tente novamente.",
    network: "Falha de conexão. Tente novamente.",
    sendFailed: "Não foi possível confirmar o envio. Tente novamente.",
  },
  en: {
    title: "Contact",
    channels: "Contact channels",
    email: "Email",
    phone: "WhatsApp",
    location: "Location",
    locationText: "Nova Lima · Brazil",
    formTitle: "Contact form",
    name: "Name",
    subject: "Subject",
    message: "Message",
    namePlaceholder: "",
    emailPlaceholder: "you@example.com",
    subjectPlaceholder: "",
    messagePlaceholder: "",
    send: "Send message",
    sending: "Sending…",
    retry: "Try again",
    success: "Message sent. Thank you!",
    privacy: "Your details will only be used to reply.",
    direct: "Send by email",
    copy: "Copy email",
    copied: "Email copied",
    copyFailed: "Could not copy. Use the link above.",
    required: "Fill in this field.",
    tooLong: "This text exceeds the limit.",
    nameShort: "Enter at least 2 characters.",
    subjectShort: "Enter at least 3 characters.",
    messageShort: "Write at least 10 characters.",
    emailInvalid: "Enter a valid email.",
    validation: "Review the highlighted fields.",
    configuration: "Sending is unavailable. Use the email link below.",
    service: "Could not send. Try again later.",
    template: "Message rejected. Try again or use the email link below.",
    blocked: "Sending was blocked. Use the email link below.",
    rateLimit: "Wait a minute and try again.",
    network: "Connection failed. Try again.",
    sendFailed: "Could not confirm sending. Try again.",
  },
};

const EMPTY_CONTACT = { name: "", email: "", subject: "", message: "" };
const CONFIG = getContactConfig(import.meta.env);

export default function ContactPage({ lang = "pt" }) {
  const t = COPY[lang] || COPY.pt;
  const [values, setValues] = useState(EMPTY_CONTACT);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [failure, setFailure] = useState("");
  const [copyStatus, setCopyStatus] = useState("");
  const sendingRef = useRef(false);
  const sending = status === "sending";
  const directEmail = buildContactMailto(RESUME_DATA.email, values);
  const phoneDigits = `55${RESUME_DATA.telefone.replace(/\D/g, "")}`;

  const changeField = (event) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
    if (!sendingRef.current) setStatus("idle");
  };

  const submit = async (event) => {
    event.preventDefault();
    if (sendingRef.current) return;
    const form = event.currentTarget;
    if (new FormData(form).get("website")) {
      setStatus("error");
      setFailure("blocked");
      return;
    }

    const nextErrors = validateContact(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      setStatus("error");
      setFailure("validation");
      form.elements.namedItem(Object.keys(nextErrors)[0])?.focus();
      return;
    }

    sendingRef.current = true;
    setStatus("sending");
    setFailure("");
    try {
      await sendContactMessage({ client: emailjs, config: CONFIG, values });
      setStatus("success");
      setValues(EMPTY_CONTACT);
      form.reset();
    } catch (error) {
      setStatus("error");
      setFailure(classifyContactError(error));
    } finally {
      sendingRef.current = false;
    }
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(RESUME_DATA.email);
      setCopyStatus("copied");
    } catch {
      setCopyStatus("copyFailed");
    }
  };

  const fieldProps = (name) => ({
    id: `contact-${name}`,
    name,
    value: values[name],
    onChange: changeField,
    required: true,
    maxLength: CONTACT_LIMITS[name],
    disabled: sending,
    "aria-invalid": Boolean(errors[name]),
    "aria-describedby": errors[name] ? `contact-${name}-error` : undefined,
  });

  const fieldError = (name) =>
    errors[name] && (
      <span id={`contact-${name}-error`} className="contact-page__field-error">
        {t[errors[name]]}
      </span>
    );

  return (
    <section
      className="contact-page container page-content"
      aria-labelledby="contact-title"
    >
      <header className="contact-page__heading page-header">
        <h1 id="contact-title">{t.title}</h1>
      </header>

      <div className="contact-page__grid">
        <aside className="contact-page__channels" aria-label={t.channels}>
          <a
            className="contact-page__channel"
            href={`mailto:${RESUME_DATA.email}`}
          >
            <span className="contact-page__icon">
              <Icon name="mail" />
            </span>
            <span className="contact-page__channel-text">
              <span>{t.email}</span>
              <strong>{RESUME_DATA.email}</strong>
            </span>
            <Icon name="arrow" />
          </a>
          <a
            className="contact-page__channel"
            href={`https://wa.me/${phoneDigits}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="contact-page__icon">
              <Icon name="phone" />
            </span>
            <span className="contact-page__channel-text">
              <span>{t.phone}</span>
              <strong>{RESUME_DATA.telefone}</strong>
            </span>
            <Icon name="arrow" />
          </a>
          <div className="contact-page__channel">
            <span className="contact-page__icon">
              <Icon name="mapPin" />
            </span>
            <span className="contact-page__channel-text">
              <span>{t.location}</span>
              <strong>{t.locationText}</strong>
            </span>
          </div>

          <div className="contact-page__socials">
            <a
              href={RESUME_DATA.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn <Icon name="arrow" />
            </a>
            <a
              href={RESUME_DATA.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub <Icon name="arrow" />
            </a>
          </div>
          <button
            className="contact-page__copy"
            type="button"
            onClick={copyEmail}
          >
            <Icon name={copyStatus === "copied" ? "check" : "copy"} />
            {copyStatus === "copied" ? t.copied : t.copy}
          </button>
          <p className="contact-page__copy-status" role="status">
            {copyStatus === "copyFailed" ? t.copyFailed : ""}
          </p>
        </aside>

        <form
          className="contact-page__form panel"
          onSubmit={submit}
          noValidate
          aria-busy={sending}
          aria-label={t.formTitle}
        >
          <div className="contact-page__row">
            <div className="contact-page__field">
              <label htmlFor="contact-name">
                {t.name} <span aria-hidden="true">*</span>
              </label>
              <input
                {...fieldProps("name")}
                type="text"
                autoComplete="name"
                placeholder={t.namePlaceholder}
              />
              {fieldError("name")}
            </div>
            <div className="contact-page__field">
              <label htmlFor="contact-email">
                {t.email} <span aria-hidden="true">*</span>
              </label>
              <input
                {...fieldProps("email")}
                type="email"
                autoComplete="email"
                inputMode="email"
                placeholder={t.emailPlaceholder}
              />
              {fieldError("email")}
            </div>
          </div>
          <div className="contact-page__field">
            <label htmlFor="contact-subject">
              {t.subject} <span aria-hidden="true">*</span>
            </label>
            <input
              {...fieldProps("subject")}
              type="text"
              placeholder={t.subjectPlaceholder}
            />
            {fieldError("subject")}
          </div>
          <div className="contact-page__field">
            <label htmlFor="contact-message">
              {t.message} <span aria-hidden="true">*</span>
            </label>
            <textarea
              {...fieldProps("message")}
              rows="6"
              placeholder={t.messagePlaceholder}
            />
            {fieldError("message")}
            <span className="contact-page__counter" aria-hidden="true">
              {values.message.length} / {CONTACT_LIMITS.message}
            </span>
          </div>
          <div className="contact-page__honeypot" aria-hidden="true">
            <label htmlFor="contact-website">Website</label>
            <input
              id="contact-website"
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          <div
            className="contact-page__feedback"
            aria-live="polite"
            aria-atomic="true"
          >
            {status === "success" && (
              <p
                className="contact-page__status contact-page__status--success"
                role="status"
              >
                <Icon name="check" />
                {t.success}
              </p>
            )}
            {status === "error" && (
              <div
                className="contact-page__status contact-page__status--error"
                role="alert"
              >
                <p>{t[failure] || t.sendFailed}</p>
                {failure !== "validation" && (
                  <a href={directEmail}>
                    {t.direct} <Icon name="arrow" />
                  </a>
                )}
              </div>
            )}
          </div>

          <button
            type="submit"
            className="contact-page__submit button button-primary"
            disabled={sending}
            aria-busy={sending}
          >
            {sending ? (
              <span className="contact-page__spinner" aria-hidden="true" />
            ) : (
              <Icon name="send" />
            )}
            {sending
              ? t.sending
              : status === "error" && failure !== "validation"
                ? t.retry
                : t.send}
          </button>
          <p className="contact-page__privacy">{t.privacy}</p>
        </form>
      </div>
    </section>
  );
}
