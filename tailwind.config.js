/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html"],
  theme: {
    extend: {
      fontFamily: {
        mono: ['"JetBrains Mono"', "Consolas", "Menlo", "monospace"],
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
