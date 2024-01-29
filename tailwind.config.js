/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.js', 
  ],
  theme: {
    extend: {
      maxWidth: {
        '20%': '20%',
      },
      height: {
        '20%': '20%',
      },
      backgroundColor: {
        'custom-color': '#143a3e',
      },
    },
  },
  plugins: [],
};
