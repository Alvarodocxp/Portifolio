import { lazy, Suspense, useEffect, useRef, useState } from "react";
import {
  HashRouter,
  Link,
  NavLink,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Icon from "./components/Icon";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ProjectsPage from "./pages/ProjectsPage";
import ExperiencePage from "./pages/ExperiencePage";
import ContactPage from "./pages/ContactPage";
import "./styles/design-system.css";
import "./App.css";

const AskModal = lazy(() => import("./components/AskModal"));
const labels = {
  pt: {
    home: "Início",
    about: "Sobre mim",
    projects: "Projetos",
    experience: "Experiências",
    contact: "Contato",
    ask: "Pergunte a mim",
    skip: "Pular para o conteúdo",
    menu: "Abrir menu",
    close: "Fechar menu",
    missing: "Página não encontrada",
    back: "Voltar ao início",
  },
  en: {
    home: "Home",
    about: "About me",
    projects: "Projects",
    experience: "Experience",
    contact: "Contact",
    ask: "Ask me",
    skip: "Skip to content",
    menu: "Open menu",
    close: "Close menu",
    missing: "Page not found",
    back: "Back to home",
  },
};
const links = [
  ["/", "home"],
  ["/sobre", "about"],
  ["/projetos", "projects"],
  ["/experiencias", "experience"],
  ["/contato", "contact"],
];
const currentYear = new Date().getFullYear();

function Portfolio() {
  const [lang, setLang] = useState(() => {
    try {
      return localStorage.getItem("portfolio-language") === "en" ? "en" : "pt";
    } catch {
      return "pt";
    }
  });
  const [menuOpen, setMenuOpen] = useState(false);
  const [askOpen, setAskOpen] = useState(false);
  const location = useLocation();
  const mainRef = useRef(null);
  const previousPath = useRef(location.pathname);
  const t = labels[lang];

  useEffect(() => {
    document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";
    try {
      localStorage.setItem("portfolio-language", lang);
    } catch {}
    const key = links.find(([path]) => path === location.pathname)?.[1];
    document.title = `${labels[lang][key] || labels[lang].missing} | Álvaro Barbosa`;
  }, [lang, location.pathname]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    if (previousPath.current !== location.pathname)
      mainRef.current?.focus({ preventScroll: true });
    previousPath.current = location.pathname;
  }, [location.pathname]);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const onKey = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <div className="site-shell">
      <a
        href="#main-content"
        className="skip-link"
        onClick={(event) => {
          event.preventDefault();
          mainRef.current?.focus();
        }}
      >
        {t.skip}
      </a>
      <header className="site-header">
        <div className="container header-inner">
          <Link
            to="/"
            className="brand"
            aria-label="Álvaro Barbosa"
            onClick={() => setMenuOpen(false)}
          >
            <span className="brand-mark">
              AB<span>.</span>
            </span>
          </Link>
          <nav
            id="primary-navigation"
            className={`primary-nav${menuOpen ? " is-open" : ""}`}
            aria-label={
              lang === "pt" ? "Navegação principal" : "Main navigation"
            }
          >
            {links.map(([path, key]) => (
              <NavLink
                key={path}
                to={path}
                end={path === "/"}
                onClick={() => setMenuOpen(false)}
              >
                {t[key]}
              </NavLink>
            ))}
          </nav>
          <div className="header-tools">
            <div
              className="language-switch"
              role="group"
              aria-label={lang === "pt" ? "Idioma" : "Language"}
            >
              <button
                type="button"
                aria-pressed={lang === "pt"}
                onClick={() => setLang("pt")}
              >
                PT
              </button>
              <button
                type="button"
                aria-pressed={lang === "en"}
                onClick={() => setLang("en")}
              >
                EN
              </button>
            </div>
            <button
              type="button"
              className="menu-toggle"
              aria-controls="primary-navigation"
              aria-expanded={menuOpen}
              aria-label={menuOpen ? t.close : t.menu}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>
      <main
        id="main-content"
        ref={mainRef}
        tabIndex={-1}
        className="main-content"
      >
        <Routes>
          <Route path="/" element={<HomePage lang={lang} />} />
          <Route path="/sobre" element={<AboutPage lang={lang} />} />
          <Route path="/projetos" element={<ProjectsPage lang={lang} />} />
          <Route
            path="/experiencias"
            element={<ExperiencePage lang={lang} />}
          />
          <Route path="/contato" element={<ContactPage lang={lang} />} />
          <Route
            path="*"
            element={
              <section className="container page-header">
                <h1>{t.missing}</h1>
                <Link className="button button-primary" to="/">
                  {t.back}
                </Link>
              </section>
            }
          />
        </Routes>
      </main>
      <footer className="site-footer">
        <div className="container footer-inner">
          <p className="copyright">© {currentYear} Álvaro Barbosa</p>
        </div>
      </footer>
      <button
        type="button"
        className="ask-floating"
        onClick={() => setAskOpen(true)}
        aria-label={t.ask}
      >
        <Icon name="bot" size={21} />
      </button>
      {askOpen && (
        <Suspense fallback={null}>
          <AskModal
            isOpen={askOpen}
            onClose={() => setAskOpen(false)}
            lang={lang}
          />
        </Suspense>
      )}
    </div>
  );
}

export default function App() {
  return (
    <HashRouter>
      <Portfolio />
    </HashRouter>
  );
}
