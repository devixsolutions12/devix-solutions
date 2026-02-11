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
            },
            fontFamily: {
                sans: ["var(--font-geist-sans)"],
                mono: ["var(--font-geist-mono)"],
                serif: ["var(--font-playfair)"],
            },
            animation: {
                "spin-slow": "spin 20s linear infinite",
                "reverse-spin": "spin 30s linear infinite reverse",
                flip: "flip 6s infinite steps(2, end)",
                rotate: "rotate 3s linear infinite ease-in-out",
            },
            keyframes: {
                flip: {
                    "to": {
                        transform: "rotate(360deg)",
                    },
                },
                rotate: {
                    "0%": { transform: "rotate(0deg) scale(10)" },
                    "100%": { transform: "rotate(-360deg) scale(10)" },
                },
            },
        },
    },
    plugins: [],
};
export default config;
