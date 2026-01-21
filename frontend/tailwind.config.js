/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Map Tailwind's 'emerald' and 'amber' to our new Pet Care Theme
                emerald: {
                    50: '#f0fdfa',
                    100: '#ccfbf1',
                    200: '#99f6e4',
                    300: '#5eead4',
                    400: '#2dd4bf',
                    500: '#14b8a6',
                    600: '#247080', // TEAL (Secondary)
                    700: '#0f766e',
                    800: '#115e59',
                    900: '#134e4a',
                    950: '#042f2e',
                },
                amber: {
                    50: '#fffbeb',
                    100: '#fef3c7',
                    200: '#fde68a',
                    300: '#fcd34d',
                    400: '#FFC15A', // YELLOW (Primary)
                    500: '#f59e0b',
                    600: '#d97706',
                    700: '#b45309',
                    800: '#92400e',
                    900: '#78350f',
                    950: '#451a03',
                },
                // Explicit Pet Care Palette
                theme: {
                    yellow: '#FFC15A',
                    teal: '#247080',
                    dark: '#212529',
                    light: '#F8F9FA',
                },
                // Custom palette references
                primary: '#FFC15A',
                'primary-dark': '#e0a845',
                accent: '#247080',
            },
            fontFamily: {
                sans: ['Montserrat', 'Inter', 'sans-serif'],
                heading: ['Montserrat', 'sans-serif'],
            },
            boxShadow: {
                'soft': '0 10px 40px -10px rgba(0, 0, 0, 0.08)',
                'strong': '0 20px 60px -15px rgba(0, 0, 0, 0.12)',
                'glow': '0 4px 15px rgba(255, 193, 90, 0.4)',
                'glow-strong': '0 8px 25px rgba(255, 193, 90, 0.5)',
            }
        },
    },
    plugins: [],
}
