import Lenis from 'lenis';
import { animate } from 'motion';

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function initLenis() {
  if (prefersReducedMotion()) return;

  const lenis = new Lenis({
    duration: 1.1,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  });

  function raf(time: number) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
}

function isInViewport(el: HTMLElement): boolean {
  const rect = el.getBoundingClientRect();
  return rect.top < window.innerHeight * 0.92 && rect.bottom > 0;
}

function revealElement(el: HTMLElement, observer: IntersectionObserver) {
  if (el.classList.contains('reveal-in')) return;

  const delay = Number(el.dataset.revealDelay ?? 0);
  const stagger = el.closest('[data-reveal-stagger]');
  const siblings = stagger ? Array.from(stagger.querySelectorAll<HTMLElement>('[data-reveal]')) : [el];
  const index = siblings.indexOf(el);
  const totalDelay = delay + index * 0.08;

  el.classList.add('reveal-in');

  if (!prefersReducedMotion()) {
    animate(
      el,
      {
        y: [el.dataset.reveal === 'left' ? 0 : 20, 0],
        x: [el.dataset.reveal === 'left' ? -20 : el.dataset.reveal === 'right' ? 20 : 0, 0],
      },
      { duration: 0.65, delay: totalDelay, easing: [0.22, 1, 0.36, 1] }
    ).then(() => clearInlineStyles(el));
  }

  observer.unobserve(el);
}

function initReveals() {
  const elements = document.querySelectorAll<HTMLElement>('[data-reveal]');
  if (!elements.length) return;

  if (prefersReducedMotion()) {
    elements.forEach((el) => el.classList.add('reveal-in'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        revealElement(entry.target as HTMLElement, observer);
      });
    },
    { threshold: 0.08, rootMargin: '0px 0px -20px 0px' }
  );

  elements.forEach((el) => {
    if (isInViewport(el)) {
      revealElement(el, observer);
    } else {
      observer.observe(el);
    }
  });
}

function initCounters() {
  const counters = document.querySelectorAll<HTMLElement>('[data-counter]');
  if (!counters.length) return;

  if (prefersReducedMotion()) {
    counters.forEach((el) => {
      el.textContent = `${el.dataset.counterPrefix ?? ''}${el.dataset.counter}${el.dataset.counterSuffix ?? ''}`;
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target as HTMLElement;
        const target = Number(el.dataset.counter ?? 0);
        const prefix = el.dataset.counterPrefix ?? '';
        const suffix = el.dataset.counterSuffix ?? '';
        const obj = { val: 0 };

        animate(
          obj,
          { val: target },
          {
            duration: 1.8,
            easing: [0.22, 1, 0.36, 1],
            onUpdate: () => {
              el.textContent = `${prefix}${Math.round(obj.val)}${suffix}`;
            },
          }
        );
        observer.unobserve(el);
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((el) => observer.observe(el));
}

function initLightbox() {
  const triggers = document.querySelectorAll<HTMLElement>('[data-lightbox]');
  if (!triggers.length) return;

  let overlay: HTMLDivElement | null = null;

  const close = () => {
    overlay?.remove();
    overlay = null;
    document.body.style.overflow = '';
  };

  triggers.forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const src = trigger.dataset.lightbox;
      const alt = trigger.dataset.lightboxAlt ?? '';
      if (!src) return;

      close();
      overlay = document.createElement('div');
      overlay.className = 'lightbox-overlay';
      overlay.innerHTML = `
        <button class="lightbox-close" aria-label="Close">&times;</button>
        <img src="${src}" alt="${alt}" class="lightbox-image" />
      `;
      document.body.appendChild(overlay);
      document.body.style.overflow = 'hidden';

      overlay.addEventListener('click', (e) => {
        if (e.target === overlay || (e.target as HTMLElement).classList.contains('lightbox-close')) {
          close();
        }
      });
      document.addEventListener('keydown', function onKey(e) {
        if (e.key === 'Escape') {
          close();
          document.removeEventListener('keydown', onKey);
        }
      });
    });
  });
}

function initHeaderScroll() {
  const header = document.querySelector<HTMLElement>('[data-site-header]');
  if (!header) return;

  const onScroll = () => {
    header.classList.toggle('header-scrolled', window.scrollY > 12);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

function initNavActive() {
  const links = Array.from(document.querySelectorAll<HTMLAnchorElement>('[data-nav-link]'));
  if (!links.length) return;

  const sections = links
    .map((link) => {
      const id = link.dataset.section;
      const el = id ? document.getElementById(id) : null;
      return el ? { link, el } : null;
    })
    .filter(Boolean) as { link: HTMLAnchorElement; el: HTMLElement }[];

  if (!sections.length) return;

  const setActive = (id: string | null) => {
    links.forEach((link) => {
      const active = link.dataset.section === id;
      link.classList.toggle('nav-link-active', active);
      if (active) link.setAttribute('aria-current', 'true');
      else link.removeAttribute('aria-current');
    });
  };

  if (prefersReducedMotion()) {
    const hash = window.location.hash.replace('#', '');
    if (hash) setActive(hash);
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
      if (visible[0]?.target.id) setActive(visible[0].target.id);
    },
    { rootMargin: '-40% 0px -50% 0px', threshold: [0, 0.25, 0.5] }
  );

  sections.forEach(({ el }) => observer.observe(el));
}

function setMobileNavOpen(open: boolean) {
  const toggle = document.querySelector<HTMLElement>('[data-nav-toggle]');
  const menu = document.querySelector<HTMLElement>('[data-nav-menu]');
  const backdrop = document.querySelector<HTMLElement>('[data-nav-backdrop]');
  if (!toggle || !menu) return;

  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  menu.classList.toggle('nav-open', open);
  menu.hidden = !open;
  if (backdrop) {
    backdrop.hidden = !open;
    backdrop.classList.toggle('nav-open', open);
  }
  document.body.style.overflow = open ? 'hidden' : '';
}

function initMobileNav() {
  const toggle = document.querySelector<HTMLElement>('[data-nav-toggle]');
  const menu = document.querySelector<HTMLElement>('[data-nav-menu]');
  const backdrop = document.querySelector<HTMLElement>('[data-nav-backdrop]');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    setMobileNavOpen(open);
  });

  backdrop?.addEventListener('click', () => setMobileNavOpen(false));

  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setMobileNavOpen(false));
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      setMobileNavOpen(false);
    }
  });
}

