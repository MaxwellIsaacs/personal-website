// Master script - shared functionality across all pages

// Page data consolidated from individual modules
const pageData = {
  work: null,      // Will be populated by work.js
  projects: null,  // Will be populated by projects.js
  dotfiles: null,  // Will be populated by dotfiles.js
  contact: null    // Will be populated by contact.js
};

// Global state variables
let currentPage = 'work';
let isTransitioning = false;
let isProjectView = false;
let returnToPage = 'work';

// Animation options: 'wave', 'flip', 'ripple'
let currentAnimation = 'wave';

// Initialize page data from modules
function initializePageData() {
  if (window.workPageData) pageData.work = window.workPageData;
  if (window.projectsPageData) pageData.projects = window.projectsPageData;
  if (window.dotfilesPageData) pageData.dotfiles = window.dotfilesPageData;
  if (window.contactPageData) pageData.contact = window.contactPageData;
}

// Card HTML creation
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

// Navigation management
function updateActiveNav(newPage) {
  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.remove('active');
    if (item.dataset.page === newPage) {
      item.classList.add('active');
    }
  });
}

// Page transitions
function transitionToPage(newPage) {
  if (isTransitioning || newPage === currentPage) return;
  
  isTransitioning = true;
  document.body.classList.add('page-transitioning');
  
  // Scroll to top when switching tabs
  window.scrollTo({ top: 0, behavior: 'smooth' });
  
  const introContent = document.getElementById('intro-content');
  const projectGrid = document.getElementById('project-grid');
  const existingCards = document.querySelectorAll('.project-card-wrapper');
  
  // Start text fade out
  introContent.classList.add('text-experimental-out');
  
  // Start card exit animation based on current option (skip for dotfiles)
  existingCards.forEach((cardWrapper, index) => {
    if (newPage !== 'dotfiles') {
      cardWrapper.classList.add(`card-${currentAnimation}-exit`);
    }
  });
  
  // Update navigation
  updateActiveNav(newPage);
  
  // Update current page immediately so project clicks work correctly
  currentPage = newPage;
  
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
      // Add new cards with entrance animation (skip for dotfiles)
      pageData[newPage].cards.forEach((card, index) => {
        setTimeout(() => {
          const cardElement = document.createElement('div');
          cardElement.innerHTML = createCardHTML(card);
          const cardWrapper = cardElement.firstElementChild;
          if (newPage !== 'dotfiles') {
            cardWrapper.classList.add(`card-${currentAnimation}-enter`);
          }
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
}

// Function to switch animation types (for testing)
function setAnimationType(type) {
  if (['wave', 'flip', 'ripple'].includes(type)) {
    currentAnimation = type;
    console.log(`Animation switched to: ${type}`);
  }
}

// Card hover effects and interactions
function setupCardHoverEffects() {
  document.querySelectorAll('.project-card').forEach(card => {
    // Remove existing listeners by cloning the element
    const newCard = card.cloneNode(true);
    card.parentNode.replaceChild(newCard, card);
    
    // Add click listener for project detail page
    newCard.addEventListener('click', () => {
      const cardWrapper = newCard.closest('.project-card-wrapper');
      const title = cardWrapper.querySelector('.caption-left')?.textContent;
      
      // Open project detail for specific projects
      if (title && (title.toLowerCase().includes('6502') || title.toLowerCase().includes('partypass') || title.toLowerCase().includes('podcast') || title.toLowerCase().includes('remy') || title.toLowerCase().includes('linear algebra') || title.toLowerCase().includes('mandelbrot') || title.toLowerCase().includes('chess') || title.toLowerCase().includes('huffman') || title.toLowerCase().includes('sudoku') || title.toLowerCase().includes('nix') || title.toLowerCase().includes('hyprland') || title.toLowerCase().includes('emacs') || title.toLowerCase().includes('shell'))) {
        openProjectDetail(title);
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
    
    newCard.addEventListener('mouseenter', () => {
      newCard.style.transform = 'scale(1.01)';
    });

    newCard.addEventListener('mouseleave', () => {
      newCard.style.transform = 'scale(1)';
    });
    
    // Add cursor pointer for clickable cards
    if (title && (title.toLowerCase().includes('6502') || title.toLowerCase().includes('partypass') || title.toLowerCase().includes('podcast') || title.toLowerCase().includes('remy') || title.toLowerCase().includes('linear algebra') || title.toLowerCase().includes('mandelbrot') || title.toLowerCase().includes('chess') || title.toLowerCase().includes('huffman') || title.toLowerCase().includes('sudoku') || title.toLowerCase().includes('nix') || title.toLowerCase().includes('hyprland') || title.toLowerCase().includes('emacs') || title.toLowerCase().includes('shell'))) {
      newCard.style.cursor = 'pointer';
    }
  });
}

// Project detail navigation - redirect to separate HTML pages
function openProjectDetail(projectTitle) {
  if (isTransitioning) return;
  
  // Map project titles to their corresponding HTML files
  const projectPageMap = {
    '6502': 'details/projects/6502-emulator.html',
    'partypass': 'details/work/partypass.html',
    'podcast': 'details/projects/podcast.html',
    'remy': 'details/projects/remy-conductor.html',
    'linear algebra': 'details/projects/java-linear-algebra.html',
    'mandelbrot': 'details/projects/mandelbrot.html',
    'chess': 'details/projects/chessdl.html',
    'huffman': 'details/projects/huffman.html',
    'sudoku': 'details/projects/sudoku.html',
    'nix': 'details/dotfiles/nix-config.html',
    'hyprland': 'details/dotfiles/hyprland.html',
    'emacs': 'details/dotfiles/emacs.html',
    'shell': 'details/dotfiles/shell-environment.html'
  };
  
  const title = projectTitle.toLowerCase();
  let targetPage = null;
  
  // Find matching page
  for (const [key, path] of Object.entries(projectPageMap)) {
    if (title.includes(key)) {
      targetPage = path;
      break;
    }
  }
  
  // Navigate to the project page
  if (targetPage) {
    // Store the current page in localStorage so we can return to it
    console.log('Storing current page for return:', currentPage);
    localStorage.setItem('returnToPage', currentPage);
    window.location.href = targetPage;
  }
}

function closeProjectDetail() {
  if (isTransitioning) return;
  
  isTransitioning = true;
  isProjectView = false;
  
  const projectDetail = document.getElementById('project-detail');
  const mainContent = document.getElementById('dynamic-content');
  const introContent = document.getElementById('intro-content');
  const bottomNav = document.getElementById('bottomNav');
  
  // Hide project detail page
  projectDetail.classList.remove('active');
  
  // Restore main content
  mainContent.style.display = '';
  introContent.style.display = '';
  
  // Restore original navigation
  bottomNav.innerHTML = `
    <a href="#" class="nav-item ${returnToPage === 'work' ? 'active' : ''}" data-page="work">Work</a>
    <a href="#" class="nav-item ${returnToPage === 'projects' ? 'active' : ''}" data-page="projects">Projects</a>
    <a href="#" class="nav-item ${returnToPage === 'dotfiles' ? 'active' : ''}" data-page="dotfiles">Dotfiles</a>
    <a href="#" class="nav-item ${returnToPage === 'contact' ? 'active' : ''}" data-page="contact">Contact</a>
  `;
  
  // Re-setup navigation listeners
  setupNavigation();
  
  // Ensure main page scrolls to top and is focusable
  window.scrollTo(0, 0);
  document.body.focus();
  
  setTimeout(() => {
    isTransitioning = false;
  }, 300);
}

// Project content setup (contains all the detailed project content from original file)
function setupProjectContent(projectTitle) {
  const projectDetail = document.getElementById('project-detail');
  
  if (projectTitle && projectTitle.toLowerCase().includes('partypass')) {
    // Complete PartyPass page with all original content
    projectDetail.innerHTML = `
      <!-- Hero Section -->
      <section class="project-hero" style="background: #3D3B36; position: relative; overflow: hidden;">
        <div class="project-hero-content" style="display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; max-width: 1400px; margin: 0 auto; padding: 100px 64px;">
          <div>
            <h1 class="project-hero-title" style="font-family: 'Playfair Display', 'Times New Roman', serif; font-weight: 400; letter-spacing: -0.02em; color: #E8E3D3; margin-bottom: 24px;">
              <a href="https://partypass.vip" target="_blank" style="color: inherit; text-decoration: none; transition: color 0.3s ease;" onmouseover="this.style.color='#C7BCA1'" onmouseout="this.style.color='#E8E3D3'">
                PartyPass<span style="font-size: 0.6em; font-weight: 300; opacity: 0.8;">.vip</span>
              </a>
            </h1>
            <p class="project-hero-subtitle" style="font-family: 'Georgia', serif; font-weight: 400; color: #C7BCA1; line-height: 1.6; max-width: 520px; font-size: 1.15rem; margin-bottom: 48px;">Full-stack event ticketing platform with enterprise-grade security. Built from the ground up with cryptographic ticket validation, instant Stripe Connect payouts, and a full suite of host tools for analytics and event management.</p>
            <div class="project-hero-meta" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 40px; max-width: 400px;">
              <div>
                <span style="color: #8B7D6B; font-family: 'Georgia', serif; font-size: 0.8rem; display: block; margin-bottom: 4px; font-weight: 400;">built</span>
                <span style="color: #E8E3D3; font-family: 'Georgia', serif; font-size: 0.95rem; font-weight: 400;">2025</span>
              </div>
              <div style="position: relative;">
                <span style="color: #8B7D6B; font-family: 'Georgia', serif; font-size: 0.8rem; display: block; margin-bottom: 4px; font-weight: 400;">stack</span>
                <span style="color: #E8E3D3; font-family: 'Georgia', serif; font-size: 0.95rem; font-weight: 400; cursor: pointer; transition: color 0.3s ease;" onmouseover="this.nextElementSibling.style.opacity='1'; this.nextElementSibling.style.visibility='visible'" onmouseout="this.nextElementSibling.style.opacity='0'; this.nextElementSibling.style.visibility='hidden'">django/next</span>
                <div style="position: absolute; top: 100%; left: -20px; background: #3D3B36; color: #E8E3D3; padding: 16px 20px; border-radius: 6px; font-family: 'Georgia', serif; font-size: 0.9rem; white-space: nowrap; opacity: 0; visibility: hidden; transition: all 0.3s ease; margin-top: 8px; box-shadow: 0 8px 24px rgba(0,0,0,0.3); z-index: 10; border: 1px solid #8B7D6B;">
                  <div style="margin-bottom: 8px; color: #C7BCA1; font-weight: 600; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 1px;">Full Stack</div>
                  <div style="line-height: 1.5;">
                    <div style="margin-bottom: 4px;"><span style="color: #8B7D6B;">Frontend:</span> Next.js 13 + TypeScript</div>
                    <div style="margin-bottom: 4px;"><span style="color: #8B7D6B;">Backend:</span> Django 4.2 + DRF</div>
                    <div style="margin-bottom: 4px;"><span style="color: #8B7D6B;">Database:</span> PostgreSQL + Redis</div>
                    <div><span style="color: #8B7D6B;">Payments:</span> Stripe Connect</div>
                  </div>
                </div>
              </div>
              <div>
                <span style="color: #8B7D6B; font-family: 'Georgia', serif; font-size: 0.8rem; display: block; margin-bottom: 4px; font-weight: 400;">status</span>
                <span style="color: #E8E3D3; font-family: 'Georgia', serif; font-size: 0.95rem; font-weight: 400;">live</span>
              </div>
            </div>
          </div>
          
          <!-- Live Preview Window -->
          <div class="live-preview-container" style="position: relative; width: 100%; max-width: 800px; height: 600px;">
            <div class="browser-chrome" style="background: #2C2C2C; border-radius: 16px 16px 0 0; padding: 16px 20px; display: flex; align-items: center; gap: 10px;">
              <div style="width: 16px; height: 16px; border-radius: 50%; background: #FF5F57;"></div>
              <div style="width: 16px; height: 16px; border-radius: 50%; background: #FFBD2E;"></div>
              <div style="width: 16px; height: 16px; border-radius: 50%; background: #28CA42;"></div>
              <div style="flex: 1; margin-left: 20px; background: #1C1C1C; border-radius: 8px; padding: 8px 16px; color: #C7BCA1; font-family: 'Georgia', serif; font-size: 0.9rem;">
                partypass.vip
              </div>
            </div>
            <div class="preview-frame" style="width: 100%; height: 560px; border-radius: 0 0 16px 16px; overflow: hidden; box-shadow: 0 30px 60px rgba(0,0,0,0.4); border: 1px solid #8B7D6B; border-top: none; position: relative;">
              <iframe 
                src="https://partypass.vip" 
                style="width: 100%; height: 100%; border: none; background: white; opacity: 0; transition: opacity 0.3s ease;"
                loading="eager"
                sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-top-navigation"
                title="PartyPass Live Preview"
                onload="this.style.opacity='1'"
                onerror="this.nextElementSibling.style.display='block'">
              </iframe>
              <div style="display: none; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); text-align: center; color: #C7BCA1; font-family: 'Georgia', serif;">
                <div style="font-size: 1.2rem; margin-bottom: 8px;">🚀</div>
                <div style="font-size: 0.9rem;">Visit PartyPass.vip</div>
                <a href="https://partypass.vip" target="_blank" style="color: #E8E3D3; text-decoration: underline; font-size: 0.8rem;">Open in new tab</a>
              </div>
            </div>
            <div class="preview-overlay" style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%); pointer-events: none; border-radius: 16px;"></div>
          </div>
        </div>
      </section>
      
      <!-- Full PartyPass Content -->
      <div class="project-content">
        <!-- My Role Section -->
        <section style="padding: 80px 64px; max-width: 1200px; margin: 0 auto;">
          <h2 style="font-family: 'Playfair Display', serif; font-size: 2.5rem; font-weight: 600; color: #2C2923; margin: 0 0 32px 0; line-height: 1.2;">My Role</h2>
          <p style="font-family: 'Georgia', serif; font-size: 1.2rem; line-height: 1.8; color: #333; margin-bottom: 40px; max-width: 900px;">As the sole architect and full-stack developer, I designed and built the entire PartyPass platform from the ground up as a freelance project. I architected a complete event ticketing ecosystem with complex multi-role user management, real-time payment processing, and automated ticket generation - handling everything from database schema design and API architecture to responsive frontend development and production deployment.</p>
          <p style="font-family: 'Georgia', serif; font-size: 1.1rem; line-height: 1.7; color: #444; max-width: 900px;">The platform demonstrates my ability to independently deliver enterprise-grade software with sophisticated business logic, handling thousands of concurrent users and processing real money transactions through Stripe's payment infrastructure. Built with microservices architecture, async task processing, and comprehensive security measures - all developed solo over 8 months.</p>
        </section>
        
        <!-- Problem & Solution -->
        <section style="padding: 80px 64px; max-width: 1200px; margin: 0 auto;">
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: start;">
            <div>
              <h2 style="font-family: 'Playfair Display', serif; font-size: 2.5rem; font-weight: 600; color: #2C2923; margin: 0 0 24px 0; line-height: 1.2;">The Problem</h2>
              <p style="font-family: 'Georgia', serif; font-size: 1.1rem; line-height: 1.7; color: #444;">Event ticketing is broken. Organizers wait weeks for payouts while dealing with counterfeit tickets and fraud. Attendees face confusing fees and unreliable validation.</p>
            </div>
            <div>
              <h2 style="font-family: 'Playfair Display', serif; font-size: 2.5rem; font-weight: 600; color: #2C2923; margin: 0 0 24px 0; line-height: 1.2;">The Solution</h2>
              <p style="font-family: 'Georgia', serif; font-size: 1.1rem; line-height: 1.7; color: #444;">PartyPass leverages cryptographic security for tamper-proof tickets and Stripe Connect for instant payouts. Clean interface, transparent pricing, bulletproof validation.</p>
            </div>
          </div>
        </section>
        
        <!-- Security Features -->
        <section style="padding: 80px 64px; max-width: 1200px; margin: 0 auto;">
          <h2 style="font-family: 'Playfair Display', serif; font-size: 2.5rem; font-weight: 600; color: #2C2923; margin: 0 0 48px 0;">Security Features</h2>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 48px;">
            <div>
              <h3 style="font-family: 'Playfair Display', serif; font-size: 1.3rem; color: #2C2923; margin: 0 0 12px;">Multi-Layer Authentication</h3>
              <p style="font-family: 'Georgia', serif; font-size: 1rem; color: #555; line-height: 1.6; margin: 0;">Token-based API auth, account lockout protection, rate limiting, and 2FA via SMS with password history tracking.</p>
            </div>
            <div>
              <h3 style="font-family: 'Playfair Display', serif; font-size: 1.3rem; color: #2C2923; margin: 0 0 12px;">PCI-Compliant Payments</h3>
              <p style="font-family: 'Georgia', serif; font-size: 1rem; color: #555; line-height: 1.6; margin: 0;">Stripe webhook verification, idempotency protection, transaction locking, and zero card data storage.</p>
            </div>
            <div>
              <h3 style="font-family: 'Playfair Display', serif; font-size: 1.3rem; color: #2C2923; margin: 0 0 12px;">Defense-in-Depth</h3>
              <p style="font-family: 'Georgia', serif; font-size: 1rem; color: #555; line-height: 1.6; margin: 0;">HTTPS enforcement, HSTS headers, CSRF protection, CORS restrictions, and comprehensive security monitoring.</p>
            </div>
            <div>
              <h3 style="font-family: 'Playfair Display', serif; font-size: 1.3rem; color: #2C2923; margin: 0 0 12px;">Input Validation</h3>
              <p style="font-family: 'Georgia', serif; font-size: 1rem; color: #555; line-height: 1.6; margin: 0;">Server-side validation through DRF serializers, SQL injection prevention via Django ORM, and email enumeration protection.</p>
            </div>
            <div>
              <h3 style="font-family: 'Playfair Display', serif; font-size: 1.3rem; color: #2C2923; margin: 0 0 12px;">Security Monitoring</h3>
              <p style="font-family: 'Georgia', serif; font-size: 1rem; color: #555; line-height: 1.6; margin: 0;">Comprehensive audit trails, login attempt tracking with IP monitoring, and database security logging for all critical operations.</p>
            </div>
            <div>
              <h3 style="font-family: 'Playfair Display', serif; font-size: 1.3rem; color: #2C2923; margin: 0 0 12px;">Cryptographic Validation</h3>
              <p style="font-family: 'Georgia', serif; font-size: 1rem; color: #555; line-height: 1.6; margin: 0;">Tamper-proof tickets with embedded signatures that work offline and automatically expire after events.</p>
            </div>
          </div>
        </section>
        
        <!-- Tech Stack Emacs Buffer -->
        <section style="padding: 80px 64px; max-width: 1200px; margin: 0 auto;">
          <div style="background: #1d2021; font-family: 'Monaco', 'Menlo', monospace; font-size: 0.85rem; overflow: hidden; border: 1px solid #3c3836;">
            <div style="background: #3c3836; color: #ebdbb2; padding: 4px 12px; font-size: 0.8rem; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid #504945;">
              <span style="color: #fabd2f;">emacsclient</span>
              <span style="color: #83a598;">partypass_stack.py</span>
            </div>
            <div style="padding: 20px; background: #1d2021; color: #ebdbb2; line-height: 1.7;">
              <div style="color: #928374; margin-bottom: 24px;">
                <div style="margin-bottom: 4px;">"""</div>
                <div style="margin-bottom: 4px;">================================================================</div>
                <div style="margin-bottom: 4px;">                           PARTYPASS</div>
                <div style="margin-bottom: 4px;">                    Technology Stack Specification</div>
                <div style="margin-bottom: 4px;">              Event Ticketing Platform - Production Ready</div>
                <div style="margin-bottom: 4px;">================================================================</div>
                <div>"""</div>
              </div>
              <div style="margin-bottom: 24px;">
                <span style="color: #fb4934;">frontend</span><span style="color: #fe8019;"> = </span><span style="color: #ebdbb2;">{</span>
                <div style="margin-left: 20px;">
                  <div><span style="color: #b8bb26;">"framework"</span><span style="color: #ebdbb2;">: </span><span style="color: #8ec07c;">"Next.js 13"</span><span style="color: #ebdbb2;">,</span></div>
                  <div><span style="color: #b8bb26;">"language"</span><span style="color: #ebdbb2;">: </span><span style="color: #8ec07c;">"TypeScript"</span><span style="color: #ebdbb2;">,</span></div>
                  <div><span style="color: #b8bb26;">"styling"</span><span style="color: #ebdbb2;">: </span><span style="color: #8ec07c;">"Tailwind CSS"</span><span style="color: #ebdbb2;">,</span></div>
                  <div><span style="color: #b8bb26;">"state"</span><span style="color: #ebdbb2;">: </span><span style="color: #8ec07c;">"SWR + Zustand"</span></div>
                </div>
                <span style="color: #ebdbb2;">}</span>
              </div>
              <div style="margin-bottom: 24px;">
                <span style="color: #fb4934;">backend</span><span style="color: #fe8019;"> = </span><span style="color: #ebdbb2;">{</span>
                <div style="margin-left: 20px;">
                  <div><span style="color: #b8bb26;">"framework"</span><span style="color: #ebdbb2;">: </span><span style="color: #8ec07c;">"Django 4.2"</span><span style="color: #ebdbb2;">,</span></div>
                  <div><span style="color: #b8bb26;">"api"</span><span style="color: #ebdbb2;">: </span><span style="color: #8ec07c;">"Django REST Framework"</span><span style="color: #ebdbb2;">,</span></div>
                  <div><span style="color: #b8bb26;">"tasks"</span><span style="color: #ebdbb2;">: </span><span style="color: #8ec07c;">"Celery + Redis"</span><span style="color: #ebdbb2;">,</span></div>
                  <div><span style="color: #b8bb26;">"realtime"</span><span style="color: #ebdbb2;">: </span><span style="color: #8ec07c;">"WebSockets"</span></div>
                </div>
                <span style="color: #ebdbb2;">}</span>
              </div>
              <div style="margin-bottom: 24px;">
                <span style="color: #fb4934;">infrastructure</span><span style="color: #fe8019;"> = </span><span style="color: #ebdbb2;">{</span>
                <div style="margin-left: 20px;">
                  <div><span style="color: #b8bb26;">"database"</span><span style="color: #ebdbb2;">: </span><span style="color: #8ec07c;">"PostgreSQL 15"</span><span style="color: #ebdbb2;">,</span></div>
                  <div><span style="color: #b8bb26;">"cache"</span><span style="color: #ebdbb2;">: </span><span style="color: #8ec07c;">"Redis 7"</span><span style="color: #ebdbb2;">,</span></div>
                  <div><span style="color: #b8bb26;">"payments"</span><span style="color: #ebdbb2;">: </span><span style="color: #8ec07c;">"Stripe Connect"</span><span style="color: #ebdbb2;">,</span></div>
                  <div><span style="color: #b8bb26;">"deployment"</span><span style="color: #ebdbb2;">: </span><span style="color: #8ec07c;">"Render"</span></div>
                </div>
                <span style="color: #ebdbb2;">}</span>
              </div>
              <div style="color: #928374; margin-bottom: 20px;">
                <span style="color: #fb4934;">print</span><span style="color: #ebdbb2;">(</span><span style="color: #8ec07c;">"Security: JWT + cryptographic validation"</span><span style="color: #ebdbb2;">)</span>
              </div>
            </div>
            <div style="background: #3c3836; color: #ebdbb2; padding: 4px 12px; font-size: 0.7rem; display: flex; align-items: center; justify-content: space-between; border-top: 1px solid #504945;">
              <div style="display: flex; align-items: center; gap: 16px;">
                <span style="color: #ebdbb2;">**-</span>
                <span style="background: #458588; color: #1d2021; padding: 2px 8px; font-weight: bold;">N</span>
                <span style="color: #ebdbb2;">1.8k</span>
                <span style="color: #ebdbb2;">partypass_stack.py</span>
              </div>
              <div style="display: flex; align-items: center; gap: 12px;">
                <span style="color: #ebdbb2;">24:1</span>
                <span style="color: #ebdbb2;">100%</span>
                <span style="color: #fabd2f; font-weight: bold;">PYTHON</span>
                <span style="color: #83a598;">⎇ main</span>
                <span style="background: #b8bb26; color: #1d2021; padding: 2px 6px;">✓</span>
                <span style="background: #458588; color: #ebdbb2; padding: 2px 6px;">LSP</span>
              </div>
            </div>
          </div>
        </section>
        
        <!-- Development Toolbox -->
        <section style="padding: 80px 64px; max-width: 1200px; margin: 0 auto;">
          <h2 style="font-family: 'Playfair Display', serif; font-size: 2.5rem; font-weight: 600; color: #2C2923; margin: 0 0 48px 0;">Development Toolbox</h2>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 32px;">
            <div style="padding: 24px; border: 1px solid #e5e5e5;">
              <h3 style="font-family: 'Playfair Display', serif; font-size: 1.2rem; color: #2C2923; margin: 0 0 12px;">Editor & Environment</h3>
              <div style="font-family: 'Georgia', serif; font-size: 0.95rem; color: #555; line-height: 1.6;">
                <div style="margin-bottom: 6px;">Doom Emacs</div>
                <div style="margin-bottom: 6px;">tmux + Alacritty</div>
                <div style="margin-bottom: 6px;">Arch Linux</div>
                <div>Fish shell + Starship</div>
              </div>
            </div>
            <div style="padding: 24px; border: 1px solid #e5e5e5;">
              <h3 style="font-family: 'Playfair Display', serif; font-size: 1.2rem; color: #2C2923; margin: 0 0 12px;">AI & Assistance</h3>
              <div style="font-family: 'Georgia', serif; font-size: 0.95rem; color: #555; line-height: 1.6;">
                <div style="margin-bottom: 6px;">Claude Code</div>
                <div style="margin-bottom: 6px;">GitHub Copilot</div>
                <div style="margin-bottom: 6px;">ChatGPT-4</div>
              </div>
            </div>
            <div style="padding: 24px; border: 1px solid #e5e5e5;">
              <h3 style="font-family: 'Playfair Display', serif; font-size: 1.2rem; color: #2C2923; margin: 0 0 12px;">DevOps & Deployment</h3>
              <div style="font-family: 'Georgia', serif; font-size: 0.95rem; color: #555; line-height: 1.6;">
                <div style="margin-bottom: 6px;">Docker + Compose</div>
                <div style="margin-bottom: 6px;">GitHub Actions</div>
                <div style="margin-bottom: 6px;">Render Cloud</div>
                <div>Cloudinary</div>
              </div>
            </div>
            <div style="padding: 24px; border: 1px solid #e5e5e5;">
              <h3 style="font-family: 'Playfair Display', serif; font-size: 1.2rem; color: #2C2923; margin: 0 0 12px;">Design & Planning</h3>
              <div style="font-family: 'Georgia', serif; font-size: 0.95rem; color: #555; line-height: 1.6;">
                <div style="margin-bottom: 6px;">Org-roam</div>
                <div style="margin-bottom: 6px;">Notion</div>
                <div style="margin-bottom: 6px;">Excalidraw</div>
                <div>Linear</div>
              </div>
            </div>
          </div>
        </section>
        
        <!-- Impact Metrics -->
        <section style="padding: 80px 64px; max-width: 1200px; margin: 0 auto;">
          <h2 style="font-family: 'Playfair Display', serif; font-size: 2.5rem; font-weight: 600; color: #2C2923; margin: 0 0 48px 0;">Impact & Results</h2>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 64px; margin-bottom: 48px;">
            <div>
              <div style="font-family: 'Playfair Display', serif; font-size: 3rem; font-weight: 700; color: #2C2923; line-height: 1; margin-bottom: 8px;">$125,000+</div>
              <div style="font-family: 'Georgia', serif; font-size: 1.1rem; color: #666; margin-bottom: 12px;">Fraud Prevented</div>
              <p style="font-family: 'Georgia', serif; font-size: 0.95rem; color: #555; line-height: 1.6; margin: 0;">Through cryptographic validation across 200+ events.</p>
            </div>
            <div>
              <div style="font-family: 'Playfair Display', serif; font-size: 3rem; font-weight: 700; color: #2C2923; line-height: 1; margin-bottom: 8px;">85%</div>
              <div style="font-family: 'Georgia', serif; font-size: 1.1rem; color: #666; margin-bottom: 12px;">Faster Check-ins</div>
              <p style="font-family: 'Georgia', serif; font-size: 0.95rem; color: #555; line-height: 1.6; margin: 0;">Instant QR validation eliminates lines.</p>
            </div>
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 64px;">
            <div>
              <div style="font-family: 'Playfair Display', serif; font-size: 3rem; font-weight: 700; color: #2C2923; line-height: 1; margin-bottom: 8px;">18,000+</div>
              <div style="font-family: 'Georgia', serif; font-size: 1.1rem; color: #666; margin-bottom: 12px;">Tickets Processed</div>
              <p style="font-family: 'Georgia', serif; font-size: 0.95rem; color: #555; line-height: 1.6; margin: 0;">From intimate gatherings to major festivals.</p>
            </div>
            <div>
              <div style="font-family: 'Playfair Display', serif; font-size: 3rem; font-weight: 700; color: #2C2923; line-height: 1; margin-bottom: 8px;">99.9%</div>
              <div style="font-family: 'Georgia', serif; font-size: 1.1rem; color: #666; margin-bottom: 12px;">System Uptime</div>
              <p style="font-family: 'Georgia', serif; font-size: 0.95rem; color: #555; line-height: 1.6; margin: 0;">Reliable access when it matters most.</p>
            </div>
          </div>
        </section>
      </div>
    `;
  } else if (projectTitle && projectTitle.toLowerCase().includes('podcast')) {
    // Podcast page with full content
    projectDetail.innerHTML = `
      <!-- Hero Section -->
      <section class="project-hero" style="background: #2C2923;">
        <div class="project-hero-content">
          <h1 class="project-hero-title" style="font-family: 'Playfair Display', 'Times New Roman', serif; font-weight: 400; letter-spacing: -0.02em; color: #E8E3D3;">
            <a href="https://maxwellisaacs.github.io/epd/index.html" target="_blank" style="color: inherit; text-decoration: none; transition: color 0.3s ease;" onmouseover="this.style.color='#C7BCA1'" onmouseout="this.style.color='#E8E3D3'">
              Illegal Empire Podcast
            </a>
          </h1>
          <p class="project-hero-subtitle" style="font-family: 'Georgia', serif; font-weight: 400; color: #C7BCA1; line-height: 1.6; max-width: 520px; font-size: 1.15rem;">Investigating how Latin American criminal networks infiltrate politics and industry through academic conversations.</p>
          <div class="project-hero-meta" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 40px; margin: 48px 0; max-width: 400px;">
            <div>
              <span style="color: #8B7D6B; font-family: 'Georgia', serif; font-size: 0.8rem; display: block; margin-bottom: 4px; font-weight: 400;">released</span>
              <span style="color: #E8E3D3; font-family: 'Georgia', serif; font-size: 0.95rem; font-weight: 400;">2023</span>
            </div>
            <div>
              <span style="color: #8B7D6B; font-family: 'Georgia', serif; font-size: 0.8rem; display: block; margin-bottom: 4px; font-weight: 400;">format</span>
              <span style="color: #E8E3D3; font-family: 'Georgia', serif; font-size: 0.95rem; font-weight: 400;">audio series</span>
            </div>
            <div>
              <span style="color: #8B7D6B; font-family: 'Georgia', serif; font-size: 0.8rem; display: block; margin-bottom: 4px; font-weight: 400;">episodes</span>
              <span style="color: #E8E3D3; font-family: 'Georgia', serif; font-size: 0.95rem; font-weight: 400;">3</span>
            </div>
          </div>
        </div>
      </section>
      
      <!-- Content -->
      <div class="project-content">
        <!-- Problem & Solution -->
        <section style="padding: 80px 64px; max-width: 1200px; margin: 0 auto;">
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: start;">
            <div>
              <h2 style="font-family: 'Playfair Display', serif; font-size: 2.5rem; font-weight: 600; color: #2C2923; margin: 0 0 24px 0; line-height: 1.2;">The Investigation</h2>
              <p style="font-family: 'Georgia', serif; font-size: 1.1rem; line-height: 1.7; color: #444;">How do drug cartels expand beyond trafficking into legitimate industries? Through conversations with leading academics, this series reveals the mechanisms behind criminal infiltration of politics and economics.</p>
            </div>
            <div>
              <h2 style="font-family: 'Playfair Display', serif; font-size: 2.5rem; font-weight: 600; color: #2C2923; margin: 0 0 24px 0; line-height: 1.2;">The Experts</h2>
              <p style="font-family: 'Georgia', serif; font-size: 1.1rem; line-height: 1.7; color: #444;">Featured guests include professors studying cartel economics, digital crime networks, and criminal governance in Brazilian favelas. Each episode uncovers different aspects of how organized crime shapes society.</p>
            </div>
          </div>
        </section>
        
        <!-- Featured Episodes -->
        <section style="padding: 80px 64px; max-width: 1200px; margin: 0 auto;">
          <h2 style="font-family: 'Playfair Display', serif; font-size: 2.5rem; font-weight: 600; color: #2C2923; margin: 0 0 48px 0;">Featured Episodes</h2>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 48px;">
            <div>
              <h3 style="font-family: 'Playfair Display', serif; font-size: 1.3rem; color: #2C2923; margin: 0 0 12px;">Gladys McCormick</h3>
              <p style="font-family: 'Georgia', serif; font-size: 1rem; color: #555; line-height: 1.6; margin: 0;">How the Sinaloa and Jalisco New Generation cartels expanded into key industries and the political stakes of that penetration.</p>
            </div>
            <div>
              <h3 style="font-family: 'Playfair Display', serif; font-size: 1.3rem; color: #2C2923; margin: 0 0 12px;">Enrique Arias</h3>
              <p style="font-family: 'Georgia', serif; font-size: 1rem; color: #555; line-height: 1.6; margin: 0;">Criminal networks leveraging call centers, adapting to digital environments, and the co-option of Brazilian police forces.</p>
            </div>
            <div>
              <h3 style="font-family: 'Playfair Display', serif; font-size: 1.3rem; color: #2C2923; margin: 0 0 12px;">Jessie Trudeau</h3>
              <p style="font-family: 'Georgia', serif; font-size: 1rem; color: #555; line-height: 1.6; margin: 0;">Criminal governance in Brazilian favelas and the societal dynamics that allow organized gangs to exert local control.</p>
            </div>
          </div>
        </section>
      </div>
    `;
  } else if (projectTitle && projectTitle.toLowerCase().includes('remy')) {
    // Remy the Rat page
    projectDetail.innerHTML = `
      <section class="project-hero" style="background: linear-gradient(135deg, #8B4513 0%, #CD853F 100%);">
        <div class="project-hero-content">
          <h1 class="project-hero-title">Remy the Rat</h1>
          <p class="project-hero-subtitle">Remote access tool written in Rust with stealth mode, persistence, and live command streaming</p>
          <div class="project-hero-meta">
            <div class="hero-meta-item">
              <span class="hero-meta-label">Year</span>
              <span class="hero-meta-value">2025</span>
            </div>
            <div class="hero-meta-item">
              <span class="hero-meta-label">Language</span>
              <span class="hero-meta-value">Rust</span>
            </div>
            <div class="hero-meta-item">
              <span class="hero-meta-label">Type</span>
              <span class="hero-meta-value">Security Tool</span>
            </div>
          </div>
        </div>
      </section>
      <div class="project-content">
        <section class="content-section">
          <h2 class="section-title">Project Overview</h2>
          <p class="section-subtitle">Advanced remote access tool built for security research and penetration testing.</p>
        </section>
      </div>
    `;
  } else if (projectTitle && projectTitle.toLowerCase().includes('linear algebra')) {
    // Linear Algebra page
    projectDetail.innerHTML = `
      <section class="project-hero" style="background: linear-gradient(135deg, #4B0082 0%, #9932CC 100%);">
        <div class="project-hero-content">
          <h1 class="project-hero-title">Linear Algebra + Neural Network</h1>
          <p class="project-hero-subtitle">Java-based linear algebra library built alongside coursework</p>
          <div class="project-hero-meta">
            <div class="hero-meta-item">
              <span class="hero-meta-label">Year</span>
              <span class="hero-meta-value">2024</span>
            </div>
            <div class="hero-meta-item">
              <span class="hero-meta-label">Language</span>
              <span class="hero-meta-value">Java</span>
            </div>
            <div class="hero-meta-item">
              <span class="hero-meta-label">Type</span>
              <span class="hero-meta-value">Educational</span>
            </div>
          </div>
        </div>
      </section>
      <div class="project-content">
        <section class="content-section">
          <h2 class="section-title">Project Overview</h2>
          <p class="section-subtitle">Custom linear algebra implementation to better understand the mathematics behind neural networks.</p>
        </section>
      </div>
    `;
  } else if (projectTitle && projectTitle.toLowerCase().includes('mandelbrot')) {
    // Mandelbrot page
    projectDetail.innerHTML = `
      <section class="project-hero" style="background: linear-gradient(135deg, #FF6347 0%, #FF8C00 100%);">
        <div class="project-hero-content">
          <h1 class="project-hero-title">Mandelbrot Visualization</h1>
          <p class="project-hero-subtitle">Two mandelbrot set visualizers - C and JavaScript implementations</p>
          <div class="project-hero-meta">
            <div class="hero-meta-item">
              <span class="hero-meta-label">Year</span>
              <span class="hero-meta-value">2024</span>
            </div>
            <div class="hero-meta-item">
              <span class="hero-meta-label">Languages</span>
              <span class="hero-meta-value">C + JavaScript</span>
            </div>
            <div class="hero-meta-item">
              <span class="hero-meta-label">Type</span>
              <span class="hero-meta-value">Visualization</span>
            </div>
          </div>
        </div>
      </section>
      <div class="project-content">
        <section class="content-section">
          <h2 class="section-title">Project Overview</h2>
          <p class="section-subtitle">Performance comparison between C and p5.js implementations of fractal visualization.</p>
        </section>
      </div>
    `;
  } else if (projectTitle && projectTitle.toLowerCase().includes('chess')) {
    // ChessDL page
    projectDetail.innerHTML = `
      <section class="project-hero" style="background: linear-gradient(135deg, #2F4F4F 0%, #708090 100%);">
        <div class="project-hero-content">
          <h1 class="project-hero-title">ChessDL</h1>
          <p class="project-hero-subtitle">Functional chess game built with C++ and SDL</p>
          <div class="project-hero-meta">
            <div class="hero-meta-item">
              <span class="hero-meta-label">Year</span>
              <span class="hero-meta-value">2023</span>
            </div>
            <div class="hero-meta-item">
              <span class="hero-meta-label">Language</span>
              <span class="hero-meta-value">C++</span>
            </div>
            <div class="hero-meta-item">
              <span class="hero-meta-label">Framework</span>
              <span class="hero-meta-value">SDL</span>
            </div>
          </div>
        </div>
      </section>
      <div class="project-content">
        <section class="content-section">
          <h2 class="section-title">Project Overview</h2>
          <p class="section-subtitle">Complete chess implementation with game logic, piece movement validation, and graphical interface.</p>
        </section>
      </div>
    `;
  } else if (projectTitle && projectTitle.toLowerCase().includes('huffman')) {
    // Huffman Encoding page
    projectDetail.innerHTML = `
      <section class="project-hero" style="background: linear-gradient(135deg, #228B22 0%, #32CD32 100%);">
        <div class="project-hero-content">
          <h1 class="project-hero-title">Huffman Encoding</h1>
          <p class="project-hero-subtitle">Compression algorithm implementation using Huffman coding techniques</p>
          <div class="project-hero-meta">
            <div class="hero-meta-item">
              <span class="hero-meta-label">Year</span>
              <span class="hero-meta-value">2022</span>
            </div>
            <div class="hero-meta-item">
              <span class="hero-meta-label">Language</span>
              <span class="hero-meta-value">Rust</span>
            </div>
            <div class="hero-meta-item">
              <span class="hero-meta-label">Type</span>
              <span class="hero-meta-value">Algorithm</span>
            </div>
          </div>
        </div>
      </section>
      <div class="project-content">
        <section class="content-section">
          <h2 class="section-title">Project Overview</h2>
          <p class="section-subtitle">Lossless data compression using variable-length prefix codes based on character frequency.</p>
        </section>
      </div>
    `;
  } else {
    // Complete 6502 emulator content with modern design
    projectDetail.innerHTML = `
      <!-- Hero Section -->
      <section class="project-hero" style="background: linear-gradient(135deg, #556B2F 0%, #8FBC8F 100%);">
        <div class="project-hero-content">
          <h1 class="project-hero-title">6502 Emulator</h1>
          <p class="project-hero-subtitle">Recreating the legendary microprocessor that powered the Apple II, Commodore 64, and NES</p>
          <div class="project-hero-meta">
            <div class="hero-meta-item">
              <span class="hero-meta-label">Timeline</span>
              <span class="hero-meta-value">2024-2025</span>
            </div>
            <div class="hero-meta-item">
              <span class="hero-meta-label">Language</span>
              <span class="hero-meta-value">Rust</span>
            </div>
            <div class="hero-meta-item">
              <span class="hero-meta-label">Status</span>
              <span class="hero-meta-value">Active Development</span>
            </div>
          </div>
        </div>
      </section>
      
      <!-- Main Content -->
      <div class="project-content">
        <!-- Overview Section -->
        <section class="content-section">
          <h2 class="section-title">Project Overview</h2>
          <p class="section-subtitle">The MOS 6502 microprocessor revolutionized computing by making powerful technology affordable. This emulator captures every quirk and timing characteristic of the original hardware through meticulous implementation.</p>
        </section>
        
        <!-- Key Features -->
        <section class="content-section">
          <h2 class="section-title">Core Features</h2>
          <div class="features-grid">
            <div class="feature-card">
              <div class="feature-icon" style="background: linear-gradient(135deg, #3B82F6 0%, #0EA5E9 100%);"></div>
              <h3 class="feature-title">Complete Instruction Set</h3>
              <p class="feature-description">All 151 legal opcodes plus undocumented instructions used by vintage software</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon" style="background: linear-gradient(135deg, #10B981 0%, #3B82F6 100%);"></div>
              <h3 class="feature-title">Cycle Accuracy</h3>
              <p class="feature-description">Precise timing emulation capturing the exact behavior of original hardware</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon" style="background: linear-gradient(135deg, #F59E0B 0%, #EF4444 100%);"></div>
              <h3 class="feature-title">Modern Assembler</h3>
              <p class="feature-description">Custom assembler with macro support and helpful error messages</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon" style="background: linear-gradient(135deg, #8B5CF6 0%, #6366F1 100%);"></div>
              <h3 class="feature-title">Memory Architecture</h3>
              <p class="feature-description">Flexible memory mapping supporting ROM, RAM, and memory-mapped I/O</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon" style="background: linear-gradient(135deg, #EC4899 0%, #F59E0B 100%);"></div>
              <h3 class="feature-title">Interactive Debugger</h3>
              <p class="feature-description">Step through code with register inspection and memory visualization</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon" style="background: linear-gradient(135deg, #3B82F6 0%, #10B981 100%);"></div>
              <h3 class="feature-title">Test Suite</h3>
              <p class="feature-description">Comprehensive tests against Klaus Dormann's test suite and real ROMs</p>
            </div>
          </div>
        </section>
        
        <!-- Code Example -->
        <section class="content-section">
          <h2 class="section-title">Example Code</h2>
          <p class="section-subtitle">A simple multiplication routine demonstrating 6502 assembly programming.</p>
          
          <!-- Emacs Buffer for 6502 Code -->
          <div style="background: #1d2021; font-family: 'Monaco', 'Menlo', monospace; font-size: 0.85rem; overflow: hidden; border: 1px solid #3c3836;">
            <!-- Emacs top bar -->
            <div style="background: #3c3836; color: #ebdbb2; padding: 4px 12px; font-size: 0.8rem; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid #504945;">
              <span style="color: #fabd2f;">emacsclient</span>
              <span style="color: #83a598;">multiply_demo.asm</span>
            </div>
            
            <!-- Buffer content -->
            <div style="padding: 20px; background: #1d2021; color: #ebdbb2; line-height: 1.7;">
              <div style="color: #928374; margin-bottom: 24px;">
                <div style="margin-bottom: 4px;">;</div>
                <div style="margin-bottom: 4px;">; ================================================================</div>
                <div style="margin-bottom: 4px;">;                         6502 EMULATOR</div>
                <div style="margin-bottom: 4px;">;                    Multiplication Routine Demo</div>
                <div style="margin-bottom: 4px;">;              8-bit Integer Multiplication Algorithm</div>
                <div style="margin-bottom: 4px;">; ================================================================</div>
                <div style="margin-bottom: 4px;">;</div>
              </div>
              
              <div style="margin-bottom: 16px;">
                <div style="color: #928374;">; Multiply two 8-bit numbers</div>
                <div style="color: #928374;">; Input: $00 = multiplier, $01 = multiplicand</div>
                <div style="color: #928374;">; Output: $02 = result</div>
              </div>
              
              <div style="margin-bottom: 16px;">
                <div><span style="color: #fabd2f;">multiply:</span></div>
                <div style="margin-left: 20px;"><span style="color: #fb4934;">LDA</span> <span style="color: #b8bb26;">#$05</span>    <span style="color: #928374;">; Load multiplier (5)</span></div>
                <div style="margin-left: 20px;"><span style="color: #fb4934;">STA</span> <span style="color: #8ec07c;">$00</span>     <span style="color: #928374;">; Store in zero page</span></div>
                <div style="margin-left: 20px;"><span style="color: #fb4934;">LDA</span> <span style="color: #b8bb26;">#$03</span>    <span style="color: #928374;">; Load multiplicand (3)</span></div>
                <div style="margin-left: 20px;"><span style="color: #fb4934;">STA</span> <span style="color: #8ec07c;">$01</span>     <span style="color: #928374;">; Store in zero page</span></div>
              </div>
              
              <div style="margin-bottom: 16px;">
                <div style="margin-left: 20px;"><span style="color: #fb4934;">LDX</span> <span style="color: #b8bb26;">#$00</span>    <span style="color: #928374;">; Clear result register</span></div>
                <div style="margin-left: 20px;"><span style="color: #fb4934;">LDY</span> <span style="color: #8ec07c;">$00</span>     <span style="color: #928374;">; Load counter with multiplier</span></div>
              </div>
              
              <div style="margin-bottom: 16px;">
                <div><span style="color: #fabd2f;">loop:</span></div>
                <div style="margin-left: 20px;"><span style="color: #fb4934;">CPY</span> <span style="color: #b8bb26;">#$00</span>    <span style="color: #928374;">; Check if done</span></div>
                <div style="margin-left: 20px;"><span style="color: #fb4934;">BEQ</span> <span style="color: #fabd2f;">done</span>    <span style="color: #928374;">; Exit if counter is zero</span></div>
              </div>
              
              <div style="margin-bottom: 16px;">
                <div style="margin-left: 20px;"><span style="color: #fb4934;">CLC</span>         <span style="color: #928374;">; Clear carry for addition</span></div>
                <div style="margin-left: 20px;"><span style="color: #fb4934;">TXA</span>         <span style="color: #928374;">; Transfer result to accumulator</span></div>
                <div style="margin-left: 20px;"><span style="color: #fb4934;">ADC</span> <span style="color: #8ec07c;">$01</span>     <span style="color: #928374;">; Add multiplicand</span></div>
                <div style="margin-left: 20px;"><span style="color: #fb4934;">TAX</span>         <span style="color: #928374;">; Store back to result</span></div>
                <div style="margin-left: 20px;"><span style="color: #fb4934;">DEY</span>         <span style="color: #928374;">; Decrement counter</span></div>
                <div style="margin-left: 20px;"><span style="color: #fb4934;">JMP</span> <span style="color: #fabd2f;">loop</span>    <span style="color: #928374;">; Continue loop</span></div>
              </div>
              
              <div>
                <div><span style="color: #fabd2f;">done:</span></div>
                <div style="margin-left: 20px;"><span style="color: #fb4934;">STX</span> <span style="color: #8ec07c;">$02</span>     <span style="color: #928374;">; Store final result (15)</span></div>
                <div style="margin-left: 20px;"><span style="color: #fb4934;">RTS</span>         <span style="color: #928374;">; Return</span></div>
              </div>
            </div>
            
            <!-- Authentic Emacs modeline -->
            <div style="background: #3c3836; color: #ebdbb2; padding: 4px 12px; font-size: 0.7rem; display: flex; align-items: center; justify-content: space-between; border-top: 1px solid #504945;">
              <div style="display: flex; align-items: center; gap: 16px;">
                <span style="color: #ebdbb2;">**-</span>
                <span style="background: #458588; color: #1d2021; padding: 2px 8px; font-weight: bold;">N</span>
                <span style="color: #ebdbb2;">1.2k</span>
                <span style="color: #ebdbb2;">multiply_demo.asm</span>
              </div>
              <div style="display: flex; align-items: center; gap: 12px;">
                <span style="color: #ebdbb2;">28:1</span>
                <span style="color: #ebdbb2;">100%</span>
                <span style="color: #fabd2f; font-weight: bold;">ASM</span>
                <span style="color: #83a598;">⎇ main</span>
                <span style="background: #b8bb26; color: #1d2021; padding: 2px 6px;">✓</span>
                <span style="background: #458588; color: #ebdbb2; padding: 2px 6px;">LSP</span>
              </div>
            </div>
          </div>
        </section>
        
        <!-- Technical Details -->
        <section class="content-section">
          <h2 class="section-title">Implementation Details</h2>
          <div class="tech-showcase">
            <p style="margin: 0 0 32px 0; color: #666;">Built with Rust for memory safety and performance, leveraging modern development practices while respecting vintage computing constraints.</p>
            <div class="tech-grid">
              <div class="tech-item">Rust</div>
              <div class="tech-item">WebAssembly</div>
              <div class="tech-item">Zero-Copy</div>
              <div class="tech-item">Bit Manipulation</div>
              <div class="tech-item">State Machines</div>
              <div class="tech-item">Unit Testing</div>
              <div class="tech-item">Benchmarking</div>
              <div class="tech-item">CI/CD</div>
            </div>
          </div>
        </section>
        
        <!-- CTA Section -->
        <section class="content-section">
          <div class="project-cta">
            <a href="#" class="cta-button cta-primary" onclick="scrollToTop(); return false;">View on GitHub</a>
            <a href="#" class="cta-button cta-secondary" onclick="scrollToTop(); return false;">Try Live Demo</a>
          </div>
        </section>
      </div>
    `;
  }
}

// Project scroll animations
function setupProjectScrollAnimation() {
  const projectDetail = document.getElementById('project-detail');
  const projectHero = projectDetail.querySelector('.project-hero');
  const projectContent = projectDetail.querySelector('.project-content');
  
  if (!projectHero || !projectContent) return;
  
  // Track the current state to prevent going backwards
  let hasReachedHero = false;
  
  // Remove any existing scroll listeners
  projectDetail.removeEventListener('scroll', handleProjectScroll);
  
  // Define the scroll handler
  function handleProjectScroll() {
    const scrollY = projectDetail.scrollTop;
    const heroTrigger = window.innerHeight * 0.15; // Very smooth, early trigger
    
    // Find live preview container for fade effect
    const livePreview = projectDetail.querySelector('.live-preview-container');
    
    if (livePreview) {
      // Calculate fade based on scroll progress
      const fadeStart = 50; // Start fading after 50px scroll
      const fadeEnd = 200; // Fully faded by 200px scroll
      const fadeProgress = Math.min(Math.max((scrollY - fadeStart) / (fadeEnd - fadeStart), 0), 1);
      const opacity = 1 - fadeProgress;
      
      livePreview.style.opacity = opacity;
      livePreview.style.transform = `translateY(${fadeProgress * 20}px)`;
    }
    
    // One-way progression only
    if (!hasReachedHero && scrollY > heroTrigger) {
      // Transition to hero (island) state
      hasReachedHero = true;
      projectHero.classList.add('scrolled');
      projectContent.classList.add('visible');
    }
  }
  
  // Add scroll listener to project detail container
  projectDetail.addEventListener('scroll', handleProjectScroll);
  
  // Store reference for cleanup
  projectDetail.handleProjectScroll = handleProjectScroll;
}

// Utility functions
function scrollToTop() {
  const projectDetail = document.getElementById('project-detail');
  if (projectDetail) {
    projectDetail.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}

function capitalizeFirst(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Navigation setup
function setupNavigation() {
  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const targetPage = item.dataset.page;
      transitionToPage(targetPage);
    });
  });
}

// Scroll animations
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

// Icon animations
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
  // Initialize page data from modules
  initializePageData();
  
  // Check for URL fragment first to set correct initial page
  const urlFragment = window.location.hash.substring(1);
  if (urlFragment && ['work', 'projects', 'dotfiles', 'contact'].includes(urlFragment)) {
    currentPage = urlFragment;
    console.log('Setting initial page from URL fragment:', urlFragment);
  }
  
  // Load initial content for the correct page
  const introContent = document.getElementById('intro-content');
  const projectGrid = document.getElementById('project-grid');
  
  // Set initial intro content
  if (pageData[currentPage]) {
    introContent.innerHTML = pageData[currentPage].intro;
    
    // Load initial cards
    pageData[currentPage].cards.forEach((card, index) => {
      const cardElement = document.createElement('div');
      cardElement.innerHTML = createCardHTML(card);
      const cardWrapper = cardElement.firstElementChild;
      projectGrid.appendChild(cardWrapper);
    });
  }
  
  // Update navigation to match the current page
  updateActiveNav(currentPage);
  
  // Initialize all functionality
  setupCardHoverEffects();
  setupNavigation();
  setupScrollAnimation();
  setupIconAnimations();
  
  // Initialize page-specific functionality
  if (window.initWorkPage) window.initWorkPage();
  if (window.initProjectsPage) window.initProjectsPage();
  if (window.initDotfilesPage) window.initDotfilesPage();
  if (window.initContactPage) window.initContactPage();
});
