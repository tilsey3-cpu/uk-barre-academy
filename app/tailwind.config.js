/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Avenir', '"Nunito Sans"', 'Montserrat', 'sans-serif'],
      },
      colors: {
        muted: '#525252',
        line: '#E5E5E5',
        offblack: '#0A0A0A',
      },
      maxWidth: {
        container: '1320px',
      },
    },
  },
  plugins: [],
};
