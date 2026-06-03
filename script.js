function handleSubmit(){
  const fname = document.getElementById('fname').value.trim();
  const email = document.getElementById('cemail').value.trim();
  const message = document.getElementById('message').value.trim();
  if(!fname || !email || !message){ alert('Please fill in your name, email, and message.'); return; }
  document.getElementById('contactForm').style.display = 'none';
  document.getElementById('formSuccess').style.display = 'block';
}

const obs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if(e.isIntersecting){ e.target.classList.add('up'); obs.unobserve(e.target); }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

// nav shrink
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
  nav.style.boxShadow = window.scrollY > 40 ? '0 1px 20px rgba(0,0,0,0.06)' : 'none';
});

// Mobile nav toggle + Active navigation underline
(function initNavigation() {
  const toggleBtn = document.querySelector('.nav-toggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileLinks = mobileMenu ? mobileMenu.querySelectorAll('.nav-link') : [];
  const desktopLinks = document.querySelectorAll('.nav-links .nav-link');
  const allLinks = [...desktopLinks, ...mobileLinks];

  function setMenuOpen(isOpen) {
    if (!toggleBtn || !mobileMenu) return;

    if (isOpen) {
      mobileMenu.hidden = false;
      mobileMenu.classList.add('is-open');
      toggleBtn.setAttribute('aria-expanded', 'true');
    } else {
      mobileMenu.classList.remove('is-open');
      toggleBtn.setAttribute('aria-expanded', 'false');
      // after transition, actually hide
      setTimeout(() => {
        mobileMenu.hidden = true;
      }, 220);
    }
  }

  if (toggleBtn && mobileMenu) {
    toggleBtn.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.contains('is-open');
      setMenuOpen(!isOpen);
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') setMenuOpen(false);
    });

    // Close when clicking a link (mobile)
    [...mobileLinks].forEach((link) => {
      link.addEventListener('click', () => setMenuOpen(false));
    });
  }

  function setActiveLinkByHash(hash) {
    const cleanHash = (hash || '').replace('#', '');
    allLinks.forEach((a) => a.classList.remove('is-active'));
    if (!cleanHash) return;

    allLinks.forEach((a) => {
      const aHash = (a.getAttribute('href') || '').replace('#', '');
      if (aHash === cleanHash) a.classList.add('is-active');
    });
  }

  // Initial active state + updates on hash changes
  setActiveLinkByHash(window.location.hash);
  window.addEventListener('hashchange', () => setActiveLinkByHash(window.location.hash));

  // Update active underline based on current section in view
  const sectionIds = ['services', 'projects', 'process', 'experience', 'contact'];
  const sections = sectionIds
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => (b.intersectionRatio || 0) - (a.intersectionRatio || 0))[0];
      if (visible && visible.target && visible.target.id) {
        setActiveLinkByHash('#' + visible.target.id);
      }
    },
    { threshold: [0.2, 0.35, 0.5], rootMargin: '-15% 0px -65% 0px' }
  );

  sections.forEach((s) => sectionObserver.observe(s));
})();

