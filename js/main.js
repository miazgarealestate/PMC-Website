// PMC Build — shared site behavior (mobile nav)
document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('.nav');
  const links = document.querySelector('.nav .links');
  if (!nav || !links) return;

  const toggle = document.createElement('button');
  toggle.className = 'menu-toggle';
  toggle.setAttribute('aria-label', 'Toggle menu');
  toggle.innerHTML = '&#9776;';

  const cta = nav.querySelector('.nav-cta');
  nav.insertBefore(toggle, cta);

  const panel = document.createElement('div');
  panel.className = 'mobile-panel';
  panel.innerHTML = links.innerHTML;
  document.body.appendChild(panel);

  const style = document.createElement('style');
  style.textContent = `
    .mobile-panel{
      display:none;
      position:fixed; top:73px; left:0; right:0; z-index:49;
      background:rgba(13,12,11,0.98);
      border-bottom:1px solid var(--line-strong, rgba(242,237,227,0.18));
      flex-direction:column;
      padding:10px 32px 24px;
    }
    .mobile-panel.open{display:flex;}
    .mobile-panel a{
      font-family:var(--mono, monospace);
      font-size:0.85rem;
      letter-spacing:0.05em;
      text-transform:uppercase;
      color:var(--stone, #f2ede3);
      padding:14px 0;
      border-bottom:1px solid var(--line, rgba(242,237,227,0.1));
    }
  `;
  document.head.appendChild(style);

  toggle.addEventListener('click', () => {
    panel.classList.toggle('open');
  });
});
