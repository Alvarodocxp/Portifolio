// Base de conhecimento e dados do Álvaro Barbosa extraídos do Currículo em PDF
export const RESUME_DATA = {
  nome: "Álvaro Barbosa",
  titulo: "Estudante de Engenharia de Software | Desenvolvedor",
  localizacao: "Nova Lima, Alphaville - MG",
  telefone: "(31) 99694-6632",
  email: "silvaalvarobf@gmail.com",
  linkedin: "https://www.linkedin.com/in/álvaro-barbosa",
  github: "https://github.com/Alvarodocxp",
  
  // Dados acadêmicos e perfil (do PDF)
  curso: "Engenharia de Software",
  instituicao: "PUC Minas — Campus Lourdes",
  periodo: "2º período",
  inicioGraduacao: "Fevereiro de 2026",
  previsaoConclusao: "Dezembro de 2029",
  ensinoMedio: "Colégio Batista, Alphaville (Conclusão: Dezembro de 2025)",
  
  // Objetivo profissional (do PDF)
  objetivo: "Busco meu primeiro estágio em desenvolvimento para contribuir com a equipe, aplicar meus conhecimentos e desenvolver novas habilidades.",
  disponibilidade: "Disponibilidade para estagiar pela manhã ou à tarde",
  cnh: "CNH categoria B",
  
  // Habilidades categorizadas (do PDF)
  habilidades: {
    linguagens: ["Java", "Python", "C++", "C#"],
    webFrameworks: ["Spring Boot", "Thymeleaf", "React", "HTML/CSS"],
    bancosDeDados: ["SQL (MySQL, PostgreSQL)", "NoSQL (MongoDB)"],
    ferramentas: ["Git/GitHub", "MQL5"],
    idiomas: ["Português (nativo)", "Inglês (avançado)"]
  },

  // Experiências práticas (do PDF)
  experiencias: [
    {
      titulo: "Projetos Acadêmicos de Software",
      descricao: "Participação em projetos acadêmicos de desenvolvimento de software utilizando Java, Python e C#."
    },
    {
      titulo: "Aplicações CRUD com Banco de Dados",
      descricao: "Desenvolvimento de aplicações com cadastro, consulta, atualização e exclusão de dados (CRUD), integradas a bancos de dados relacionais e não-relacionais."
    },
    {
      titulo: "Desenvolvimento Web em Equipe",
      descricao: "Participação no desenvolvimento de soluções web em equipe com controle de versões (Git) e organização das atividades em sprints ágeis."
    },
    {
      titulo: "Projetos Pessoais: Jogos e Mercado Financeiro",
      descricao: "Desenvolvimento de jogos independentes (Pygame/Lua) e ferramentas de análise de mercado financeiro / robôs de trading (MQL5 no MetaTrader 5)."
    }
  ]
};

// Mapeamento das ferramentas para a API SkillIcons (https://skillicons.dev)
export const SKILL_TOOLS = [
  // Linguagens
  { id: 'java', name: 'Java', category: 'languages', desc: 'POO, APIs e desenvolvimento acadêmico na PUC Minas' },
  { id: 'python', name: 'Python', category: 'languages', desc: 'Scripts, análise de dados e desenvolvimento de jogos' },
  { id: 'cpp', name: 'C++', category: 'languages', desc: 'Lógica e fundamentos de sistemas' },
  { id: 'cs', name: 'C#', category: 'languages', desc: 'Projetos acadêmicos e aplicações desktop/jogos' },
  { id: 'js', name: 'JavaScript', category: 'languages', desc: 'Desenvolvimento interativo web e front-end' },
  
  // Web & Frameworks
  { id: 'spring', name: 'Spring Boot', category: 'web', desc: 'Back-end robusto, arquitetura MVC e APIs REST' },
  { id: 'react', name: 'React', category: 'web', desc: 'Criação de interfaces web modernas e reativas' },
  { id: 'vite', name: 'Vite', category: 'web', desc: 'Build tool rápida para aplicações web modernas' },
  { id: 'html', name: 'HTML5', category: 'web', desc: 'Estruturação semântica e acessível' },
  { id: 'css', name: 'CSS3', category: 'web', desc: 'Estilização moderna, responsividade e animações' },
  
  // Bancos de Dados
  { id: 'mysql', name: 'MySQL', category: 'database', desc: 'Modelagem relacional e consultas SQL' },
  { id: 'postgres', name: 'PostgreSQL', category: 'database', desc: 'Banco de dados relacional avançado' },
  { id: 'mongodb', name: 'MongoDB', category: 'database', desc: 'Banco NoSQL orientado a documentos' },
  
  // Ferramentas
  { id: 'git', name: 'Git', category: 'tools', desc: 'Controle de versão de código em equipe' },
  { id: 'github', name: 'GitHub', category: 'tools', desc: 'Hospedagem de repositórios e colaboração' },
  { id: 'vscode', name: 'VS Code', category: 'tools', desc: 'Editor de código principal e ambiente de desenvolvimento' }
];

