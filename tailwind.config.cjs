const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#9800cb',
        cyanSoft: '#00d4ff'
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        glow: '0 0 30px rgba(152,0,203,.35), 0 0 60px rgba(0,212,255,.20)'
      },
      backgroundImage: {
        cosmic: 'radial-gradient(circle at 20% 20%, rgba(152,0,203,0.25), transparent 60%), radial-gradient(circle at 80% 10%, rgba(0,212,255,0.3), transparent 55%), radial-gradient(circle at 50% 80%, rgba(152,0,203,0.2), transparent 60%)'
      }
    }
  },
  plugins: []
};
