import { Link } from "react-router-dom";
import Icon from "../components/Icon";
import { experiences } from "../data/experiences";

export default function ExperiencePage({ lang }) {
  const pt = lang === "pt";
  return (
    <div className="container page-content">
      <header className="page-header">
        <p className="eyebrow">03 / {pt ? "EXPERIÊNCIAS" : "EXPERIENCE"}</p>
        <h1>{pt ? "Aprender. Aplicar. Evoluir." : "Learn. Apply. Grow."}</h1>
        <p className="page-description">
          {pt
            ? "Minha trajetória é construída entre a formação acadêmica e projetos pessoais. Estou em busca da primeira oportunidade profissional em desenvolvimento."
            : "My journey combines academic education and personal projects. I am looking for my first professional development opportunity."}
        </p>
      </header>
      <section className="experience-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">
              {pt ? "FORMAÇÃO & PRÁTICA" : "EDUCATION & PRACTICE"}
            </p>
            <h2>
              {pt ? "Experiências que me formam" : "Experiences that shape me"}
            </h2>
          </div>
        </div>
        <div className="experience-list">
          {experiences.map((experience, index) => (
            <article
              className="experience-card panel"
              key={experience.title.pt}
            >
              <div className="experience-icon">
                <Icon name={experience.icon} size={26} />
              </div>
              <div className="experience-body">
                <div className="experience-card-heading">
                  <p className="eyebrow">{experience.place[lang]}</p>
                  <span className="tag">
                    {index < 2
                      ? pt
                        ? "Formação"
                        : "Education"
                      : pt
                        ? "Projeto pessoal"
                        : "Personal project"}
                  </span>
                </div>
                <h3>{experience.title[lang]}</h3>
                <p className="experience-period">{experience.date[lang]}</p>
                <p>{experience.desc[lang]}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="experience-next panel">
        <div>
          <p className="eyebrow">{pt ? "UM NOVO CAPÍTULO" : "A NEW CHAPTER"}</p>
          <h2>
            {pt
              ? "Meu próximo passo pode ser com sua equipe."
              : "My next step could be with your team."}
          </h2>
          <p>
            {pt
              ? "Quero participar de projetos reais, aprender com o time e contribuir com dedicação e curiosidade."
              : "I want to take part in real projects, learn from the team and contribute with dedication and curiosity."}
          </p>
        </div>
        <Link to="/contato" className="button button-primary">
          {pt ? "Vamos conversar" : "Let's talk"}
          <Icon name="arrow" />
        </Link>
      </section>
    </div>
  );
}
