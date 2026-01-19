/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'cyan': 'var(--color-cyan)',
                'purple': 'var(--color-purple)',
                'pink': 'var(--color-pink)',
            },
            fontFamily: {
                'display': ['var(--font-display)'],
                'main': ['var(--font-main)'],
            }
        },
    },
    plugins: [
        require("tailwindcss-animate"),
    ],
}
