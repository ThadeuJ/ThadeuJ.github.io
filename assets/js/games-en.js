const englishProjects = {
  "conrados-quest": ["Conrado's Quest", "An adventure made with affection", "A personal project developed for my son to explore a complete game architecture, from documentation to a playable world.", ["Unity", "Adventure", "Personal project"]],
  "space-chase-v2": ["Space Chase V2", "A second pass through the stars", "A more structured version of the spaceship game, created to deepen design, documentation, and pixel art work.", ["Unity", "Pixel art", "Game design"]],
  "pixel-fun": ["Conrado's Pixel Fun", "Small colorful discoveries", "A personal project for visual stimuli and motor coordination, with cloud saves and a bundle workflow.", ["Unity", "Mobile", "Personal project"]],
  "pokemon-academy": ["Pokémon Academy", "Learn, play, and complete the Pokédex", "An interactive platform of Pokémon quizzes and challenges, with questions about types, moves, silhouettes, PokéDoku, and a Pokédex.", ["Web", "JavaScript", "Pokémon"]],
  "dino-classic": ["Dino Classic", "Run, jump, and clear the obstacles", "An educational PICO-8 experiment inspired by the classic dinosaur game, with jumping, gravity, obstacles, collisions, and a scoring system.", ["PICO-8", "Lua", "Educational game"]],
  analytics: ["Game Analytics System", "Seeing the game behind the game", "An analytics system with game events, Python processing, and a spatial HTML dashboard for visualizing behavior inside levels.", ["Unity", "Python", "Data visualization"]],
  "melhor-viagem": ["Melhor Viagem", "Learning is also a journey", "An educational game developed with control programming, airplane selection, low-poly world modeling, and scenario design.", ["Unity", "Educational", "3D"]],
  "space-chase": ["Space Chase V1", "The first launch", "A spaceship game created in a course Game Jam, with menus, scene persistence, build, and WebGL publication.", ["Unity", "Game Jam", "WebGL"]],
  localization: ["Localization System", "A language layer for every project", "A modular Unity localization system with file reading, Addressables, a WebGL editor, and decoupled update tools.", ["Unity", "Addressables", "Tools"]],
  "save-system": ["Save System", "Persistent data, built to travel", "A modular save architecture for new studio projects, with Data Contract serialization and decoupled chaining.", ["Unity", "C#", "Architecture"]],
  "shadow-system": ["Shadow System", "2D sprites in 3D spaces", "An optimized shadow projection system for 2D sprites in 3D environments, using Compute Shaders, pooling, and lighting.", ["Unity", "Compute Shaders", "Optimization"]],
  "cutscene-system": ["Cutscene System", "Events with a precise rhythm", "An alternative to Unity Timeline for sequencing events through reflection, interfaces, and chained actions.", ["Unity", "Reflection", "Events"]],
  "levels-types": ["Levels and Types System", "Rules for deeper game design", "A system for levels, experience, types, equations, and equipment that gives the design team more freedom.", ["Unity", "Scriptable Objects", "Architecture"]],
  "combo-system": ["Combo System", "Input becomes animation", "An editor-configurable combo system integrated with Unity's legacy and new input systems.", ["Unity", "Input System", "Animation"]],
  "dialog-system": ["Dialog System", "Conversations as a visual graph", "A diagram-editable dialogue system with CSV and JSON imports, states, artwork, reactions, and animations.", ["Unity", "UGUI", "CSV / JSON"]],
  "education-apps": ["Educational Game Projects", "Learning through interaction", "Educational projects for math, English, gamification, and the unification of study applications.", ["Unity", "Educational", "Gamification"]],
  "flappy-bird-lesson": ["From the first object to your own Flappy Bird", "A practical game creation lesson", "A reference guide to scenes, objects, and events in GDevelop 5 while building a simple flying and obstacle game.", ["Lesson", "GDevelop 5", "Game development"]],
  "angry-bird-pico8-lesson": ["Flappy Bird in PICO-8", "From cart to an executable web game", "A technical lesson about a PICO-8 HTML export: canvas, runtime, compiled cart, controls, audio, and the execution cycle.", ["Lesson", "PICO-8", "Lua / Web"]]
};
Object.entries(englishProjects).forEach(([id, values]) => {
  const project = portfolioGames.find((item) => item.id === id);
  if (project) [project.title, project.subtitle, project.description, project.tags] = values;
});
portfolioGames.forEach((project) => {
  if (project.status === "Jogável") project.status = "Playable";
  if (project.status === "Em produção") project.status = "In production";
  if (project.status === "Projeto profissional") project.status = "Professional project";
  if (project.status === "Educacional") project.status = "Educational";
  if (project.status === "Sistema") project.status = "System";
  if (project.status === "Aula") project.status = "Lesson";
  if (project.linkLabel === "Ver projeto") project.linkLabel = "View project";
  if (project.linkLabel === "Ver documentação") project.linkLabel = "View documentation";
  if (project.linkLabel === "Jogar no itch.io" || project.linkLabel === "Abrir no itch.io") project.linkLabel = "Play on itch.io";
  if (project.linkLabel === "Ler aula completa") project.linkLabel = "Read the full lesson";
  if (project.linkLabel === "Jogar o projeto") project.linkLabel = "Play the project";
});
portfolioGames.find((project) => project.id === "angry-bird-pico8-lesson").link = "https://thadeu-moscatelli.itch.io/angry";
