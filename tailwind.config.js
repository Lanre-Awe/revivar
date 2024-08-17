/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        sm: "200px",
        md: "760px",
        lg: "960px",
        xl: "1024px",
        "2xl": "1500px",
      },
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
