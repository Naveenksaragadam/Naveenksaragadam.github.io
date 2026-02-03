import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: "class",
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                // Custom UI Colors
                primary: "#FFFFFF",
                "background-light": "#f3f4f6",
                "background-dark": "#050505",
                "card-dark": "#121212",
                "surface-dark": "#1E1E1E",
                "border-dark": "#2E2E2E",
                "text-muted": "#A1A1AA",
            },
            fontFamily: {
                sans: ["var(--font-inter)"],
                serif: ["var(--font-playfair)"],
                mono: ["var(--font-jetbrains)"],
            },
        },
    },
    plugins: [],
};
export default config;
