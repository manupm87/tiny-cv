# Tiny CV

A modern, interactive, and responsive curriculum vitae application built with React, featuring glassmorphism design, smooth animations, and a timeline-based storytelling approach.

## 🚀 Quick Start

Get the project running on your local machine in minutes.

### Prerequisites

- **Node.js** (v18 or higher recommended)
- **npm** (comes with Node.js)

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/manupm87/tiny-cv.git
    cd tiny-cv
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Start the development server:
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173` (or the port shown in your terminal).

## 🛠️ Technology Stack

- **[React 19](https://react.dev/)**: The core library for building the user interface.
- **[Vite](https://vitejs.dev/)**: Next-generation frontend tooling for fast builds and HMR.
- **[Framer Motion](https://www.framer.com/motion/)**: Production-ready animation library for React.
- **[Lucide React](https://lucide.dev/)**: Beautiful & consistent icon set.
- **CSS Modules & Variables**: Modular styling with native CSS capabilities.

## 📂 Project Structure

Verified structure of the codebase:

```text
tiny-cv/
├── public/              # Static assets (favicon, etc.)
├── scripts/             # Deployment scripts
│   ├── deploy.sh        # Bash deployment script (Linux/Mac)
│   └── deploy.ps1       # PowerShell deployment script (Windows)
├── src/
│   ├── assets/          # Images and fonts
│   ├── components/      # Reusable UI components
│   │   ├── IntroSlide.jsx       # Landing section
│   │   ├── TimelineSlide.jsx    # Standard timeline entry
│   │   ├── MobileGroupSlide.jsx # Grouped view for mobile
│   │   └── ...
│   ├── data/            # Content data
│   │   └── timeline.js  # The Single Source of Truth for CV content
│   ├── hooks/           # Custom React hooks
│   │   └── useIsMobile.js
│   ├── styles/          # CSS Stylesheets
│   │   ├── index.css    # Global resets and variables
│   │   └── *.css        # Component-specific styles
│   ├── utils/           # Helper functions
│   ├── App.jsx          # Main application controller
│   └── main.jsx         # Entry point
├── .env                 # Environment variables (template in .env.example)
└── package.json         # Project dependencies and scripts
```

### Data
`src/data/timeline.js` holds the CV content in both English (`en`) and Spanish (`es`); edit it to change the text without touching components.

## 🧩 Key Features & Architecture

### Data-Driven Content
The entire CV content is managed in `src/data/timeline.js`. This file exports a `timelineData` array. To update your CV, you simply modify this JSON-like structure without touching the UI code.

### Responsive Design Strategy
The application uses a hybrid approach for responsiveness:
- **CSS Media Queries**: For standard layout adjustments.
- **`useIsMobile` Hook**: For logic-level changes.
- **Adaptive Rendering**: On mobile, simple timeline slides are sometimes grouped into `MobileGroupSlide` components to improve vertical scrolling efficiency. This logic is handled in `App.jsx` and `utils/timelineUtils.js`.

### Glassmorphism UI
The visual style relies heavily on backdrop filters, translucency, and shadows, defined primarily in `src/styles/GlassCard.css`.

### Scroll-Based Navigation
The `App` component uses an `IntersectionObserver` to track the currently visible section, updating the active state for animations and the `StoryNavigator` (desktop only).

## 🚢 Deployment

Deploys are atomic: the build is uploaded to a fresh sibling directory and swapped into place, so visitors never see a half-uploaded site and stale hashed bundles do not accumulate.

### Configuration
Create a `.env` file in the root directory (see `.env.example`):

```env
DEPLOY_USER=your_username
DEPLOY_HOST=your_server_ip_or_domain
DEPLOY_PATH=/var/www/your_site_path
```

- `DEPLOY_USER` / `DEPLOY_HOST`: SSH login used by `ssh` and `scp`.
- `DEPLOY_PATH`: absolute directory the site is served from. It is validated before anything runs: it must have at least three segments, no spaces, no `..`, no trailing `/`, only `[A-Za-z0-9._-]`, and must not be `/`, `/var`, `/var/www` or a home directory.

### Running Deployment

**On Windows (PowerShell):**
```powershell
npm run deploy:win
```

**On Linux/Mac (Bash):**
```bash
npm run deploy
```

Add `--dry-run` (bash) or `-DryRun` (PowerShell) to build and print the remote commands without executing them:

```bash
npm run deploy -- --dry-run
npm run deploy:win -- -DryRun
```

Each deploy:
1.  Runs `npm run build` to generate `dist/`.
2.  Uploads `dist/` to `DEPLOY_PATH.new-<timestamp>` on the server.
3.  Sets permissions (directories `755`, files `644`).
4.  Moves the current site to `DEPLOY_PATH.prev`, moves the new one to `DEPLOY_PATH`, and keeps `.prev` as a one-generation rollback copy (the copy before it is removed; the current site is restored if the swap fails).

> **Important:** the server folder is replaced as a whole on every deploy. Anything that must survive a deploy has to be part of the build output (put it in `public/`).

Source maps are not generated for production builds; set `VITE_SOURCEMAP=1` (or `COVERAGE=1`) when you need them.

## 🧪 Development Commands

| Command | Description |
| :--- | :--- |
| `npm run dev` | Start the local development server with HMR. |
| `npm run build` | Build the project for production to `dist/`. |
| `npm run preview` | Locally preview the production build. |
| `npm run lint` | Run ESLint to check for code quality issues. |
