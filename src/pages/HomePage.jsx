import { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "../components/Icon";
import { RESUME_DATA } from "../data/alvaroProfile";

export default function HomePage({ lang }) {
  const pt = lang === "pt";
  const [avatarFailed, setAvatarFailed] = useState(false);
  return (
    <section className="home-hero container">
      <div className="hero-copy">
        <p className="availability">
          <span />
          {pt ? "Aberto a oportunidades" : "Open to opportunities"}
        </p>
        <h1>
          Álvaro
          <br />
          <span>
            Barbosa<span className="name-period">.</span>
          </span>
        </h1>
        <p className="hero-description">
          {pt
            ? "Estudante de Engenharia de Software na PUC Minas."
            : "Software Engineering student at PUC Minas."}
        </p>
        <div className="hero-actions">
          <Link to="/sobre" className="button button-primary">
            {pt ? "Sobre Mim" : "About Me"}
            <Icon name="arrow" />
          </Link>
          <Link to="/projetos" className="button button-primary">
            {pt ? "Projetos" : "Projects"}
            <Icon name="arrow" />
          </Link>
          <Link to="/experiencias" className="button button-primary">
            {pt ? "Experiências" : "Experiences"}
            <Icon name="arrow" />
          </Link>
          <Link to="/contato" className="button button-secondary">
            <Icon name="mail" />
            {pt ? "Contato" : "Contact"}
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
        </div>
      </div>
      <div className="hero-visual">
        <div className="portrait-orbit" aria-hidden="true" />
        <div className="portrait-photo">
          {avatarFailed ? (
            <div className="portrait-monogram" aria-hidden="true">
              <strong>AB</strong>
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
      </div>
    </section>
  );
}
