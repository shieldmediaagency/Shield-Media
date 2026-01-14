# Shield Media - Corporate Landing Page

A premium, high-performance landing page for a global digital agency. Built with a focus on modern animations, infinite depth aesthetics, and a "multi-billion dollar tech brand" feel.

## Key Features

*   **Hero Starfield**: Custom HTML5 Canvas particle system with infinite depth parallax and shooting stars.
*   **Performance Cursor**: Instant-response custom cursor with hover state awareness (no drag/delay).
*   **Parallax Scroll**: Brand ticker and bento grid animations powered by Framer Motion.
*   **Spotlight UI**: Mouse-tracking gradient reveals on service cards.
*   **Sound Design**: (Optional) Structure ready for audio integration.

## Tech Stack

*   **React 19**: Latest core framework.
*   **TypeScript**: Type safety and better developer experience.
*   **Tailwind CSS**: Utility-first styling for rapid UI development.
*   **Framer Motion**: Complex animations (AnimatePresence, layout animations, scroll triggers).
*   **Lucide React**: Lightweight, consistent icon set.

## Project Structure

```
├── components/          # React components
│   ├── BrandTicker.tsx  # Infinite scroll brand strip
│   ├── Contact.tsx      # Contact form and details
│   ├── Expertise.tsx    # Services bento grid with spotlight effect
│   ├── Footer.tsx       # Global footer
│   ├── Hero.tsx         # Main landing area with Starfield
│   ├── Manifesto.tsx    # Philosophy and stats
│   ├── Navbar.tsx       # Fixed navigation with mobile menu
│   ├── Preloader.tsx    # Initial load animation
│   ├── LegalModal.tsx   # Legal documentation modal
│   └── Work.tsx         # Selected case studies with floating preview
├── content.ts           # CENTRALIZED CONTENT SOURCE OF TRUTH
├── types.ts             # TypeScript definitions
├── App.tsx              # Main application layout
└── index.tsx            # Entry point
```

## How to Edit Content

You do not need to touch the React components to update text, images, or links.

1.  Open `content.ts` in the root directory.
2.  Modify the JSON-like structure.
3.  Save the file. The app will update automatically.

## Running Locally

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Start Development Server**:
    ```bash
    npm start
    ```
    Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Deployment

### Production Build

To create an optimized production build:

```bash
npm run build
```

This will generate a `build/` (or `dist/`) folder containing the static assets ready to be served.

---
© 2025 Shield Media