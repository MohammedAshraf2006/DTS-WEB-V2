/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'var(--color-primary)',
          hover: 'var(--color-primary-hover)',
          light: 'var(--color-primary-light)'
        },
        surface: {
          DEFAULT: 'var(--color-surface)',
          alt: 'var(--color-surface-alt)',
          raised: 'var(--color-surface-raised)'
        },
        border: {
          DEFAULT: 'var(--color-border)',
          strong: 'var(--color-border-strong)'
        },
        text: {
          base: 'var(--color-text-base)',
          muted: 'var(--color-text-muted)',
          subtle: 'var(--color-text-subtle)',
          onprimary: 'var(--color-text-on-primary)'
        },
        danger: { DEFAULT: 'var(--color-danger)', light: 'var(--color-danger-light)' },
        success: { DEFAULT: 'var(--color-success)', light: 'var(--color-success-light)' },
        warning: { DEFAULT: 'var(--color-warning)', light: 'var(--color-warning-light)' },
        info: { DEFAULT: 'var(--color-info)', light: 'var(--color-info-light)' },
        navy: { DEFAULT: 'var(--color-navy)', light: 'var(--color-navy-light)' },
        gold: { DEFAULT: 'var(--color-gold)', light: 'var(--color-gold-light)' }
      },
      fontFamily: {
        sans: ['Inter', 'Tajawal', 'Cairo', 'sans-serif'],
        heading: ['"Plus Jakarta Sans"', 'Tajawal', 'Cairo', 'sans-serif'],
        arabic: ['Tajawal', 'Cairo', 'sans-serif']
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        'marquee': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' }
        },
        'marquee-rtl': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(50%)' }
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-18px) rotate(4deg)' }
        },
        'float-slower': {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(14px) rotate(-6deg)' }
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.5', transform: 'scale(1)' },
          '50%': { opacity: '0.9', transform: 'scale(1.08)' }
        },
        'spin-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' }
        }
      },
      animation: {
        'fade-up': 'fade-up 0.7s cubic-bezier(0.16,1,0.3,1) both',
        'marquee': 'marquee 32s linear infinite',
        'marquee-rtl': 'marquee-rtl 32s linear infinite',
        'float-slow': 'float-slow 7s ease-in-out infinite',
        'float-slower': 'float-slower 9s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 4s ease-in-out infinite',
        'spin-slow': 'spin-slow 18s linear infinite'
      }
    }
  },
  plugins: []
}
