/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.tsx'],
  theme: {
    extend: {
      fontFamily: {
        game: ['Big Bottom Cartoon', 'cursive'],
        medieval: ['MedievalSharp', 'serif'], 
      },
      backgroundImage: {
        'texture': "url('/assets/bg_texture.png')",
      },
    },
  },
  plugins: [],
}
