import { useMemo, useState } from "react";
import Icon from "../components/Icon";
import {
  COLLABORATIVE_PROJECTS,
  PROJECT_FILTERS,
  PROJECTS,
} from "../data/projects";
import "./ProjectsPage.css";

const copy = {
  pt: {
    eyebrow: "Projetos",
    title: "Do primeiro layout à aplicação completa.",
    description:
      "Uma linha do tempo dos projetos que desenvolvi, das primeiras interfaces às aplicações com autenticação e integração de serviços.",
    filterLabel: "Filtrar projetos por área",
    order: "Do mais antigo ao mais recente",
    count: (count) => `${count} ${count === 1 ? "projeto" : "projetos"}`,
    repository: "Ver código",
    documentation: "Documentação",
    technologies: "Tecnologias utilizadas",
    gallery: "Telas do projeto",
    openImage: "Abrir captura em tamanho original",
    imageUnavailable:
      "Veja o código-fonte e as instruções de execução no repositório.",
    features: "O que desenvolvi",
    collaboration: "Em colaboração",
    collaborationTitle: "Construir também é trabalhar em equipe.",
    collaborator: "GitHub do colaborador",
  },
  en: {
    eyebrow: "Projects",
    title: "From the first layout to a complete application.",
    description:
      "A timeline of the projects I have developed, from early interfaces to applications with authentication and service integrations.",
    filterLabel: "Filter projects by area",
    order: "Oldest to newest",
    count: (count) => `${count} ${count === 1 ? "project" : "projects"}`,
    repository: "View code",
    documentation: "Documentation",
    technologies: "Technologies used",
    gallery: "Project screens",
    openImage: "Open full-size screenshot",
    imageUnavailable:
      "See the source code and running instructions in the repository.",
    features: "What I built",
    collaboration: "Collaboration",
    collaborationTitle: "Building also means working as a team.",
    collaborator: "Collaborator’s GitHub",
  },
};

function ProjectGallery({ media, title, lang, t }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = media[activeIndex] || media[0];
  const mediaUrl = `${import.meta.env.BASE_URL}${active.src}`;

  return (
    <div className="project-gallery">
      <figure className="project-preview">
        <a
          href={mediaUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${t.openImage}: ${title} — ${active.label[lang]}`}
        >
          <img
            src={mediaUrl}
            alt={active.alt[lang]}
            loading="lazy"
            width="1200"
            height="750"
          />
          <span className="project-preview-expand" aria-hidden="true">
            <Icon name="external" size={16} />
          </span>
        </a>
        <figcaption>{active.caption[lang]}</figcaption>
      </figure>
      {media.length > 1 && (
        <div
          className="project-gallery-controls"
          role="group"
          aria-label={`${t.gallery}: ${title}`}
        >
          {media.map((item, index) => (
            <button
              key={item.src}
              type="button"
              className={index === activeIndex ? "is-active" : ""}
              aria-pressed={index === activeIndex}
              onClick={() => setActiveIndex(index)}
            >
              <span className="project-gallery-dot" aria-hidden="true" />
              {item.label[lang]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ProjectsPage({ lang = "pt" }) {
  const [filter, setFilter] = useState("all");
  const t = copy[lang];
  const projects = useMemo(
    () =>
      PROJECTS.filter(
        (project) => filter === "all" || project.category === filter,
      ).sort((a, b) => a.date.localeCompare(b.date)),
    [filter],
  );
  const dateFormatter = new Intl.DateTimeFormat(
    lang === "pt" ? "pt-BR" : "en-US",
    { month: "short", year: "numeric", timeZone: "UTC" },
  );

  return (
    <div className="container projects-page">
      <header className="page-header">
        <span className="eyebrow">02 / {t.eyebrow}</span>
        <h1>{t.title}</h1>
        <p className="page-description">{t.description}</p>
      </header>

      <div className="projects-toolbar">
        <div
          className="project-filters"
          role="group"
          aria-label={t.filterLabel}
        >
          {PROJECT_FILTERS.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`project-filter${filter === item.id ? " is-active" : ""}`}
              aria-pressed={filter === item.id}
              onClick={() => setFilter(item.id)}
            >
              {item.label[lang]}
              <span>
                {item.id === "all"
                  ? PROJECTS.length
                  : PROJECTS.filter((project) => project.category === item.id)
                      .length}
              </span>
            </button>
          ))}
        </div>
        <p className="project-order">
          <Icon name="clock" size={15} />
          {t.order}
        </p>
      </div>

      <p className="projects-result-count" role="status" aria-live="polite">
        {t.count(projects.length)}
      </p>

      <ol className="projects-timeline">
        {projects.map((project) => (
          <li className="projects-timeline-item" key={project.id}>
            <div className="project-date">
              <span className="project-date-dot" aria-hidden="true" />
              <time dateTime={project.date}>
                {dateFormatter.format(new Date(`${project.date}T12:00:00Z`))}
              </time>
            </div>
            <article
              className={`panel project-card${project.media.length ? "" : " project-card-code"}`}
            >
              <div className="project-card-content">
                <span className="project-category">
                  {
                    PROJECT_FILTERS.find((item) => item.id === project.category)
                      .label[lang]
                  }
                </span>
                <h2>{project.title[lang]}</h2>
                <p className="project-description">
                  {project.description[lang]}
                </p>
                <ul className="project-highlights" aria-label={t.features}>
                  {project.highlights[lang].map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
                <ul className="project-tags" aria-label={t.technologies}>
                  {project.technologies.map((technology) => (
                    <li className="tag" key={technology}>
                      {technology}
                    </li>
                  ))}
                </ul>
                <div className="project-actions">
                  <a
                    className="button button-primary"
                    href={project.repository}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon name="github" size={17} />
                    {t.repository}
                  </a>
                  <a
                    className="button button-secondary"
                    href={project.documentation}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t.documentation}
                    <Icon name="external" size={15} />
                  </a>
                </div>
              </div>
              {project.media.length ? (
                <ProjectGallery
                  media={project.media}
                  title={project.title[lang]}
                  lang={lang}
                  t={t}
                />
              ) : (
                <p className="project-code-note">{t.imageUnavailable}</p>
              )}
            </article>
          </li>
        ))}
      </ol>

      <section
        className="projects-collaboration"
        aria-labelledby="collaboration-title"
      >
        <span className="eyebrow">{t.collaboration}</span>
        <h2 id="collaboration-title">{t.collaborationTitle}</h2>
        {COLLABORATIVE_PROJECTS.map((project) => (
          <article className="panel collaborative-project" key={project.id}>
            <div>
              <span className="project-category">{t.collaboration}</span>
              <h3>{project.title}</h3>
              <p className="project-description">{project.description[lang]}</p>
              <ul className="project-tags" aria-label={t.technologies}>
                {project.technologies.map((technology) => (
                  <li className="tag" key={technology}>
                    {technology}
                  </li>
                ))}
              </ul>
              <a
                className="button button-secondary"
                href={project.collaboratorUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon name="github" size={17} />
                {t.collaborator}
                <Icon name="external" size={15} />
              </a>
              <p className="collaborative-project-status">
                {project.repositoryStatus[lang]}
              </p>
            </div>
            <div className="collaborative-project-mark" aria-hidden="true">
              <span>Py</span>
              <small>Castle Defenders</small>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
