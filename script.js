const dialog = document.querySelector('.preview-dialog');
const dialogImage = dialog?.querySelector('.dialog-image');
const dialogCaption = dialog?.querySelector('#preview-caption');
let previewTrigger = null;

if (dialog && typeof dialog.showModal === 'function') {
  document.querySelectorAll('[data-preview]').forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      previewTrigger = link;
      dialogImage.src = link.href;
      dialogImage.alt = link.querySelector('img').alt;
      dialogCaption.textContent = link.dataset.caption;
      dialog.showModal();
      document.body.classList.add('preview-open');
    });
  });
  dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (event) => {
    const bounds = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) dialog.close();
  });
  dialog.addEventListener('close', () => {
    document.body.classList.remove('preview-open');
    previewTrigger?.focus({ preventScroll: true });
  });
}

if ('IntersectionObserver' in window) {
  const navLinks = [...document.querySelectorAll('nav a[href^="#"]')];
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => {
        if (link.hash === `#${entry.target.id}`) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    });
  }, { rootMargin: '-15% 0px -65% 0px', threshold: 0 });
  document.querySelectorAll('#projects, #timeline, #about').forEach((section) => observer.observe(section));
  const heroObserver = new IntersectionObserver((entries) => {
    if (entries.some((entry) => entry.isIntersecting)) navLinks.forEach((link) => link.removeAttribute('aria-current'));
  });
  heroObserver.observe(document.querySelector('.hero'));
}
