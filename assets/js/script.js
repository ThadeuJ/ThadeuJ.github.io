const grid = document.querySelector("#project-grid");
const dialog = document.querySelector("#project-dialog");
const dialogContent = document.querySelector("#dialog-content");

const isEnglish = document.documentElement.lang === "en";
const typeLabels = isEnglish
  ? { game: "Game", system: "System", study: "Study", lesson: "Lesson" }
  : { game: "Jogo", system: "Sistema", study: "Estudo", lesson: "Aula" };
const ui = isEnglish
  ? { playable: "PLAYABLE", open: "Open project", view: "View details", play: "Play", unavailable: "No playable demo is available at the moment." }
  : { playable: "JOGÁVEL", open: "Abrir projeto", view: "Ver detalhes", play: "Jogar", unavailable: "Sem demo jogável disponível no momento." };
const visualThemes = ["lavender", "lime", "coral", "blue", "orange", "mint"];
let activeCollection = "personal";
let spotlightIndex = 0;

function renderSpotlight() {
  const demos = portfolioGames.filter((project) => project.demo).sort((a, b) => b.postOrder - a.postOrder);
  const track = document.querySelector("#spotlight-track");
  const dots = document.querySelector("#spotlight-dots");
  track.innerHTML = demos.map((project) => `<article class="spotlight-slide"><button class="spotlight-card project-card-button" data-project="${project.id}" aria-label="${ui.view}: ${project.title}"><div class="spotlight-panel"><div class="spotlight-art project-art visual-${project.visual}">${project.cover ? `<img class="spotlight-cover" src="${project.cover}" alt="${isEnglish ? "Image" : "Imagem"} de ${project.title}" loading="lazy">` : ""}<span class="art-number">${project.number} / ${project.year}</span><span class="art-symbol">◈</span><span class="art-grid"></span><span class="play-badge">▶ ${ui.playable}</span></div><div class="spotlight-copy"><p class="eyebrow">${isEnglish ? "Playable" : "Jogável"} / ${project.year}</p><h3>${project.title}</h3><p class="spotlight-subtitle">${project.subtitle}</p><p class="spotlight-description">${project.description}</p><div class="tag-list">${project.tags.map((tag) => `<span>${tag}</span>`).join("")}</div><span class="spotlight-cta">${ui.open} <b>↗</b></span></div></div></button></article>`).join("");
  dots.innerHTML = demos.map((project, index) => `<button class="spotlight-dot ${index === spotlightIndex ? "is-active" : ""}" data-slide="${index}" aria-label="Ir para ${project.title}"></button>`).join("");
  track.querySelectorAll("[data-project]").forEach((button) => button.addEventListener("click", () => {
    const project = portfolioGames.find((item) => item.id === button.dataset.project);
    if (project.lessonUrl) window.location.href = project.lessonUrl;
    else openProject(button.dataset.project);
  }));
  dots.querySelectorAll("[data-slide]").forEach((dot) => dot.addEventListener("click", () => moveSpotlight(Number(dot.dataset.slide), demos.length)));
  updateSpotlight(demos.length);
}

