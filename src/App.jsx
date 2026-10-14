import { lazy, Suspense, useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';
import AskModal from './components/AskModal';
import { SKILL_TOOLS } from './data/alvaroProfile';
import './App.css';

const SkillsGlobe = lazy(() => import('./components/SkillsGlobe'));

const content = {
  pt: {
    nav: {
      about: 'Currículo',
      projects: 'Projetos',
      experience: 'Experiências',
      contact: 'Contato',
      ask: 'Pergunte a Mim',
    },
    hero: {
      badge: 'Aberto ao primeiro estágio em desenvolvimento',
      greeting: 'Olá, eu sou',
      name: 'Álvaro Barbosa',
      subtitle:
        'Estudante de Engenharia de Software na PUC Minas, com prática em Java, Python, C++, C# e desenvolvimento web com React.',
      cta: 'Entrar em contato',
      ctaSecondary: 'Ver projetos',
      ask: 'Perguntar à IA',
    },
    about: {
      label: 'Currículo e tecnologias',
      title: 'Resumo profissional em PDF e stack técnica',
      desc: 'Acesse meu currículo completo ou veja as tecnologias que uso em projetos acadêmicos, web, dados e automação.',
      resumeTitle: 'Currículo - Álvaro Barbosa',
      resumeMeta: 'Engenharia de Software - PUC Minas',
      resumeNote: 'PDF com formação, objetivo profissional, habilidades e contatos atualizados.',
      downloadCv: 'Baixar currículo',
      viewCv: 'Visualizar currículo',
    },
    projects: {
      label: 'Projetos',
      title: 'Linha do tempo',
      desc: 'Uma visão cronológica dos projetos que desenvolvi ao longo da minha jornada.',
    },
    experience: {
      label: 'Experiências e formação',
      title: 'Trajetória',
    },
    contact: {
      label: 'Contato',
      title: 'Vamos conversar',
      desc: 'Envie uma mensagem direta pelo formulário ou escolha um dos canais ao lado. Respondo assim que possível.',
      formTitle: 'Enviar mensagem',
      formSubtitle: 'Preencha os campos abaixo para iniciar a conversa.',
      name: 'Nome',
      email: 'E-mail',
      subject: 'Assunto',
      message: 'Mensagem',
      namePh: 'Seu nome completo',
      emailPh: 'seu@email.com',
      subjectPh: 'Sobre qual oportunidade vamos conversar?',
      messagePh: 'Escreva sua mensagem aqui...',
      send: 'Enviar mensagem',
      sending: 'Enviando...',
      success: 'Mensagem pronta. Responderei em breve.',
      error: 'Não foi possível enviar pelo formulário. Use o e-mail direto.',
      phone: 'Telefone',
      emailLabel: 'E-mail',
      location: 'Localização',
      copyEmail: 'Copiar e-mail',
      copied: 'E-mail copiado',
      directEmail: 'Enviar e-mail direto',
    },
    footer: {
      copy: 'Desenvolvido por',
      rights: 'Todos os direitos reservados.',
    },
  },
  en: {
    nav: {
      about: 'Resume',
      projects: 'Projects',
      experience: 'Experience',
      contact: 'Contact',
      ask: 'Ask Álvaro',
    },
    hero: {
      badge: 'Open to a first software internship',
      greeting: "Hi, I'm",
      name: 'Álvaro Barbosa',
      subtitle:
        'Software Engineering student at PUC Minas, with hands-on practice in Java, Python, C++, C# and React web development.',
      cta: 'Get in touch',
      ctaSecondary: 'View projects',
      ask: 'Ask AI',
    },
    about: {
      label: 'Resume and technologies',
      title: 'Professional PDF resume and technical stack',
      desc: 'Open my full resume or explore the technologies I use in academic, web, data and automation projects.',
      resumeTitle: 'Resume - Álvaro Barbosa',
      resumeMeta: 'Software Engineering - PUC Minas',
      resumeNote: 'PDF with education, career goal, skills and updated contacts.',
      downloadCv: 'Download resume',
      viewCv: 'View resume',
    },
    projects: {
      label: 'Projects',
      title: 'Timeline',
      desc: 'A chronological view of the projects I developed throughout my journey.',
    },
    experience: {
      label: 'Experience and education',
      title: 'Journey',
    },
    contact: {
      label: 'Contact',
      title: "Let's talk",
      desc: 'Send a direct message through the form or choose one of the channels. I will reply as soon as possible.',
      formTitle: 'Send a message',
      formSubtitle: 'Fill in the fields below to start the conversation.',
      name: 'Name',
      email: 'Email',
      subject: 'Subject',
      message: 'Message',
      namePh: 'Your full name',
      emailPh: 'you@email.com',
      subjectPh: 'What opportunity should we discuss?',
      messagePh: 'Write your message here...',
      send: 'Send message',
      sending: 'Sending...',
      success: 'Message ready. I will reply soon.',
      error: 'The form could not send. Use direct email instead.',
      phone: 'Phone',
      emailLabel: 'Email',
      location: 'Location',
      copyEmail: 'Copy email',
      copied: 'Email copied',
      directEmail: 'Send direct email',
    },
    footer: {
      copy: 'Developed by',
      rights: 'All rights reserved.',
    },
  },
};

const projectsData = [
  {
    date: '2026',
    title: { pt: 'Portfólio profissional', en: 'Professional portfolio' },
    desc: {
      pt: 'Website pessoal desenvolvido com React e Vite, com tema escuro, suporte bilíngue e formulário integrado ao EmailJS.',
      en: 'Personal website built with React and Vite, featuring a dark interface, bilingual support and EmailJS contact form.',
    },
    tags: ['React', 'Vite', 'CSS3', 'EmailJS'],
    link: 'https://github.com/Alvarodocxp/Portifolio',
  },
  {
    date: '2026',
    title: { pt: 'Projetos acadêmicos - PUC Minas', en: 'Academic projects - PUC Minas' },
    desc: {
      pt: 'Projetos com CRUD completo e banco de dados, desenvolvidos em equipe com Git, organização por sprints e documentação técnica.',
      en: 'Full CRUD and database projects developed in teams with Git, sprint planning and technical documentation.',
    },
    tags: ['Java', 'Spring Boot', 'SQL', 'Git'],
    link: 'https://github.com/Alvarodocxp',
  },
  {
    date: '2025',
    title: { pt: 'Análise de mercado financeiro', en: 'Financial market analysis' },
    desc: {
      pt: 'Robôs e indicadores para análise do mercado financeiro usando MQL5 na plataforma MetaTrader 5.',
      en: 'Trading robots and indicators for financial market analysis using MQL5 on MetaTrader 5.',
    },
    tags: ['MQL5', 'MetaTrader', 'Finanças'],
    link: '#',
  },
  {
    date: '2024 - 2025',
    title: { pt: 'Jogos e scripts', en: 'Games and scripts' },
    desc: {
      pt: 'Criação de mecânicas de jogos e scripts com Pygame e Lua, explorando automação, estados e interatividade.',
      en: 'Game mechanics and scripts built with Pygame and Lua, exploring automation, states and interactivity.',
    },
    tags: ['Python', 'Pygame', 'Lua'],
    link: '#',
  },
];

const experienceData = [
  {
    icon: 'education',
    title: { pt: 'Engenharia de Software', en: 'Software Engineering' },
    place: { pt: 'PUC Minas - Lourdes', en: 'PUC Minas - Lourdes' },
    date: { pt: 'Fevereiro 2026 - Dezembro 2029', en: 'Feb 2026 - Dec 2029' },
    desc: {
      pt: 'Graduação com foco em desenvolvimento web, arquitetura de software, programação orientada a objetos e boas práticas de engenharia.',
      en: 'Degree focused on web development, software architecture, object-oriented programming and engineering best practices.',
    },
  },
  {
    icon: 'book',
    title: { pt: 'Ensino Médio', en: 'High School' },
    place: { pt: 'Colégio Batista - Alphaville', en: 'Colégio Batista - Alphaville' },
    date: { pt: 'Conclusão: Dezembro 2025', en: 'Completed: Dec 2025' },
    desc: {
      pt: 'Formação com destaque em ciências exatas e participação em projetos extracurriculares de tecnologia.',
      en: 'High school diploma with emphasis on exact sciences and extracurricular technology projects.',
    },
  },
  {
    icon: 'chart',
    title: { pt: 'Mercado financeiro', en: 'Financial market' },
    place: { pt: 'Projetos pessoais', en: 'Personal projects' },
    date: { pt: '2024 - Presente', en: '2024 - Present' },
    desc: {
      pt: 'Desenvolvimento de estratégias algorítmicas, indicadores e robôs de trading com MQL5 para MetaTrader 5.',
      en: 'Algorithmic strategies, indicators and trading bots built with MQL5 for MetaTrader 5.',
    },
  },
  {
    icon: 'code',
    title: { pt: 'Desenvolvimento de jogos', en: 'Game development' },
    place: { pt: 'Projetos pessoais', en: 'Personal projects' },
    date: { pt: '2024 - Presente', en: '2024 - Present' },
    desc: {
      pt: 'Criação de mecânicas e scripts com Python, Pygame e Lua em projetos independentes.',
      en: 'Mechanics and scripts created with Python, Pygame and Lua in independent projects.',
    },
  },
];

const CURRENT_YEAR = new Date().getFullYear();
const CV_URL = `${import.meta.env.BASE_URL}curriculo-alvaro-barbosa.pdf`;
const CONTACT_EMAIL = 'silvaalvarobf@gmail.com';
const skillLinks = {
  java: 'https://www.java.com/',
  python: 'https://www.python.org/',
  cpp: 'https://isocpp.org/',
  cs: 'https://learn.microsoft.com/dotnet/csharp/',
  js: 'https://developer.mozilla.org/docs/Web/JavaScript',
  spring: 'https://spring.io/projects/spring-boot',
  react: 'https://react.dev/',
  vite: 'https://vite.dev/',
  html: 'https://developer.mozilla.org/docs/Web/HTML',
  css: 'https://developer.mozilla.org/docs/Web/CSS',
  mysql: 'https://www.mysql.com/',
  postgres: 'https://www.postgresql.org/',
  mongodb: 'https://www.mongodb.com/',
  git: 'https://git-scm.com/',
  github: 'https://github.com/Alvarodocxp',
  vscode: 'https://code.visualstudio.com/',
};

const globeSkills = SKILL_TOOLS.map((skill) => ({
  ...skill,
  iconUrl: `https://skillicons.dev/icons?i=${skill.id}&theme=dark`,
  link: skillLinks[skill.id] || 'https://skillicons.dev/',
}));

function Icon({ name, size = 18 }) {
  const props = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: '2',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': 'true',
  };

  const icons = {
    mail: (
      <svg {...props}>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </svg>
    ),
    folder: (
      <svg {...props}>
        <path d="M3 7a2 2 0 0 1 2-2h5l2 2h7a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      </svg>
    ),
    bot: (
      <svg {...props}>
        <rect x="5" y="8" width="14" height="10" rx="3" />
        <path d="M12 4v4" />
        <path d="M9 13h.01" />
        <path d="M15 13h.01" />
        <path d="M9 18v2" />
        <path d="M15 18v2" />
      </svg>
    ),
    download: (
      <svg {...props}>
        <path d="M12 3v12" />
        <path d="m7 10 5 5 5-5" />
        <path d="M5 21h14" />
      </svg>
    ),
    eye: (
      <svg {...props}>
        <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
    arrow: (
      <svg {...props}>
        <path d="M5 12h14" />
        <path d="m13 6 6 6-6 6" />
      </svg>
    ),
    education: (
      <svg {...props}>
        <path d="m22 10-10-5-10 5 10 5 10-5Z" />
        <path d="M6 12v5c3 2 9 2 12 0v-5" />
      </svg>
    ),
    book: (
      <svg {...props}>
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15Z" />
      </svg>
    ),
    chart: (
      <svg {...props}>
        <path d="M4 19V5" />
        <path d="M4 19h16" />
        <path d="m7 15 4-4 3 3 5-7" />
      </svg>
    ),
    code: (
      <svg {...props}>
        <path d="m8 9-4 3 4 3" />
        <path d="m16 9 4 3-4 3" />
        <path d="m14 5-4 14" />
      </svg>
    ),
    phone: (
      <svg {...props}>
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.78 19.78 0 0 1 3.08 5.18 2 2 0 0 1 5.06 3h3a2 2 0 0 1 2 1.72c.12.9.33 1.77.62 2.6a2 2 0 0 1-.45 2.11L9 10.66a16 16 0 0 0 4.34 4.34l1.23-1.23a2 2 0 0 1 2.11-.45c.83.29 1.7.5 2.6.62A2 2 0 0 1 22 16.92Z" />
      </svg>
    ),
    mapPin: (
      <svg {...props}>
        <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    send: (
      <svg {...props}>
        <path d="m22 2-7 20-4-9-9-4 20-7Z" />
        <path d="M22 2 11 13" />
      </svg>
    ),
    copy: (
      <svg {...props}>
        <rect x="9" y="9" width="11" height="11" rx="2" />
        <rect x="4" y="4" width="11" height="11" rx="2" />
      </svg>
    ),
  };

  return icons[name] || icons.code;
}

function App() {
  const [lang, setLang] = useState('pt');
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [formStatus, setFormStatus] = useState(null);
  const [isAskOpen, setIsAskOpen] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const formRef = useRef(null);
  const t = content[lang];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.15 }
    );

    document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [lang]);

  const handleNavClick = () => setMenuOpen(false);

  const scrollTo = (id) => {
    handleNavClick();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2500);
    } catch {
      window.location.href = `mailto:${CONTACT_EMAIL}`;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus('sending');

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    const hasKeys =
      serviceId &&
      templateId &&
      publicKey &&
      serviceId !== 'YOUR_SERVICE_ID' &&
      serviceId !== 'seu_service_id_aqui' &&
      !serviceId.includes('YOUR');

    if (!hasKeys) {
      const formData = new FormData(formRef.current);
      const name = formData.get('user_name') || '';
      const email = formData.get('user_email') || '';
      const subject = formData.get('subject') || 'Contato do portfolio';
      const message = formData.get('message') || '';

      const mailtoUrl = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
        `[Portfolio] ${subject} - ${name}`
      )}&body=${encodeURIComponent(`Nome: ${name}\nE-mail: ${email}\n\nMensagem:\n${message}`)}`;

      window.open(mailtoUrl, '_blank');
      setFormStatus('success');
      formRef.current.reset();
      setTimeout(() => setFormStatus(null), 6000);
      return;
    }

    emailjs.sendForm(serviceId, templateId, formRef.current, publicKey).then(
      () => {
        setFormStatus('success');
        formRef.current.reset();
        setTimeout(() => setFormStatus(null), 5000);
      },
      (error) => {
        console.error('EmailJS error:', error);
        setFormStatus('error');
        setTimeout(() => setFormStatus(null), 7000);
      }
    );
  };

  return (
    <>
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`} id="navbar">
        <button className="navbar-logo" onClick={() => scrollTo('hero')} aria-label="Ir para o início">
          <span>AB</span>
        </button>

        <div className={`navbar-links${menuOpen ? ' open' : ''}`}>
          <a href="#sobre" onClick={() => scrollTo('sobre')}>{t.nav.about}</a>
          <a href="#projetos" onClick={() => scrollTo('projetos')}>{t.nav.projects}</a>
          <a href="#experiencias" onClick={() => scrollTo('experiencias')}>{t.nav.experience}</a>
          <a href="#contato" onClick={() => scrollTo('contato')}>{t.nav.contact}</a>

          <button
            className="ask-nav-btn"
            onClick={() => {
              handleNavClick();
              setIsAskOpen(true);
            }}
          >
            <Icon name="bot" size={16} />
            {t.nav.ask}
          </button>

          <div className="lang-toggle" aria-label="Selecionar idioma">
            <button className={`lang-btn${lang === 'pt' ? ' active' : ''}`} onClick={() => setLang('pt')}>PT</button>
            <button className={`lang-btn${lang === 'en' ? ' active' : ''}`} onClick={() => setLang('en')}>EN</button>
          </div>
        </div>

        <button className={`hamburger${menuOpen ? ' open' : ''}`} onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          <span />
          <span />
          <span />
        </button>
      </nav>

      <section className="hero" id="hero">
        <div className="hero-content">
          <div className="hero-text">
            <div className="hero-badge">
              <span className="dot" />
              {t.hero.badge}
            </div>
            <h1>
              {t.hero.greeting}
              <span>{t.hero.name}</span>
            </h1>
            <p className="hero-subtitle">{t.hero.subtitle}</p>

            <div className="hero-actions">
              <button className="btn-primary" onClick={() => scrollTo('contato')}>
                <Icon name="mail" />
                {t.hero.cta}
              </button>
              <button className="btn-secondary" onClick={() => scrollTo('projetos')}>
                <Icon name="folder" />
                {t.hero.ctaSecondary}
              </button>
              <button className="btn-quiet" onClick={() => setIsAskOpen(true)}>
                <Icon name="bot" />
                {t.hero.ask}
              </button>
            </div>

            <div className="hero-socials" aria-label="Links sociais">
              <a href="https://github.com/Alvarodocxp" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="GitHub">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .5A12 12 0 0 0 8.2 23.9c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.4-4-1.4-.5-1.3-1.3-1.7-1.3-1.7-1.1-.8.1-.8.1-.8 1.2.1 1.9 1.3 1.9 1.3 1.1 1.9 2.9 1.3 3.6 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.6.1-3.2 0 0 1-.3 3.3 1.2a11.3 11.3 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.6.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .5Z" /></svg>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.45 20.45h-3.56v-5.57c0-1.33 0-3.04-1.85-3.04s-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05a3.74 3.74 0 0 1 3.37-1.85c3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13Zm1.78 13.02H3.56V9h3.56v11.45ZM22.23 0H1.77C.8 0 0 .77 0 1.73v20.54C0 23.23.8 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.73V1.73C24 .77 23.2 0 22.23 0Z" /></svg>
              </a>
              <a href="https://wa.me/5531996946632" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="WhatsApp">
                <Icon name="phone" size={20} />
              </a>
              <a href={`mailto:${CONTACT_EMAIL}`} className="social-link" aria-label="Email">
                <Icon name="mail" size={20} />
              </a>
            </div>
          </div>

          <div className="hero-portrait" aria-hidden="true">
            <div className="portrait-frame">
              <img src="https://github.com/Alvarodocxp.png" alt="Álvaro Barbosa" className="hero-avatar" />
            </div>
            <div className="portrait-card">
              <span>Software Engineering</span>
              <strong>PUC Minas</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-contrast" id="sobre">
        <div className="section-inner">
          <div className="section-header fade-in">
            <p className="section-label">{t.about.label}</p>
            <h2 className="section-title">{t.about.title}</h2>
            <p className="section-desc">{t.about.desc}</p>
          </div>

          <div className="about-grid">
            <div className="resume-panel fade-in">
              <div className="resume-document">
                <span className="resume-mark">PDF</span>
                <div>
                  <h3>{t.about.resumeTitle}</h3>
                  <p>{t.about.resumeMeta}</p>
                </div>
              </div>
              <p className="resume-note">{t.about.resumeNote}</p>
              <div className="about-actions">
                <a href={CV_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">
                  <Icon name="eye" />
                  {t.about.viewCv}
                </a>
                <a href={CV_URL} download="Curriculo_Alvaro_Barbosa.pdf" className="btn-secondary">
                  <Icon name="download" />
                  {t.about.downloadCv}
                </a>
              </div>
            </div>

            <div className="about-tech-side fade-in">
              <Suspense fallback={<div className="skills-globe-loading">Carregando tecnologias...</div>}>
                <SkillsGlobe skills={globeSkills} lang={lang} />
              </Suspense>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="projetos">
        <div className="section-inner">
          <div className="section-header fade-in">
            <p className="section-label">{t.projects.label}</p>
            <h2 className="section-title">{t.projects.title}</h2>
            <p className="section-desc">{t.projects.desc}</p>
          </div>

          <div className="timeline fade-in">
            {projectsData.map((project) => (
              <article className="timeline-item" key={`${project.date}-${project.title.pt}`}>
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
                      {lang === 'pt' ? 'Ver no GitHub' : 'View on GitHub'}
                      <Icon name="arrow" size={16} />
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-contrast" id="experiencias">
        <div className="section-inner">
          <div className="section-header fade-in">
            <p className="section-label">{t.experience.label}</p>
            <h2 className="section-title">{t.experience.title}</h2>
          </div>

          <div className="experience-grid fade-in">
            {experienceData.map((exp) => (
              <article className="exp-card" key={`${exp.title.pt}-${exp.date.pt}`}>
                <div className="exp-icon"><Icon name={exp.icon} size={22} /></div>
                <h3>{exp.title[lang]}</h3>
                <p className="exp-place">{exp.place[lang]}</p>
                <p className="exp-date">{exp.date[lang]}</p>
                <p>{exp.desc[lang]}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="contato">
        <div className="section-inner">
          <div className="section-header contact-heading fade-in">
            <p className="section-label">{t.contact.label}</p>
            <h2 className="section-title">{t.contact.title}</h2>
            <p className="section-desc">{t.contact.desc}</p>
          </div>

          <div className="contact-grid">
            <aside className="contact-info fade-in">
              <a className="contact-item" href="tel:+5531996946632">
                <div className="contact-icon"><Icon name="phone" size={20} /></div>
                <div className="contact-item-info">
                  <h4>{t.contact.phone}</h4>
                  <span>(31) 99694-6632</span>
                </div>
              </a>
              <a className="contact-item" href={`mailto:${CONTACT_EMAIL}`}>
                <div className="contact-icon"><Icon name="mail" size={20} /></div>
                <div className="contact-item-info">
                  <h4>{t.contact.emailLabel}</h4>
                  <span>{CONTACT_EMAIL}</span>
                </div>
              </a>
              <div className="contact-item">
                <div className="contact-icon"><Icon name="mapPin" size={20} /></div>
                <div className="contact-item-info">
                  <h4>{t.contact.location}</h4>
                  <span>Nova Lima, Alphaville - MG</span>
                </div>
              </div>
              <div className="contact-actions">
                <button type="button" className="contact-mini-btn" onClick={copyEmail}>
                  <Icon name="copy" size={16} />
                  {copiedEmail ? t.contact.copied : t.contact.copyEmail}
                </button>
                <a className="contact-mini-btn" href={`mailto:${CONTACT_EMAIL}`}>
                  <Icon name="mail" size={16} />
                  {t.contact.directEmail}
                </a>
              </div>
            </aside>

            <form className="contact-form fade-in" ref={formRef} onSubmit={handleSubmit}>
              <div className="form-heading">
                <h3>{t.contact.formTitle}</h3>
                <p>{t.contact.formSubtitle}</p>
              </div>

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
                <Icon name="send" />
                {formStatus === 'sending' ? t.contact.sending : t.contact.send}
              </button>

              {formStatus === 'success' && <div className="form-status success">{t.contact.success}</div>}
              {formStatus === 'error' && (
                <div className="form-status error">
                  {t.contact.error}{' '}
                  <a href={`mailto:${CONTACT_EMAIL}`}>{t.contact.directEmail}</a>
                </div>
              )}
            </form>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-links">
            <a href="#sobre" onClick={() => scrollTo('sobre')}>{t.nav.about}</a>
            <a href="#projetos" onClick={() => scrollTo('projetos')}>{t.nav.projects}</a>
            <a href="#experiencias" onClick={() => scrollTo('experiencias')}>{t.nav.experience}</a>
            <a href="#contato" onClick={() => scrollTo('contato')}>{t.nav.contact}</a>
          </div>
          <p className="footer-copy">
            © {CURRENT_YEAR} - {t.footer.copy} <span>Álvaro Barbosa</span>. {t.footer.rights}
          </p>
        </div>
      </footer>

      <button
        className="ask-floating-fab"
        onClick={() => setIsAskOpen(true)}
        aria-label="Abrir assistente virtual do Álvaro"
      >
        <img src="https://github.com/Alvarodocxp.png" alt="Álvaro" className="ask-fab-avatar" />
        <div className="ask-fab-content">
          <span className="ask-fab-title">
            Ask Álvaro <span className="ask-fab-badge">IA</span>
          </span>
          <span className="ask-fab-sub">
            {lang === 'pt' ? 'Tire dúvidas sobre mim' : 'Ask questions about me'}
          </span>
        </div>
      </button>

      <AskModal isOpen={isAskOpen} onClose={() => setIsAskOpen(false)} lang={lang} />
    </>
  );
}

export default App;
