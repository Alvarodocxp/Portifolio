import { useState, useEffect, useRef } from "react";
import {
  ASK_KNOWLEDGE_BASE,
  resolveSemanticAnswer,
} from "../data/alvaroProfile";
import "./AskModal.css";

function AskIcon({ name, size = 18 }) {
  const props = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true",
  };

  const icons = {
    settings: (
      <svg {...props}>
        <path d="M12 15.5A3.5 3.5 0 1 0 12 8a3.5 3.5 0 0 0 0 7.5Z" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06A1.65 1.65 0 0 0 15 19.4a1.65 1.65 0 0 0-1 .6 1.65 1.65 0 0 0-.33 1.05V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 8.6 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-.6-1 1.65 1.65 0 0 0-1.05-.33H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 8.6a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.6a1.65 1.65 0 0 0 1-.6 1.65 1.65 0 0 0 .33-1.05V3a2 2 0 1 1 4 0v.09A1.65 1.65 0 0 0 15.4 4.6a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9c.43.2.78.52 1 .92.17.29.49.42.83.42H21a2 2 0 1 1 0 4h-.09A1.65 1.65 0 0 0 19.4 15Z" />
      </svg>
    ),
    reset: (
      <svg {...props}>
        <path d="M3 12a9 9 0 1 0 3-6.7" />
        <path d="M3 4v6h6" />
      </svg>
    ),
    close: (
      <svg {...props}>
        <path d="M18 6 6 18" />
        <path d="m6 6 12 12" />
      </svg>
    ),
    send: (
      <svg {...props}>
        <path d="m22 2-7 20-4-9-9-4 20-7Z" />
        <path d="M22 2 11 13" />
      </svg>
    ),
  };

  return icons[name] || icons.send;
}

