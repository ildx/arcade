import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      beige: "#ffedd5",
      "blue-dark": "#110f27",
      "purple-dark": "#04021e",
      "purple-hilight": "#c026d3",
    },
  },
  plugins: [],
};
export default config;
