/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {}
  },
  plugins: [],
  safelist: ["bg-[url('public/images/background.jpg')]", 'bg-yellow-500', 'border-yellow-800']
};
