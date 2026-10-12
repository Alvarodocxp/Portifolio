import { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';
import './App.css';

/* ================================================================
   CONTEÚDO BILÍNGUE (PT / EN)
   ================================================================ */
const content = {
  pt: {
    nav: {
      about: 'Sobre',
      projects: 'Projetos',
      experience: 'Experiências',
      contact: 'Contato',
    },
    hero: {
      badge: 'Aberto a novas oportunidades',
      greeting: 'Olá, eu sou',
      name: 'Álvaro Barbosa',
      subtitle:
        'Estudante de Engenharia de Software na PUC Minas, com experiência em Java, Python e C# em projetos acadêmicos de desenvolvimento de soluções web e jogos.',
      cta: 'Entre em Contato',
      ctaSecondary: 'Ver Projetos',
    },
    about: {
      label: 'Sobre Mim',
      title: 'Quem sou eu',
      p1: 'Sou estudante do 1º ano de Engenharia de Software na PUC Minas (Lourdes), apaixonado por resolver problemas através da tecnologia. Tenho experiência prática em Java, Python e C#, aplicados em projetos acadêmicos como desenvolvimento de soluções web, jogos e análises de mercado.',
      p2: 'Busco um estágio em desenvolvimento de software onde possa aplicar o que estudo, aprender em um time real e crescer profissionalmente. No meu tempo livre, desenvolvo estratégias para o mercado financeiro e crio projetos pessoais — gosto de matemática, criar coisas e discutir ideias.',
      stats: {
        projects: 'Projetos',
        technologies: 'Tecnologias',
        languages: 'Idiomas',
      },
      downloadCv: 'Baixar Currículo (PDF)',
      viewCv: 'Visualizar Currículo',
    },
    skills: {
      languages: 'Linguagens',
      webFrameworks: 'Web & Frameworks',
      databases: 'Bancos de Dados',
      tools: 'Ferramentas',
      humanLang: 'Idiomas',
    },
    projects: {
      label: 'Projetos',
      title: 'Linha do Tempo',
      desc: 'Uma visão cronológica dos projetos que desenvolvi ao longo da minha jornada.',
    },
    experience: {
      label: 'Experiências & Formação',
      title: 'Minha Trajetória',
    },
    contact: {
      label: 'Contato',
      title: 'Vamos Conversar',
      desc: 'Quer trocar uma ideia, propor uma parceria ou saber mais sobre meu trabalho? Fique à vontade para me enviar uma mensagem!',
      name: 'Nome',
      email: 'E-mail',
      subject: 'Assunto',
      message: 'Mensagem',
      namePh: 'Seu nome completo',
      emailPh: 'seu@email.com',
      subjectPh: 'Assunto da mensagem',
      messagePh: 'Escreva sua mensagem aqui...',
      send: 'Enviar Mensagem',
      sending: 'Enviando...',
      success: 'Mensagem enviada com sucesso! Responderei em breve.',
      error: 'Erro ao enviar. Tente novamente ou use o e-mail diretamente.',
      phone: 'Telefone',
      emailLabel: 'E-mail',
      location: 'Localização',
    },
    footer: {
      copy: 'Feito com dedicação por',
      rights: 'Todos os direitos reservados.',
    },
  },
  en: {
    nav: {
      about: 'About',
      projects: 'Projects',
      experience: 'Experience',
      contact: 'Contact',
    },
    hero: {
      badge: 'Open to new opportunities',
      greeting: "Hi, I'm",
      name: 'Álvaro Barbosa',
      subtitle:
        'Software Engineering student at PUC Minas with hands-on experience in Java, Python, and C# through academic projects in web development and game design.',
      cta: 'Get in Touch',
      ctaSecondary: 'View Projects',
    },
    about: {
      label: 'About Me',
      title: 'Who I am',
      p1: "I'm a 1st-year Software Engineering student at PUC Minas (Lourdes campus), passionate about solving problems through technology. I have practical experience with Java, Python, and C# applied to academic projects such as web solutions, games, and market analysis.",
      p2: "I'm looking for a software development internship where I can apply what I study, learn from a real team, and grow professionally. In my free time, I develop financial market strategies and create personal projects — I enjoy math, building things, and discussing ideas.",
      stats: {
        projects: 'Projects',
        technologies: 'Technologies',
        languages: 'Languages',
      },
      downloadCv: 'Download Resume (PDF)',
      viewCv: 'View Resume',
    },
    skills: {
      languages: 'Languages',
      webFrameworks: 'Web & Frameworks',
      databases: 'Databases',
      tools: 'Tools',
      humanLang: 'Spoken Languages',
    },
    projects: {
      label: 'Projects',
      title: 'Timeline',
      desc: 'A chronological view of the projects I developed throughout my journey.',
    },
    experience: {
      label: 'Experience & Education',
      title: 'My Journey',
    },
    contact: {
      label: 'Contact',
      title: "Let's Talk",
      desc: "Want to chat, propose a partnership, or learn more about my work? Feel free to send me a message!",
      name: 'Name',
      email: 'Email',
      subject: 'Subject',
      message: 'Message',
      namePh: 'Your full name',
      emailPh: 'you@email.com',
      subjectPh: 'Message subject',
      messagePh: 'Write your message here...',
      send: 'Send Message',
      sending: 'Sending...',
      success: 'Message sent successfully! I will reply soon.',
      error: 'Error sending. Try again or email me directly.',
      phone: 'Phone',
      emailLabel: 'Email',
      location: 'Location',
    },
    footer: {
      copy: 'Made with dedication by',
      rights: 'All rights reserved.',
    },
  },
};

/* ================================================================
   DADOS DOS PROJETOS
   ================================================================ */
const projectsData = [
  {
    date: '2026',
    title: { pt: 'Portfólio Profissional', en: 'Professional Portfolio' },
    desc: {
      pt: 'Website de portfólio pessoal desenvolvido com React e Vite. Design responsivo com tema escuro, suporte bilíngue (PT/EN) e formulário de contato integrado com EmailJS.',
      en: 'Personal portfolio website built with React and Vite. Responsive dark-themed design with bilingual support (PT/EN) and contact form integrated with EmailJS.',
    },
    tags: ['React', 'Vite', 'CSS3', 'EmailJS'],
    link: 'https://github.com/Alvarodocxp/Portifolio',
  },
  {
    date: '2026',
    title: { pt: 'Projetos Acadêmicos — PUC Minas', en: 'Academic Projects — PUC Minas' },
    desc: {
      pt: 'Desenvolvimento de projetos com CRUD completo e banco de dados, criados em equipe utilizando controle de versões (Git) e organização em sprints.',
      en: 'Development of full CRUD projects with databases, built in teams using version control (Git) and sprint-based organization.',
    },
    tags: ['Java', 'Spring Boot', 'SQL', 'Git'],
    link: 'https://github.com/Alvarodocxp',
  },
  {
    date: '2025',
    title: { pt: 'Softwares de Análise de Mercado', en: 'Market Analysis Software' },
    desc: {
      pt: 'Desenvolvimento de robôs e indicadores para análise do mercado financeiro utilizando a linguagem MQL5 na plataforma MetaTrader 5.',
      en: 'Development of trading robots and indicators for financial market analysis using MQL5 language on the MetaTrader 5 platform.',
    },
    tags: ['MQL5', 'MetaTrader', 'Finanças'],
    link: '#',
  },
  {
    date: '2024 – 2025',
    title: { pt: 'Desenvolvimento de Jogos e Scripts', en: 'Game Development & Scripts' },
    desc: {
      pt: 'Criação de partes de jogos e scripts injetáveis utilizando Pygame (Python) e Lua, com foco em mecânicas interativas e automação.',
      en: 'Creation of game components and injectable scripts using Pygame (Python) and Lua, focused on interactive mechanics and automation.',
    },
    tags: ['Python', 'Pygame', 'Lua'],
    link: '#',
  },
];

/* ================================================================
   DADOS DE EXPERIÊNCIA / FORMAÇÃO
   ================================================================ */
const experienceData = [
  {
    icon: '🎓',
    title: { pt: 'Engenharia de Software', en: 'Software Engineering' },
    place: { pt: 'PUC Minas — Lourdes', en: 'PUC Minas — Lourdes' },
    date: { pt: 'Fevereiro 2026 – Dezembro 2029 (previsão)', en: 'Feb 2026 – Dec 2029 (expected)' },
    desc: {
      pt: 'Graduação em Engenharia de Software com foco em desenvolvimento web, arquitetura de software e boas práticas de engenharia.',
      en: 'Bachelor\'s in Software Engineering focused on web development, software architecture, and engineering best practices.',
    },
  },
  {
    icon: '📚',
    title: { pt: 'Ensino Médio', en: 'High School' },
    place: { pt: 'Colégio Batista — Alphaville', en: 'Colégio Batista — Alphaville' },
    date: { pt: 'Conclusão: Dezembro 2025', en: 'Completed: Dec 2025' },
    desc: {
      pt: 'Formação do ensino médio com destaque em ciências exatas e participação em projetos extracurriculares de tecnologia.',
      en: 'High school diploma with emphasis on exact sciences and participation in extracurricular technology projects.',
    },
  },
  {
    icon: '💹',
    title: { pt: 'Análise de Mercado Financeiro', en: 'Financial Market Analysis' },
    place: { pt: 'Projetos Pessoais', en: 'Personal Projects' },
    date: { pt: '2024 – Presente', en: '2024 – Present' },
    desc: {
      pt: 'Desenvolvimento de estratégias algorítmicas e robôs de trading utilizando MQL5 para a plataforma MetaTrader 5.',
      en: 'Development of algorithmic strategies and trading bots using MQL5 for the MetaTrader 5 platform.',
    },
  },
  {
    icon: '🎮',
    title: { pt: 'Desenvolvimento de Jogos', en: 'Game Development' },
    place: { pt: 'Projetos Pessoais', en: 'Personal Projects' },
    date: { pt: '2024 – Presente', en: '2024 – Present' },
    desc: {
      pt: 'Criação de mecânicas de jogo e scripts com Pygame e Lua, explorando automação e interatividade em projetos independentes.',
      en: 'Creating game mechanics and scripts with Pygame and Lua, exploring automation and interactivity in indie projects.',
    },
  },
];

/* ================================================================
   COMPONENTE PRINCIPAL
   ================================================================ */
function App() {
  const [lang, setLang] = useState('pt');
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [formStatus, setFormStatus] = useState(null); // null | 'sending' | 'success' | 'error'
  const formRef = useRef(null);
  const t = content[lang];

  // ---------- scroll listener ----------
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ---------- intersection observer for fade-in ----------
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('visible');
        });
      },
      { threshold: 0.15 }
    );
    document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [lang]); // re-observe when language changes

  // ---------- close menu on link click ----------
  const handleNavClick = () => setMenuOpen(false);

  // ---------- smooth scroll ----------
  const scrollTo = (id) => {
    handleNavClick();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  // ---------- form submit via EmailJS ----------
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus('sending');

    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID',
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID',
        formRef.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY'
      )
      .then(
        () => {
          setFormStatus('success');
          formRef.current.reset();
          setTimeout(() => setFormStatus(null), 5000);
        },
        () => {
          setFormStatus('error');
          setTimeout(() => setFormStatus(null), 5000);
        }
      );
  };

  return (
    <>
      {/* ==================== NAVBAR ==================== */}
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`} id="navbar">
        <span className="navbar-logo">{'<AB />'}</span>

        <div className={`navbar-links${menuOpen ? ' open' : ''}`}>
          <a href="#sobre" onClick={() => scrollTo('sobre')}>{t.nav.about}</a>
          <a href="#projetos" onClick={() => scrollTo('projetos')}>{t.nav.projects}</a>
          <a href="#experiencias" onClick={() => scrollTo('experiencias')}>{t.nav.experience}</a>
          <a href="#contato" onClick={() => scrollTo('contato')}>{t.nav.contact}</a>

          <div className="lang-toggle">
            <button className={`lang-btn${lang === 'pt' ? ' active' : ''}`} onClick={() => setLang('pt')}>PT</button>
            <button className={`lang-btn${lang === 'en' ? ' active' : ''}`} onClick={() => setLang('en')}>EN</button>
          </div>
        </div>

        <button className={`hamburger${menuOpen ? ' open' : ''}`} onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          <span /><span /><span />
        </button>
      </nav>

      {/* ==================== HERO ==================== */}
      <section className="hero" id="hero">
        <div className="hero-content">
          <div className="hero-text">
            <div className="hero-badge">
              <span className="dot" />
              {t.hero.badge}
            </div>
            <h1>
              {t.hero.greeting}<br />
              <span className="gradient-text">{t.hero.name}</span>
            </h1>
            <p className="hero-subtitle">{t.hero.subtitle}</p>

            <div className="hero-actions">
              <button className="btn-primary" onClick={() => scrollTo('contato')}>
                ✉️ {t.hero.cta}
              </button>
              <button className="btn-secondary" onClick={() => scrollTo('projetos')}>
                📂 {t.hero.ctaSecondary}
              </button>
            </div>

            <div className="hero-socials">
              <a href="https://github.com/Alvarodocxp" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="GitHub">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
              <a href="https://wa.me/5531996946632" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="WhatsApp">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              </a>
              <a href="mailto:silvaalvarobf@gmail.com" className="social-link" aria-label="Email">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              </a>
            </div>
          </div>

          <div className="hero-avatar-wrapper">
            <img
              src={`https://github.com/Alvarodocxp.png`}
              alt="Álvaro Barbosa"
              className="hero-avatar"
            />
          </div>
        </div>
      </section>

      {/* ==================== SOBRE MIM ==================== */}
      <section className="section" id="sobre" style={{ background: 'var(--bg-secondary)' }}>
        <div className="section-inner">
          <div className="section-header fade-in">
            <p className="section-label">{t.about.label}</p>
            <h2 className="section-title">{t.about.title}</h2>
            <div className="section-divider" />
          </div>

          <div className="about-grid">
            <div className="about-text fade-in">
              <p>{t.about.p1}</p>
              <p>{t.about.p2}</p>

              <div className="about-stats">
                <div className="stat-card">
                  <div className="stat-number">4+</div>
                  <div className="stat-label">{t.about.stats.projects}</div>
                </div>
                <div className="stat-card">
                  <div className="stat-number">8+</div>
                  <div className="stat-label">{t.about.stats.technologies}</div>
                </div>
                <div className="stat-card">
                  <div className="stat-number">2</div>
                  <div className="stat-label">{t.about.stats.languages}</div>
                </div>
              </div>

              <div className="about-actions">
                <a
                  href="/curriculo-alvaro-barbosa.pdf"
                  download="Curriculo_Alvaro_Barbosa.pdf"
                  className="btn-primary cv-btn"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  {t.about.downloadCv}
                </a>
                <a
                  href="/curriculo-alvaro-barbosa.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary cv-view-btn"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                  {t.about.viewCv}
                </a>
              </div>
            </div>

            <div className="skills-grid fade-in">
              <div className="skill-category">
                <h3 className="skill-category-title">{t.skills.languages}</h3>
                <div className="skill-tags">
                  {['Java', 'Python', 'C#', 'JavaScript'].map((s) => (
                    <span className="skill-tag" key={s}>{s}</span>
                  ))}
                </div>
              </div>
              <div className="skill-category">
                <h3 className="skill-category-title">{t.skills.webFrameworks}</h3>
                <div className="skill-tags">
                  {['Spring Boot', 'Thymeleaf', 'React', 'HTML/CSS', 'Vite'].map((s) => (
                    <span className="skill-tag" key={s}>{s}</span>
                  ))}
                </div>
              </div>
              <div className="skill-category">
                <h3 className="skill-category-title">{t.skills.databases}</h3>
                <div className="skill-tags">
                  {['MySQL', 'PostgreSQL', 'SQL'].map((s) => (
                    <span className="skill-tag" key={s}>{s}</span>
                  ))}
                </div>
              </div>
              <div className="skill-category">
                <h3 className="skill-category-title">{t.skills.tools}</h3>
                <div className="skill-tags">
                  {['Git', 'GitHub', 'MQL5', 'Pygame', 'Lua'].map((s) => (
                    <span className="skill-tag" key={s}>{s}</span>
                  ))}
                </div>
              </div>
              <div className="skill-category">
                <h3 className="skill-category-title">{t.skills.humanLang}</h3>
                <div className="skill-tags">
                  <span className="skill-tag">{lang === 'pt' ? 'Português (nativo)' : 'Portuguese (native)'}</span>
                  <span className="skill-tag">{lang === 'pt' ? 'Inglês (avançado)' : 'English (advanced)'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== PROJETOS (TIMELINE) ==================== */}
      <section className="section" id="projetos">
        <div className="section-inner">
          <div className="section-header fade-in">
            <p className="section-label">{t.projects.label}</p>
            <h2 className="section-title">{t.projects.title}</h2>
            <p className="section-desc">{t.projects.desc}</p>
            <div className="section-divider" />
          </div>

          <div className="timeline fade-in">
            {projectsData.map((project, idx) => (
              <div className="timeline-item" key={idx}>
                <span className="timeline-date">{project.date}</span>
                <div className="timeline-card">
                  <h3>{project.title[lang]}</h3>
                  <p>{project.desc[lang]}</p>
                  <div className="timeline-tags">
                    {project.tags.map((tag) => (
                      <span className="timeline-tag" key={tag}>{tag}</span>
                    ))}
                  </div>
                  {project.link !== '#' && (
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="timeline-link">
                      {lang === 'pt' ? 'Ver no GitHub' : 'View on GitHub'} →
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== EXPERIÊNCIAS ==================== */}
      <section className="section" id="experiencias" style={{ background: 'var(--bg-secondary)' }}>
        <div className="section-inner">
          <div className="section-header fade-in">
            <p className="section-label">{t.experience.label}</p>
            <h2 className="section-title">{t.experience.title}</h2>
            <div className="section-divider" />
          </div>

          <div className="experience-grid fade-in">
            {experienceData.map((exp, idx) => (
              <div className="exp-card" key={idx}>
                <div className="exp-icon">{exp.icon}</div>
                <h3>{exp.title[lang]}</h3>
                <p className="exp-place">{exp.place[lang]}</p>
                <p className="exp-date">{exp.date[lang]}</p>
                <p>{exp.desc[lang]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== CONTATO ==================== */}
      <section className="section" id="contato">
        <div className="section-inner">
          <div className="section-header fade-in">
            <p className="section-label">{t.contact.label}</p>
            <h2 className="section-title">{t.contact.title}</h2>
            <p className="section-desc">{t.contact.desc}</p>
            <div className="section-divider" />
          </div>

          <div className="contact-grid">
            <div className="contact-info fade-in">
              <div className="contact-item">
                <div className="contact-icon">📞</div>
                <div className="contact-item-info">
                  <h4>{t.contact.phone}</h4>
                  <span>(31) 99694-6632</span>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">✉️</div>
                <div className="contact-item-info">
                  <h4>{t.contact.emailLabel}</h4>
                  <span>silvaalvarobf@gmail.com</span>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">📍</div>
                <div className="contact-item-info">
                  <h4>{t.contact.location}</h4>
                  <span>Nova Lima, Alphaville — MG</span>
                </div>
              </div>
            </div>

            <form className="contact-form fade-in" ref={formRef} onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="user_name">{t.contact.name}</label>
                  <input type="text" id="user_name" name="user_name" placeholder={t.contact.namePh} required />
                </div>
                <div className="form-group">
                  <label htmlFor="user_email">{t.contact.email}</label>
                  <input type="email" id="user_email" name="user_email" placeholder={t.contact.emailPh} required />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="subject">{t.contact.subject}</label>
                <input type="text" id="subject" name="subject" placeholder={t.contact.subjectPh} required />
              </div>
              <div className="form-group">
                <label htmlFor="message">{t.contact.message}</label>
                <textarea id="message" name="message" placeholder={t.contact.messagePh} required />
              </div>

              <button type="submit" className="form-submit" disabled={formStatus === 'sending'}>
                {formStatus === 'sending' ? t.contact.sending : t.contact.send}
              </button>

              {formStatus === 'success' && <div className="form-status success">{t.contact.success}</div>}
              {formStatus === 'error' && <div className="form-status error">{t.contact.error}</div>}
            </form>
          </div>
        </div>
      </section>

      {/* ==================== FOOTER ==================== */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-links">
            <a href="#sobre" onClick={() => scrollTo('sobre')}>{t.nav.about}</a>
            <a href="#projetos" onClick={() => scrollTo('projetos')}>{t.nav.projects}</a>
            <a href="#experiencias" onClick={() => scrollTo('experiencias')}>{t.nav.experience}</a>
            <a href="#contato" onClick={() => scrollTo('contato')}>{t.nav.contact}</a>
          </div>
          <p className="footer-copy">
            © {new Date().getFullYear()} — {t.footer.copy} <span>Álvaro Barbosa</span>. {t.footer.rights}
          </p>
        </div>
      </footer>
    </>
  );
}

export default App;
