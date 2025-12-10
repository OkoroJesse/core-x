/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                poppins: ['Poppins', 'sans-serif'],
                beyond: ['"Beyond Control"', 'sans-serif'],
                brattons: ['BRATTONS', 'sans-serif'],
            },
            animation: {
                'spin-slow': 'spin 8s linear infinite',
            },
        },
    },
    plugins: [],
}
