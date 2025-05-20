document.addEventListener('DOMContentLoaded', () => {
  // 1. Mouse tilt effect for project cards
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = -(y - centerY) / 150;
      const rotateY = (x - centerX) / 150;

      card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'rotateX(0deg) rotateY(0deg)';
    });
  });

  // 2. Fade-in .projects section when it scrolls into view
  const section = document.querySelector('.projects');

  const revealOnScroll = () => {
    const triggerBottom = window.innerHeight * 0.85;
    const sectionTop = section.getBoundingClientRect().top;

    if (sectionTop < triggerBottom) {
      section.classList.add('visible');
      window.removeEventListener('scroll', revealOnScroll); // Only run once
    }
  };

  window.addEventListener('scroll', revealOnScroll);
 // revealOnScroll(); // Run once in case already in view on load
});
