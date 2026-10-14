export const RESUME_DATA = {
  nome: 'Álvaro Barbosa',
  titulo: 'Estudante de Engenharia de Software | Desenvolvedor',
  localizacao: 'Nova Lima, Alphaville - MG',
  telefone: '(31) 99694-6632',
  email: 'silvaalvarobf@gmail.com',
  linkedin: 'https://www.linkedin.com/in/alvarobarbosaengenhariasoftware/',
  github: 'https://github.com/Alvarodocxp',

  curso: 'Engenharia de Software',
  instituicao: 'PUC Minas - Campus Lourdes',
  periodo: '2º período',
  inicioGraduacao: 'Fevereiro de 2026',
  previsaoConclusao: 'Dezembro de 2029',
  ensinoMedio: 'Colégio Batista, Alphaville (Conclusão: Dezembro de 2025)',

  objetivo:
    'Busco meu primeiro estágio em desenvolvimento para contribuir com a equipe, aplicar meus conhecimentos e desenvolver novas habilidades.',
  disponibilidade: 'Disponibilidade para estagiar pela manhã ou à tarde',
  cnh: 'CNH categoria B',

  habilidades: {
    linguagens: ['Java', 'Python', 'C++', 'C#', 'JavaScript'],
    webFrameworks: ['Spring Boot', 'Thymeleaf', 'React', 'HTML/CSS', 'Vite'],
    bancosDeDados: ['SQL (MySQL, PostgreSQL)', 'NoSQL (MongoDB)'],
    ferramentas: ['Git/GitHub', 'MQL5', 'VS Code'],
    idiomas: ['Português nativo', 'Inglês avançado'],
  },

  experiencias: [
    {
      titulo: 'Projetos acadêmicos de software',
      descricao:
        'Participação em projetos acadêmicos de desenvolvimento utilizando Java, Python e C#.',
    },
    {
      titulo: 'Aplicações CRUD com banco de dados',
      descricao:
        'Desenvolvimento de aplicações com cadastro, consulta, atualização e exclusão de dados, integradas a bancos relacionais e não relacionais.',
    },
    {
      titulo: 'Desenvolvimento web em equipe',
      descricao:
        'Participação em soluções web com controle de versão usando Git e organização das atividades em sprints.',
    },
    {
      titulo: 'Jogos e mercado financeiro',
      descricao:
        'Desenvolvimento de jogos independentes com Pygame/Lua e ferramentas de análise de mercado financeiro com MQL5.',
    },
  ],
};

export const SKILL_TOOLS = [
  { id: 'java', name: 'Java', category: 'languages', desc: 'POO, APIs e desenvolvimento acadêmico na PUC Minas.' },
  { id: 'python', name: 'Python', category: 'languages', desc: 'Scripts, automação, dados e jogos com Pygame.' },
  { id: 'cpp', name: 'C++', category: 'languages', desc: 'Lógica, estruturas de dados e fundamentos de sistemas.' },
  { id: 'cs', name: 'C#', category: 'languages', desc: 'Projetos acadêmicos, aplicações desktop e jogos.' },
  { id: 'js', name: 'JavaScript', category: 'languages', desc: 'Interatividade, front-end moderno e integração web.' },

  { id: 'spring', name: 'Spring Boot', category: 'web', desc: 'Back-end, arquitetura MVC, APIs REST e CRUD.' },
  { id: 'react', name: 'React', category: 'web', desc: 'Interfaces web componentizadas, responsivas e reativas.' },
  { id: 'vite', name: 'Vite', category: 'web', desc: 'Ambiente rápido para aplicações web modernas.' },
  { id: 'html', name: 'HTML5', category: 'web', desc: 'Estrutura semântica para interfaces acessíveis.' },
  { id: 'css', name: 'CSS3', category: 'web', desc: 'Responsividade, layout, estados e animações.' },

  { id: 'mysql', name: 'MySQL', category: 'database', desc: 'Modelagem relacional, consultas SQL e CRUD.' },
  { id: 'postgres', name: 'PostgreSQL', category: 'database', desc: 'Banco relacional para dados estruturados.' },
  { id: 'mongodb', name: 'MongoDB', category: 'database', desc: 'Banco NoSQL orientado a documentos.' },

  { id: 'git', name: 'Git', category: 'tools', desc: 'Controle de versão, branches e colaboração em equipe.' },
  { id: 'github', name: 'GitHub', category: 'tools', desc: 'Repositórios, pull requests e organização de projetos.' },
  { id: 'vscode', name: 'VS Code', category: 'tools', desc: 'Editor principal para desenvolvimento e estudos.' },
];

