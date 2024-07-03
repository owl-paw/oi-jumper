/** @type {import('tailwindcss').Config} */
export const content = ["./index.html"];
export const theme = {
  extend: {
    fontFamily: {
      mono: [
        '"JetBrains Mono"',
        "Consolas",
        "Menlo",
        "monospace",
        '"Sarasa UI SC"',
        '"Noto Sans CJK SC"',
        '"Source Han Sans SC"',
        "sans-serif",
      ],
    },
  },
};
export const plugins = [];
export const darkMode = "selector";
