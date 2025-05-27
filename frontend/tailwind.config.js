/** @type {import('tailwindcss').Config} */


module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-blue': '#4CC9FE',
        'dark-pink': '#FFABAB',
        'beige':"#F7DED0"
      },
      backgroundImage: {
        'pink-gradient': 'linear-gradient(to bottom, #FEF2F4, #D14D72)',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        lora: ['Lora', 'serif'],
      
    },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
