import { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "../components/Icon";
import { RESUME_DATA } from "../data/alvaroProfile";

export default function HomePage({ lang, onAsk }) {
  const pt = lang === "pt";
  const [avatarFailed, setAvatarFailed] = useState(false);
  return (
    <>
      <section className="home-hero container">
        <div className="hero-copy">
          <p className="availability">
            <span />
            {pt ? "Aberto ao primeiro estágio" : "Open to my first internship"}
          </p>
          <p className="hero-greeting">{pt ? "Olá, eu sou" : "Hi, I'm"}</p>
          <h1>
            Álvaro
            <br />
            <span>
              Barbosa<span className="name-period">.</span>
            </span>
          </h1>
          <p className="hero-role">
            {pt
              ? "Código, curiosidade e construção."
              : "Code, curiosity and creation."}
          </p>
          <p className="hero-description">
            {pt
              ? "Estudante de Engenharia de Software na PUC Minas. Transformo ideias em experiências digitais e busco uma oportunidade para aprender, colaborar e desenvolver soluções que façam sentido."
              : "Software Engineering student at PUC Minas. I turn ideas into digital experiences and seek an opportunity to learn, collaborate and build meaningful solutions."}
          </p>
          <div className="hero-actions">
            <Link to="/projetos" className="button button-primary">
              {pt ? "Explorar projetos" : "Explore projects"}
              <Icon name="arrow" />
            </Link>
            <Link to="/contato" className="button button-secondary">
              <Icon name="mail" />
              {pt ? "Vamos conversar" : "Let's talk"}
            </Link>
          </div>
          <div className="hero-links">
            <a
              href={RESUME_DATA.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub <Icon name="arrow" size={14} />
            </a>
            <a
              href={RESUME_DATA.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn <Icon name="arrow" size={14} />
            </a>
            <button type="button" onClick={onAsk}>
              {pt ? "Pergunte sobre mim" : "Ask about me"}
              <Icon name="bot" size={16} />
            </button>
          </div>
        </div>
        <div className="hero-visual">
          <div className="portrait-orbit" aria-hidden="true" />
          <div className="portrait-photo">
            {avatarFailed ? (
              <div className="portrait-monogram" aria-hidden="true">
                <span className="monogram-code">&lt;developer /&gt;</span>
                <strong>
                  AB<span>.</span>
                </strong>
                <span className="monogram-caption">ÁLVARO BARBOSA</span>
              </div>
            ) : (
              <img
                src="https://github.com/Alvarodocxp.png"
                alt="Álvaro Barbosa"
                width="460"
                height="460"
                fetchPriority="high"
                onError={() => setAvatarFailed(true)}
              />
            )}
          </div>
          <div className="portrait-label">
            <span className="portrait-label-icon">
              <Icon name="code" size={24} />
            </span>
            <div>
              <span>Software Engineering</span>
              <strong>PUC Minas · Lourdes</strong>
            </div>
          </div>
          <div className="portrait-note">
            <span className="dot-grid" aria-hidden="true">
              + + +<br />+ + +<br />+ + +
            </span>
            <span>
              {pt ? "Sempre em evolução" : "Always learning"}
              <br />
              <strong>Nova Lima, MG</strong>
            </span>
          </div>
        </div>
      </section>
      <section
        className="home-overview container"
        aria-label={pt ? "Explore o portfólio" : "Explore the portfolio"}
      >
        <div className="overview-heading">
          <p className="eyebrow">
            {pt ? "CONHEÇA MEU TRABALHO" : "GET TO KNOW MY WORK"}
          </p>
          <h2>
            {pt
              ? "Cada passo, uma nova construção."
              : "Every step, something new to build."}
          </h2>
        </div>
        <div className="overview-grid">
          {[
            {
              number: "01",
              to: "/sobre",
              icon: "code",
              title: pt ? "Sobre mim" : "About me",
              text: pt
                ? "Formação, objetivos e as tecnologias que fazem parte da minha jornada."
                : "Education, goals and the technologies behind my journey.",
            },
            {
              number: "02",
              to: "/projetos",
              icon: "folder",
              title: pt ? "Projetos" : "Projects",
              text: pt
                ? "Ideias em prática: código, interfaces e aprendizado em cada entrega."
                : "Ideas in action: code, interfaces and learning with each delivery.",
            },
            {
              number: "03",
              to: "/experiencias",
              icon: "education",
              title: pt ? "Experiências" : "Experience",
              text: pt
                ? "Minha trajetória acadêmica e experiências com desenvolvimento."
                : "My academic journey and development experience.",
            },
          ].map((item) => (
            <Link to={item.to} className="overview-card panel" key={item.to}>
              <div className="overview-top">
                <Icon name={item.icon} size={24} />
                <span>{item.number}</span>
              </div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              <span className="overview-arrow">
                <Icon name="arrow" />
              </span>
            </Link>
          ))}
        </div>
      </section>
      <section className="container home-cta">
        <div>
          <p className="eyebrow">{pt ? "O PRÓXIMO PASSO" : "THE NEXT STEP"}</p>
          <h2>
            {pt
              ? "Vamos construir algo juntos?"
              : "Shall we build something together?"}
          </h2>
          <p>
            {pt
              ? "Tenho disponibilidade para estagiar pela manhã ou à tarde."
              : "I am available for a morning or afternoon internship."}
          </p>
        </div>
        <Link to="/contato" className="button button-primary">
          {pt ? "Entrar em contato" : "Get in touch"}
          <Icon name="arrow" />
        </Link>
      </section>
    </>
  );
}
