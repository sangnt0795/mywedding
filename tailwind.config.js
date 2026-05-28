/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        porcelain: '#fbfeff',
        ivory: '#eef9fd',
        champagne: '#d7ecf4',
        blush: '#dff3fb',
        nude: '#7fa6b8',
        ink: '#243844',
        mist: '#dff3fb',
        roseblue: '#b9deee',
        sageblue: '#5f91a5',
      },
      fontFamily: {
        display: ['Cormorant Garamond', 'serif'],
        body: ['Be Vietnam Pro', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 24px 80px rgba(52, 92, 112, 0.14)',
        card: '0 18px 50px rgba(56, 96, 116, 0.11)',
        glow: '0 0 45px rgba(142, 202, 226, 0.42)',
      },
      backgroundImage: {
        paper: 'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.92), transparent 28%), linear-gradient(135deg, #fbfeff 0%, #eef9fd 48%, #e4f3fa 100%)',
      },
    },
  },
  plugins: [],
};
