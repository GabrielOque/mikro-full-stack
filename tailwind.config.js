/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4A00FF",
        secondary: "#F4F4F4",
        check: "#D8D8D8",
        progress: "#DEDEFF",
      },
    },
    
  },
  plugins: [],
};
