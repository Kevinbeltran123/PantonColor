# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static HTML website for Panton Color, a paint company. The site features a single-page application (SPA) structure with multiple sections managed via JavaScript navigation.

## Architecture

### Core Structure
- **index.html**: Main HTML file containing all sections (home, products, calculator, about, contact)
- **main.js**: Core JavaScript functionality for navigation, calculators, and form handling
- **products.js**: Product data array and product-related logic
- **style.css**: Complete CSS styling with CSS custom properties and responsive design
- **images/**: Contains logo and favicon assets

### Key Features
1. **Single Page Navigation**: Uses JavaScript `showSection()` function to toggle between sections
2. **Product Catalog**: Dynamic product grid with category filtering
3. **Paint Calculator**: Interactive tool to calculate paint requirements based on area and paint type
4. **Contact Integration**: WhatsApp integration for direct customer communication
5. **Responsive Design**: Mobile-first approach with breakpoints at 992px, 768px, and 576px

## Navigation System

The site uses a custom section-switching system:
- All sections have `display: none` by default
- Active section gets `.active` class with `display: block !important`
- Navigation handled by `showSection(sectionId, event)` in main.js:15-49
- Sections auto-initialize specific functionality when shown (products, simulator, projects)
- Mobile menu system with overlay and accessibility features (main.js:733-851)
- Smooth scrolling and proper z-index management for layered content

## Product Management

Products are stored in products.js as a JavaScript array. Each product has:
- id, name, description, category, price, image
- Categories: 'interior', 'exterior', 'special'
- Product rendering handled by `renderProducts()` in main.js:174-200
- Filtering system with category buttons that update active state
- WhatsApp integration for product inquiries with pre-filled messages

## Contact & Communication

- WhatsApp integration throughout the site
- Floating WhatsApp button (fixed position)
- Product inquiry links direct to WhatsApp with pre-filled messages
- Contact form with basic validation (no backend integration)

## Styling System

CSS uses custom properties for consistent theming:
- Primary colors: --primary (#E30613), --accent (#F7931D)
- Responsive grid layouts
- Hover effects and transitions throughout
- Texture background pattern for calculator section

## Development Commands

This is a static site with no build tools or package managers. Files are served directly to the browser.

### Running the Site
- **Local Development**: Open `index.html` directly in a browser or use a local HTTP server
- **Live Server**: `python -m http.server 8000` or use VS Code Live Server extension
- **Testing**: Manual testing across different sections and form submissions

### File Structure
- No package.json, webpack, or build configuration
- All dependencies are loaded via CDN (Google Fonts, Font Awesome)
- Images stored in `/images/` directory

## Key JavaScript Features

- All JavaScript is vanilla (no frameworks or libraries)
- External dependencies: Google Fonts, Font Awesome icons via CDN
- Single Page Application (SPA) architecture with section isolation
- Paint calculator with real-time calculations (main.js:215-252) 
- Project carousel with auto-advance and manual controls (main.js:411-451)
- Form validation and WhatsApp integration for all forms
- Mobile-responsive design with hamburger menu and overlay
- Intersection Observer for scroll animations and performance
- Accessibility features: keyboard navigation, focus indicators, ARIA labels
- Notification system for user feedback (main.js:489-516)

## Important Configuration

- WhatsApp numbers: 573134312484 (main), 57311603066 (products)
- Images stored locally in `/images/` directory with specific product mockups
- CSS custom properties for consistent theming and colors
- No backend - all form submissions redirect to WhatsApp with formatted messages