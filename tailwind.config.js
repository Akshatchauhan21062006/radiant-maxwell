/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        parchment: {
          DEFAULT: '#FAF9F5',
          light: '#FDFCFA',
          warm: '#F4F0E8',
          deep: '#EBE5D8',
        },
        ink: {
          DEFAULT: '#16191F',
          pure: '#0B0D12',
          muted: '#4B5563',
          subtle: '#6B7280',
          faint: '#9CA3AF',
        },
        claret: {
          DEFAULT: '#162A45', // Oxford Navy Primary
          dark: '#0F1D32',
          deep: '#0A1424',
          light: '#234168',
          soft: '#EEF3F8',    // Frosted Ice-Navy (replaces pink)
        },
        oxford: {
          DEFAULT: '#162A45',
          dark: '#0F1D32',
          deep: '#0A1424',
          light: '#234168',
          soft: '#EEF3F8',
        },
        brass: {
          DEFAULT: '#C59B27', // Lustrous Burnished Antique Gold
          light: '#DBB54B',
          dark: '#9A7718',
          soft: '#FCF8ED',
        },
        deckle: {
          DEFAULT: '#E3DDD4',
          light: '#EFEBE4',
          dark: '#D5CDC2',
        }
      },
      fontFamily: {
        serif: ['Newsreader', 'Georgia', 'serif'],
        display: ['Cinzel', 'Newsreader', 'serif'],
        reading: ['Lora', 'Georgia', 'serif'],
        sans: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        mono: ['Space Mono', 'JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'book': '0 4px 20px -2px rgba(28, 25, 23, 0.06), 0 2px 6px -1px rgba(28, 25, 23, 0.04)',
        'book-lg': '0 12px 32px -4px rgba(28, 25, 23, 0.08), 0 4px 12px -2px rgba(28, 25, 23, 0.04)',
        'book-xl': '0 20px 48px -8px rgba(107, 29, 47, 0.12), 0 8px 16px -4px rgba(28, 25, 23, 0.04)',
      }
    },
  },
  plugins: [],
}
