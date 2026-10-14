import { Component, lazy, Suspense, useState } from "react";
import { Link } from "react-router-dom";
import Icon from "../components/Icon";
import { SKILL_TOOLS } from "../data/alvaroProfile";

const SkillsGlobe = lazy(() => import("../components/SkillsGlobe"));
class GlobeBoundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? (
      <p className="globe-fallback">
        {this.props.lang === "pt"
          ? "As tecnologias também estão disponíveis na lista abaixo."
          : "The technologies are also available in the list below."}
      </p>
    ) : (
      this.props.children
    );
  }
}
const skillLinks = {
  java: "https://www.java.com/",
  python: "https://www.python.org/",
  cpp: "https://isocpp.org/",
  cs: "https://learn.microsoft.com/dotnet/csharp/",
  js: "https://developer.mozilla.org/docs/Web/JavaScript",
  spring: "https://spring.io/projects/spring-boot",
  react: "https://react.dev/",
  vite: "https://vite.dev/",
  html: "https://developer.mozilla.org/docs/Web/HTML",
  css: "https://developer.mozilla.org/docs/Web/CSS",
  mysql: "https://www.mysql.com/",
  postgres: "https://www.postgresql.org/",
  mongodb: "https://www.mongodb.com/",
  git: "https://git-scm.com/",
  github: "https://github.com/Alvarodocxp",
  vscode: "https://code.visualstudio.com/",
};
const skills = SKILL_TOOLS.map((skill) => ({
  ...skill,
  link: skillLinks[skill.id],
  iconUrl: `https://skillicons.dev/icons?i=${skill.id}&theme=dark`,
}));

