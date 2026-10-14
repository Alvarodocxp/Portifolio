export const PROJECT_FILTERS = [
  { id: "all", label: { pt: "Todos", en: "All" } },
  { id: "frontend", label: { pt: "Front-end", en: "Frontend" } },
  { id: "fullstack", label: { pt: "Full stack", en: "Full stack" } },
];

export const PROJECTS = [
  {
    id: "cine-recomendacao",
    date: "2026-03-22",
    category: "frontend",
    title: { pt: "CineRecomendação", en: "CineRecomendação" },
    description: {
      pt: "Interface acadêmica para compartilhar recomendações de filmes e séries, com tela de acesso e feed de cards.",
      en: "An academic interface for sharing film and series recommendations, with a sign-in screen and card feed.",
    },
    technologies: ["HTML5", "CSS3"],
    repository: "https://github.com/Alvarodocxp/Semana-5-atividade",
    media: [
      {
        src: "media/cine-login.png",
        label: { pt: "Acesso", en: "Sign in" },
        alt: {
          pt: "Tela real de acesso do CineRecomendação, com campos de e-mail e senha em tema escuro.",
          en: "Actual CineRecomendação sign-in screen, with email and password fields in a dark theme.",
        },
      },
      {
        src: "media/cine-feed.png",
        label: { pt: "Recomendações", en: "Recommendations" },
        alt: {
          pt: "Tela real do CineRecomendação com o feed de recomendações de filmes e séries.",
          en: "Actual CineRecomendação screen showing the film and series recommendation feed.",
        },
      },
    ],
  },
  {
    id: "secure-login",
    date: "2026-09-14",
    category: "fullstack",
    title: {
      pt: "Autenticação com Spring Boot",
      en: "Spring Boot authentication",
    },
    description: {
      pt: "Aplicação acadêmica com cadastro, autenticação e recuperação de senha. Usa Spring Security para controle de acesso e H2 para persistência.",
      en: "An academic app with registration, authentication and password recovery. It uses Spring Security for access control and H2 for persistence.",
    },
    technologies: [
      "Java",
      "Spring Boot",
      "Spring Security",
      "Thymeleaf",
      "JPA",
      "H2",
      "Gradle",
    ],
    repository: "https://github.com/Alvarodocxp/Semana-2-Diaw",
    media: [
      {
        src: "media/auth-login.png",
        label: { pt: "Login", en: "Sign in" },
        alt: {
          pt: "Tela de login do projeto real de autenticação com Spring Boot e Thymeleaf em execução.",
          en: "Sign-in screen of the actual Spring Boot and Thymeleaf authentication project running locally.",
        },
      },
      {
        src: "media/auth-register.png",
        label: { pt: "Cadastro", en: "Registration" },
        alt: {
          pt: "Tela de cadastro do projeto real de autenticação com campos de nome, usuário, e-mail e senha.",
          en: "Actual authentication project registration screen with name, username, email and password fields.",
        },
      },
    ],
  },
  {
    id: "portfolio",
    date: "2026-10-07",
    category: "frontend",
    title: { pt: "Portfólio profissional", en: "Professional portfolio" },
    description: {
      pt: "Portfólio bilíngue com páginas próprias, layout responsivo, currículo em PDF e formulário de contato.",
      en: "A bilingual portfolio with dedicated pages, a responsive layout, a PDF resume and a contact form.",
    },
    technologies: ["React", "Vite", "React Router", "CSS3", "EmailJS"],
    repository: "https://github.com/Alvarodocxp/Portifolio",
    media: [
      {
        src: "media/portfolio-desktop.png",
        label: { pt: "Sobre mim", en: "About me" },
        alt: {
          pt: "Captura real da página Sobre mim deste portfólio, com apresentação e tecnologias.",
          en: "Actual capture of this portfolio’s About me page, featuring the introduction and technologies.",
        },
      },
      {
        src: "media/portfolio-contact.png",
        label: { pt: "Contato", en: "Contact" },
        alt: {
          pt: "Captura real da página Contato deste portfólio, com canais de contato e formulário.",
          en: "Actual capture of this portfolio’s Contact page, featuring contact channels and a form.",
        },
      },
    ],
  },
];

export const COLLABORATIVE_PROJECTS = [
  {
    id: "castle-defenders",
    title: "Castle Defenders",
    description: {
      pt: "Jogo em pixel art desenvolvido com Rafael Gomes no primeiro semestre de Engenharia de Software.",
      en: "A pixel-art game developed with Rafael Gomes during the first semester of Software Engineering.",
    },
    technologies: ["Python", "Pygame", "Aseprite", "Pixel art"],
    collaborator: "Rafael Gomes",
    collaboratorUrl: "https://github.com/rafaelgomes77oliveira-ux",
    reference:
      "https://github.com/rafaelgomes77oliveira-ux/Portfolio/blob/main/Portfolio/src/data/portfolioData.js",
    repositoryStatus: {
      pt: "Repositório indisponível para acesso público.",
      en: "Repository currently unavailable for public access.",
    },
  },
];
