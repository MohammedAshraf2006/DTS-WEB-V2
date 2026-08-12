/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        // هنا هنضيف الوان الشركه بعد ما تديني الايدنتيتي
        primary: {
          DEFAULT: '#1E3A8A',
          light: '#3B82F6',
          dark: '#1E293B'
        }
      },
      fontFamily: {
        sans: ['Cairo', 'sans-serif']
      }
    }
  },
  plugins: []
}
