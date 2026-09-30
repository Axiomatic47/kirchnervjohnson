import type { Config } from 'tailwindcss';

// The palette lives in app/globals.css as RGB channel triplets, so every colour takes an
// alpha (`bg-accent/10`). System font stacks: nothing downloads at build or runtime.
const rgb = (v: string) => `rgb(var(${v}) / <alpha-value>)`;

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ink: rgb('--c-ink'),
        'ink-2': rgb('--c-ink-2'),
        paper: rgb('--c-paper'),
        card: rgb('--c-card'),
        well: rgb('--c-well'),
        rule: rgb('--c-rule'),
        muted: rgb('--c-muted'),
        accent: rgb('--c-accent'),
        'accent-ink': rgb('--c-accent-ink'),
        'on-ink': rgb('--c-on-ink'),
      },
      fontFamily: {
        sans: ['ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
        serif: ['ui-serif', 'Iowan Old Style', 'Palatino', 'Georgia', 'Times New Roman', 'serif'],
      },
      boxShadow: { card: 'var(--shadow-card)' },
    },
  },
  plugins: [],
};

export default config;
