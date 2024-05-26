import withMT from '@material-tailwind/react/utils/withMT'

// './index.html', './src/**/*.{js,ts,jsx,tsx}'
/** @type {import('tailwindcss').Config} */
export default withMT({
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {},
        colors: {
            transparent: 'transparent',
            current: 'currentColor',
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
