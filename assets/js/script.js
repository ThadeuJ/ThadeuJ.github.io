const grid = document.querySelector("#project-grid");
const dialog = document.querySelector("#project-dialog");
const dialogContent = document.querySelector("#dialog-content");
const contactDialog = document.querySelector("#contact-dialog");

const isEnglish = document.documentElement.lang === "en";
const typeLabels = isEnglish
  ? { game: "Game", system: "System", study: "Study", lesson: "Lesson" }
  : { game: "Jogo", system: "Sistema", study: "Estudo", lesson: "Aula" };
const ui = isEnglish
  ? { playable: "PLAYABLE", open: "Open", view: "View details", play: "Play", unavailable: "No playable demo is available at the moment." }
  : { playable: "JOGÁVEL", open: "Abrir", view: "Ver detalhes", play: "Jogar", unavailable: "Sem demo jogável disponível no momento." };
const visualThemes = ["lavender", "lime", "coral", "blue", "orange", "mint"];
let activeCollection = "personal";
let spotlightIndex = 0;
let revealObserver;
let suppressSpotlightClick = false;

function initStarfield() {
  const field = document.querySelector(".starfield");
  if (!field) return;
  const starCount = window.innerWidth < 700 ? 28 : 44;
  const fragment = document.createDocumentFragment();

  for (let index = 0; index < starCount; index += 1) {
    const star = document.createElement("i");
    star.className = "star";
    star.style.setProperty("--x", `${Math.random() * 100}%`);
    star.style.setProperty("--y", `${Math.random() * 100}%`);
    star.style.setProperty("--size", `${(Math.random() * 2.4 + .7).toFixed(2)}px`);
    star.style.setProperty("--blur", `${(Math.random() * 2.5 + .4).toFixed(2)}px`);
    star.style.setProperty("--delay", `${(Math.random() * -7).toFixed(2)}s`);
    star.style.setProperty("--duration", `${(Math.random() * 4 + 4).toFixed(2)}s`);
    fragment.appendChild(star);
  }
  field.appendChild(fragment);
}

function initScrollReveal() {
  const revealElements = document.querySelectorAll(".intro, .spotlight, .projects, .about, .resume-hero, .resume-contact, .resume-section, .footer, .project-card");
  revealElements.forEach((element, index) => {
    element.classList.add("reveal-item");
    element.style.setProperty("--reveal-delay", `${Math.min(index * 45, 260)}ms`);
  });

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
    revealElements.forEach((element) => element.classList.add("is-visible"));
    document.body.classList.remove("is-intro");
    return;
  }

  revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: .08, rootMargin: "0px 0px -7% 0px" });

  revealElements.forEach((element) => revealObserver.observe(element));
  window.setTimeout(() => document.body.classList.remove("is-intro"), 1800);
}

function renderSpotlight() {
  if (typeof portfolioGames === "undefined") return;
  const demos = portfolioGames.filter((project) => project.demo).sort((a, b) => b.postOrder - a.postOrder);
  const track = document.querySelector("#spotlight-track");
  const dots = document.querySelector("#spotlight-dots");
  if (!track || !dots) return;
  track.innerHTML = demos.map((project) => `<article class="spotlight-slide"><button class="spotlight-card project-card-button" data-project="${project.id}" aria-label="${ui.view}: ${project.title}"><div class="spotlight-panel"><div class="spotlight-art project-art visual-${project.visual}">${project.cover ? `<img class="spotlight-cover" src="${project.cover}" alt="${isEnglish ? "Image" : "Imagem"} de ${project.title}" loading="lazy">` : ""}<span class="art-number">${project.number} / ${project.year}</span><span class="art-symbol">◈</span><span class="art-grid"></span></div><div class="spotlight-copy"><p class="eyebrow">${isEnglish ? "Playable" : "Jogável"}</p><h3>${project.title}</h3><p class="spotlight-subtitle">${project.subtitle}</p><p class="spotlight-description">${project.description}</p><div class="tag-list">${project.tags.map((tag) => `<span>${tag}</span>`).join("")}</div><span class="spotlight-cta">${ui.open} <b>↗</b></span></div></div></button></article>`).join("");
  dots.innerHTML = demos.map((project, index) => `<button class="spotlight-dot ${index === spotlightIndex ? "is-active" : ""}" data-slide="${index}" aria-label="Ir para ${project.title}"></button>`).join("");
  track.querySelectorAll("[data-project]").forEach((button) => button.addEventListener("click", () => {
    const project = portfolioGames.find((item) => item.id === button.dataset.project);
    if (project.lessonUrl) window.location.href = project.lessonUrl;
    else openProject(button.dataset.project);
  }));
   dots.querySelectorAll("[data-slide]").forEach((dot) => dot.addEventListener("click", () => moveSpotlight(Number(dot.dataset.slide), demos.length)));
   initSpotlightSwipe(demos.length);
   updateSpotlight(demos.length);
}