export const INTENTS_PT = [
  {
    gatilhos: ['objetivo', 'estagio', 'estágio', 'oportunidade', 'trabalhar', 'vaga', 'contratar', 'perfil', 'busca', 'procura'],
    resposta:
      'Estou no 2º período de Engenharia de Software na PUC Minas e busco meu **primeiro estágio em desenvolvimento de software**. Quero contribuir com o time, aplicar minha base em programação, banco de dados e web, e evoluir com profissionais experientes. Tenho disponibilidade pela **manhã ou à tarde**.',
  },
  {
    gatilhos: ['curso', 'faculdade', 'puc', 'puc minas', 'graduacao', 'graduação', 'estudo', 'periodo', 'período', 'educacao', 'educação', 'semestre'],
    resposta:
      'Faço **Engenharia de Software na PUC Minas, Campus Lourdes**, atualmente no **2º período**. Iniciei em fevereiro de 2026 e a previsão de conclusão é dezembro de 2029.',
  },
  {
    gatilhos: ['disponibilidade', 'horario', 'horário', 'turno', 'manha', 'manhã', 'tarde', 'remoto', 'hibrido', 'híbrido', 'presencial'],
    resposta:
      'Tenho disponibilidade para estagiar **pela manhã ou à tarde**. Estou aberto a oportunidades presenciais em Belo Horizonte e Nova Lima, além de modelos híbridos ou remotos.',
  },
  {
    gatilhos: ['tecnologia', 'tecnologias', 'linguagem', 'linguagens', 'skills', 'ferramentas', 'stack', 'conhecimento'],
    resposta:
      'Minha stack principal inclui **Java, Python, C++, C#, JavaScript, Spring Boot, React, HTML, CSS, SQL, MongoDB, Git/GitHub e MQL5**. No site, a seção de currículo mostra um mapa interativo dessas tecnologias.',
  },
  {
    gatilhos: ['java', 'spring', 'spring boot', 'backend', 'back-end', 'api', 'rest', 'poo'],
    resposta:
      'Meu foco em back-end é **Java com Spring Boot**, aplicando programação orientada a objetos, arquitetura MVC, APIs REST e operações CRUD integradas a bancos de dados.',
  },
  {
    gatilhos: ['python', 'scripts', 'automacao', 'automação', 'dados', 'pygame'],
    resposta:
      'Uso **Python** para scripts, automação, estudos de dados e jogos 2D com Pygame. É uma das linguagens em que mais consigo explorar lógica e prototipação rápida.',
  },
  {
    gatilhos: ['react', 'frontend', 'front-end', 'javascript', 'js', 'vite', 'web', 'html', 'css'],
    resposta:
      'No front-end, trabalho com **React, JavaScript, Vite, HTML5 e CSS3**. Este portfólio foi desenvolvido em React com Vite e CSS puro.',
  },
  {
    gatilhos: ['banco', 'bancos', 'sql', 'mysql', 'postgres', 'postgresql', 'mongodb', 'nosql', 'dados'],
    resposta:
      'Tenho prática com bancos relacionais e não relacionais: **MySQL, PostgreSQL e MongoDB**, usando modelagem, consultas e operações CRUD.',
  },
  {
    gatilhos: ['mql5', 'mercado financeiro', 'metatrader', 'robo', 'robô', 'trading', 'indicador'],
    resposta:
      'Desenvolvo robôs e indicadores em **MQL5 para MetaTrader 5**, unindo lógica algorítmica, regras objetivas e análise de mercado financeiro.',
  },
  {
    gatilhos: ['jogo', 'jogos', 'game', 'games', 'lua'],
    resposta:
      'Tenho projetos pessoais com jogos e scripts usando **Python, Pygame e Lua**, explorando mecânicas, estados, interação e automação.',
  },
  {
    gatilhos: ['ingles', 'inglês', 'idioma', 'idiomas', 'english'],
    resposta:
      'Sou falante nativo de **Português** e tenho **Inglês avançado**, o que ajuda bastante na leitura de documentação técnica e estudo de tecnologias novas.',
  },
  {
    gatilhos: ['contato', 'falar', 'email', 'e-mail', 'whatsapp', 'telefone', 'linkedin', 'mensagem', 'conversar', 'chamar'],
    resposta:
      'Você pode falar comigo pelo WhatsApp **(31) 99694-6632**, pelo e-mail **silvaalvarobf@gmail.com** ou pelo GitHub **github.com/Alvarodocxp**.',
  },
];

