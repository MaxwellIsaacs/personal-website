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
        image: 'images/6502-photo.png',
        title: '6502 emulator',
        year: '2024–2025',
        tech: 'rust + asm',
        description: 'A rust based 6502 emulator with a simple assmebler'
      },
      {
        image: 'images/.png',
        title: 'terrible linear algebra + neural network',
        year: '2024',
        tech: 'java',
        description: 'A java based linear algebra library I wrote in tandem with my linear algebra class.'
      },
      {
        image: 'images/remy-photo.png',
        title: 'remy the rat',
        year: '2025',
        tech: 'rust',
        description: 'Remote access tool written in Rust with stealth mode, persistence, and live command streaming.'
      },
      {
        image: 'images/6502_emulator_proj.png',
        title: 'chessDL',
        year: '2023',
        tech: 'C++',
        description: 'One of the ugliest (yet functional) versions of chess created using c++ & SDL'
      },
      {
        image: 'images/mandelbrot-photo.png',
        title: 'mandelbrot visualization',
        year: '2024',
        tech: 'c + javascript',
        description: 'Two mandelbrot set visualizers, one written in p5.js and one written in C. Guess which one is faster lol.'
      },
      {
        image: 'images/project3.jpg',
        title: 'huffman encoding',
        year: '2024',
        tech: 'Rust',
        description: 'A compression algorithm implementation using Huffman coding techniques.'
      }
    ]
  },
  projects: {
    intro: `
      <p>
        Personal projects and experiments.<br />
        Exploring different technologies and
        <a href="#" target="_blank">
          creative solutions
        </a>
      </p>
    `,
    cards: [
      {
        image: 'images/mandelbrot-photo.png',
        title: 'fractal explorer',
        year: '2024',
        tech: 'webgl + javascript',
        description: 'Interactive fractal visualization with real-time zoom and color mapping.'
      },
      {
        image: 'images/remy-photo.png',
        title: 'network scanner',
        year: '2024',
        tech: 'python',
        description: 'Ethical network discovery tool for security research and education.'
      },
      {
        image: 'images/6502-photo.png',
        title: 'retro game engine',
        year: '2023',
        tech: 'c++ + sdl',
        description: 'Simple 2D game engine built from scratch with sprite animation support.'
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
    
    // Add click listener for project detail page
    newCard.addEventListener('click', () => {
      const cardWrapper = newCard.closest('.project-card-wrapper');
      const title = cardWrapper.querySelector('.caption-left')?.textContent;
      
      // Only open project detail for 6502 emulator for now
      if (title && title.toLowerCase().includes('6502')) {
        openProjectDetail();
      }
    });
    
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
    const cardWrapper = newCard.closest('.project-card-wrapper');
    const title = cardWrapper?.querySelector('.caption-left')?.textContent;
    if (title && title.toLowerCase().includes('6502')) {
      newCard.style.cursor = 'pointer';
    }
  });
}

function openProjectDetail() {
  if (isTransitioning) return;
  
  isTransitioning = true;
  isProjectView = true;
  returnToPage = currentPage;
  
  const projectDetail = document.getElementById('project-detail');
  const bottomNav = document.getElementById('bottomNav');
  
  // Set up project content
  setupProjectContent();
  
  // Transform navigation to back button
  bottomNav.classList.add('nav-back-mode');
  bottomNav.innerHTML = `
    <a href="#" class="nav-back" id="navBack">
      ← Back to ${capitalizeFirst(returnToPage)}
    </a>
  `;
  
  // Show project detail page
  projectDetail.classList.add('active');
  
  // Set up back button listener
  document.getElementById('navBack').addEventListener('click', (e) => {
    e.preventDefault();
    closeProjectDetail();
  });
  
  setTimeout(() => {
    isTransitioning = false;
  }, 500);
}

function closeProjectDetail() {
  if (isTransitioning) return;
  
  isTransitioning = true;
  isProjectView = false;
  
  const projectDetail = document.getElementById('project-detail');
  const bottomNav = document.getElementById('bottomNav');
  
  // Hide project detail page
  projectDetail.classList.remove('active');
  
  // Restore normal navigation
  bottomNav.classList.remove('nav-back-mode');
  bottomNav.innerHTML = `
    <a href="#" class="nav-item ${returnToPage === 'work' ? 'active' : ''}" data-page="work">Work</a>
    <a href="#" class="nav-item ${returnToPage === 'projects' ? 'active' : ''}" data-page="projects">Projects</a>
    <a href="#" class="nav-item ${returnToPage === 'dotfiles' ? 'active' : ''}" data-page="dotfiles">Dotfiles</a>
    <a href="#" class="nav-item ${returnToPage === 'contact' ? 'active' : ''}" data-page="contact">Contact</a>
  `;
  
  // Re-setup navigation
  setupNavigation();
  
  setTimeout(() => {
    isTransitioning = false;
  }, 500);
}

