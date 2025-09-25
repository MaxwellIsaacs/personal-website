// Dotfiles page specific functionality

// Dotfiles page data
const dotfilesPageData = {
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
};

// Dotfiles-specific functionality
function initDotfilesPage() {
  // Any dotfiles page specific initialization
}

// Export data and functions for use by master.js
window.dotfilesPageData = dotfilesPageData;
window.initDotfilesPage = initDotfilesPage;