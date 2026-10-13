import { useState, useEffect } from 'react';
import { SKILL_TOOLS } from '../data/alvaroProfile';
import './TechMap.css';

export default function TechMap({ lang = 'pt' }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedTool, setSelectedTool] = useState(null);
  const [githubLanguages, setGithubLanguages] = useState([]);

  // Categorias simples
  const categories = [
    { id: 'all', label: lang === 'pt' ? 'Todas' : 'All' },
    { id: 'languages', label: lang === 'pt' ? 'Linguagens' : 'Languages' },
    { id: 'web', label: lang === 'pt' ? 'Web & Frameworks' : 'Web & Frameworks' },
    { id: 'database', label: lang === 'pt' ? 'Bancos de Dados' : 'Databases' },
    { id: 'tools', label: lang === 'pt' ? 'Ferramentas' : 'Tools' },
  ];

  // Ferramentas filtradas
  const filteredTools = activeCategory === 'all'
    ? SKILL_TOOLS
    : SKILL_TOOLS.filter((t) => t.category === activeCategory);

  // Lista de IDs para a API do SkillIcons
  const apiIconsString = filteredTools.map((t) => t.id).join(',');
  const skillIconsApiUrl = `https://skillicons.dev/icons?i=${apiIconsString}&theme=dark`;

  // Buscar linguagens diretamente da API pública do GitHub
  useEffect(() => {
    let isMounted = true;
    fetch('https://api.github.com/users/Alvarodocxp/repos?per_page=10&sort=updated')
      .then((res) => (res.ok ? res.json() : []))
      .then((repos) => {
        if (!isMounted || !Array.isArray(repos)) return;
        const langs = new Set();
        repos.forEach((r) => {
          if (r.language) langs.add(r.language);
        });
        setGithubLanguages(Array.from(langs));
      })
      .catch(() => {
        // Fallback silencioso se limite de requisição da API pública for atingido
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="tech-map-container">
      {/* Barra de Filtros Simples */}
      <div className="tech-map-header">
        <div className="tech-map-filters">
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`tech-filter-btn ${activeCategory === cat.id ? 'active' : ''}`}
              onClick={() => {
                setActiveCategory(cat.id);
                setSelectedTool(null);
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {githubLanguages.length > 0 && (
          <div className="tech-map-gh-badge" title="Linguagens detectadas nos repositórios públicos">
            <span className="tech-gh-dot" />
            <span>GitHub Sync: {githubLanguages.slice(0, 3).join(', ')}</span>
          </div>
        )}
      </div>

      {/* Mapa Visual gerado pela API do SkillIcons */}
      <div className="tech-map-banner-card">
        <div className="tech-banner-label">
          <span>{lang === 'pt' ? 'Mapa de Ícones da API' : 'API Icon Map'}</span>
          <code>skillicons.dev/icons?i={apiIconsString}</code>
        </div>
        <div className="tech-banner-img-wrapper">
          <img
            src={skillIconsApiUrl}
            alt="Mapa de ferramentas Álvaro Barbosa"
            className="tech-banner-img"
            loading="lazy"
          />
        </div>
      </div>

      {/* Grade de Ferramentas Simples e Interativa */}
      <div className="tech-tools-grid">
        {filteredTools.map((tool) => {
          const isSelected = selectedTool?.id === tool.id;
          const singleIconUrl = `https://skillicons.dev/icons?i=${tool.id}&theme=dark`;

          return (
            <div
              key={tool.id}
              className={`tech-tool-card ${isSelected ? 'selected' : ''}`}
              onClick={() => setSelectedTool(isSelected ? null : tool)}
              onMouseEnter={() => setSelectedTool(tool)}
            >
              <img
                src={singleIconUrl}
                alt={tool.name}
                className="tech-tool-icon"
                loading="lazy"
              />
              <div className="tech-tool-info">
                <span className="tech-tool-name">{tool.name}</span>
                <span className="tech-tool-category">{tool.category}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detalhe da Ferramenta Selecionada (Simples & Direto do Currículo) */}
      {selectedTool && (
        <div className="tech-tool-detail-pill">
          <span className="tech-detail-highlight">📌 {selectedTool.name}:</span>
          <span className="tech-detail-desc">{selectedTool.desc}</span>
        </div>
      )}
    </div>
  );
}
