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
    eyebrow: "04 / Contato",
    title: "Vamos construir algo juntos?",
    intro:
      "Uma oportunidade de estágio, uma ideia ou uma conversa sobre tecnologia. Estou à disposição para o próximo passo.",
    available: "Aberto ao primeiro estágio",
    channels: "Escolha o seu canal",
    channelText: "Prefere uma conversa direta? Você também me encontra aqui.",
    email: "E-mail",
    phone: "Telefone / WhatsApp",
    location: "Localização",
    locationText: "Nova Lima e Belo Horizonte · MG",
    formTitle: "Deixe sua mensagem",
    formText: "Todos os campos são obrigatórios. Respondo assim que possível.",
    name: "Nome",
    subject: "Assunto",
    message: "Mensagem",
    namePlaceholder: "Como posso chamar você?",
    emailPlaceholder: "voce@exemplo.com",
    subjectPlaceholder: "Sobre o que vamos conversar?",
    messagePlaceholder: "Conte um pouco sobre a oportunidade ou a sua ideia…",
    send: "Enviar mensagem",
    sending: "Enviando mensagem…",
    retry: "Tentar novamente",
    success:
      "Mensagem enviada! Obrigado pelo contato. Responderei pelo e-mail informado.",
    privacy:
      "Seu nome e e-mail serão usados para responder à sua mensagem. O envio é processado pelo EmailJS.",
    direct: "Enviar pelo meu aplicativo de e-mail",
    copy: "Copiar e-mail",
    copied: "E-mail copiado!",
    copyFailed: "Não foi possível copiar. Use o link do e-mail acima.",
    required: "Preencha este campo.",
    tooLong: "O texto ultrapassa o limite deste campo.",
    nameShort: "Informe um nome com pelo menos 2 caracteres.",
    subjectShort: "Escreva um assunto com pelo menos 3 caracteres.",
    messageShort: "Escreva uma mensagem com pelo menos 10 caracteres.",
    emailInvalid: "Informe um e-mail válido, como voce@exemplo.com.",
    validation: "Revise os campos indicados antes de enviar.",
    configuration:
      "O formulário está temporariamente indisponível. Você pode enviar sua mensagem pelo e-mail direto abaixo.",
    service:
      "O serviço de e-mail não conseguiu concluir o envio. Use o e-mail direto abaixo ou tente mais tarde.",
    template:
      "O serviço recusou a mensagem. Seu texto foi preservado; tente novamente ou use o e-mail direto abaixo.",
    blocked:
      "O serviço bloqueou este envio. Use o e-mail direto abaixo para entrar em contato.",
    rateLimit:
      "O serviço recebeu muitos envios. Aguarde um minuto antes de tentar novamente.",
    network:
      "Não foi possível conectar ao serviço. Confira sua conexão e tente novamente; sua mensagem foi preservada.",
    sendFailed:
      "Não foi possível confirmar o envio. Sua mensagem foi preservada. Tente novamente ou use o e-mail direto abaixo.",
  },
  en: {
    eyebrow: "04 / Contact",
    title: "Shall we build something together?",
    intro:
      "An internship opportunity, an idea or a conversation about technology. I am ready for the next step.",
    available: "Open to a first internship",
    channels: "Choose your channel",
    channelText: "Prefer a direct conversation? You can also find me here.",
    email: "Email",
    phone: "Phone / WhatsApp",
    location: "Location",
    locationText: "Nova Lima and Belo Horizonte · Brazil",
    formTitle: "Leave a message",
    formText: "All fields are required. I will reply as soon as possible.",
    name: "Name",
    subject: "Subject",
    message: "Message",
    namePlaceholder: "What should I call you?",
    emailPlaceholder: "you@example.com",
    subjectPlaceholder: "What should we discuss?",
    messagePlaceholder: "Tell me about the opportunity or your idea…",
    send: "Send message",
    sending: "Sending message…",
    retry: "Try again",
    success:
      "Message sent! Thank you for getting in touch. I will reply to the email you provided.",
    privacy:
      "Your name and email will be used to reply to your message. EmailJS processes the submission.",
    direct: "Send using my email app",
    copy: "Copy email",
    copied: "Email copied!",
    copyFailed: "Could not copy the address. Use the email link above.",
    required: "Fill in this field.",
    tooLong: "This text exceeds the field limit.",
    nameShort: "Enter a name with at least 2 characters.",
    subjectShort: "Enter a subject with at least 3 characters.",
    messageShort: "Write a message with at least 10 characters.",
    emailInvalid: "Enter a valid email, such as you@example.com.",
    validation: "Review the highlighted fields before sending.",
    configuration:
      "The form is temporarily unavailable. You can send your message using the direct email link below.",
    service:
      "The email service could not complete the request. Use direct email below or try again later.",
    template:
      "The service rejected this message. Your text has been preserved; try again or use direct email below.",
    blocked:
      "The service blocked this request. Use direct email below to get in touch.",
    rateLimit:
      "The service received too many requests. Wait a minute before trying again.",
    network:
      "Could not connect to the service. Check your connection and try again; your message has been preserved.",
    sendFailed:
      "The submission could not be confirmed. Your message has been preserved. Try again or use direct email below.",
  },
};

function ContactIcon({ name }) {
  if (name === "check")
    return (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="m5 12 4 4L19 6" />
      </svg>
    );
  return <Icon name={name === "pin" ? "mapPin" : name} size={20} />;
}

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
        <p className="eyebrow">{t.eyebrow}</p>
        <h1 id="contact-title">{t.title}</h1>
        <p className="page-description">{t.intro}</p>
      </header>

      <div className="contact-page__grid">
        <aside
          className="contact-page__channels"
          aria-labelledby="contact-channels-title"
        >
          <span className="contact-page__availability">
            <span />
            {t.available}
          </span>
          <h2 id="contact-channels-title">{t.channels}</h2>
          <p className="contact-page__channels-intro">{t.channelText}</p>

          <a
            className="contact-page__channel"
            href={`mailto:${RESUME_DATA.email}`}
          >
            <span className="contact-page__icon">
              <ContactIcon name="mail" />
            </span>
            <span className="contact-page__channel-text">
              <span>{t.email}</span>
              <strong>{RESUME_DATA.email}</strong>
            </span>
            <ContactIcon name="arrow" />
          </a>
          <a
            className="contact-page__channel"
            href={`https://wa.me/${phoneDigits}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="contact-page__icon">
              <ContactIcon name="phone" />
            </span>
            <span className="contact-page__channel-text">
              <span>{t.phone}</span>
              <strong>{RESUME_DATA.telefone}</strong>
            </span>
            <ContactIcon name="arrow" />
          </a>
          <div className="contact-page__channel">
            <span className="contact-page__icon">
              <ContactIcon name="pin" />
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
              LinkedIn <ContactIcon name="arrow" />
            </a>
            <a
              href={RESUME_DATA.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub <ContactIcon name="arrow" />
            </a>
          </div>
          <button
            className="contact-page__copy"
            type="button"
            onClick={copyEmail}
          >
            <ContactIcon name={copyStatus === "copied" ? "check" : "copy"} />
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
          aria-labelledby="contact-form-title"
        >
          <div className="contact-page__form-heading">
            <h2 id="contact-form-title">{t.formTitle}</h2>
            <p>{t.formText}</p>
          </div>

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
                <ContactIcon name="check" />
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
                    {t.direct} <ContactIcon name="arrow" />
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
              <ContactIcon name="send" />
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