function setupProjectContent() {
  const projectDetail = document.getElementById('project-detail');
  projectDetail.innerHTML = `
    <div class="project-detail-content">
      <div class="project-sidebar">
        <div class="project-number">002.24</div>
        
        <div class="project-nav-info">
          <h3>Type</h3>
          <p>System emulation<br>& low-level programming</p>
          
          <h3>Status</h3>
          <p>Active development<br>Proof of concept complete</p>
          
          <h3>Approach</h3>
          <p>Cycle-accurate implementation<br>Modern tooling integration</p>
        </div>
        
        <div class="project-meta">
          <div class="project-meta-item">
            <div class="project-meta-label">Language</div>
            <div class="project-meta-value">Rust</div>
          </div>
          <div class="project-meta-item">
            <div class="project-meta-label">Platform</div>
            <div class="project-meta-value">Cross-platform</div>
          </div>
          <div class="project-meta-item">
            <div class="project-meta-label">Architecture</div>
            <div class="project-meta-value">MOS 6502</div>
          </div>
          <div class="project-meta-item">
            <div class="project-meta-label">Started</div>
            <div class="project-meta-value">Dec 2024</div>
          </div>
        </div>
      </div>
      
      <div class="project-main">
        <h1 class="project-title">6502<br>Emulator</h1>
        <p class="project-subtitle">Recreating the legendary microprocessor that powered a generation of computers</p>
        
        <div class="project-body">
          <p>The MOS Technology 6502 microprocessor powered some of the most influential computers in history—from the Apple II to the Commodore 64, and even the original Nintendo Entertainment System.</p>
          
          <p>This emulator reconstructs the 6502's behavior with cycle-level accuracy, capturing not just the instruction set but the precise timing and quirks that made the original hardware unique.</p>
          
          <h2>Technical approach</h2>
          <p>Built from the ground up in Rust, emphasizing both performance and correctness. The emulator includes comprehensive test suites that validate behavior against documented hardware specifications and real-world edge cases.</p>
          
          <div class="project-features">
            <div class="project-feature-item">
              <div class="project-feature-title">Instruction Set</div>
              <div class="project-feature-desc">Complete implementation of all 151 legal opcodes plus undocumented instructions</div>
            </div>
            <div class="project-feature-item">
              <div class="project-feature-title">Memory Model</div>
              <div class="project-feature-desc">Flexible addressing with support for ROM, RAM, and memory-mapped peripherals</div>
            </div>
            <div class="project-feature-item">
              <div class="project-feature-title">Assembler</div>
              <div class="project-feature-desc">Custom assembler with macro support and modern development experience</div>
            </div>
            <div class="project-feature-item">
              <div class="project-feature-title">Debugging</div>
              <div class="project-feature-desc">Real-time inspection of registers, memory, and execution flow</div>
            </div>
          </div>
          
          <div class="project-code">; Example: Simple multiplication routine
LDA #$05    ; Load multiplier
STA $00     ; Store in zero page
LDA #$03    ; Load multiplicand  
STA $01     ; Store in zero page

LDX #$00    ; Clear result
LDY $00     ; Load counter

loop:
  CLC       ; Clear carry
  TXA       ; Transfer result to A
  ADC $01   ; Add multiplicand
  TAX       ; Store back to result
  DEY       ; Decrement counter
  BNE loop  ; Continue if not zero

STX $02     ; Store final result</div>
          
          <h2>Architecture</h2>
          <p>The emulator's modular design separates concerns between CPU execution, memory management, and I/O handling. This allows for easy extension to complete system emulation.</p>
          
          <p>Rust's type system ensures memory safety while maintaining the performance characteristics necessary for real-time emulation of vintage systems.</p>
          
          <div class="project-links">
            <a href="#" class="project-link">View source</a>
            <a href="#" class="project-link">Live demo</a>
            <a href="#" class="project-link">Documentation</a>
          </div>
        </div>
      </div>
      
      <div class="project-margin"></div>
    </div>
  `;
}

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

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  setupCardHoverEffects();
  setupNavigation();
  setupScrollAnimation();
  setupIconAnimations();
});