// Perguntas sugeridas e base de conhecimento para o ASK em 1ª pessoa
export const ASK_KNOWLEDGE_BASE = {
  pt: {
    sugestoes: [
      "Qual o seu objetivo profissional?",
      "Qual o seu curso e período na PUC Minas?",
      "Quais tecnologias você mais domina?",
      "Qual a sua disponibilidade para estágio?",
      "Como você aplica Java e Spring Boot?",
      "O que você faz com MQL5 e mercado financeiro?",
      "Como posso entrar em contato com você?"
    ],
    respostas: [
      {
        gatilhos: ["objetivo", "estagio", "estágio", "oportunidade", "trabalhar", "vaga", "contratar", "perfil"],
        resposta: "Estou no 2º período de Engenharia de Software na PUC Minas (Lourdes) e busco ativamente meu **primeiro estágio em desenvolvimento de software**! Meu objetivo é contribuir com a equipe, colocar em prática minha experiência acadêmica (Java, Spring, Python, SQL) e evoluir junto com profissionais experientes. Tenho disponibilidade para estagiar pela **manhã ou à tarde** e possuo CNH categoria B."
      },
      {
        gatilhos: ["curso", "faculdade", "puc", "puc minas", "graduacao", "estudo", "periodo", "período", "educacao", "educação"],
        resposta: "Estudo **Engenharia de Software na PUC Minas (Campus Lourdes)**, atualmente no **2º período** (iniciei em fevereiro de 2026, com previsão de formatura em dezembro de 2029). Concluí o ensino médio no Colégio Batista em Alphaville no final de 2025."
      },
      {
        gatilhos: ["disponibilidade", "horario", "horário", "turno", "cnh", "manhã", "tarde"],
        resposta: "Tenho disponibilidade para estagiar **pela manhã ou à tarde**. Além disso, moro na região de Nova Lima / Alphaville e possuo **CNH categoria B**."
      },
      {
        gatilhos: ["tecnologia", "tecnologias", "linguagem", "linguagens", "skills", "ferramentas", "stack"],
        resposta: "Minhas principais ferramentas são:\n- **Linguagens**: Java, Python, C++, C# e JavaScript\n- **Web & Frameworks**: Spring Boot, Thymeleaf, React, HTML/CSS\n- **Bancos de Dados**: SQL (MySQL, PostgreSQL) e NoSQL (MongoDB)\n- **Ferramentas**: Git/GitHub e MQL5\n\nVocê pode conferir o mapa visual interativo dessas ferramentas na seção **Sobre Mim**!"
      },
      {
        gatilhos: ["java", "spring", "spring boot", "backend", "back-end", "api", "crud"],
        resposta: "Tenho forte foco acadêmico em **Java com Spring Boot**, desenvolvendo aplicações web com operações CRUD completas, integração com bancos de dados relacionais (MySQL/PostgreSQL) e controle de versão via Git em sprints."
      },
      {
        gatilhos: ["mql5", "mercadofinanceiro", "mercado financeiro", "metatrader", "robo", "robô", "trading", "quant"],
        resposta: "Desenvolvo robôs e ferramentas de análise quantitativa utilizando a linguagem **MQL5 na plataforma MetaTrader 5**. É uma área onde aplico lógica algorítmica, matemática e gestão de risco para automação de estratégias."
      },
      {
        gatilhos: ["jogo", "jogos", "pygame", "game", "games", "lua"],
        resposta: "Tenho experiência prática no desenvolvimento de jogos independentes e scripts interativos utilizando **Python (Pygame)** e **Lua**, trabalhando mecânicas, automações e lógica interativa."
      },
      {
        gatilhos: ["contato", "falar", "email", "whatsapp", "telefone", "linkedin", "mensagem"],
        resposta: "Você pode falar comigo diretamente:\n- **WhatsApp / Telefone**: (31) 99694-6632\n- **E-mail**: silvaalvarobf@gmail.com\n- **LinkedIn**: [linkedin.com/in/álvaro-barbosa](https://linkedin.com)\n- **GitHub**: [github.com/Alvarodocxp](https://github.com/Alvarodocxp)\n\nFique à vontade para me mandar uma mensagem!"
      },
      {
        gatilhos: ["ingles", "inglês", "idioma", "idiomas", "languages"],
        resposta: "Falo **Português nativo** e tenho **Inglês em nível avançado**, capacitado para ler documentações técnicas, escrever código em padrão internacional e me comunicar profissionalmente."
      }
    ],
    padrao: "Olá! Sou o Álvaro (ou melhor, meu assistente virtual baseado no meu currículo). Você pode me perguntar sobre minha **faculdade na PUC Minas**, **linguagens que domino** (Java, Python, C++, etc.), meus **projetos** ou minha **busca por estágio**. Caso queira bater um papo direto, você pode me chamar no WhatsApp (31) 99694-6632 ou pelo e-mail silvaalvarobf@gmail.com!"
  },
  en: {
    sugestoes: [
      "What is your career goal?",
      "Which college and semester are you in?",
      "What are your core technologies?",
      "What is your internship availability?",
      "How do you use Java and Spring Boot?",
      "What do you do with MQL5 and financial markets?",
      "How can I contact you?"
    ],
    respostas: [
      {
        gatilhos: ["goal", "internship", "job", "career", "hire", "opportunity"],
        resposta: "I am a 2nd-semester Software Engineering student at PUC Minas (Lourdes) actively seeking my **first software development internship**! My goal is to add value to the team, apply my academic knowledge (Java, Spring, Python, SQL) and grow alongside experienced developers. I have availability to intern in the **morning or afternoon** and hold a valid driver's license (CNH B)."
      },
      {
        gatilhos: ["college", "university", "puc", "degree", "semester", "education"],
        resposta: "I study **Software Engineering at PUC Minas (Lourdes campus)**, currently in my **2nd semester** (started Feb 2026, expected graduation in Dec 2029). I graduated high school from Colégio Batista in Alphaville in December 2025."
      },
      {
        gatilhos: ["technologies", "tech", "skills", "languages", "stack", "tools"],
        resposta: "My primary tech stack includes:\n- **Languages**: Java, Python, C++, C#, JavaScript\n- **Web & Frameworks**: Spring Boot, Thymeleaf, React, HTML/CSS\n- **Databases**: SQL (MySQL, PostgreSQL) & NoSQL (MongoDB)\n- **Tools**: Git/GitHub and MQL5\n\nYou can explore an interactive tool map in the **About Me** section!"
      },
      {
        gatilhos: ["contact", "email", "phone", "whatsapp", "reach", "linkedin"],
        resposta: "You can reach me directly via:\n- **WhatsApp / Phone**: +55 (31) 99694-6632\n- **Email**: silvaalvarobf@gmail.com\n- **LinkedIn**: [linkedin.com/in/álvaro-barbosa](https://linkedin.com)\n- **GitHub**: [github.com/Alvarodocxp](https://github.com/Alvarodocxp)"
      }
    ],
    padrao: "Hi! I'm Álvaro's virtual assistant based on his official resume. Feel free to ask about my **Software Engineering degree at PUC Minas**, **internship availability**, **tech stack** (Java, Spring, Python, SQL) or **projects**!"
  }
};
