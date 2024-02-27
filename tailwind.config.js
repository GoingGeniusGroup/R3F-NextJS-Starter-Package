module.exports = {
  mode: 'jit',
  content: ['./app/**/*.{js,ts,jsx,tsx}', './src/**/*.{js,ts,jsx,tsx}'], // remove unused styles in production
  darkMode: 'media', // or 'media' or 'class'
   theme: {
    extend: {
      boxShadow: {
        '3xl': '20px 20px 80px 0px rgba(0, 0, 0, 0.16 )',
        '4xl': '30px 30px 40px 0px #1F51FF',
      }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
