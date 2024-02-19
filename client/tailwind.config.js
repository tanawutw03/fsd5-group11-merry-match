/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        'setShadow01': '2px 2px 12px 0px rgba(64, 50, 133, 0.08)',
        
        
      }
    },
  },
  plugins: [],
};
