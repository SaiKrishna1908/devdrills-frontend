// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}", "./index.html"], // Adjust based on your project
  theme: {    
    extend: {
      keyframes: {
        slideDown: {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      animation: {
        slideDown: 'slideDown 1.5s ease-out forwards',
      },
    },
  },
  plugins: [],
};
