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
      image: 'images/remy-photo.png',
      title: 'remy conductor',
      year: '2025',
      tech: 'rust + wasm',
      description: 'a stealthy C2 framework that uses WASM with a standardized, custom ABI for fully modular payloads.'
    },
    {
      image: 'images/sudoku.png',
      title: 'sudoku.wasm',
      year: '2024',
      tech: 'rust + wasm',
      description: 'high-performance sudoku puzzle game built with rust and WASM featuring algorithmic generation and canvas rendering.',
      link: 'details/projects/sudoku.html'
    },
    {
      image: 'images/6502-photo.png',
      title: '6502 emulator',
      year: '2024–2025',
      tech: 'rust + asm',
      description: 'a rust based 6502 emulator capable of running NES games with a simple assmebler'
    },
    {
      image: 'images/lin-alg-photo.png',
      title: 'linear algebra library',
      year: '2024',
      tech: 'java',
      description: 'a java based linear algebra library I wrote in tandem with my linear algebra class.',
      link: 'details/projects/java-linear-algebra.html'
    },
    {
      image: 'images/mandelbrot-photo.png',
      title: 'mandelbrot visualization',
      year: '2024',
      tech: 'c + p5.js',
      description: 'two mandelbrot set explorers, one written in p5.js and one written in C'
    },
    {
      image: 'images/podcast-photo.png',
      title: 'illegal empire podcast',
      year: '2023',
      tech: 'research + audio production',
      description: 'investigative podcast series examining how Latin American criminal networks infiltrate politics and industry, featuring conversations with leading academics on cartel economics, digital crime networks, and criminal governance.',
      link: 'https://maxwellisaacs.github.io/epd/index.html'
    },
    {
      image: 'images/chess.png',
      title: 'chessDL',
      year: '2023',
      tech: 'C++',
      description: 'one of the ugliest (yet functional) versions of chess created using c++ & SDL'
    },
    {
      image: 'images/huffman.png',
      title: 'huffman encoding',
      year: '2022',
      tech: 'rust',
      description: 'a huffman compression implementation and visualization'
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
