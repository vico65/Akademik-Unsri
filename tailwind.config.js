/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.{html,js}"],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        inter : ['Inter'],
        nunito : ['Nunito']
      },
      colors: {
        blueIcon : '#0b9bdb'
      },
      borderWidth: {
          'custom' : '16px' 
      }
    },
  },
  plugins: [],
}
