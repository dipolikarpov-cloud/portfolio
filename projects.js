/* =========================================================================
   ДОБАВЛЕНИЕ НОВОГО ПРОЕКТА:
   допиши один объект в конец массива PROJECTS ниже. Оглавление, нумерация,
   строка статистики и карточка-заглушка в конце пересчитаются сами —
   остальной файл трогать не нужно.

   Поля:
     title    — название проекта
     question — один короткий вопрос, на который отвечает анализ
     status   — 'done' | 'progress' | 'planned'
     note     — (необязательно) короткое пояснение статуса/ограничений
     tools    — массив строк с ключевыми инструментами
     motif    — 'network' | 'hexgrid' | 'points' | null (иконка-мотив слева)
     links    — { repo, maps, report } — любое поле можно не указывать
                (тогда вместо ссылки покажется "скоро")
   ========================================================================= */

const PROJECTS = [
  {
    title: "Доступность детских садов",
    question: "Хватает ли жителям спальных районов Москвы садиков в пешей доступности?",
    status: "progress",
    note: "10-шаговая официальная методика обеспеченности. Бирюлёво Западное, Ново-Переделкино, Южное Медведково — данные и карты по всем трём готовы, финальная вёрстка отчётов в InDesign впереди.",
    tools: ["OSMnx", "NetworkX", "GeoPandas", "QGIS", "scipy"],
    motif: "network",
    links: {
      // repo: "https://github.com/...",
      // maps: "https://...github.io/...",
      // report: "https://.../report.pdf",
    },
  },
  {
    title: "Городской остров тепла — Нижний Новгород",
    question: "Как рельеф, застройка и река формируют перегрев города — и меняется ли эта картина зимой?",
    status: "done",
    note: "Landsat + NDVI/NDBI/LST, гексагональная сетка, OLS-регрессия отдельно для лета (R²=0.89) и зимы (R²=0.45). Эффект высоты меняет знак сезонно — вероятная температурная инверсия.",
    tools: ["Landsat / STAC", "rasterio", "Copernicus DEM", "scikit-learn", "QGIS"],
    motif: "hexgrid",
    links: {
      // repo: "https://github.com/...",
      // report: "https://.../report.pdf",
    },
  },
  {
    title: "Ретейл-аналитика продуктовых сетей — Москва",
    question: "Где сети конкурируют друг с другом, а где остаются зоны для экспансии?",
    status: "progress",
    note: "Чистый SQL поверх PostGIS — намеренный выбор в пользу компетенции, которую не заменить geopandas. Диагностика качества OSM-данных завершена, сам пайплайн ещё не запущен.",
    tools: ["PostGIS", "SQL", "OSM / osmnx"],
    motif: "points",
    links: {},
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

const STATUS_LABEL = {
  done: "Завершён",
  progress: "В работе",
  planned: "Скоро",
};

/* ============================ Вспомогательное ============================ */

function plateId(index) {
  return `plate-${String(index + 1).padStart(2, "0")}`;
}

function renderLinks(links = {}) {
  const items = [
    ["repo", "Код"],
    ["maps", "Карты"],
    ["report", "Отчёт"],
  ];
  return items
    .map(([key, label]) =>
      links[key]
        ? `<a href="${links[key]}" target="_blank" rel="noopener">${label} →</a>`
        : `<span class="soon">${label} — скоро</span>`
    )
    .join("");
}

/* ============================== Оглавление ============================== */

function renderTocRow(project, index) {
  const num = String(index + 1).padStart(2, "0");
  return `
    <li class="toc-row">
      <a href="#${plateId(index)}">
        <span class="toc-num">${num}</span>
        <span class="toc-title">${project.title}</span>
        <span class="toc-leader" aria-hidden="true"></span>
        <span class="toc-status">${STATUS_LABEL[project.status] || project.status}</span>
      </a>
    </li>`;
}

/* ============================ Карточки-«листы» ============================ */

function renderPlate(project, index) {
  const num = String(index + 1).padStart(2, "0");
  const motifSvg = project.motif ? MOTIFS[project.motif] || "" : "";
  return `
    <article class="plate reveal" id="${plateId(index)}">
      <div class="plate-number">${num}</div>
      <div class="plate-motif">${motifSvg}</div>
      <div class="plate-body">
        <div class="plate-head">
          <h3 class="plate-title">${project.title}</h3>
          <span class="status ${project.status}">${STATUS_LABEL[project.status] || project.status}</span>
        </div>
        <p class="plate-question">${project.question}</p>
        ${project.note ? `<p class="plate-note">${project.note}</p>` : ""}
        <ul class="tools">
          ${(project.tools || []).map((t) => `<li>${t}</li>`).join("")}
        </ul>
        <div class="plate-links">${renderLinks(project.links)}</div>
      </div>
    </article>`;
}

function renderPlaceholder(index) {
  const num = String(index + 1).padStart(2, "0");
  return `
    <article class="plate is-placeholder reveal">
      <div class="plate-number">${num}</div>
      <p class="placeholder-text">Следующий проект появится здесь.</p>
    </article>`;
}

/* ============================== Сборка страницы ============================== */

function renderPortfolio() {
  document.getElementById("toc-list").innerHTML = PROJECTS.map(renderTocRow).join("");

  document.getElementById("plates").innerHTML =
    PROJECTS.map(renderPlate).join("") + renderPlaceholder(PROJECTS.length);

  const done = PROJECTS.filter((p) => p.status === "done").length;
  document.getElementById("meta-stats").textContent =
    `Готово ${done} из ${PROJECTS.length} проектов`;
}

/* ===== Мягкое появление секций при прокрутке (отключается при reduced motion) ===== */

function initReveal() {
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const items = document.querySelectorAll(".reveal");

  if (prefersReduced || !("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  items.forEach((el) => io.observe(el));
}

renderPortfolio();
initReveal();
