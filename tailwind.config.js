/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      width: {
        fill: '-webkit-fill-available',
      },
      boxShadow: {
        card: '2px 2px 2px 1px rgba(0, 0, 0, 0.2)',
      },
      backgroundImage: {},
      fontFamily: {
        sans: 'Merriweather Sans, sans-serif',
      },
      colors: {
        green: {
          500: '#00FF00',
        },
        lightpurple: {
          100: '#CB92B1',
          500: '#837E9F',
          600: '#5A576E',
          700: '#424242',
          900: '#22212C',
        },
        lightpurpleold: {
          100: '#CB92B1',
          500: '#837E9F',
          600: '#5A576E',
          700: '#302F3D',
          900: '#22212C',
        },
      },
    },
  },
  plugins: [],
};
