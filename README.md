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

The project includes built-in scripts to deploy the build artifacts to a remote server using SCP/SSH.

### Configuration
Create a `.env` file in the root directory (see `.env.example`):

```env
DEPLOY_USER=your_username
DEPLOY_HOST=your_server_ip_or_domain
DEPLOY_PATH=/var/www/html/your_site
```

### Running Deployment

**On Windows (PowerShell):**
```powershell
npm run deploy:win
```

**On Linux/Mac (Bash):**
```bash
npm run deploy
```

These scripts will:
1.  Run `npm run build` to generate the `dist/` folder.
2.  Connect to your server via SSH/SCP.
3.  Upload the contents of `dist/` to the specified `DEPLOY_PATH`.
4.  Recursively set directory permissions to `755` on the remote structure.

## 🧪 Development Commands

| Command | Description |
| :--- | :--- |
| `npm run dev` | Start the local development server with HMR. |
| `npm run build` | Build the project for production to `dist/`. |
| `npm run preview` | Locally preview the production build. |
| `npm run lint` | Run ESLint to check for code quality issues. |
