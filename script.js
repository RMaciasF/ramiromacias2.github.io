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
  { acronym: 'A+',  name: 'CompTIA A+', status: 'done', image: 'badges/A+.png',
    url: 'https://www.credly.com/badges/0e99e77c-e457-415a-ab83-3a55c8a07719' },
  { acronym: 'CCNA',  name: 'Cisco Certified Network Associate', status: 'in-progress', image: 'badges/CCNA.png',
    url: '' },
  { acronym: 'eJPT',   name: 'INE eJPT', status: 'done', image: 'badges/eJPT.svg',
    url: 'https://certs.ine.com/71c5d2aa-9503-46b1-829b-a6307f0f7067#acc.IAZ246Kn' },
   { acronym: 'CySA+',  name: 'CompTIA CySA+', status: 'done', image: 'badges/CySA+.png',
    url: 'https://www.credly.com/badges/1a16b760-e1b2-418c-8756-26edb78af781' },
   { acronym: 'OSCP',  name: 'Offsec Certified Professional', status: 'in-progress', image: 'badges/OSCP.png',
    url: 'https://www.credly.com/badges/0e99e77c-e457-415a-ab83-3a55c8a07719' },
   { acronym: 'Pentest+',  name: 'CompTIA Pentest+', status: 'done', image: 'badges/Pentest+.png',
    url: 'https://www.credly.com/badges/4a4a39b2-53d4-452e-934f-eae9ca1048ca' },
   { acronym: 'CCSK',  name: 'Certificate of Cloud Security Knowledg', status: 'done', image: 'badges/CCSK.png',
    url: 'https://www.credly.com/badges/01291845-f6b2-48db-97fd-b284561694f5' },
  { acronym: 'Security+',   name: 'CompTIA Security+', status: 'done', image: 'badges/Security+.png',
    url: 'https://www.credly.com/badges/4037d0a9-6790-4b8c-b04c-b374d5ec27c9' },
  { acronym: 'CEH (Practical)',   name: 'Certified Ethical Hacker (Practical)', status: 'done', image: 'badges/ceh practical.png',
    url: 'https://aspen.eccouncil.org/VerifyBadge?type=certification&a=YoXmFJcgHlD9WFZZGFJfDRPWKCFabqAIfw5ppIMq8yc=' },
    { acronym: 'SecurityX',  name: 'CompTIA SecurityX', status: 'done', image: 'badges/SecurityX.png',
    url: 'https://www.credly.com/badges/fa441899-f433-4bee-8b5e-84b71be45f95' },
  { acronym: 'eWPT',   name: 'INE eWPT', status: 'done', image: 'badges/eWPT.svg',
    url: 'https://certs.ine.com/43193ba4-0982-41ef-bd27-111d1d4157ab#acc.bh9NSqUL' },
    { acronym: 'CPTS',  name: 'HTB Certified Penetration Testing Specialist', status: 'in-progress', image: 'badges/CPTS.png',
    url: '' },
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
