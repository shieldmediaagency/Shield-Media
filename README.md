# SHIELD - Luxury Digital Agency

<div align="center">
  <p><strong>A defining digital experience offering iconic, bold, and timeless web architectures.</strong></p>
</div>

## Overview

Shield is a premium digital agency portfolio website designed to showcase high-end capabilities in Brand Identity, Web Design, and Digital Strategy. Built with modern web technologies, it features immersive animations, a robust design system, and a content-driven architecture that allows for easy updates.

## Technology Stack

- **Core**: React 19, TypeScript
- **Build Tool**: Vite
- **Styling**: TailwindCSS
- **Icons**: Lucide React
- **Package Manager**: npm

## Project Structure

A simplified, component-driven architecture:

```
├── components/         # Feature-specific components
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Work.tsx
│   ├── Expertise.tsx
│   ├── Manifesto.tsx
│   ├── Contact.tsx
│   ├── Footer.tsx
│   └── ui/            # Reusable UI primitives
├── constants.ts       # Central content configuration file
├── types.ts           # TypeScript definitions
├── App.tsx            # Main application layout
└── index.css          # Global styles and Tailwind directives
```

## Getting Started

Follow these steps to run the project locally.

### Prerequisites

- Node.js (v18+ recommended)
- npm

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/shield-digital-agency.git
    cd shield-digital-agency
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Start the development server:**
    ```bash
    npm run dev
    ```

    The application will be available at `http://localhost:3000`.

## Configuration

Content is managed centrally in `constants.ts`. You can update text, images, and links there without modifying the React components directly.

## Deployment

### Deploy to Vercel

The easiest way to deploy is using Vercel:

1.  Push your code to a Git repository (GitHub, GitLab, Bitbucket).
2.  Import the project into Vercel.
3.  Vercel will detect the Vite settings automatically.
4.  Click **Deploy**.

No environment variables are required for the base deployment.

## License

© 2026 Shield Media Inc. All rights reserved.