function updateSpotlight(total) {
  const track = document.querySelector("#spotlight-track");
  const position = document.querySelector("#carousel-position");
  track.style.transform = `translateX(-${spotlightIndex * 100}%)`;
  position.textContent = `${String(spotlightIndex + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;
  document.querySelectorAll(".spotlight-dot").forEach((dot, index) => dot.classList.toggle("is-active", index === spotlightIndex));
}

function initSpotlightSwipe(total) {
  const viewport = document.querySelector(".spotlight-viewport");
  if (!viewport || viewport.dataset.swipeReady) return;
  viewport.dataset.swipeReady = "true";

  let startX = 0;
  let startY = 0;
  let isDragging = false;

  const resetPointer = () => {
    startX = 0;
    startY = 0;
    isDragging = false;
    viewport.classList.remove("is-dragging");
  };

  viewport.addEventListener("pointerdown", (event) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    startX = event.clientX;
    startY = event.clientY;
    isDragging = false;
    viewport.setPointerCapture?.(event.pointerId);
  });

  viewport.addEventListener("pointermove", (event) => {
    if (!startX && !startY) return;
    const deltaX = event.clientX - startX;
    const deltaY = event.clientY - startY;
    if (Math.abs(deltaX) < 8 || Math.abs(deltaX) <= Math.abs(deltaY)) return;
    isDragging = true;
    viewport.classList.add("is-dragging");
    event.preventDefault();
  });

  viewport.addEventListener("pointerup", (event) => {
    if (!startX && !startY) return;
    const deltaX = event.clientX - startX;
    const deltaY = event.clientY - startY;
    if (isDragging && Math.abs(deltaX) >= 45 && Math.abs(deltaX) > Math.abs(deltaY)) {
      spotlightIndex += deltaX < 0 ? 1 : -1;
      moveSpotlight(spotlightIndex, total);
      suppressSpotlightClick = true;
    }
    resetPointer();
  });

  viewport.addEventListener("pointercancel", resetPointer);
  viewport.addEventListener("click", (event) => {
    if (!suppressSpotlightClick) return;
    event.preventDefault();
    event.stopPropagation();
    suppressSpotlightClick = false;
  }, true);
}

function moveSpotlight(index, total) {
  spotlightIndex = (index + total) % total;
  updateSpotlight(total);
}

function renderProjects(filter = "all") {
  if (!grid || typeof portfolioGames === "undefined") return;
  const projects = portfolioGames
    .filter((project) => activeCollection === "all" || project.collection === activeCollection)
    .filter((project) => filter === "all" || project.type === filter)
    .sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)));
   grid.innerHTML = projects.map((project, index) => {
    const playable = project.status === "Jogável" || project.status === "Playable" || project.embedUrl;
    return `
    <article class="project-card ${project.featured ? "is-featured" : ""} ${playable ? "is-playable" : ""}" data-type="${project.type}">
      <button class="project-card-button" data-project="${project.id}" aria-label="${ui.view}: ${project.title}">
       <div class="project-art visual-${project.visual || visualThemes[index % visualThemes.length]}">${project.cover ? `<img class="project-cover" src="${project.cover}" alt="${isEnglish ? "Image" : "Imagem"} de ${project.title}" loading="lazy">` : ""}<span class="art-number">${project.number} / ${project.year}</span><span class="art-symbol">${project.type === "system" ? "⌘" : project.type === "study" ? "✦" : project.type === "lesson" ? "▦" : "◈"}</span><span class="art-grid"></span><span class="art-caption">${typeLabels[project.type]}</span></div>
        <div class="project-meta"><span>${typeLabels[project.type]} / ${project.year}</span><span>↗</span></div>
        <h3>${project.title}</h3><p>${project.subtitle}</p><span class="status-label ${playable ? "is-playable" : ""}">${project.status}</span>
        <div class="tag-list">${project.tags.map((tag) => `<span>${tag}</span>`).join("")}</div>
      </button>
    </article>`;
   }).join("");
   const filterCount = document.querySelector(".filter-count");
   if (filterCount) filterCount.textContent = projects.length;
  grid.querySelectorAll("[data-project]").forEach((button) => button.addEventListener("click", () => openProject(button.dataset.project)));
  grid.querySelectorAll(".project-card").forEach((card, index) => {
    card.classList.add("reveal-item");
     card.style.setProperty("--reveal-delay", `${Math.min(index * 45, 260)}ms`);
     if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) card.classList.add("is-visible");
     if (revealObserver) revealObserver.observe(card);
  });
  if (window.scrollY > 40) {
    document.querySelectorAll(".project-card:not(.is-visible)").forEach((card) => card.classList.add("is-visible"));
  }
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
   document.querySelector('.filter-button[data-filter="all"]')?.classList.add("is-active");
  renderProjects();
}));
document.querySelectorAll(".filter-button").forEach((button) => button.addEventListener("click", () => {
  document.querySelectorAll(".filter-button").forEach((item) => item.classList.remove("is-active"));
  button.classList.add("is-active");
  renderProjects(button.dataset.filter);
}));
document.querySelector(".dialog-close")?.addEventListener("click", () => dialog?.close());
dialog?.addEventListener("click", (event) => { if (event.target === dialog) dialog.close(); });
document.querySelectorAll("[data-contact-dialog]").forEach((button) => button.addEventListener("click", () => contactDialog?.showModal()));
document.querySelector(".contact-dialog-close")?.addEventListener("click", () => contactDialog?.close());
contactDialog?.addEventListener("click", (event) => { if (event.target === contactDialog) contactDialog.close(); });
document.querySelector("#contact-form")?.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  const subject = `Contato pelo portfólio: ${formData.get("name")}`;
  const body = `Nome: ${formData.get("name")}\nE-mail: ${formData.get("email")}\n\n${formData.get("message")}`;
  window.location.href = `mailto:thadeu.moscatelli@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});
document.querySelector("#carousel-prev")?.addEventListener("click", () => moveSpotlight(spotlightIndex - 1, portfolioGames.filter((project) => project.demo).length));
document.querySelector("#carousel-next")?.addEventListener("click", () => moveSpotlight(spotlightIndex + 1, portfolioGames.filter((project) => project.demo).length));
renderSpotlight();
renderProjects();
initStarfield();
initScrollReveal();
