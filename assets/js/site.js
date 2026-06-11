// Shared behaviour for all portfolio pages: theme, menu, reveal, filters.
(function () {
    const root = document.documentElement;

    // ----- Theme (persisted, respects system preference) -----
    const stored = localStorage.getItem('theme');
    if (stored) root.setAttribute('data-theme', stored);
    else if (window.matchMedia('(prefers-color-scheme: light)').matches) root.setAttribute('data-theme', 'light');

    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            root.setAttribute('data-theme', next);
            localStorage.setItem('theme', next);
        });
    }

    // ----- Mobile menu -----
    const mobileToggle = document.getElementById('mobileToggle');
    const navLinks = document.getElementById('navLinks');
    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', () => navLinks.classList.toggle('active'));
        navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('active')));
    }

    // ----- Header border on scroll -----
    const header = document.getElementById('header');
    if (header) {
        const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 20);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
    }

    // ----- Reveal on scroll -----
    const reveals = document.querySelectorAll('.reveal');
    if (reveals.length) {
        const io = new IntersectionObserver((entries) => {
            entries.forEach(e => {
                if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
        reveals.forEach(el => io.observe(el));
    }

    // ----- Project filters -----
    const filterBtns = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('#projectsGrid .project-card');
    if (filterBtns.length && cards.length) {
        filterBtns.forEach(btn => btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const f = btn.dataset.filter;
            cards.forEach(c => {
                const show = f === 'all' || c.dataset.category.includes(f);
                c.style.display = show ? '' : 'none';
            });
        }));
    }
})();
