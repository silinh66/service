# ZOOZOO React Migration

This project is a ReactJS migration of the ZOOZOO website. It maintains the exact layout and visual structure of the original HTML site while providing a modern component-based architecture.

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

1.  **Install Node.js**: If you haven't already, download and install Node.js from [nodejs.org](https://nodejs.org/).
2.  **Navigate to the project directory**:
    ```bash
    cd c:/Code/ZOOZOO-react
    ```
3.  **Install dependencies**:
    ```bash
    npm install
    ```

## Development

To start the development server:

```bash
npm run dev
```

This will start the app at `http://localhost:5173` (or another port if 5173 is in use).

## Project Structure

- `src/components`: Contains all React components (`Header`, `Hero`, `Services`, `HowItWorks`, `Footer`, etc.).
- `src/index.css`: Global styles and extracted inline CSS.
- `public/assets`: Static assets (images, CSS, JS) from the original site.
- `index.html`: Entry point HTML file with links to external stylesheets.

## Features

- **Exact Layout Replication**: Uses the original CSS and HTML structure.
- **Componentized Architecture**: Broken down into reusable React components.
- **Interactive Elements**:
  - Mobile Menu Toggle
  - Before/After Image Sliders (Custom React implementation)
  - Typed.js Text Animation
  - Fade-in Animations on Scroll
- **Ready for Admin Panel**: The structure is set up to easily integrate a backend and admin panel in the future.
