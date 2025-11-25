/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#151714",
                secondary: "#fffafa",
                "text-secondary": "#666",
                border: "#e5e7eb",
            },
        },
    },
    plugins: [],
    corePlugins: {
        preflight: false, // Disable preflight to avoid conflicts with existing styles
    },
}
