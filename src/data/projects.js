// Project dates and descriptions are based on their public repository history.
// Runtime captures are stored locally so the timeline does not depend on GitHub images.
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
      pt: "Interface de uma comunidade para compartilhar recomendações de filmes e séries. Um projeto acadêmico para praticar HTML semântico, organização de conteúdo e estilização com CSS.",
      en: "An interface for a community that shares film and series recommendations. An academic project to practise semantic HTML, content organisation and CSS styling.",
    },
    highlights: {
      pt: [
        "Tela de acesso com campos de e-mail e senha",
        "Feed com cards de recomendações",
        "Estrutura de cabeçalho, conteúdo e rodapé",
      ],
      en: [
        "Sign-in screen with email and password fields",
        "Recommendation cards in a feed",
        "Header, main content and footer structure",
      ],
    },
    technologies: ["HTML5", "CSS3"],
    repository: "https://github.com/Alvarodocxp/Semana-5-atividade",
    documentation: "https://github.com/Alvarodocxp/Semana-5-atividade#readme",
    media: [
      {
        src: "media/cine-login.png",
        label: { pt: "Acesso", en: "Sign in" },
        alt: {
          pt: "Tela real de acesso do CineRecomendação, com campos de e-mail e senha em tema escuro.",
          en: "Actual CineRecomendação sign-in screen, with email and password fields in a dark theme.",
        },
        caption: {
          pt: "Captura da interface publicada no README do projeto.",
          en: "Interface capture published in the project README.",
        },
      },
      {
        src: "media/cine-feed.png",
        label: { pt: "Recomendações", en: "Recommendations" },
        alt: {
          pt: "Tela real do CineRecomendação com o feed de recomendações de filmes e séries.",
          en: "Actual CineRecomendação screen showing the film and series recommendation feed.",
        },
        caption: {
          pt: "Captura do feed publicada no README do projeto.",
          en: "Feed capture published in the project README.",
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
      pt: "Aplicação acadêmica com autenticação, cadastro e recuperação de senha. Combina interfaces com Thymeleaf, controle de acesso com Spring Security e persistência de usuários no banco H2.",
      en: "An academic application with authentication, registration and password recovery. It combines Thymeleaf interfaces, access control with Spring Security and user persistence in H2.",
    },
    highlights: {
      pt: [
        "Cadastro e autenticação de usuários",
        "Área restrita e gerenciamento de sessão",
        "Recuperação de senha com tokens",
      ],
      en: [
        "User registration and authentication",
        "Restricted area and session management",
        "Token-based password recovery",
      ],
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
    documentation:
      "https://github.com/Alvarodocxp/Semana-2-Diaw/blob/main/Atividade2/README.md",
    media: [
      {
        src: "media/auth-login.png",
        label: { pt: "Login", en: "Sign in" },
        alt: {
          pt: "Tela de login do projeto real de autenticação com Spring Boot e Thymeleaf em execução.",
          en: "Sign-in screen of the actual Spring Boot and Thymeleaf authentication project running locally.",
        },
        caption: {
          pt: "Login capturado com Spring Boot e H2 em execução local.",
          en: "Sign-in captured with Spring Boot and H2 running locally.",
        },
      },
      {
        src: "media/auth-register.png",
        label: { pt: "Cadastro", en: "Registration" },
        alt: {
          pt: "Tela de cadastro do projeto real de autenticação com campos de nome, usuário, e-mail e senha.",
          en: "Actual authentication project registration screen with name, username, email and password fields.",
        },
        caption: {
          pt: "Cadastro capturado com a aplicação Java em execução.",
          en: "Registration captured while the Java application was running.",
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
      pt: "Este portfólio reúne minha apresentação, projetos e trajetória em páginas próprias. Desenvolvido com React e Vite, tem conteúdo em português e inglês, identidade visual compartilhada e contato integrado ao EmailJS.",
      en: "This portfolio brings together my introduction, projects and journey on dedicated pages. Built with React and Vite, it features Portuguese and English content, a shared visual identity and EmailJS contact integration.",
    },
    highlights: {
      pt: [
        "Páginas com navegação independente",
        "Conteúdo bilíngue e layout responsivo",
        "Formulário de contato e currículo em PDF",
      ],
      en: [
        "Pages with independent navigation",
        "Bilingual content and responsive layout",
        "Contact form and PDF resume",
      ],
    },
    technologies: ["React", "Vite", "React Router", "CSS3", "EmailJS"],
    repository: "https://github.com/Alvarodocxp/Portifolio",
    documentation: "https://github.com/Alvarodocxp/Portifolio#readme",
    media: [
      {
        src: "media/portfolio-desktop.png",
        label: { pt: "Sobre mim", en: "About me" },
        alt: {
          pt: "Captura real da página Sobre mim deste portfólio, com apresentação e tecnologias.",
          en: "Actual capture of this portfolio’s About me page, featuring the introduction and technologies.",
        },
        caption: {
          pt: "Página Sobre mim capturada com a aplicação em execução.",
          en: "About me page captured while the application was running.",
        },
      },
      {
        src: "media/portfolio-contact.png",
        label: { pt: "Contato", en: "Contact" },
        alt: {
          pt: "Captura real da página Contato deste portfólio, com canais de contato e formulário.",
          en: "Actual capture of this portfolio’s Contact page, featuring contact channels and a form.",
        },
        caption: {
          pt: "Página Contato capturada com a aplicação em execução.",
          en: "Contact page captured while the application was running.",
        },
      },
    ],
  },
];

// The user confirmed this collaboration. Its public reference does not provide
// a calendar date, so it stays outside the chronological timeline above.
export const COLLABORATIVE_PROJECTS = [
  {
    id: "castle-defenders",
    title: "Castle Defenders",
    description: {
      pt: "Jogo desenvolvido em colaboração com Rafael Gomes durante o primeiro semestre de Engenharia de Software. O projeto combina Python e Pygame com uma identidade visual em pixel art.",
      en: "A game developed in collaboration with Rafael Gomes during the first semester of Software Engineering. The project combines Python and Pygame with a pixel-art visual identity.",
    },
    technologies: ["Python", "Pygame", "Aseprite", "Pixel art"],
    collaborator: "Rafael Gomes",
    collaboratorUrl: "https://github.com/rafaelgomes77oliveira-ux",
    reference:
      "https://github.com/rafaelgomes77oliveira-ux/Portfolio/blob/main/Portfolio/src/data/portfolioData.js",
    repositoryStatus: {
      pt: "O link do repositório do jogo está indisponível para acesso público.",
      en: "The game repository link is currently unavailable for public access.",
    },
  },
];