export default function AskModal({ isOpen, onClose, lang = "pt" }) {
  const initialMessage =
    lang === "pt"
      ? "Olá! Sou o assistente virtual do Álvaro Barbosa, baseado nas informações do currículo dele. Pode perguntar sobre formação, tecnologias, projetos ou disponibilidade para estágio."
      : "Hi! I'm Álvaro Barbosa's virtual assistant, based on his resume information. Ask me about education, technologies, projects or internship availability.";

  const [messages, setMessages] = useState(() => [
    { sender: "alvaro", text: initialMessage },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showConfig, setShowConfig] = useState(false);
  const [apiKeyInput, setApiKeyInput] = useState(() => {
    return (
      localStorage.getItem("gemini_api_key") ||
      import.meta.env.VITE_GEMINI_API_KEY ||
      ""
    );
  });
  const [activeKey, setActiveKey] = useState(() => {
    return (
      localStorage.getItem("gemini_api_key") ||
      import.meta.env.VITE_GEMINI_API_KEY ||
      ""
    );
  });

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const dialogRef = useRef(null);
  const tBase = ASK_KNOWLEDGE_BASE[lang] || ASK_KNOWLEDGE_BASE.pt;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  useEffect(() => {
    if (!isOpen) return undefined;
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const timer = setTimeout(() => inputRef.current?.focus(), 150);
    const handleKey = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      }
      if (event.key !== "Tab") return;
      const elements = [
        ...(dialogRef.current?.querySelectorAll(
          'button:not(:disabled), a[href], input:not(:disabled), textarea:not(:disabled), [tabindex="0"]',
        ) || []),
      ].filter((el) => el.getClientRects().length);
      const first = elements[0];
      const last = elements.at(-1);
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      }
      if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => {
      clearTimeout(timer);
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
    };
  }, [isOpen, onClose]);

  const handleSaveApiKey = () => {
    const trimmed = apiKeyInput.trim();
    if (trimmed) {
      localStorage.setItem("gemini_api_key", trimmed);
      setActiveKey(trimmed);
    } else {
      localStorage.removeItem("gemini_api_key");
      setActiveKey(import.meta.env.VITE_GEMINI_API_KEY || "");
    }
    setShowConfig(false);
  };

  const streamResponse = (fullText) => {
    setIsTyping(true);
    let index = 0;
    const speed = 12;

    setMessages((prev) => [...prev, { sender: "alvaro", text: "" }]);

    const interval = setInterval(() => {
      index += 3;
      setMessages((prev) => {
        const lastIndex = prev.length - 1;
        const updated = [...prev];
        updated[lastIndex] = {
          ...updated[lastIndex],
          text: fullText.slice(0, index),
        };
        return updated;
      });

      if (index >= fullText.length) {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, speed);
  };

  const handleSend = async (textToSend) => {
    const question = (textToSend || inputValue).trim();
    if (!question || isTyping) return;

    setMessages((prev) => [...prev, { sender: "user", text: question }]);
    setInputValue("");

    const keyToUse = activeKey.trim();

    if (keyToUse) {
      setIsTyping(true);
      try {
        const conversationHistory = messages
          .slice(-6)
          .map(
            (message) =>
              `${message.sender === "user" ? "Visitante" : "Álvaro"}: ${message.text}`,
          )
          .join("\n");

        const systemPrompt = `Você é o Álvaro Barbosa e responde em primeira pessoa para visitantes do seu portfólio.

INFORMAÇÕES OFICIAIS:
- Estudante de Engenharia de Software na PUC Minas, Campus Lourdes, atualmente no 2º período.
- Início da graduação em fevereiro de 2026, previsão de conclusão em dezembro de 2029.
- Ensino médio concluído no Colégio Batista em Alphaville em dezembro de 2025.
- Mora em Nova Lima, Alphaville - MG.
- Possui CNH categoria B.
- Busca o primeiro estágio em desenvolvimento de software.
- Disponibilidade pela manhã ou à tarde.
- Linguagens: Java, Python, C++, C#, JavaScript e Lua.
- Web e frameworks: Spring Boot, Thymeleaf, React, HTML5, CSS3 e Vite.
- Bancos de dados: MySQL, PostgreSQL e MongoDB.
- Ferramentas: Git/GitHub, MQL5 e VS Code.
- Idiomas: Português nativo e Inglês avançado.
- Contatos: WhatsApp (31) 99694-6632, e-mail silvaalvarobf@gmail.com, GitHub https://github.com/Alvarodocxp.

COMO RESPONDER:
- Fale sempre em primeira pessoa.
- Seja profissional, direto e simpático.
- Use negrito com moderação.
- Responda no idioma do visitante.

Histórico recente:
${conversationHistory}

Pergunta do visitante: "${question}"`;

        const res = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${keyToUse}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [{ parts: [{ text: systemPrompt }] }],
            }),
          },
        );

        if (res.ok) {
          const data = await res.json();
          const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (aiText) {
            streamResponse(aiText.trim());
            return;
          }
        } else {
          const errData = await res.json().catch(() => ({}));
          console.warn("Gemini API status not ok:", res.status, errData);
        }
      } catch (err) {
        console.error("Gemini API fetch error:", err);
        setIsTyping(false);
      }
    }

    const answer = resolveSemanticAnswer(question, lang);
    streamResponse(answer);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  const handleReset = () => {
    setMessages([
      {
        sender: "alvaro",
        text:
          lang === "pt"
            ? "Conversa reiniciada. Pode perguntar sobre minha formação, tecnologias, projetos ou busca por estágio."
            : "Conversation reset. Ask me about my education, technologies, projects or internship search.",
      },
    ]);
  };

  const formatText = (txt) => {
    const parts = txt.split("\n");
    return parts.map((line, i) => {
      const boldFormatted = line.split(/(\*\*.*?\*\*)/g).map((chunk, j) => {
        if (chunk.startsWith("**") && chunk.endsWith("**")) {
          return <strong key={j}>{chunk.slice(2, -2)}</strong>;
        }
        return chunk;
      });

      return (
        <span key={i} className="ask-msg-line">
          {boldFormatted}
          {i < parts.length - 1 && <br />}
        </span>
      );
    });
  };

  if (!isOpen) return null;

  return (
    <div className="ask-modal-backdrop" onClick={onClose}>
      <div
        className="ask-modal-dialog"
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={
          lang === "pt" ? "Pergunte sobre Álvaro" : "Ask about Álvaro"
        }
        onClick={(e) => e.stopPropagation()}
      >
        <div className="ask-modal-header">
          <div className="ask-header-user">
            <div className="ask-avatar-badge">
              <img
                src="https://github.com/Alvarodocxp.png"
                onError={(event) => {
                  event.currentTarget.onerror = null;
                  event.currentTarget.src = `${import.meta.env.BASE_URL}avatar-fallback.svg`;
                }}
                alt="Álvaro Barbosa"
                className="ask-avatar"
              />
              <span className="ask-online-dot" />
            </div>
            <div>
              <div className="ask-title-row">
                <span className="ask-header-name">Álvaro Barbosa</span>
                <span className={`ask-tag-pill ${activeKey ? "has-ai" : ""}`}>
                  {activeKey ? "Gemini" : "Currículo"}
                </span>
              </div>
              <span className="ask-header-sub">
                {activeKey
                  ? lang === "pt"
                    ? "IA generativa conectada"
                    : "Generative AI connected"
                  : lang === "pt"
                    ? "Base oficial do currículo"
                    : "Official resume knowledge"}
              </span>
            </div>
          </div>

          <div className="ask-header-actions">
            <button
              className="ask-header-btn"
              onClick={() => setShowConfig(!showConfig)}
              title={
                lang === "pt"
                  ? "Configurar chave Gemini"
                  : "Configure Gemini key"
              }
              aria-label={lang === "pt" ? "Configurar IA" : "Configure AI"}
            >
              <AskIcon name="settings" size={17} />
            </button>
            <button
              className="ask-header-btn"
              onClick={handleReset}
              title={lang === "pt" ? "Limpar conversa" : "Reset chat"}
              aria-label={
                lang === "pt" ? "Reiniciar conversa" : "Reset conversation"
              }
            >
              <AskIcon name="reset" size={17} />
            </button>
            <button
              className="ask-header-btn ask-close-btn"
              onClick={onClose}
              title={lang === "pt" ? "Fechar" : "Close"}
              aria-label={lang === "pt" ? "Fechar" : "Close"}
            >
              <AskIcon name="close" size={17} />
            </button>
          </div>
        </div>

        {showConfig && (
          <div className="ask-config-banner">
            <div className="ask-config-header">
              <span>
                {lang === "pt"
                  ? "Conectar chave do Google Gemini"
                  : "Connect Google Gemini key"}
              </span>
              <a
                href="https://aistudio.google.com/app/apikey"
                target="_blank"
                rel="noopener noreferrer"
                className="ask-config-link"
              >
                {lang === "pt" ? "Criar chave grátis" : "Create free key"}
              </a>
            </div>
            <p className="ask-config-desc">
              {lang === "pt"
                ? "A chave fica salva apenas neste navegador e habilita respostas abertas."
                : "The key is saved only in this browser and enables open-ended answers."}
            </p>
            <div className="ask-config-row">
              <input
                type="password"
                className="ask-config-input"
                placeholder="AIzaSy..."
                value={apiKeyInput}
                onChange={(e) => setApiKeyInput(e.target.value)}
              />
              <button className="ask-config-btn" onClick={handleSaveApiKey}>
                {lang === "pt" ? "Salvar" : "Save"}
              </button>
            </div>
          </div>
        )}

        <div className="ask-suggestions-bar">
          <span className="ask-suggestions-label">
            {lang === "pt" ? "Perguntas rápidas" : "Quick questions"}
          </span>
          <div className="ask-chips-scroll">
            {tBase.sugestoes.map((suggestion) => (
              <button
                key={suggestion}
                className="ask-chip"
                onClick={() => handleSend(suggestion)}
                disabled={isTyping}
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>

        <div className="ask-messages-body">
          {messages.map((msg, index) => (
            <div
              key={`${msg.sender}-${index}`}
              className={`ask-message-row ${msg.sender === "user" ? "user-row" : "alvaro-row"}`}
            >
              {msg.sender === "alvaro" && (
                <img
                  src="https://github.com/Alvarodocxp.png"
                  onError={(event) => {
                    event.currentTarget.onerror = null;
                    event.currentTarget.src = `${import.meta.env.BASE_URL}avatar-fallback.svg`;
                  }}
                  alt="Álvaro"
                  className="ask-msg-avatar"
                />
              )}
              <div
                className={`ask-bubble ${msg.sender === "user" ? "bubble-user" : "bubble-alvaro"}`}
              >
                {formatText(msg.text)}
              </div>
            </div>
          ))}

          {isTyping && (
            <div
              className="ask-typing-indicator"
              aria-label={lang === "pt" ? "Digitando" : "Typing"}
            >
              <span />
              <span />
              <span />
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="ask-modal-footer">
          <input
            ref={inputRef}
            type="text"
            className="ask-input"
            placeholder={
              lang === "pt"
                ? "Pergunte sobre curso, tecnologias, projetos..."
                : "Ask about degree, technologies, projects..."
            }
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isTyping}
            maxLength={350}
          />
          <button
            className="ask-send-btn"
            onClick={() => handleSend()}
            disabled={!inputValue.trim() || isTyping}
            aria-label={lang === "pt" ? "Enviar" : "Send"}
          >
            <AskIcon name="send" size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
