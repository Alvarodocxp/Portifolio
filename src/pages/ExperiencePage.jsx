import Icon from "../components/Icon";
import { experiences } from "../data/experiences";

export default function ExperiencePage({ lang = "pt" }) {
  const pt = lang === "pt";
  return (
    <div className="container page-content">
      <header className="page-header">
        <h1>{pt ? "Experiências" : "Experience"}</h1>
      </header>
      <section className="experience-section">
        <div className="experience-list">
          {experiences.map((experience) => (
            <article
              className="experience-card panel"
              key={experience.title.pt}
            >
              <div className="experience-icon">
                <Icon name={experience.icon} size={26} />
              </div>
              <div className="experience-body">
                <p className="experience-place">{experience.place[lang]}</p>
                <h2>{experience.title[lang]}</h2>
                <p className="experience-period">{experience.date[lang]}</p>
                <p>{experience.desc[lang]}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
