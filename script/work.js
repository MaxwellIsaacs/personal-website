// Work page specific functionality

// Work page data
const workPageData = {
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
      year: '2025',
      tech: 'django + next.js',
      description: 'Full-stack event ticketing platform with Stripe Connect integration, QR validation, and real-time analytics.'
    }
  ]
};

// Work-specific functionality can be added here
function initWorkPage() {
  // Any work page specific initialization
}

// Export data and functions for use by master.js
window.workPageData = workPageData;
window.initWorkPage = initWorkPage;
