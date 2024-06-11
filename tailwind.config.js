import withMT from '@material-tailwind/react/utils/withMT'

/** @type {import('tailwindcss').Config} */
export default withMT({
    content: [
        './index.html',
        './src/**/*.{js,ts,jsx,tsx}',
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
            'red': '#be123c',
            custom: {
                dark: '#09090b', // used for text
                medium: '#d4d4d8', // used for text
                light: '#fafafa',
                blue: '#2563eb',
                white: '#ffffff',
                green: '#65a30d',
                red: '#be123c',
            },
        },
    },
    plugins: [],
})
