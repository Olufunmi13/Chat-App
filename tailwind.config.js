/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage:{
        'back': 'url(./img/background.jpg)',
        'login': 'url(./img/img1.jpg)',
      },
      
    },
  },
  plugins: [],
}