export default function AboutPage({ lang }) {
  const pt = lang === "pt";
  const [category, setCategory] = useState("all");
  const [showGlobe, setShowGlobe] = useState(false);
  const cv = `${import.meta.env.BASE_URL}curriculo-alvaro-barbosa.pdf`;
  const categories = [
    ["all", pt ? "Todas" : "All"],
    ["languages", pt ? "Linguagens" : "Languages"],
    ["web", "Web"],
    ["database", pt ? "Bancos de dados" : "Databases"],
    ["tools", pt ? "Ferramentas" : "Tools"],
  ];
  return (
    <div className="container page-content">
      <header className="page-header">
        <p className="eyebrow">01 / {pt ? "SOBRE MIM" : "ABOUT ME"}</p>
        <h1>{pt ? "Tecnologia com propósito." : "Technology with purpose."}</h1>
        <p className="page-description">
          {pt
            ? "Curiosidade para aprender. Dedicação para construir. Conheça um pouco da minha trajetória e de onde quero chegar."
            : "Curiosity to learn. Dedication to build. Get to know my journey and where I want to go."}
        </p>
      </header>
      <section className="about-intro-grid">
        <div className="about-story">
          <h2>
            {pt ? "Muito prazer, Álvaro." : "Nice to meet you. I’m Álvaro."}
          </h2>
          <p>
            {pt
              ? "Sou estudante do 2º período de Engenharia de Software na PUC Minas, campus Lourdes, e moro em Nova Lima, Minas Gerais. Minha formação começou em fevereiro de 2026, com conclusão prevista para dezembro de 2029."
              : "I am a second-semester Software Engineering student at PUC Minas, Lourdes campus, based in Nova Lima, Minas Gerais, Brazil. I started my degree in February 2026 and expect to graduate in December 2029."}
          </p>
          <p>
            {pt
              ? "Tenho interesse em desenvolvimento web, arquitetura de software, automação e bancos de dados. Coloco meus conhecimentos em prática em projetos acadêmicos com Java e Spring Boot, interfaces com React, jogos com Python e Lua e ferramentas de análise com MQL5."
              : "My interests include web development, software architecture, automation and databases. I put my knowledge into practice through academic Java and Spring Boot projects, React interfaces, Python and Lua games, and MQL5 analysis tools."}
          </p>
          <p>
            {pt
              ? "Busco meu primeiro estágio em desenvolvimento para contribuir com uma equipe, aplicar minha base técnica e evoluir ao lado de profissionais experientes. Tenho disponibilidade pela manhã ou à tarde, português nativo e inglês avançado."
              : "I am looking for my first development internship to contribute to a team, apply my technical foundation and grow alongside experienced professionals. I am available in the morning or afternoon, speak native Portuguese and have advanced English skills."}
          </p>
          <Link to="/experiencias" className="text-link">
            {pt ? "Conheça minha trajetória" : "Explore my journey"}
            <Icon name="arrow" size={16} />
          </Link>
        </div>
        <aside className="resume-card panel">
          <div className="resume-card-top">
            <span className="document-icon">
              <Icon name="book" size={28} />
            </span>
            <span className="tag">PDF</span>
          </div>
          <p className="eyebrow">{pt ? "MEU CURRÍCULO" : "MY RESUME"}</p>
          <h2>Álvaro Barbosa</h2>
          <p>
            {pt ? "Engenharia de Software" : "Software Engineering"}
            <br />
            PUC Minas · Lourdes
          </p>
          <dl className="resume-facts">
            <div>
              <dt>{pt ? "Objetivo" : "Goal"}</dt>
              <dd>
                {pt
                  ? "Primeiro estágio em desenvolvimento"
                  : "First development internship"}
              </dd>
            </div>
            <div>
              <dt>{pt ? "Disponibilidade" : "Availability"}</dt>
              <dd>{pt ? "Manhã ou tarde" : "Morning or afternoon"}</dd>
            </div>
          </dl>
          <a
            href={cv}
            className="button button-primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon name="eye" />
            {pt ? "Visualizar currículo" : "View resume"}
          </a>
          <a
            href={cv}
            className="button button-secondary"
            download="Curriculo_Alvaro_Barbosa.pdf"
          >
            <Icon name="download" />
            {pt ? "Baixar PDF" : "Download PDF"}
          </a>
        </aside>
      </section>
      <section className="skills-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">
              {pt ? "MINHA CAIXA DE FERRAMENTAS" : "MY TOOLBOX"}
            </p>
            <h2>
              {pt ? "Tecnologias & habilidades" : "Technologies & skills"}
            </h2>
          </div>
          <button
            className="button button-secondary"
            onClick={() => setShowGlobe(!showGlobe)}
            aria-expanded={showGlobe}
          >
            {showGlobe
              ? pt
                ? "Fechar globo 3D"
                : "Close 3D globe"
              : pt
                ? "Explorar globo 3D"
                : "Explore 3D globe"}
            <Icon name="code" />
          </button>
        </div>
        {showGlobe && (
          <GlobeBoundary lang={lang}>
            <Suspense
              fallback={
                <p className="globe-fallback">
                  {pt ? "Carregando globo…" : "Loading globe…"}
                </p>
              }
            >
              <SkillsGlobe skills={skills} lang={lang} />
            </Suspense>
          </GlobeBoundary>
        )}
        <div
          className="filter-list"
          role="group"
          aria-label={pt ? "Filtrar tecnologias" : "Filter technologies"}
        >
          {categories.map(([id, title]) => (
            <button
              className="filter-button"
              key={id}
              aria-pressed={category === id}
              onClick={() => setCategory(id)}
            >
              {title}
            </button>
          ))}
        </div>
        <div className="skill-grid">
          {skills
            .filter(
              (skill) => category === "all" || skill.category === category,
            )
            .map((skill) => (
              <a
                className="skill-card panel"
                href={skill.link}
                key={skill.id}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="skill-monogram" aria-hidden="true">
                  {skill.name.slice(0, 2)}
                </span>
                <div>
                  <h3>{skill.name}</h3>
                  <p>{categories.find(([id]) => id === skill.category)?.[1]}</p>
                </div>
                <Icon name="arrow" size={16} />
              </a>
            ))}
        </div>
      </section>
    </div>
  );
}
