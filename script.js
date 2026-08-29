// ============================================================
// Mobile nav toggle
// ============================================================
const navToggleBtn = document.getElementById('navToggle');
const nav = document.querySelector('.nav');

navToggleBtn.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  navToggleBtn.setAttribute('aria-expanded', String(isOpen));
});

const navLinks = document.querySelectorAll('.nav-links a');
for (let i = 0; i < navLinks.length; i++) {
  navLinks[i].addEventListener('click', () => {
    nav.classList.remove('open');
    navToggleBtn.setAttribute('aria-expanded', 'false');
  });
}

// ============================================================
// Topic filter — simple show/hide, no fetch, no animation
// ============================================================
const topicPills = document.querySelectorAll('.topic-pill');
const articleCards = document.querySelectorAll('.article-card');

for (let i = 0; i < topicPills.length; i++) {
  topicPills[i].addEventListener('click', function () {
    for (let j = 0; j < topicPills.length; j++) topicPills[j].classList.remove('active');
    this.classList.add('active');

    const topic = this.dataset.topic;
    for (let k = 0; k < articleCards.length; k++) {
      const card = articleCards[k];
      const show = topic === 'all' || card.dataset.topic === topic;
      card.classList.toggle('is-hidden', !show);
    }
  });
}

// ============================================================
// Certification badges — sliding marquee, hover-to-scrub
// ============================================================
const CERTS = [
  { acronym: 'WX-1',  name: 'Web Exploitation Track', status: 'done', image: 'badges/wx1.svg',
    url: 'https://www.credly.com/badges/00000000-0000-0000-0000-000000000001' },
  { acronym: 'RTOP',  name: 'Red Team Operator Program', status: 'in-progress', image: 'badges/rtop.svg',
    url: '' },
  { acronym: 'CSF',   name: 'Cloud Pentest Foundations', status: 'done', image: 'badges/csf.svg',
    url: 'https://www.credly.com/badges/00000000-0000-0000-0000-000000000002' },
  { acronym: 'POS',   name: 'Practical Offensive Security — Full Course', status: 'done', image: 'badges/pos.svg',
    url: 'https://www.credly.com/badges/00000000-0000-0000-0000-000000000003' },
  { acronym: 'DEP',   name: 'Detection Engineering — SIEM &amp; Threat Hunting', status: 'done', image: 'badges/dep.svg',
    url: 'https://www.credly.com/badges/00000000-0000-0000-0000-000000000004' },
];

// Fallback shown inline if a badge image file is missing (404) — keeps the
// layout intact instead of showing a broken-image icon.
function badgeFallbackSVG(acronym) {
  return `
<svg viewBox="0 0 90 90" width="68" height="68" xmlns="http://www.w3.org/2000/svg">
  <circle cx="45" cy="45" r="40" fill="none" stroke="currentColor" stroke-width="2" stroke-dasharray="3 4" opacity="0.6"/>
  <circle cx="45" cy="45" r="31" fill="none" stroke="currentColor" stroke-width="2"/>
  <text x="45" y="49" text-anchor="middle" font-family="monospace" font-size="12" font-weight="700" fill="currentColor">${acronym}</text>
</svg>`;
}

window.__badgeImgFallback = function (img, acronym) {
  const span = document.createElement('span');
  span.className = 'badge-fallback';
  span.innerHTML = badgeFallbackSVG(acronym);
  img.replaceWith(span);
};

function renderBadgeMarquee(certs) {
  const container = document.createElement('div');
  container.className = 'badge-marquee';
  container.tabIndex = 0;
  container.setAttribute(
    'aria-label',
    'Certification badges. Hover and move your mouse left or right to scrub through them, or leave it alone to auto-scroll.'
  );

  const track = document.createElement('div');
  track.className = 'badge-track';

  const itemsHTML = certs.map(c => {
    const media = `
      <img
        class="badge-img"
        src="${c.image}"
        alt="${c.name} badge"
        loading="lazy"
        onerror="window.__badgeImgFallback(this, '${c.acronym}')"
      >
      <span class="badge-label">${c.name}</span>
    `;
    const inner = c.url
      ? `<a class="badge-link" href="${c.url}" target="_blank" rel="noopener noreferrer" aria-label="View ${c.name} credential on Credly">${media}</a>`
      : `<span class="badge-link badge-link-inert" aria-label="${c.name} — credential not yet issued">${media}</span>`;
    return `<div class="badge-item ${c.status === 'in-progress' ? 'in-progress' : ''}">${inner}</div>`;
  }).join('');

  // Start with two copies (minimum for a seamless -50% auto-scroll loop),
  // then keep adding pairs until the track is comfortably wider than the
  // container — otherwise there's no room left to scrub on a wide page.
  let copies = 2;
  track.innerHTML = itemsHTML.repeat(copies);
  container.appendChild(track);

  requestAnimationFrame(() => {
    const containerWidth = container.clientWidth || 1;
    let guard = 0;
    while (track.scrollWidth / 2 < containerWidth * 1.5 && guard < 10) {
      copies += 2;
      track.innerHTML = itemsHTML.repeat(copies);
      guard++;
    }
  });

  // Mouse-driven scrubbing: while hovering, the track's horizontal position
  // tracks the cursor directly instead of auto-scrolling.
  let hovering = false;

  function scrubTo(clientX) {
    const rect = container.getBoundingClientRect();
    const pct = Math.min(Math.max((clientX - rect.left) / rect.width, 0), 1);
    const maxShift = Math.max(track.scrollWidth / 2 - rect.width, 0);
    track.style.transform = `translateX(${-pct * maxShift}px)`;
  }

  container.addEventListener('mouseenter', (e) => {
    hovering = true;
    track.style.animation = 'none';
    scrubTo(e.clientX);
  });
  container.addEventListener('mousemove', (e) => {
    if (hovering) scrubTo(e.clientX);
  });
  container.addEventListener('mouseleave', () => {
    hovering = false;
    track.style.animation = '';
    track.style.transform = '';
  });

  return container;
}

const certMount = document.getElementById('certBadgeMount');
if (certMount) {
  certMount.appendChild(renderBadgeMarquee(CERTS));
}
