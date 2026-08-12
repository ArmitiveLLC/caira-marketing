function initPromoVideoCarousel() {
  const root = document.querySelector<HTMLElement>('[data-promo-video-carousel]');
  if (!root) return;

  const slides = Array.from(root.querySelectorAll<HTMLElement>('[data-promo-video-slide]'));
  const dots = Array.from(root.querySelectorAll<HTMLButtonElement>('[data-promo-video-dot]'));
  const prevBtn = root.querySelector<HTMLButtonElement>('[data-promo-video-prev]');
  const nextBtn = root.querySelector<HTMLButtonElement>('[data-promo-video-next]');
  const titleEl = root.querySelector<HTMLElement>('[data-promo-video-title]');
  const descEl = root.querySelector<HTMLElement>('[data-promo-video-desc]');

  if (!slides.length) return;

  let active = slides.findIndex((slide) => slide.classList.contains('is-active'));
  if (active < 0) active = 0;

  const pauseAll = () => {
    slides.forEach((slide) => {
      const player = slide.querySelector<HTMLVideoElement>('[data-promo-video-player]');
      if (player && !player.paused) player.pause();
    });
  };

  const updateCaption = (index: number) => {
    const slide = slides[index];
    if (!slide) return;
    if (titleEl) titleEl.textContent = slide.dataset.promoVideoTitle ?? '';
    if (descEl) descEl.textContent = slide.dataset.promoVideoDesc ?? '';
  };

  const setSlide = (index: number) => {
    const next = (index + slides.length) % slides.length;
    if (next === active) return;

    pauseAll();

    slides[active].classList.remove('is-active');
    slides[active].hidden = true;
    slides[active].setAttribute('aria-hidden', 'true');

    slides[next].classList.add('is-active');
    slides[next].hidden = false;
    slides[next].setAttribute('aria-hidden', 'false');

    dots.forEach((dot, i) => {
      const isActive = i === next;
      dot.classList.toggle('is-active', isActive);
      dot.setAttribute('aria-selected', String(isActive));
    });

    active = next;
    updateCaption(next);
  };

  prevBtn?.addEventListener('click', () => setSlide(active - 1));
  nextBtn?.addEventListener('click', () => setSlide(active + 1));

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => setSlide(i));
  });

  root.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') setSlide(active - 1);
    if (e.key === 'ArrowRight') setSlide(active + 1);
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPromoVideoCarousel);
} else {
  initPromoVideoCarousel();
}

document.addEventListener('astro:page-load', initPromoVideoCarousel);
