/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html"],
  theme: {
    extend: {
      fontFamily: {
        mono: [
          '"JetBrains Mono"',
          "Consolas",
          "Menlo",
          "monospace",
          '"Noto Sans CJK SC"',
          '"Source Han Sans SC"',
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
  darkMode: "selector",
};
