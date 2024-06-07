/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    fontFamily: {
      poppins: ['Poppins', 'sans-serif'],
      jura: ['Jura', 'sans-serif']
    },
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        'yellow-sun': '#fff424',
        'electric-indigo': "#6700ff"
      },
      backgroundImage: {
        'home-dots': "url('http://ali.sandbox.etdevs.com/virtual-conference/wp-content/uploads/sites/21/2021/05/virtual-conference-31.png')",
        'column-blob': "url(http://ali.sandbox.etdevs.com/virtual-conference/wp-content/uploads/sites/21/2021/05/virtual-conference-36.png)",
        'column-dots': "url(http://ali.sandbox.etdevs.com/virtual-conference/wp-content/uploads/sites/21/2021/04/virtual-conference-03.png)",
        'footer': "url('http://ali.sandbox.etdevs.com/virtual-conference/wp-content/uploads/sites/21/2021/04/virtual-conference-07.png')",
        'footer-column': "url('http://ali.sandbox.etdevs.com/virtual-conference/wp-content/uploads/sites/21/2021/05/virtual-conference-37.png');"
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  // eslint-disable-next-line no-undef
  plugins: [require("tailwindcss-animate")],
}