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
      description: 'This is my main system. If there is one thing I could suggest, it is try NixOS. You will never go back',
      link: 'details/dotfiles/nix-config.html'
    },
    {
      image: 'images/hyprland-config.png',
      title: 'hyprland',
      year: '6 months',
      tech: 'wayland compositor',
      description: 'Modern Wayland compositor with custom animations and workspace management.',
      link: 'details/dotfiles/hyprland.html'
    },
    {
      image: 'images/emacs-config.png',
      title: 'emacs configuration',
      year: '6 years',
      tech: 'elisp + org-mode',
      description: 'Comprehensive Emacs setup with Evil mode, LSP, and literate configuration.',
      link: 'details/dotfiles/emacs.html'
    },
    {
      image: 'images/shell-config.png',
      title: 'shell environment',
      year: '4 years',
      tech: 'zsh + tmux',
      description: 'Terminal setup with custom themes, aliases, and workflow automation.',
      link: 'details/dotfiles/shell-environment.html'
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
