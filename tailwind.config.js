/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#E9E9E9',
        beige: '#DCDCDC',
        beige2: '#C2C2C2',
        tan: '#9A9898',
        brown: '#5A4E45',
        charcoal: '#2C2828',
        mid: '#625F5D',
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
