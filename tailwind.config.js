/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#FDFAF4',
        beige: '#EDE3D1',
        beige2: '#D9C9AE',
        tan: '#C4A882',
        brown: '#7A5C3A',
        charcoal: '#1E1E1E',
        mid: '#5A5040',
        green: '#3D6B52',
      },
      fontFamily: {
        // Inner quotes are intentional: multi-word font names need quoting in generated CSS
        display: ['"Cormorant Garamond"', 'serif'],
        body: ['"DM Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
