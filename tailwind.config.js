/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        montserratBold: "montserrat Bold",
        montserratRegular: "montserrat regular",
        montserratBoldItalics: "montserrat bold italics",
        montserratSemiBold: "montserrat semi bold",
      },
    },
  },
  plugins: [],
};
