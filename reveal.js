/* Мягкое появление .reveal-элементов при прокрутке - как необязательное
   улучшение поверх контента, который и без JS виден по умолчанию.
   Полностью отключается при prefers-reduced-motion. */
(function () {
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const items = document.querySelectorAll(".reveal");

  if (prefersReduced || !("IntersectionObserver" in window)) {
    return;
  }

  // Скрываем элементы только сейчас, когда точно знаем, что JS работает
  items.forEach((el) => el.classList.add("reveal-pending"));

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove("reveal-pending");
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  items.forEach((el) => io.observe(el));
})();
