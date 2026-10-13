import { useState, useEffect, useRef } from 'react';
import { ASK_KNOWLEDGE_BASE } from '../data/alvaroProfile';
import './AskModal.css';

export default function AskModal({ isOpen, onClose, lang = 'pt' }) {
  const [messages, setMessages] = useState(() => [
    {
      sender: 'alvaro',
      text:
        lang === 'pt'
          ? 'Olá! Sou o assistente virtual do Álvaro Barbosa. Me baseio 100% no currículo oficial dele (Engenharia de Software na PUC Minas, 2º período). O que você gostaria de saber sobre ele?'
          : "Hi! I'm Álvaro Barbosa's virtual assistant, powered directly by his official resume (Software Engineering at PUC Minas, 2nd semester). What would you like to know about him?",
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const tBase = ASK_KNOWLEDGE_BASE[lang] || ASK_KNOWLEDGE_BASE.pt;

  // Scroll automático para a última mensagem
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Focar no input quando abrir
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  // Lógica de busca de resposta na base de conhecimento
  const findAnswer = (question) => {
    const qLower = question
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');

    for (const item of tBase.respostas) {
      const match = item.gatilhos.some((g) => {
        const gNorm = g.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        return qLower.includes(gNorm);
      });
      if (match) return item.resposta;
    }

    return tBase.padrao;
  };

  // Efeito de digitação suave (streaming simulado)
  const streamResponse = (fullText) => {
    setIsTyping(true);
    let index = 0;
    const speed = 14; // ms por caractere

    // Adiciona uma mensagem vazia que irá crescer
    setMessages((prev) => [...prev, { sender: 'alvaro', text: '' }]);

    const interval = setInterval(() => {
      index += 2;
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

    // Adiciona a pergunta do usuário
    setMessages((prev) => [...prev, { sender: 'user', text: question }]);
    setInputValue('');

    // Verifica se há chave de API do Gemini configurada em .env
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

    if (apiKey) {
      setIsTyping(true);
      try {
        const prompt = `Você é o Álvaro Barbosa respondendo em primeira pessoa para quem visita seu portfólio.
Base de conhecimento oficial do seu currículo:
- Estudante de Engenharia de Software na PUC Minas (Campus Lourdes, 2º período, início Fev/2026, previsão Dez/2029).
- Busca primeiro estágio em desenvolvimento de software. Disponibilidade: manhã ou à tarde. Possui CNH B.
- Local: Nova Lima, Alphaville - MG. Contato: (31) 99694-6632, silvaalvarobf@gmail.com.
- Linguagens: Java, Python, C++, C#, JavaScript.
- Web & Frameworks: Spring Boot, Thymeleaf, React, HTML/CSS.
- Bancos de dados: SQL (MySQL, PostgreSQL), NoSQL (MongoDB).
- Ferramentas: Git/GitHub, MQL5.
- Idiomas: Português nativo, Inglês avançado.
- Experiências: CRUD integrado a bancos, desenvolvimento web em equipe com Git e sprints, jogos em Pygame/Lua e robôs de mercado em MQL5.

Pergunta do visitante: "${question}".
Responda de forma simpática, direta e profissional em primeira pessoa no idioma da pergunta.`;

        const res = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ parts: [{ text: prompt }] }],
            }),
          }
        );

        if (res.ok) {
          const data = await res.json();
          const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (aiText) {
            streamResponse(aiText.trim());
            return;
          }
        }
      } catch (err) {
        console.error('Gemini API fallback to local resume data:', err);
      }
    }

    // Fallback inteligente instantâneo baseado no currículo
    const answer = findAnswer(question);
    streamResponse(answer);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  };

  const handleReset = () => {
    setMessages([
      {
        sender: 'alvaro',
        text:
          lang === 'pt'
            ? 'Conversa reiniciada! Pode fazer uma nova pergunta sobre minha trajetória, curso na PUC Minas ou stack.'
            : 'Conversation reset! Feel free to ask a new question about my background, PUC Minas or stack.',
      },
    ]);
  };

  // Renderiza markdown simples (negrito, quebra de linha e listas)
  const formatText = (txt) => {
    const parts = txt.split('\n');
    return parts.map((line, i) => {
      // Negrito com **
      const boldFormatted = line.split(/(\*\*.*?\*\*)/g).map((chunk, j) => {
        if (chunk.startsWith('**') && chunk.endsWith('**')) {
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
      <div className="ask-modal-dialog" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="ask-modal-header">
          <div className="ask-header-user">
            <div className="ask-avatar-badge">
              <img
                src="https://github.com/Alvarodocxp.png"
                alt="Álvaro Barbosa"
                className="ask-avatar"
              />
              <span className="ask-online-dot" />
            </div>
            <div>
              <div className="ask-title-row">
                <span className="ask-header-name">Álvaro Barbosa</span>
                <span className="ask-tag-pill">Ask IA</span>
              </div>
              <span className="ask-header-sub">
                {lang === 'pt' ? 'Respostas baseadas no Currículo oficial' : 'Powered by official Resume'}
              </span>
            </div>
          </div>

          <div className="ask-header-actions">
            <button
              className="ask-header-btn"
              onClick={handleReset}
              title={lang === 'pt' ? 'Limpar conversa' : 'Reset chat'}
              aria-label="Reiniciar"
            >
              🔄
            </button>
            <button
              className="ask-header-btn ask-close-btn"
              onClick={onClose}
              title={lang === 'pt' ? 'Fechar' : 'Close'}
              aria-label="Fechar"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Sugestões rápidas (Chips) */}
        <div className="ask-suggestions-bar">
          <span className="ask-suggestions-label">
            {lang === 'pt' ? 'Perguntas rápidas:' : 'Quick questions:'}
          </span>
          <div className="ask-chips-scroll">
            {tBase.sugestoes.map((sug, idx) => (
              <button
                key={idx}
                className="ask-chip"
                onClick={() => handleSend(sug)}
                disabled={isTyping}
              >
                {sug}
              </button>
            ))}
          </div>
        </div>

        {/* Mensagens */}
        <div className="ask-messages-body">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`ask-message-row ${msg.sender === 'user' ? 'user-row' : 'alvaro-row'}`}
            >
              {msg.sender === 'alvaro' && (
                <img
                  src="https://github.com/Alvarodocxp.png"
                  alt="Álvaro"
                  className="ask-msg-avatar"
                />
              )}
              <div className={`ask-bubble ${msg.sender === 'user' ? 'bubble-user' : 'bubble-alvaro'}`}>
                {formatText(msg.text)}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="ask-typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Formulário de Envio */}
        <div className="ask-modal-footer">
          <input
            ref={inputRef}
            type="text"
            className="ask-input"
            placeholder={
              lang === 'pt'
                ? 'Pergunte algo sobre minha formação, stack ou estágio...'
                : 'Ask about my education, stack, or internship...'
            }
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isTyping}
            maxLength={300}
          />
          <button
            className="ask-send-btn"
            onClick={() => handleSend()}
            disabled={!inputValue.trim() || isTyping}
            aria-label="Enviar"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
