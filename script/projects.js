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
      description: 'A stealthy C2 framework that uses WASM with a standardized, custom ABI for fully modular payloads.'
    },
    {
      image: 'images/6502-photo.png',
      title: '6502 emulator',
      year: '2024–2025',
      tech: 'rust + asm',
      description: 'A rust based 6502 emulator capable of running NES games with a simple assmebler'
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
      description: 'Two mandelbrot set explorers, one written in p5.js and one written in C. Guess which one is faster lol.'
    },
    {
      image: 'images/podcast-photo.png',
      title: 'illegal empire podcast',
      year: '2023',
      tech: 'research + audio production',
      description: 'Investigative podcast series examining how Latin American criminal networks infiltrate politics and industry. Featured conversations with leading academics on cartel economics, digital crime networks, and criminal governance.',
      link: 'https://maxwellisaacs.github.io/epd/index.html'
    },
    {
      image: 'images/proj1.png',
      title: 'chessDL',
      year: '2023',
      tech: 'C++',
      description: 'One of the ugliest (yet functional) versions of chess created using c++ & SDL'
    },
    {
      image: 'images/project3.jpg',
      title: 'huffman encoding',
      year: '2022',
      tech: 'rust',
      description: 'A compression algorithm implementation using Huffman coding techniques.'
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