function clearInlineStyles(el: HTMLElement | null | undefined) {
  if (!el) return;
  el.style.transform = '';
  el.style.opacity = '';
  el.style.translate = '';
}

function initHeroStage() {
  const root = document.querySelector<HTMLElement>('[data-hero-stage]');
  if (!root) return;

  const slides = Array.from(root.querySelectorAll<HTMLElement>('[data-hero-slide]'));
  const label = root.querySelector<HTMLElement>('[data-hero-caption-label]');
  const line = root.querySelector<HTMLElement>('[data-hero-caption-line]');
  if (!slides.length) return;

  let active = slides.findIndex((slide) => slide.classList.contains('is-active'));
  if (active < 0) active = 0;

  let timer: ReturnType<typeof setInterval> | null = null;
  const intervalMs = 5000;

  const updateCaption = (index: number) => {
    const slide = slides[index];
    const nextLabel = slide?.dataset.heroLabel ?? '';
    const nextLine = slide?.dataset.heroLine ?? '';

    if (label && line && !prefersReducedMotion()) {
      animate([label, line], { opacity: [1, 0], y: [0, -6] }, { duration: 0.2 }).then(() => {
        if (label) label.textContent = nextLabel;
        if (line) line.textContent = nextLine;
        animate([label, line], { opacity: [0, 1], y: [8, 0] }, { duration: 0.35, easing: [0.22, 1, 0.36, 1] });
      });
    } else {
      if (label) label.textContent = nextLabel;
      if (line) line.textContent = nextLine;
    }
  };

  const setSlide = (index: number) => {
    const next = (index + slides.length) % slides.length;
    if (next === active) return;

    const current = slides[active];
    const incoming = slides[next];

    updateCaption(next);

    if (prefersReducedMotion()) {
      current.classList.remove('is-active');
      current.hidden = true;
      current.setAttribute('aria-hidden', 'true');
      incoming.classList.add('is-active');
      incoming.hidden = false;
      incoming.setAttribute('aria-hidden', 'false');
      active = next;
      return;
    }

    clearInlineStyles(current);
    clearInlineStyles(incoming);

    current.classList.remove('is-active');
    animate(
      current,
      { opacity: [1, 0], y: [0, -14], scale: [1, 0.96] },
      { duration: 0.35, easing: [0.4, 0, 1, 1] }
    ).then(() => {
      current.hidden = true;
      current.setAttribute('aria-hidden', 'true');
      clearInlineStyles(current);
    });

    incoming.hidden = false;
    incoming.setAttribute('aria-hidden', 'false');
    incoming.classList.add('is-active');
    animate(
      incoming,
      { opacity: [0, 1], y: [10, 0], scale: [0.98, 1] },
      { duration: 0.55, easing: [0.22, 1, 0.36, 1] }
    ).then(() => clearInlineStyles(incoming));

    active = next;
  };

  const startAuto = () => {
    if (prefersReducedMotion()) return;
    stopAuto();
    timer = setInterval(() => setSlide(active + 1), intervalMs);
  };

  const stopAuto = () => {
    if (timer) clearInterval(timer);
    timer = null;
  };

  root.addEventListener('mouseenter', stopAuto);
  root.addEventListener('mouseleave', startAuto);

  if (!prefersReducedMotion()) {
    const firstSlide = slides[active];
    if (firstSlide) {
      animate(firstSlide, { opacity: [0, 1], y: [10, 0] }, { duration: 0.75, delay: 0.2, easing: [0.22, 1, 0.36, 1] }).then(() => {
        clearInlineStyles(firstSlide);
      });
    }
    if (label && line) {
      animate([label, line], { opacity: [0, 1], y: [10, 0] }, { duration: 0.6, delay: 0.35, easing: [0.22, 1, 0.36, 1] });
    }
  }

  startAuto();
}

function initNavDropdown() {
  document.querySelectorAll<HTMLDetailsElement>('.nav-details').forEach((details) => {
    details.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => details.removeAttribute('open'));
    });
  });
}

function init() {
  initLenis();
  initReveals();
  initCounters();
  initLightbox();
  initHeaderScroll();
  initNavActive();
  initNavDropdown();
  initMobileNav();
  initHeroStage();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

document.addEventListener('astro:page-load', init);
