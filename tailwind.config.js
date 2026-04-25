/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: '#2D5016',
        gold: '#C9A84C',
        cream: '#FAFAF5',
        charcoal: '#2C2C2C',
        sage: '#8FAF6A',
      },
      fontFamily: {
        heading: ['Playfair Display', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 2px 15px rgba(0,0,0,0.08)',
        lift: '0 8px 30px rgba(0,0,0,0.12)',
      },
      backgroundImage: {
        'cream-glow':
          'radial-gradient(1200px 600px at 20% 0%, rgba(201, 168, 76, 0.16), transparent 60%), radial-gradient(900px 500px at 100% 20%, rgba(143, 175, 106, 0.14), transparent 55%)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0px)' },
        },
        'slide-in-right': {
          '0%': { opacity: '0', transform: 'translateX(12px)' },
          '100%': { opacity: '1', transform: 'translateX(0px)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 450ms ease-out both',
        'slide-in-right': 'slide-in-right 350ms ease-out both',
      },
    },
  },
  plugins: [],
}