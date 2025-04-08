/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // Enable class-based dark mode
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "1020px",
      xl: "1440px",
    },
    extend: {
      animation: {
        "spin-rotate": "spin-and-rotate 2.5s ease-out forwards",
      },
      keyframes: {
        "spin-and-rotate": {
          "0%": {
            transform: "rotate(0deg)",
          },
          "100%": {
            transform: "rotate(765deg)", // 720 + 45 = 765
          },
        },
      },
      colors: {
        lightBlue: "hsl(215.02, 98.39%, 51.18%)",
        darkBlue: "hsl(213.86, 58.82%, 46.67%)",
        lightGreen: "hsl(156.62, 73.33%, 58.82%)",
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
      spacing: {
        180: "32rem",
      },
      screens: {
        'xs': '475px',
        'smv': '560px'
      }
    },
  },
  plugins: [],
}

