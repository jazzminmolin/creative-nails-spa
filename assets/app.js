const header = document.querySelector('.site-header');
const menu = document.querySelector('.menu');
const nav = document.querySelector('nav');

menu?.addEventListener('click', () => {
  const open = header.classList.toggle('open');
  menu.setAttribute('aria-expanded', String(open));
  document.body.classList.toggle('menu-open', open);
});

nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  header.classList.remove('open');
  menu?.setAttribute('aria-expanded', 'false');
  document.body.classList.remove('menu-open');
}));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px' });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

window.addEventListener('scroll', () => {
  header?.classList.toggle('scrolled', window.scrollY > 24);
}, { passive: true });

window.addEventListener('load', () => {
  document.body.classList.add('loaded');
});

if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.querySelectorAll('.reveal').forEach(el => el.classList.add('show'));
}

const lightbox = document.querySelector('#galleryLightbox');
const lightboxImage = lightbox?.querySelector('img');
const lightboxCaption = lightbox?.querySelector('p');
const lightboxClose = lightbox?.querySelector('.lightbox-close');

function openLightbox(item) {
  if (!lightbox || !lightboxImage || !item) return;
  const source = item.dataset.lightbox;
  const image = item.querySelector('img');
  const caption = item.querySelector('figcaption')?.textContent?.trim() || '';
  lightboxImage.src = source;
  lightboxImage.alt = image?.alt || 'Expanded nail design';
  if (lightboxCaption) lightboxCaption.textContent = caption;
  lightbox.classList.add('open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.classList.add('lightbox-open');
  lightboxClose?.focus();
}

function closeLightbox() {
  if (!lightbox) return;
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('lightbox-open');
  if (lightboxImage) lightboxImage.src = '';
}

document.querySelectorAll('[data-lightbox]').forEach(item => {
  item.addEventListener('click', () => openLightbox(item));
  item.addEventListener('keydown', event => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openLightbox(item);
    }
  });
});

lightboxClose?.addEventListener('click', closeLightbox);
lightbox?.addEventListener('click', event => {
  if (event.target === lightbox) closeLightbox();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && lightbox?.classList.contains('open')) closeLightbox();
});
