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
      image: 'images/nix-config.png',
      title: 'nix config',
      year: '1 year',
      tech: 'nix',
      description: 'Reproducible Linux OS. Roll back changes instantly, identical setup everywhere.',
      link: 'details/dotfiles/nix-config.html',
      type: 'info-only'
    },
    {
      image: 'images/hyprland-config.png',
      title: 'hyprland',
      year: '6 months',
      tech: 'wayland compositor',
      description: 'Tiling window manager. Auto-arranges windows, smooth animations, keyboard-driven.',
      link: 'details/dotfiles/hyprland.html',
      type: 'info-only'
    },
    {
      image: 'images/emacs-config.png',
      title: 'emacs configuration',
      year: '6 years',
      tech: 'elisp + org-mode',
      description: 'Comprehensive Emacs setup with Evil mode, LSP, and literate configuration.',
      link: 'details/dotfiles/emacs.html',
      type: 'info-only'
    },
    {
      image: 'images/shell-config.png',
      title: 'shell environment',
      year: '4 years',
      tech: 'starship + fish + tmux',
      description: 'Smart terminal setup. Auto-completion, Git status, session management.',
      link: 'details/dotfiles/shell-environment.html',
      type: 'info-only'
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
