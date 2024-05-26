import withMT from '@material-tailwind/react/utils/withMT'

// './index.html', './src/**/*.{js,ts,jsx,tsx}'
/** @type {import('tailwindcss').Config} */
export default withMT({
    content: ['./pages/**/*.{html,js}', './components/**/*.{html,js}'],
    theme: {
        extend: {},
        colors: {
            transparent: 'transparent',
            current: 'currentColor',
            gray_for_text: '#d4d4d8',
            light_gray: '#fafafa',
            blue: '#2563eb',
            default_text: '#09090b',
            white: '#ffffff',
            green: '#65a30d',
            red: '#be123c',
        },
    },
    plugins: [],
})
