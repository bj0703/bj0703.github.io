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

const navLinks = [...document.querySelectorAll('nav a[href^="#"]')];
const sections = [...document.querySelectorAll('#projects, #timeline, #about')];
let navigationUpdatePending = false;

function updateNavigation() {
  const activeSection = sections.filter((section) => section.getBoundingClientRect().top <= window.innerHeight * 0.35).pop();
  navLinks.forEach((link) => {
    if (activeSection && link.hash === `#${activeSection.id}`) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
  navigationUpdatePending = false;
}

function scheduleNavigationUpdate() {
  if (navigationUpdatePending) return;
  navigationUpdatePending = true;
  window.requestAnimationFrame(updateNavigation);
}

window.addEventListener('scroll', scheduleNavigationUpdate, { passive: true });
window.addEventListener('resize', scheduleNavigationUpdate);
updateNavigation();
