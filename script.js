// Page data for different sections
const pageData = {
  work: {
    intro: `
      <p>
        Developer based in Brooklyn & Montreal.<br />
        Currently studying at
        <a href="https://www.mcgill.ca/study/2024-2025/faculties/arts/undergraduate/programs/bachelor-arts-ba-major-concentration-computer-science" target="_blank">
          McGill University
        </a>
      </p>
    `,
    cards: [
      {
        image: 'images/light-party.png',
        title: 'PartyPass',
        year: '2023-2024',
        tech: 'Django + Next.js',
        description: 'Full-stack event ticketing platform with Stripe Connect integration, QR validation, and real-time analytics.'
      }
    ]
  },
  projects: {
    intro: `
      <p>
        Personal projects and experiments.<br />
        Building with
        <a href="https://github.com/maxwellisaacs" target="_blank">
          open source tools
        </a>
      </p>
    `,
    cards: [
      {
        image: 'images/remy-photo.png',
        title: 'remy the rat',
        year: '2025',
        tech: 'rust',
        description: 'Remote access tool written in Rust with stealth mode, persistence, and live command streaming.'
      },
      {
        image: 'images/6502-photo.png',
        title: '6502 emulator',
        year: '2024–2025',
        tech: 'rust + asm',
        description: 'A rust based 6502 emulator with a simple assmebler'
      },
      {
        image: 'images/lin-alg-photo.gif',
        title: 'terrible linear algebra + neural network',
        year: '2024',
        tech: 'java',
        description: 'A java based linear algebra library I wrote in tandem with my linear algebra class.'
      },
      {
        image: 'images/mandelbrot-photo.png',
        title: 'mandelbrot visualization',
        year: '2024',
        tech: 'c + javascript',
        description: 'Two mandelbrot set visualizers, one written in p5.js and one written in C. Guess which one is faster lol.'
      },
      {
        image: 'images/podcast-photo.png',
        title: 'illegal Empire Podcast',
        year: '2023',
        tech: 'Research + Audio Production',
        description: 'Investigative podcast series examining how Latin American criminal networks infiltrate politics and industry. Featured conversations with leading academics on cartel economics, digital crime networks, and criminal governance.',
        link: 'https://maxwellisaacs.github.io/epd/index.html'
      },
      {
        image: 'images/6502_emulator_proj.png',
        title: 'chessDL',
        year: '2023',
        tech: 'C++',
        description: 'One of the ugliest (yet functional) versions of chess created using c++ & SDL'
      },
      {
        image: 'images/project3.jpg',
        title: 'huffman encoding',
        year: '2022',
        tech: 'Rust',
        description: 'A compression algorithm implementation using Huffman coding techniques.'
      }
    ]
  },
  dotfiles: {
    intro: `
      <p>
        Configuration files and development setup.<br />
        Optimized for
        <a href="https://github.com/maxwellisaacs" target="_blank">
          productivity and aesthetics
        </a>
      </p>
    `,
    cards: [
      {
        image: 'images/three-dots.png',
        title: 'arch linux setup',
        year: '2024',
        tech: 'arch + aur',
        description: 'Custom Arch Linux installation with optimized kernel and minimal bloat.'
      },
      {
        image: 'images/three-dots.png',
        title: 'sway + waybar',
        year: '2024',
        tech: 'wayland compositor',
        description: 'Tiling window manager for Wayland with custom status bar and keybindings.'
      },
      {
        image: 'images/three-dots.png',
        title: 'emacs configuration',
        year: '2024',
        tech: 'elisp + org-mode',
        description: 'Comprehensive Emacs setup with Evil mode, LSP, and literate configuration.'
      },
      {
        image: 'images/three-dots.png',
        title: 'shell environment',
        year: '2024',
        tech: 'zsh + tmux',
        description: 'Terminal setup with custom themes, aliases, and workflow automation.'
      }
    ]
  },
  contact: {
    intro: `
      <p>
        Let's connect and collaborate.<br />
        Reach out via
        <a href="mailto:maxwellisaacs@gmail.com">
          maxwellisaacs@gmail.com
        </a>
      </p>
    `,
    cards: []
  }
};

