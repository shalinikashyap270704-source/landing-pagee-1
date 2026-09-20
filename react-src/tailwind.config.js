/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        void: "#050810",
        navy: {
          950: "#070b16",
          900: "#0a0f1e",
          800: "#0f1729",
          700: "#151f38",
        },
        cyan: "#3fd8e0",
        ablue: "#4c8dff",
        violet: "#9b7cf0",
        green: "#3fe0a0",
        amber: "#f0b23f",
        red: "#ef5b5b",
      },
      fontFamily: {
        mono: ["IBM Plex Mono", "SFMono-Regular", "Consolas", "monospace"],
        sans: ["Inter", "-apple-system", "Segoe UI", "sans-serif"],
      },
    },
  },
  plugins: [],
};