function updateSpotlight(total) {
  const track = document.querySelector("#spotlight-track");
  const position = document.querySelector("#carousel-position");
  track.style.transform = `translateX(-${spotlightIndex * 100}%)`;
  position.textContent = `${String(spotlightIndex + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;
  document.querySelectorAll(".spotlight-dot").forEach((dot, index) => dot.classList.toggle("is-active", index === spotlightIndex));
}

function moveSpotlight(index, total) {
  spotlightIndex = (index + total) % total;
  updateSpotlight(total);
}

function renderProjects(filter = "all") {
  const projects = portfolioGames
    .filter((project) => project.collection === activeCollection)
    .filter((project) => filter === "all" || project.type === filter)
    .sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)));
   grid.innerHTML = projects.map((project, index) => {
    const playable = project.status === "Jogável" || project.status === "Playable" || project.embedUrl;
    return `
    <article class="project-card ${project.featured ? "is-featured" : ""} ${playable ? "is-playable" : ""}" data-type="${project.type}">
      <button class="project-card-button" data-project="${project.id}" aria-label="${ui.view}: ${project.title}">
        <div class="project-art visual-${project.visual || visualThemes[index % visualThemes.length]}">${project.cover ? `<img class="project-cover" src="${project.cover}" alt="${isEnglish ? "Image" : "Imagem"} de ${project.title}" loading="lazy">` : ""}<span class="art-number">${project.number} / ${project.year}</span><span class="art-symbol">${project.type === "system" ? "⌘" : project.type === "study" ? "✦" : project.type === "lesson" ? "▦" : "◈"}</span><span class="art-grid"></span><span class="art-caption">${typeLabels[project.type]}</span>${playable ? `<span class="play-badge">▶ ${ui.playable}</span>` : ""}</div>
        <div class="project-meta"><span>${typeLabels[project.type]} / ${project.year}</span><span>↗</span></div>
        <h3>${project.title}</h3><p>${project.subtitle}</p><span class="status-label ${playable ? "is-playable" : ""}">${project.status}</span>
        <div class="tag-list">${project.tags.map((tag) => `<span>${tag}</span>`).join("")}</div>
      </button>
    </article>`;
   }).join("");
  document.querySelector(".filter-count").textContent = projects.length;
  grid.querySelectorAll("[data-project]").forEach((button) => button.addEventListener("click", () => openProject(button.dataset.project)));
}

function openProject(id) {
  const project = portfolioGames.find((item) => item.id === id);
  if (!project) return;
  const embed = project.embedUrl ? `<div class="game-embed"><iframe src="${project.embedUrl}" title="Jogar ${project.title}" allow="autoplay; fullscreen *; gamepad; gyroscope; accelerometer" allowfullscreen loading="lazy"></iframe></div>` : "";
  dialogContent.innerHTML = `<p class="eyebrow">${typeLabels[project.type]} / ${project.year}</p><h2>${project.title}<span class="accent">.</span></h2><p class="dialog-subtitle">${project.status} · ${project.subtitle}</p>${embed}<p class="dialog-description">${project.description}</p><div class="tag-list">${project.tags.map((tag) => `<span>${tag}</span>`).join("")}</div>${project.link ? `<a class="button button-primary dialog-link" href="${project.link}" target="_blank" rel="noreferrer">${project.linkLabel || ui.open} ↗</a>` : `<p class="dialog-note">${ui.unavailable}</p>`}`;
  dialog.showModal();
}

document.querySelectorAll(".collection-tab").forEach((button) => button.addEventListener("click", () => {
  activeCollection = button.dataset.collection;
  document.querySelectorAll(".collection-tab").forEach((item) => { item.classList.remove("is-active"); item.setAttribute("aria-selected", "false"); });
  button.classList.add("is-active");
  button.setAttribute("aria-selected", "true");
  document.querySelectorAll(".filter-button").forEach((item) => item.classList.remove("is-active"));
  document.querySelector('.filter-button[data-filter="all"]').classList.add("is-active");
  renderProjects();
}));
document.querySelectorAll(".filter-button").forEach((button) => button.addEventListener("click", () => {
  document.querySelectorAll(".filter-button").forEach((item) => item.classList.remove("is-active"));
  button.classList.add("is-active");
  renderProjects(button.dataset.filter);
}));
document.querySelector(".dialog-close").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (event) => { if (event.target === dialog) dialog.close(); });
document.querySelector("#carousel-prev").addEventListener("click", () => moveSpotlight(spotlightIndex - 1, portfolioGames.filter((project) => project.demo).length));
document.querySelector("#carousel-next").addEventListener("click", () => moveSpotlight(spotlightIndex + 1, portfolioGames.filter((project) => project.demo).length));
renderSpotlight();
renderProjects();
