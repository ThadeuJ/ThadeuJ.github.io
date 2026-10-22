const portfolioGames = [
  {
    id: "conrados-quest", collection: "personal", status: "Em produção", type: "game", year: "Em produção", number: "01", featured: false, visual: "quest",
    title: "Conrado's Quest", subtitle: "Uma aventura feita com afeto",
    description: "Um projeto pessoal desenvolvido para meu filho e para explorar uma arquitetura completa de jogo, da documentação ao mundo jogável.",
    tags: ["Unity", "Aventura", "Projeto pessoal"],
    link: "https://asasgamedev.github.io/ConradosQuest/", linkLabel: "Ver projeto"
  },
  {
    id: "space-chase-v2", collection: "personal", status: "Em produção", type: "game", year: "2024", number: "02", featured: false, visual: "space",
    title: "Space Chase V2", subtitle: "Uma segunda viagem pelas estrelas",
    description: "Uma versão mais estruturada do jogo de nave, criada para aprofundar o design, a documentação e o trabalho com pixel art.",
    tags: ["Unity", "Pixel art", "Design de jogos"],
    link: "https://sites.google.com/view/asasgamedev/inicio", linkLabel: "Ver documentação"
  },
  {
    id: "pixel-fun", collection: "personal", status: "Jogável", type: "game", year: "2024", number: "03", featured: true, visual: "pixel",
    title: "Conrado's Pixel Fun", subtitle: "Pequenas descobertas coloridas",
    description: "Um projeto pessoal de estímulos visuais e coordenação motora, com dados salvos na nuvem e fluxo de bundles.",
    tags: ["Unity", "Mobile", "Projeto pessoal"], demo: true, postOrder: 2,
    link: "https://thadeu-moscatelli.itch.io/cpf", linkLabel: "Abrir no itch.io",
    embedUrl: "https://html-classic.itch.zone/html/18941086/ConradosPixelFunBiuldWebGL/index.html?v=1787583140",
    cover: "https://img.itch.zone/aW1nLzI5NDk5NzkzLnBuZw==/original/ODhWL8.png"
  },
  {
    id: "analytics", collection: "professional", status: "Sistema", type: "system", year: "2026", number: "01", visual: "data",
    title: "Sistema de Analytics de Jogos", subtitle: "Enxergando o jogo por trás do jogo",
    description: "Sistema de analytics com eventos de jogo, processamento em Python e dashboard espacial em HTML para visualizar o comportamento dentro das fases.",
    tags: ["Unity", "Python", "Data visualization"]
  },
  {
    id: "melhor-viagem", collection: "professional", status: "Projeto profissional", type: "game", year: "2022", number: "02", visual: "flight",
    title: "Melhor Viagem", subtitle: "Aprender também é viajar",
    description: "Jogo educacional desenvolvido com programação de controles, seleção de aviões, modelagem de mundos e cenários low-poly.",
    tags: ["Unity", "Educacional", "3D"]
  },
  {
    id: "space-chase", collection: "personal", status: "Jogável", type: "study", year: "2018", number: "04", featured: true, visual: "orbit",
    title: "Space Chase V1", subtitle: "O primeiro lançamento",
    description: "Jogo de nave criado em uma Game Jam de curso, com menus, persistência de cenas, build e publicação WebGL.",
    tags: ["Unity", "Game Jam", "WebGL"], demo: true, postOrder: 1, cover: "https://img.itch.zone/aW1hZ2UvMjYxODg1LzEyNTg1NTEucG5n/original/KuAwR4.png", link: "https://thadeuj.itch.io/space-chase", linkLabel: "Jogar no itch.io"
  },
  {
    id: "localization", collection: "professional", status: "Sistema", type: "system", year: "2026", number: "03", visual: "data",
    title: "Sistema de Localização", subtitle: "Uma camada de linguagem para cada projeto",
    description: "Sistema modular de localização para Unity, com leitura de arquivos, Addressables, editor WebGL e ferramentas desacopladas de atualização.",
    tags: ["Unity", "Addressables", "Tools"]
  },
  {
    id: "save-system", collection: "professional", status: "Sistema", type: "system", year: "2026", number: "04", visual: "orbit",
    title: "Sistema de Salvamento", subtitle: "Dados persistentes, prontos para viajar",
    description: "Arquitetura modular de salvamento para novos projetos do estúdio, com serialização via Data Contract e encadeamento desacoplado.",
    tags: ["Unity", "C#", "Architecture"]
  },
  {
    id: "shadow-system", collection: "professional", status: "Sistema", type: "system", year: "2025", number: "05", visual: "quest",
    title: "Sistema de Sombras", subtitle: "Sprites 2D em espaços 3D",
    description: "Sistema otimizado de projeção de sombras para sprites 2D em ambientes 3D, usando Compute Shaders, pooling e iluminação.",
    tags: ["Unity", "Compute Shaders", "Optimization"]
  },
  {
    id: "cutscene-system", collection: "professional", status: "Sistema", type: "system", year: "2025", number: "06", visual: "data",
    title: "Sistema de Cutscenes", subtitle: "Eventos com ritmo preciso",
    description: "Alternativa à Timeline da Unity para cadenciar eventos, usando reflexão, interfaces e encadeamento de ações.",
    tags: ["Unity", "Reflection", "Eventos"]
  },
  {
    id: "levels-types", collection: "professional", status: "Sistema", type: "system", year: "2024", number: "07", visual: "orbit",
    title: "Sistema de Níveis e Tipos", subtitle: "Regras para um design de jogos mais profundo",
    description: "Sistema de níveis, experiência, tipos, equações e equipamentos para dar mais liberdade à equipe de design.",
    tags: ["Unity", "Scriptable Objects", "Architecture"]
  },
  {
    id: "combo-system", collection: "professional", status: "Sistema", type: "system", year: "2024", number: "08", visual: "pixel",
    title: "Sistema de Combos", subtitle: "Input se transforma em animação",
    description: "Sistema de combinações configurável pelo editor, integrado aos sistemas de input legado e novo da Unity.",
    tags: ["Unity", "Input System", "Animação"]
  },
  {
    id: "dialog-system", collection: "professional", status: "Sistema", type: "system", year: "2024", number: "09", visual: "flight",
    title: "Sistema de Diálogos", subtitle: "Conversas como um grafo visual",
    description: "Sistema de diálogos editável por diagramas, com importação CSV e JSON, estados, artes, reações e animações.",
    tags: ["Unity", "UGUI", "CSV / JSON"]
  },
  {
    id: "education-apps", collection: "professional", status: "Educacional", type: "study", year: "2023—2024", number: "10", visual: "pixel",
    title: "Projetos de Jogos Educacionais", subtitle: "Aprendizado por meio da interação",
    description: "Projetos educacionais desenvolvidos para atividades de matemática, inglês, gamificação e unificação de aplicativos de estudo.",
    tags: ["Unity", "Educacional", "Gamificação"]
  },
  {
    id: "flappy-bird-lesson", collection: "lessons", status: "Aula", type: "lesson", year: "GDevelop 5", number: "01", visual: "lesson", featured: true,
    title: "Do primeiro objeto ao seu próprio Flappy Bird", subtitle: "Uma aula prática de criação de jogos",
    description: "Guia de consulta para entender cenas, objetos e eventos no GDevelop 5 enquanto você constrói um jogo simples de voo e obstáculos.",
    tags: ["Aula", "GDevelop 5", "Desenvolvimento de jogos"], demo: true, postOrder: 3, cover: "https://public-game-resources.gdevelop.io/5ff446dd-6129-4a61-b416-6293f8f262de/screenshots/screenshot_92bd61b1-9978-4b65-aac1-134cb9a768a1.png",
    embedUrl: "https://gd.games/games/5ff446dd-6129-4a61-b416-6293f8f262de", link: "pages/lessons/flappy-bird-gdevelop.html", linkLabel: "Ler aula completa"
  },
  {
    id: "angry-bird-pico8-lesson", collection: "lessons", status: "Aula", type: "lesson", year: "PICO-8", number: "02", visual: "orbit",
    title: "Angry Bird em PICO-8", subtitle: "Do cart ao jogo executável na web",
    description: "Aula técnica sobre a arquitetura de um export HTML do PICO-8: canvas, runtime, cart compilado, controles, áudio e ciclo de execução.",
    tags: ["Aula", "PICO-8", "Lua / Web"], demo: true, postOrder: 4,
    embedUrl: "assets/games/angry-bird/index.html", link: "pages/lessons/angry-bird-pico8.html", linkLabel: "Ler aula completa"
  }
];
