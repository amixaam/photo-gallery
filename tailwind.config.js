/** @type {import('tailwindcss').Config} */
export default {
    content: ["./resources/**/*.blade.php", "./resources/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: "#EC81C7",
                secondary: "#AA6DE7",
                secondary20: "#E3D4F620",
                secondary60: "#E3D4F660",
                text: "#F6D4EA",
                text50: "#F6D4EA50",
                textdark: "#FDC6EA",
                dark: "#541B40",
                bg: "#110E25",
                bg50: "#0D071690",
                bgsecondary: "#0D0716",
                footer: "#1e1233",
                footersecondary: "#24153D",
                error: "#E343AC",
                error20: "#CC008430",
            },
        },
    },
    plugins: [],
};
