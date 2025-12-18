import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/**/*.{js,ts,jsx,tsx,mdx}", // src altındaki HER ŞEYİ kapsar
        "./app/**/*.{js,ts,jsx,tsx,mdx}", // src kullanmıyorsan burayı
        "./components/**/*.{js,ts,jsx,tsx,mdx}", // ve burayı tarar
    ],
    theme: {
        extend: {
            colors: {
                roseSoft: "#F7C1CC",
                cream: "#FFF6EB",
                // Ekstra gül tonları ekleyelim ki tasarımda kullanalım
                rose: {
                    50: '#fff1f2',
                    100: '#ffe4e6',
                    200: '#fecdd3',
                    300: '#fda4af',
                    400: '#fb7185',
                    500: '#f43f5e',
                    600: '#e11d48',
                    700: '#be123c',
                    800: '#9f1239',
                    900: '#881337',
                }
            },
            fontFamily: {
                crimson: ['var(--font-crimson)', 'serif'],
                pacifico: ['var(--font-pacifico)', 'cursive'],
            },
        },
    },
    plugins: [],
    // Force rebuild for fonts
};

export default config;