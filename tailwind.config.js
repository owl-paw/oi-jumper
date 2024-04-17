/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html"],
  theme: {
    extend: {
      fontFamily: {
        'mono': ['"JetBrains Mono"', 'monospace']
      }
    },
  },
  plugins: [],
  darkMode: 'class',
  safelist: [
    {
      pattern: /prob-info/,
    }
  ]
}
