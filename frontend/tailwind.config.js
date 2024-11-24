/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"], // Ensure this points to the correct source files
  theme: {
    extend: {
      colors: {
        // Adding custom colors
        primary: "#FFFFFF",
        secondary: "#000000",
        baseprimary: "#9C2473",
        basesecondary: "#D3D3D3",
        baseextra1: "#0C090A",
        baseextra2: "#fcfcfc",
        baseextra3: "#f0f0f0",
        baseextra4: "#02203c",
        baseextra5: "#171614",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        russoone: ["Russo One", "sans-serif"],
        kdamThmorPro: ["Kdam Thmor Pro", "sans-serif"],
        lorniasolid: ["Londrina Solid", "sans-serif"],
        bebasneue: ["Bebas Neue", "sans-serif"],
        bricolagegrotesque: ["Bricolage Grotesque", "sans-serif"],
        kanit: ["Kanit", "sans-serif"],
      },
    },
  },
  plugins: [
    require("daisyui"), // Add DaisyUI here
  ],
};
