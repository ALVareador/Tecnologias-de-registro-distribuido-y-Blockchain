/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  daisyui: {
    themes: [{
      claro: {
        "primary": "#3a00b0",
        //"primary-focus": "#fff",
        "primary-content": "#fff",

        "secondary": "#120037",
        //"secondary-focus": "#fff",
        "secondary-content": "#fff",

        "accent": "#f3f371",
        //"accent-focus": "#fff",
        "accent-content": "#000",

        "neutral": "#03000a",
        //"neutral-focus": "#221f1f",
        //"neutral-content": "#f2f3f5",

        "base-100": "#f3f4f6",
        //"base-200": "#d1d3d7",
        //"base-300": "#b1b3b7",
        "base-content": "#000",

        "info": "#17a2b8",
        "info-content": "#fff",

        "success": "#2ec662",
        "success-content": "#fff",

        "warning": "#f9cc2c",
        "warning-content": "#fff",

        "error": "#e93434",
        "error-content": "#fff",
      }
    }
    ],
  },
  plugins: [require("daisyui")],
}
