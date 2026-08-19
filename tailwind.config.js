/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        nexus: {
          bg: '#020617',
          bg2: '#030712',
          bg3: '#071426',
          purple: '#8B5CF6',
          blue: '#2563EB',
          cyan: '#06B6D4',
          green: '#22C55E',
          red: '#EF4444'
        }
      },
      fontFamily: {
        sans: [
          'Inter',
          'SF Pro Display',
          'Segoe UI',
          'Roboto',
          'sans-serif'
        ]
      }
    }
  },
  plugins: []
}
