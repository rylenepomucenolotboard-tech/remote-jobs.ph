import type { Config } from "tailwindcss";

export default {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#016CF9', // Vibrant Blue from inspo
                accent: '#CAF471', // Limeish Green from inspo
                navy: {
                    50: '#F4F7FB',
                    100: '#E8EFF7',
                    200: '#D1DFEE',
                    300: '#ABC5E1',
                    400: '#7B9FCF',
                    500: '#557DBA',
                    600: '#4161A0',
                    700: '#354E84',
                    800: '#2A3C69',
                    900: '#0A0C10', // Deep Navy from inspo
                    950: '#050608', // Even Darker Navy
                },
                background: '#FFFFFF',
                textPrimary: '#0A0C10',
                link: '#016CF9',
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                heading: ['Outfit', 'sans-serif'],
            },
            borderRadius: {
                DEFAULT: '16px',
                '2xl': '24px',
                '3xl': '32px',
            },
            spacing: {
                unit: '4px',
            },
            backgroundImage: {
                'gradient-premium': 'linear-gradient(135deg, #016CF9 0%, #0047AB 100%)',
            }
        },
    },
    plugins: [],
} satisfies Config;