let currentPage = 'work';
let isTransitioning = false;
let isProjectView = false;
let returnToPage = 'work';

function createCardHTML(card) {
  return `
    <div class="project-card-wrapper">
      <div class="project-card" style="background-image: url('${card.image}');"></div>
      <div class="project-caption">
        <div class="project-caption-bar">
          <span class="caption-left">${card.title}</span>
          <span class="caption-center">${card.year}</span>
          <span class="caption-right">${card.tech}</span>
        </div>
        <p class="project-caption">${card.description}</p>
      </div>
    </div>
  `;
}

function updateActiveNav(newPage) {
  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.remove('active');
    if (item.dataset.page === newPage) {
      item.classList.add('active');
    }
  });
}

// Animation options: 'wave', 'flip', 'ripple'
let currentAnimation = 'wave';

function transitionToPage(newPage) {
  if (isTransitioning || newPage === currentPage) return;
  
  isTransitioning = true;
  document.body.classList.add('page-transitioning');
  
  const introContent = document.getElementById('intro-content');
  const projectGrid = document.getElementById('project-grid');
  const existingCards = document.querySelectorAll('.project-card-wrapper');
  
  // Start text fade out
  introContent.classList.add('text-experimental-out');
  
  // Start card exit animation based on current option
  existingCards.forEach((cardWrapper, index) => {
    cardWrapper.classList.add(`card-${currentAnimation}-exit`);
  });
  
  // Update navigation
  updateActiveNav(newPage);
  
  // Wait for exit animations to complete
  setTimeout(() => {
    // Update intro text
    introContent.innerHTML = pageData[newPage].intro;
    introContent.classList.remove('text-experimental-out');
    introContent.classList.add('text-experimental-in');
    
    // Clear existing cards
    projectGrid.innerHTML = '';
    
    // Special handling for contact page - hide projects section
    if (newPage === 'contact') {
      document.getElementById('dynamic-content').style.display = 'none';
    } else {
      document.getElementById('dynamic-content').style.display = '';
      // Add new cards with entrance animation
      pageData[newPage].cards.forEach((card, index) => {
        setTimeout(() => {
          const cardElement = document.createElement('div');
          cardElement.innerHTML = createCardHTML(card);
          const cardWrapper = cardElement.firstElementChild;
          cardWrapper.classList.add(`card-${currentAnimation}-enter`);
          projectGrid.appendChild(cardWrapper);
        }, index * 50);
      });
    }
    
    // Set up hover effects for new cards
    setTimeout(() => {
      setupCardHoverEffects();
    }, 600);
    
    // Clean up classes after all animations complete
    setTimeout(() => {
      introContent.classList.remove('text-experimental-in');
      document.querySelectorAll(`[class*="card-${currentAnimation}-"]`).forEach(card => {
        card.className = card.className.replace(new RegExp(`card-${currentAnimation}-(enter|exit)`, 'g'), '');
      });
      document.body.classList.remove('page-transitioning');
      isTransitioning = false;
    }, 800);
    
  }, 450); // Wait for exit animation
  
  currentPage = newPage;
}

// Function to switch animation types (for testing)
function setAnimationType(type) {
  if (['wave', 'flip', 'ripple'].includes(type)) {
    currentAnimation = type;
    console.log(`Animation switched to: ${type}`);
  }
}

