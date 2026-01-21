# Naveen Saragadam | Data Engineer Portfolio

A premium, immersive portfolio website designed to showcase Data Engineering expertise through modern web technologies. Built with a focus on performance, aesthetics, and user experience using the "Scrollytelling" narrative approach.

![Portfolio Preview](public/og.png)

## ✨ Key Features

- **Immersive Scrollytelling**: Custom `ScrollyCanvas` implementation rendering optimized image sequences tied to scroll position (Lenis).
- **Dynamic Interaction**:
  - **Command Menu (`Cmd+K`)**: Spotlight-style navigation with search and filtering.
  - **Animated Typography**: Entry animations, typewriter effects, and parallax scrolling.
  - **Smart Navbar**: Dynamic positioning (corner-to-center) with glassmorphic styling.
- **Modern Tech Stack**:
  - **Framework**: [Next.js 14](https://nextjs.org/) (App Router, Turbopack)
  - **Styling**: [Tailwind CSS](https://tailwindcss.com/)
  - **Animations**: [Framer Motion](https://www.framer.com/motion/)
  - **Icons**: [Lucide React](https://lucide.dev/)
  - **Analytics**: Vercel Analytics
  - **Theme**: Dark/Light mode support (Next-Themes)

## 🚀 Getting Started

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Naveenksaragadam/Naveenksaragadam.github.io.git
    cd Naveenksaragadam.github.io
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```

4.  **Open in Browser:**
    Navigate to `http://localhost:3000` to view the site.

## 🛠️ Build & Deployment

This project is optimized for deployment on [Vercel](https://vercel.com).

To create a production build locally:

```bash
npm run build
npm start
```

## 📂 Project Structure

- `/app`: App Router pages and layouts.
- `/app/components`: Reusable UI components (Overlay, Projects, Navbar, GlobalMenu).
- `/public`: Static assets (images, frames for scrollytelling).

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
