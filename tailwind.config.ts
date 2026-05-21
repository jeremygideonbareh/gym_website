import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#F5C518',
        bg: '#0A0A0A',
        surface: '#141414',
        cream: '#E8D898',
        text: '#FFFFFF',
        muted: '#888888',
        border: '#2A2A2A',
      },
      fontFamily: {
        barlow: ['var(--font-barlow)'],
        inter: ['var(--font-inter)'],
      },
    },
  },
  plugins: [],
}
export default config
