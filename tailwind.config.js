/** @type {import('tailwindcss').Config} */
export const content = ["./index.html"];

export const theme = {
  extend: {
    fontFamily: {
      mono: ['"JetBrains Mono"', "monospace"],
    },
  },
};

export const plugins = [require("daisyui")];

export const daisyui = {
  themes: ["light", "dark", "autumn", "night"],
};
