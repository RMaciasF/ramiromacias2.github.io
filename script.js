// ============================================================
// Mobile nav toggle
// ============================================================
const navToggle = document.getElementById('navToggle');
const nav = document.querySelector('.nav');

navToggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// ============================================================
// Topic filter — simple show/hide, no fetch, no animation
// ============================================================
const topicPills = document.querySelectorAll('.topic-pill');
const articleCards = document.querySelectorAll('.article-card');

topicPills.forEach(pill => {
  pill.addEventListener('click', () => {
    topicPills.forEach(p => p.classList.remove('active'));
    pill.classList.add('active');

    const topic = pill.dataset.topic;
    articleCards.forEach(card => {
      const show = topic === 'all' || card.dataset.topic === topic;
      card.classList.toggle('is-hidden', !show);
    });
  });
});
