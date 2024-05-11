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
                textdark: "#FDC6EA",
                dark: "#541B40",
                bg: "#110E25",
                bgsecondary: "#110E25",
            },
        },
    },
    plugins: [],
};
