import type {Config} from 'tailwindcss';
const plugin = require('tailwindcss/plugin')

export default {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        body: ['Nunito', 'sans-serif'],
        headline: ['"Nunito Sans"', 'sans-serif'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        'starlight-mint': '#9BF6FF',
        'rocket-flame-coral': '#FF8FA3',
        'comet-trail-lavender': '#CAB8FF',
        'solar-gold': '#FFCF56',
        'deep-space-navy': '#0D1B3D',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
        'shine': {
          '0%': { transform: 'translateX(-100%) rotate(20deg)' },
          '100%': { transform: 'translateX(100%) rotate(20deg)' },
        },
        'twinkle': {
          '0%, 100%': { opacity: '0.5', transform: 'scale(0.8)' },
          '50%': { opacity: '1', transform: 'scale(1.2)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(100vw)' },
        },
        'pulse': {
          '0%, 100%': { transform: 'scale(1)', filter: 'brightness(1)' },
          '50%': { transform: 'scale(1.05)', filter: 'brightness(1.2)' },
        },
        'comet': {
            '0%': { transform: 'translateX(150vw) translateY(-50vh) rotate(-45deg)', opacity: '0' },
            '10%': { opacity: '1' },
            '90%': { opacity: '1' },
            '100%': { transform: 'translateX(-50vw) translateY(50vh) rotate(-45deg)', opacity: '0' },
        },
        'pulse-black-hole': {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.2)', opacity: '0.75' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'shine': 'shine 5s infinite ease-in-out',
        'twinkle': 'twinkle 4s infinite ease-in-out',
        'float': 'float 40s infinite linear',
        'pulse': 'pulse 5s infinite ease-in-out',
        'comet': 'comet 15s infinite linear',
        'pulse-black-hole': 'pulse-black-hole 1.5s infinite ease-in-out',
      },
      textShadow: {
        glow: '0 0 8px hsl(var(--primary) / 0.8), 0 0 20px hsl(var(--accent) / 0.6)',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    plugin(function({ addComponents, theme }: {addComponents: Function, theme: Function}) {
      addComponents({
        '.text-glow': {
          textShadow: `0 0 5px ${theme('colors.white')}, 0 0 10px ${theme('colors.primary.DEFAULT')}, 0 0 20px ${theme('colors.primary.DEFAULT')}`,
        },
      })
    })
  ],
} satisfies Config;
