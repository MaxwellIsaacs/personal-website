document.addEventListener('DOMContentLoaded', () => {
  // Tilt only the image tile
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = -(y - centerY) / 100;
      const rotateY = (x - centerX) / 100;

      card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'rotateX(0deg) rotateY(0deg)';
    });
  });

  // Optional: reveal-on-scroll animation for projects section
  const section = document.querySelector('.projects');
  const revealOnScroll = () => {
    const triggerBottom = window.innerHeight * 0.85;
    const sectionTop = section.getBoundingClientRect().top;

    if (sectionTop < triggerBottom) {
      section.classList.add('visible');
      window.removeEventListener('scroll', revealOnScroll);
    }
  };

  window.addEventListener('scroll', revealOnScroll);
});

document.addEventListener('DOMContentLoaded', () => {
  const icons = document.querySelectorAll('.animated-icon');

  function animateRandomIcon() {
    const available = Array.from(icons);
    const chosen = available[Math.floor(Math.random() * available.length)];

    // Swap to GIF
    const gif = chosen.dataset.gif;
    const png = chosen.dataset.png;
    chosen.src = gif;

    // Swap back after a short while
    setTimeout(() => {
      chosen.src = png;
    }, 1000); // Show GIF for 1 second
  }

  // Periodically trigger animation one at a time
  setInterval(animateRandomIcon, 3000); // Every 3 seconds, one icon animates
});
