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
- Navigation handled by `showSection(sectionId, event)` in main.js:11-38
- Sections auto-initialize specific functionality when shown (products, simulator, projects)

## Product Management

Products are stored in products.js as a JavaScript array. Each product has:
- id, name, description, category, price, image
- Categories: 'interior', 'exterior', 'special'
- Product rendering handled by `renderProducts()` in main.js:41-67
- Filtering system with category buttons that update active state

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

## No Build Process

This is a static site with no build tools or package managers. Files are served directly to the browser.

## Development Notes

- All JavaScript is vanilla (no frameworks)
- External dependencies: Google Fonts, Font Awesome icons
- Images use placeholder URLs and Unsplash for demo content
- Form submissions redirect to WhatsApp (no backend processing)
- WhatsApp numbers hardcoded: 573134312484 (main), 57311603066 (products)
- Color simulator with live preview functionality
- Auto-advancing project carousel (5-second intervals)
- Intersection Observer for scroll animations
- Accessibility features: keyboard navigation, focus indicators