function setupCardHoverEffects() {
  document.querySelectorAll('.project-card').forEach(card => {
    // Remove existing listeners by cloning the element
    const newCard = card.cloneNode(true);
    card.parentNode.replaceChild(newCard, card);
    
    // Add click listener to navigate to separate project pages
    newCard.addEventListener('click', () => {
      const cardWrapper = newCard.closest('.project-card-wrapper');
      const title = cardWrapper.querySelector('.caption-left')?.textContent;
      
      // Navigate to separate project pages
      if (title && title.toLowerCase().includes('partypass')) {
        window.location.href = 'partypass.html';
      } else if (title && title.toLowerCase().includes('6502')) {
        window.location.href = '6502-emulator.html';
      } else if (title && title.toLowerCase().includes('podcast')) {
        window.location.href = 'podcast.html';
      }
    });
    
    // Set up PartyPass animation
    const cardWrapper = newCard.closest('.project-card-wrapper');
    const title = cardWrapper?.querySelector('.caption-left')?.textContent;
    if (title && title.toLowerCase().includes('partypass')) {
      // Add the simple modern animation class
      newCard.classList.add('partypass-card');
      
      // Start the animation
      setTimeout(() => {
        newCard.classList.add('animate');
      }, 500);
    }
    
    newCard.addEventListener('mousemove', e => {
      const rect = newCard.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = -(y - centerY) / 100;
      const rotateY = (x - centerX) / 100;

      newCard.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    newCard.addEventListener('mouseleave', () => {
      newCard.style.transform = 'rotateX(0deg) rotateY(0deg)';
    });
    
    // Add cursor pointer for clickable cards
    if (title && (title.toLowerCase().includes('6502') || title.toLowerCase().includes('partypass') || title.toLowerCase().includes('podcast'))) {
      newCard.style.cursor = 'pointer';
    }
  });
}

// Removed overlay project detail system - now using separate pages

// Removed closeProjectDetail function - no longer needed with separate pages

// Removed setupProjectContent - now using separate pages

// Removed setupProjectScrollAnimation - now handled in individual project pages

// Removed scrollToTop - now handled in individual project pages

function capitalizeFirst(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function setupNavigation() {
  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const targetPage = item.dataset.page;
      transitionToPage(targetPage);
    });
  });
}

function setupScrollAnimation() {
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
}

function setupIconAnimations() {
  const icons = document.querySelectorAll('.animated-icon');

  function animateRandomIcon() {
    const available = Array.from(icons);
    const chosen = available[Math.floor(Math.random() * available.length)];

    const gif = chosen.dataset.gif;
    const png = chosen.dataset.png;
    chosen.src = gif;

    setTimeout(() => {
      chosen.src = png;
    }, 1000);
  }

  setInterval(animateRandomIcon, 3000);
}

// Interactive functions for PartyPass
function showInteractiveDemo() {
  alert('Interactive demo would open here - showing real ticket generation flow!');
}

function switchCodeTab(tab) {
  // Remove active class from all tabs and panels
  document.querySelectorAll('.code-tab-btn').forEach(btn => btn.classList.remove('active'));
  document.querySelectorAll('.code-panel').forEach(panel => panel.classList.remove('active'));
  
  // Add active class to clicked tab and corresponding panel
  event.target.classList.add('active');
  document.getElementById(tab + '-code').classList.add('active');
}

function highlightLayer(layer) {
  // Remove highlight from all layers
  document.querySelectorAll('.stack-layer').forEach(l => l.classList.remove('highlighted'));
  
  // Add highlight to clicked layer
  event.target.classList.add('highlighted');
  
  setTimeout(() => {
    event.target.classList.remove('highlighted');
  }, 2000);
}

function animateCounters() {
  const counters = document.querySelectorAll('.stat-number');
  
  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-target'));
    const increment = target / 100;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      
      if (counter.textContent.includes('$')) {
        counter.textContent = '$' + Math.floor(current).toLocaleString();
      } else if (counter.textContent.includes('%')) {
        counter.textContent = current.toFixed(1) + '%';
      } else {
        counter.textContent = Math.floor(current).toLocaleString() + '+';
      }
    }, 20);
  });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Load initial content for the work page
  const introContent = document.getElementById('intro-content');
  const projectGrid = document.getElementById('project-grid');
  
  // Set initial intro content
  introContent.innerHTML = pageData[currentPage].intro;
  
  // Load initial cards
  pageData[currentPage].cards.forEach((card, index) => {
    const cardElement = document.createElement('div');
    cardElement.innerHTML = createCardHTML(card);
    const cardWrapper = cardElement.firstElementChild;
    projectGrid.appendChild(cardWrapper);
  });
  
  setupCardHoverEffects();
  setupNavigation();
  setupScrollAnimation();
  setupIconAnimations();
});
