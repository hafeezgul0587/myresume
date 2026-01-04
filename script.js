// Initialize AOS (Animate on Scroll)
AOS.init({ duration: 800, once: true, easing: 'ease-out-cubic' });

// Animate the skill progress fills when elements appear
function animateSkills() {
    document.querySelectorAll('.skill').forEach((el, i) => {
        const pct = el.getAttribute('data-skill') || 80;
        const fill = el.querySelector('.fill');
        // staggered timeout to sync with AOS delays
        const delay = (el.getAttribute('data-aos-delay') | 0) + 200;
        setTimeout(() => { fill.style.width = pct + '%'; }, delay);
    });
}

// Timeline intersection to toggle 'show' class for animation
function observeTimeline() {
    const items = document.querySelectorAll('#experience .timeline-item');
    const obs = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, { threshold: 0.2 });
    items.forEach(it => obs.observe(it));
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    animateSkills();
    observeTimeline();
    document.addEventListener('aos:in', ({ detail }) => { animateSkills(); });
});

// Small enhancement: stagger timeline item show class for nicer entrance
(function staggerTimeline() {
    const items = Array.from(document.querySelectorAll('#experience .timeline-item'));
    const obs = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const idx = items.indexOf(entry.target);
                setTimeout(() => entry.target.classList.add('show'), idx * 120);
            }
        });
    }, { threshold: 0.2 });
    items.forEach(it => obs.observe(it));
})();

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
