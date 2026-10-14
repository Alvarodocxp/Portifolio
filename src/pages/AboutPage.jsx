import { Component, lazy, Suspense, useState } from "react";
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
        <h1>{pt ? "Sobre mim" : "About me"}</h1>
      </header>
      <section className="about-intro-grid">
        <div className="about-story">
          <p>
            {pt
              ? "Sou estudante do 2º período de Engenharia de Software na PUC Minas, campus Lourdes, com conclusão prevista para 2029. Tenho interesse em desenvolvimento web, automação e bancos de dados."
              : "I am a second-semester Software Engineering student at PUC Minas, Lourdes campus, graduating in 2029. My interests include web development, automation and databases."}
          </p>
          <p>
            {pt
              ? "Busco meu primeiro estágio em desenvolvimento para aplicar meus conhecimentos e aprender com a equipe. Moro em Nova Lima, tenho inglês avançado e disponibilidade pela manhã ou à tarde."
              : "I am looking for my first development internship to apply my knowledge and learn from the team. I live in Nova Lima, have advanced English skills and am available in the morning or afternoon."}
          </p>
        </div>
        <aside className="resume-card panel">
          <div className="resume-card-top">
            <span className="document-icon">
              <Icon name="book" size={28} />
            </span>
          </div>
          <h2>{pt ? "Currículo" : "Resume"}</h2>
          <a
            href={cv}
            className="button button-primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon name="eye" />
            {pt ? "Visualizar" : "View"}
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
          <h2>{pt ? "Tecnologias" : "Technologies"}</h2>
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
                </div>
                <Icon name="arrow" size={16} />
              </a>
            ))}
        </div>
      </section>
    </div>
  );
}
