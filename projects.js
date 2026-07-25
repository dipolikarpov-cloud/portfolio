/* =========================================================================
   ДОБАВЛЕНИЕ НОВОГО ПРОЕКТА:
   допиши один объект в конец массива PROJECTS ниже — карточка и её место
   в очереди (нумерация, заглушка "следующий проект") пересчитаются сами.

   Поля:
     title — название проекта (то, что видно на карточке)
     href  — ссылка на страницу проекта (projects/имя-файла.html)
     motif — 'network' | 'hexgrid' | 'points' | null (иконка-мотив на карточке)
   ========================================================================= */

const PROJECTS = [
  {
    title: "Доступность детских садов",
    href: "kindergarten.html",
    motif: "network",
  },
];

/* ========================= Иконки-мотивы (SVG) ========================= */

const MOTIFS = {
  network: `
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="32" r="20" fill="#D97A4D" opacity="0.18"/>
      <g stroke="#2B2620" stroke-width="1.4">
        <line x1="14" y1="46" x2="32" y2="32"/>
        <line x1="50" y1="44" x2="32" y2="32"/>
        <line x1="32" y1="32" x2="32" y2="14"/>
        <line x1="32" y1="32" x2="46" y2="20"/>
      </g>
      <g fill="#2B2620">
        <circle cx="32" cy="32" r="4"/>
        <circle cx="14" cy="46" r="2.6"/>
        <circle cx="50" cy="44" r="2.6"/>
        <circle cx="32" cy="14" r="2.6"/>
        <circle cx="46" cy="20" r="2.6"/>
      </g>
    </svg>`,
  hexgrid: `
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g stroke="#2B2620" stroke-width="1.1">
        <polygon points="32,10 43,16.5 43,29.5 32,36 21,29.5 21,16.5" fill="#8B2E23" opacity="0.75"/>
        <polygon points="53,22 64,28.5 64,41.5 53,48 42,41.5 42,28.5" fill="#D97A4D" opacity="0.7" transform="translate(-11,0)"/>
        <polygon points="32,36 43,42.5 43,55.5 32,62 21,55.5 21,42.5" fill="#A9B87C" opacity="0.8"/>
        <polygon points="11,22 22,28.5 22,41.5 11,48 0,41.5 0,28.5" fill="#5B7A6B" opacity="0.75"/>
      </g>
    </svg>`,
  points: `
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="24" cy="26" r="13" stroke="#2B2620" stroke-width="1" stroke-dasharray="2 2" opacity="0.5"/>
      <circle cx="42" cy="40" r="10" stroke="#2B2620" stroke-width="1" stroke-dasharray="2 2" opacity="0.5"/>
      <circle cx="24" cy="26" r="3.4" fill="#8B2E23"/>
      <circle cx="42" cy="40" r="3.4" fill="#D97A4D"/>
      <circle cx="14" cy="44" r="2.6" fill="#5B7A6B"/>
      <circle cx="48" cy="18" r="2.6" fill="#5B7A6B"/>
    </svg>`,
};

/* ============================ Карточки-«листы» ============================ */

function renderPlate(project, index) {
  const num = String(index + 1).padStart(2, "0");
  const motifSvg = project.motif ? MOTIFS[project.motif] || "" : "";
  return `
    <a class="plate reveal" href="${project.href}">
      <span class="plate-number">${num}</span>
      <span class="plate-motif">${motifSvg}</span>
      <span class="plate-title">${project.title}</span>
    </a>`;
}

function renderPlaceholder(index) {
  const num = String(index + 1).padStart(2, "0");
  return `
    <div class="plate is-placeholder reveal">
      <span class="plate-number">${num}</span>
      <p class="placeholder-text">Следующий проект появится здесь.</p>
    </div>`;
}

function renderPortfolio() {
  document.getElementById("plates").innerHTML =
    PROJECTS.map(renderPlate).join("") + renderPlaceholder(PROJECTS.length);
}

renderPortfolio();
/* reveal.js (подключён отдельным тегом ниже) находит .reveal-элементы,
   включая только что отрисованные карточки, и включает их появление */
