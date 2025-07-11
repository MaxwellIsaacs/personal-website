# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal portfolio website for Maxwell Isaacs built with vanilla HTML, CSS, and JavaScript. The site showcases projects in a modern, minimal design with interactive animations.

## Architecture

### Core Files
- `index.html` - Main portfolio page with project showcase
- `contact.html` - Contact page (in root and `/pages/`)
- `style.css` - All styling with custom fonts and animations
- `script.js` - Interactive elements (project card tilt effects, scroll animations, icon animations)

### Assets
- `fonts/icona-font/` - Custom Icona Sans font family (multiple weights)
- `images/` - Project screenshots, social icons (PNG/GIF pairs for animations)
- `pages/` - Additional HTML pages (work.htm is currently empty)

### Key Design Patterns
- **Font System**: Primary font is custom Icona Sans, fallbacks to Archivo and Inter from Google Fonts
- **Layout**: CSS Grid for project cards with responsive `auto-fit` columns (420px minimum)
- **Animations**: 3D tilt effects on project cards using CSS transforms, scroll-triggered reveal animations
- **Social Icons**: PNG/GIF pairs that randomly animate every 3 seconds via JavaScript
- **Navigation**: Fixed bottom navigation bar with glassmorphism effect

### Styling Architecture
- Mobile-first responsive design with hardcoded breakpoints
- Custom CSS properties for consistent spacing (64px left indent pattern)
- Modular CSS sections: Fonts, Header, Social Icons, Intro, Projects, Navigation
- Transform-based animations with `will-change` optimization

## Development Notes

### No Build Process
This is a static site with no package.json, build tools, or dependency management. All assets are committed directly.

### Current Issues
- One project card has broken image path: `url('images/.png')`
- Contact page has incomplete content with placeholder text
- Some inconsistent email addresses in contact.html

### Adding New Projects
1. Add project image to `images/` directory
2. Create new `.project-card-wrapper` div in index.html
3. Follow existing pattern with background-image style and caption structure
4. Caption format: `[project-name] | [year] | [tech-stack]`

### File Serving
Designed to be served from any static web server. No special routing or server configuration needed.