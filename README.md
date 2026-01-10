# Vibrance 2026 ⚡️

The official website for **Vibrance 2026**, the annual cultural fest of **VIT Chennai**.

> **Experience the Next Generation.**  
> An immersive, high-energy web experience built to capture the spirit of a modern music festival.

## 🚀 Overview

This repository hosts the source code for the Vibrance '26 website, featuring a cutting-edge aesthetic with 3D elements, smooth animations, and a vibrant, dark-mode design.

**Live Demo**: [Coming Soon]

## 🛠 Tech Stack

Built with the latest in web technologies for performance and visual fidelity:

-   **Core**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
-   **Build Tool**: [Vite](https://vitejs.dev/)
-   **Animations**:
    -   [GSAP](https://gsap.com/) (ScrollTrigger, Timelines)
    -   [Framer Motion](https://www.framer.com/motion/) (UI Interactions)
    -   [Lenis](https://lenis.studiofreight.com/) (Smooth Scrolling)
-   **3D / WebGL**:
    -   [Three.js](https://threejs.org/)
    -   [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/)
    -   [Drei](https://github.com/pmndrs/drei)
-   **Routing**: [React Router DOM](https://reactrouter.com/)

## ✨ Key Features

-   **Immersive 3D Backgrounds**: A reactive starfield and hero elements.
-   **Cinematic Scroll Experiences**: "Pinned" scroll sequences for ProShows.
-   **Dynamic Data Loading**: Team, Sponsors, and Merch populated via externalized JSON for easy updates.
-   **Custom Cursor**: Interactive cursor with hover states (desktop only).
-   **Mobile Responsive**: Fully optimized with a custom mobile navigation menu.

## 📦 Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/abhinavanagarajan/vibrance26.git
    cd vibrance26
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The app will be available at `http://localhost:5173`.

## 📂 Project Structure

```
├── public/
│   └── data/          # JSON data for Team, Sponsors, Merch
├── src/
│   ├── components/    # Reusable UI components (Navbar, Layout, etc.)
│   ├── sections/      # Main page sections (Home, ProShows, etc.)
│   ├── canvas/        # 3D specific components
│   ├── styles/        # CSS files
│   └── main.tsx       # Entry point
└── vite.config.ts     # Configuration
```

## 🎨 Content Management

Data for specific sections can be updated without touching the code:
-   **Team**: `public/data/team.json`
-   **Sponsors**: `public/data/sponsors.json`
-   **Merch**: `public/data/merch.json`

---

Built with ❤️ by the **Vibrance Tech Team**.
