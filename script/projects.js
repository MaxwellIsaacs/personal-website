// Projects page specific functionality

// Projects page data
const projectsPageData = {
  intro: `
    <p>
      Personal projects and experiments.<br />
      Everything is
      <a href="https://github.com/maxwellisaacs" target="_blank">
        open source
      </a>
    </p>
  `,
  cards: [
    {
      image: 'images/remy-icon.png',
      title: 'remy conductor',
      year: '2025',
      tech: 'rust + wasm',
      description: 'a stealthy C2 framework that uses WASM with a standardized, custom ABI for fully modular payloads.',
      link: 'details/projects/remy-conductor.html',
      type: 'info-only'
    },
    {
      image: 'images/sudoku-icon.png',
      title: 'sudoku.wasm',
      year: '2025',
      tech: 'rust + wasm',
      description: 'high-performance sudoku puzzle game built with rust and WASM featuring algorithmic generation and canvas rendering.',
      link: 'details/projects/sudoku.html',
      type: 'info-only'
    },
    {
      image: 'images/6502-icon.png',
      title: '6502 emulator',
      year: '2024–2025',
      tech: 'rust + asm',
      description: 'a rust based 6502 emulator capable of running NES games with a simple assmebler',
      type: 'info-only'
    },
    // ARCHIVED: decentralized social media project
    // {
    //   image: 'images/proj1.png',
    //   title: 'decentralized social media',
    //   year: '2024',
    //   tech: 'rust',
    //   description: 'a fully transparent, auditable social media platform where everything is public and verifiable. complete opposite of modern closed-source platforms.',
    //   link: 'details/projects/rust-decentralized-social.html'
    // },
    {
      image: 'images/lin-alg-icon.png',
      title: 'linear algebra library',
      year: '2024',
      tech: 'java',
      description: 'a java based linear algebra library I wrote in tandem with my linear algebra class.',
      link: 'details/projects/java-linear-algebra.html',
      type: 'info-only'
    },
    {
      image: 'images/mandelbrot-icon.png',
      title: 'mandelbrot visualization',
      year: '2024',
      tech: 'c + p5.js',
      description: 'two mandelbrot set explorers, one written in p5.js and one written in C',
      type: 'info-only'
    },
    {
      image: 'images/podcast-icon.png',
      title: 'illegal empire podcast',
      year: '2023',
      tech: 'research + audio production',
      description: 'investigative podcast series examining how Latin American criminal networks infiltrate politics and industry, featuring conversations with leading academics on cartel economics, digital crime networks, and criminal governance.',
      link: 'https://maxwellisaacs.github.io/epd/index.html',
      type: 'info-only'
    },
    {
      image: 'images/chess-icon.png',
      title: 'chessDL',
      year: '2023',
      tech: 'C++',
      description: 'one of the ugliest (yet functional) versions of chess created using c++ & SDL',
      type: 'info-only'
    },
    {
      image: 'images/huffman-icon.png',
      title: 'huffman encoding',
      year: '2022',
      tech: 'rust',
      description: 'a huffman compression implementation and visualization',
      type: 'info-only'
    }
  ]
};

// Projects-specific functionality
function initProjectsPage() {
  // Any projects page specific initialization
}

// Export data and functions for use by master.js
window.projectsPageData = projectsPageData;
window.initProjectsPage = initProjectsPage;
