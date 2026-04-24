/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
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
        heading: ['"Playfair Display"', 'serif'],
        body: ['Inter', '"DM Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 10px 30px rgba(17, 24, 39, 0.08)',
        lift: '0 18px 45px rgba(17, 24, 39, 0.14)',
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.25rem',
      },
      backgroundImage: {
        'cream-glow':
          'radial-gradient(1000px 500px at 10% 10%, rgba(143, 175, 106, 0.20), transparent 55%), radial-gradient(900px 500px at 90% 20%, rgba(201, 168, 76, 0.18), transparent 60%)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in-right': {
          '0%': { transform: 'translateX(16px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
      },
      animation: {
        'fade-up': 'fade-up 600ms ease-out both',
        'slide-in-right': 'slide-in-right 450ms ease-out both',
      },
    },
  },
  plugins: [],
}

