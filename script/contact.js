// Contact page specific functionality

// Contact page data
const contactPageData = {
  intro: `
    <p>
      Let's connect and collaborate.<br />
      Reach out via
      <a href="mailto:me@maxisaacs.com">
        me@maxisaacs.com
      </a>
    </p>
  `,
  cards: []
};

// Contact-specific functionality
function initContactPage() {
  // Any contact page specific initialization
  // Could add form validation, contact form handling, etc.
}

// Export data and functions for use by master.js
window.contactPageData = contactPageData;
window.initContactPage = initContactPage;