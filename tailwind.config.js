/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.tsx'],
  theme: {
    extend: {
      fontFamily: {
        game: ['Big Bottom Cartoon', 'cursive'],
        medieval: ['MedievalSharp', 'serif'],
      },
      colors: {
        choco: '#664326',
        nana: '#E3E4B2',
      },
    },
  },
  plugins: [],
}
