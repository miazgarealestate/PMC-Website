// PMC Build — project photo gallery lightbox
document.addEventListener('DOMContentLoaded', () => {
  const items = Array.from(document.querySelectorAll('.gallery-item'));
  if (!items.length) return;

  const photos = items.map(el => ({
    src: el.dataset.full || el.querySelector('img').src,
    stage: el.dataset.stage || '',
    caption: el.dataset.caption || ''
  }));

  const lightbox = document.createElement('div');
  lightbox.className = 'lightbox';
  lightbox.innerHTML = `
    <button class="lightbox-close" aria-label="Close">&times;</button>
    <button class="lightbox-prev" aria-label="Previous photo">&#8249;</button>
    <div class="lightbox-stage"><img alt=""></div>
    <button class="lightbox-next" aria-label="Next photo">&#8250;</button>
    <div class="lightbox-caption">
      <span class="stage-tag"></span>
      <p></p>
      <div class="lightbox-counter"></div>
    </div>
  `;
  document.body.appendChild(lightbox);

  const img = lightbox.querySelector('.lightbox-stage img');
  const stageTag = lightbox.querySelector('.stage-tag');
  const captionP = lightbox.querySelector('.lightbox-caption p');
  const counter = lightbox.querySelector('.lightbox-counter');
  let current = 0;

  function show(i) {
    current = (i + photos.length) % photos.length;
    const p = photos[current];
    img.src = p.src;
    img.alt = p.caption || '';
    stageTag.textContent = p.stage;
    stageTag.style.display = p.stage ? 'block' : 'none';
    captionP.textContent = p.caption;
    counter.textContent = `${current + 1} / ${photos.length}`;
  }

  function open(i) {
    show(i);
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function close() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  items.forEach((el, i) => {
    el.addEventListener('click', () => open(i));
  });

  lightbox.querySelector('.lightbox-close').addEventListener('click', close);
  lightbox.querySelector('.lightbox-prev').addEventListener('click', () => show(current - 1));
  lightbox.querySelector('.lightbox-next').addEventListener('click', () => show(current + 1));
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) close();
  });
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') show(current - 1);
    if (e.key === 'ArrowRight') show(current + 1);
  });
});
