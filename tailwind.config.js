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
        cinza: {
          100: '#d6d6d6',
          500: '#b2b2b2',
          600: '#6d6d6d',
          700: '#424242',
          900: '#242424',
        },
        azul: {
          500: '#00bfff',
          600: '#00ACE6',
          700: '#008FBF',
          800: '#006080',
          900: '#003040',
        },
        laranja: {
          500: '#ff9900',
          600: '#E68A00',
          700: '#BF7300',
          800: '#804D00',
          900: '#402600',
        },
        lightpurple: {
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
