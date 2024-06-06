/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Arial', 'sans-serif'],
      },
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'gray_for_text': '#d4d4d8',
      'light_gray': '#fafafa',
      'blue': '#2563eb',
      'default_text': '#09090b',
      'white': '#ffffff',
      'green': '#65a30d',
      'red': '#be123c'
      }
    },
    plugins: [],
  }