export const INTENTS_EN = [
  {
    gatilhos: ['goal', 'internship', 'job', 'career', 'hire', 'opportunity', 'looking', 'role'],
    resposta:
      'I am a 2nd-semester Software Engineering student at PUC Minas looking for my **first software development internship**. I want to contribute to a team, apply my programming, database and web skills, and grow alongside experienced developers.',
  },
  {
    gatilhos: ['college', 'university', 'puc', 'degree', 'semester', 'education', 'course'],
    resposta:
      'I study **Software Engineering at PUC Minas, Lourdes Campus**, currently in my **2nd semester**. I started in February 2026 and expect to graduate in December 2029.',
  },
  {
    gatilhos: ['technologies', 'tech', 'skills', 'languages', 'stack', 'tools'],
    resposta:
      'My main stack includes **Java, Python, C++, C#, JavaScript, Spring Boot, React, HTML, CSS, SQL, MongoDB, Git/GitHub and MQL5**.',
  },
  {
    gatilhos: ['java', 'spring', 'backend', 'api', 'oop'],
    resposta:
      'My backend focus is **Java with Spring Boot**, applying OOP, MVC architecture, REST APIs and CRUD operations connected to databases.',
  },
  {
    gatilhos: ['contact', 'email', 'phone', 'whatsapp', 'reach', 'linkedin', 'message'],
    resposta:
      'You can reach me through WhatsApp **+55 (31) 99694-6632**, email **silvaalvarobf@gmail.com** or GitHub **github.com/Alvarodocxp**.',
  },
];

export function resolveSemanticAnswer(question, lang = 'pt') {
  const intents = lang === 'pt' ? INTENTS_PT : INTENTS_EN;
  const qNorm = question
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s]/g, ' ');

  const words = qNorm.split(/\s+/).filter((word) => word.length > 2);

  let bestIntent = null;
  let maxScore = 0;

  for (const item of intents) {
    let score = 0;

    for (const trigger of item.gatilhos) {
      const normalizedTrigger = trigger
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');

      if (qNorm.includes(normalizedTrigger)) {
        score += normalizedTrigger.includes(' ') ? 4 : 2;
      }

      for (const word of words) {
        if (normalizedTrigger === word) score += 1.5;
      }
    }

    if (score > maxScore) {
      maxScore = score;
      bestIntent = item;
    }
  }

  if (bestIntent && maxScore >= 1.5) return bestIntent.resposta;

  if (lang === 'pt') {
    return (
      'Posso te contar sobre minha formação na PUC Minas, busca por estágio, tecnologias, projetos acadêmicos, jogos, MQL5 e formas de contato. Pergunte sobre qualquer um desses temas.'
    );
  }

  return (
    'I can share details about my education at PUC Minas, internship search, technologies, academic projects, games, MQL5 and contact channels. Ask me about any of these topics.'
  );
}

export const ASK_KNOWLEDGE_BASE = {
  pt: {
    sugestoes: [
      'Qual é o seu objetivo profissional?',
      'Qual é o seu curso e período?',
      'Quais tecnologias você conhece?',
      'Qual é a sua disponibilidade para estágio?',
      'Como você usa Java e Spring Boot?',
      'O que você faz com MQL5?',
      'Como posso entrar em contato?',
    ],
  },
  en: {
    sugestoes: [
      'What is your career goal?',
      'Which degree and semester are you in?',
      'What technologies do you know?',
      'What is your internship availability?',
      'How do you use Java and Spring Boot?',
      'What do you do with MQL5?',
      'How can I contact you?',
    ],
  },
};
