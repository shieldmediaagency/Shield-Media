/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./app/**/*.{js,ts,jsx,tsx}",
        "./*.{js,ts,jsx,tsx}"
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Manrope', 'sans-serif'],
                serif: ['Italiana', 'serif'],
            },
            colors: {
                black: '#020202',
                white: '#ffffff',
                obsidian: '#0a0a0a',
                zinc: {
                    900: '#18181b',
                    800: '#27272a',
                    500: '#71717a',
                    400: '#a1a1aa',
                }
            }
        },
    },
    plugins: [],
}
