import { useState, useEffect } from "react";
import { SKILL_TOOLS } from "../data/alvaroProfile";
import "./TechMap.css";

export default function TechMap({ lang = "pt" }) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedTool, setSelectedTool] = useState(null);
  const [githubLanguages, setGithubLanguages] = useState([]);

  const categories = [
    { id: "all", label: lang === "pt" ? "Todas" : "All" },
    { id: "languages", label: lang === "pt" ? "Linguagens" : "Languages" },
    { id: "web", label: lang === "pt" ? "Web" : "Web" },
    { id: "database", label: lang === "pt" ? "Dados" : "Data" },
    { id: "tools", label: lang === "pt" ? "Ferramentas" : "Tools" },
  ];

  const filteredTools =
    activeCategory === "all"
      ? SKILL_TOOLS
      : SKILL_TOOLS.filter((tool) => tool.category === activeCategory);

  const apiIconsString = filteredTools.map((tool) => tool.id).join(",");
  const skillIconsApiUrl = `https://skillicons.dev/icons?i=${apiIconsString}&theme=dark`;

  useEffect(() => {
    let isMounted = true;

    fetch(
      "https://api.github.com/users/Alvarodocxp/repos?per_page=10&sort=updated",
    )
      .then((res) => (res.ok ? res.json() : []))
      .then((repos) => {
        if (!isMounted || !Array.isArray(repos)) return;
        const langs = new Set();
        repos.forEach((repo) => {
          if (repo.language) langs.add(repo.language);
        });
        setGithubLanguages(Array.from(langs));
      })
      .catch(() => {});

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="tech-map-container">
      <div className="tech-map-header">
        <div className="tech-map-title">
          <span>
            {lang === "pt" ? "Tecnologias que sei" : "Technologies I know"}
          </span>
          <strong>{filteredTools.length}</strong>
        </div>

        {githubLanguages.length > 0 && (
          <div
            className="tech-map-gh-badge"
            title={
              lang === "pt"
                ? "Linguagens detectadas nos repositórios públicos"
                : "Languages detected in public repositories"
            }
          >
            <span className="tech-gh-dot" />
            <span>{githubLanguages.slice(0, 3).join(", ")}</span>
          </div>
        )}
      </div>

      <div
        className="tech-map-filters"
        aria-label={
          lang === "pt" ? "Filtrar tecnologias" : "Filter technologies"
        }
      >
        {categories.map((cat) => (
          <button
            key={cat.id}
            className={`tech-filter-btn ${activeCategory === cat.id ? "active" : ""}`}
            onClick={() => {
              setActiveCategory(cat.id);
              setSelectedTool(null);
            }}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="tech-map-banner-card">
        <div className="tech-banner-label">
          <span>{lang === "pt" ? "Stack visual" : "Visual stack"}</span>
          <code>{filteredTools.length} skills</code>
        </div>
        <div className="tech-banner-img-wrapper">
          <img
            src={skillIconsApiUrl}
            alt={
              lang === "pt"
                ? "Mapa de ferramentas de Álvaro Barbosa"
                : "Álvaro Barbosa tool map"
            }
            className="tech-banner-img"
            loading="lazy"
          />
        </div>
      </div>

      <div className="tech-tools-grid">
        {filteredTools.map((tool) => {
          const isSelected = selectedTool?.id === tool.id;
          const singleIconUrl = `https://skillicons.dev/icons?i=${tool.id}&theme=dark`;

          return (
            <button
              type="button"
              key={tool.id}
              className={`tech-tool-card ${isSelected ? "selected" : ""}`}
              onClick={() => setSelectedTool(isSelected ? null : tool)}
              onMouseEnter={() => setSelectedTool(tool)}
            >
              <img
                src={singleIconUrl}
                alt=""
                className="tech-tool-icon"
                loading="lazy"
              />
              <span className="tech-tool-info">
                <span className="tech-tool-name">{tool.name}</span>
                <span className="tech-tool-category">{tool.category}</span>
              </span>
            </button>
          );
        })}
      </div>

      {selectedTool && (
        <div className="tech-tool-detail-pill">
          <span className="tech-detail-highlight">{selectedTool.name}</span>
          <span className="tech-detail-desc">{selectedTool.desc}</span>
        </div>
      )}
    </div>
  );
}
