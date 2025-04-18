/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./index.html"
  ],
  theme: {
    extend: {
      colors: {
        // Primary theme colors
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        // Secondary theme colors
        secondary: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
        },
        // Accent colors
        accent: {
          blue: {
            light: '#3b82f6',
            DEFAULT: '#2563eb',
            dark: '#1d4ed8',
          },
          green: {
            light: '#22c55e',
            DEFAULT: '#16a34a',
            dark: '#15803d',
          },
          purple: {
            light: '#a855f7',
            DEFAULT: '#9333ea',
            dark: '#7e22ce',
          },
          yellow: {
            light: '#eab308',
            DEFAULT: '#ca8a04',
            dark: '#a16207',
          },
        },
        // Surface colors (backgrounds)
        surface: {
          light: '#f8f9fa', // Changed from #ffffff
          lightAlt: '#eef1f5', // Changed from #f9fafb
          dark: '#0f172a',
          darkAlt: '#1e293b',
        },
        // Text colors
        text: {
          light: '#1e293b',
          lightMuted: '#64748b',
          dark: '#f8fafc',
          darkMuted: '#94a3b8',
        }
      },
      backgroundColor: {
        primary: 'var(--bg-primary)',
        secondary: 'var(--bg-secondary)',
      },
      textColor: {
        primary: 'var(--text-primary)',
        secondary: 'var(--text-secondary)',
      },
      animation: {
        'fadeIn': 'fadeIn 0.3s ease-in-out',
        'shimmer': 'shimmer 2s infinite',
        'dropdownOpen': 'dropdownOpen 0.4s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
        dropdownOpen: {
          '0%': { transform: 'scaleY(0)', opacity: '0' },
          '100%': { transform: 'scaleY(1)', opacity: '1' },
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
}

