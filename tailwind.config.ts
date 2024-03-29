import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      'arc-beige': '#ffedd5',
      'arc-blue-dark': '#110f27',
      'arc-purple-dark': '#04021e',
      'arc-purple-hilight': '#c026d3',
    },
  },
  plugins: [],
};
export default config;
