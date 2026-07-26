export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        maroon: {
          50: "#fbf4f2",
          100: "#f3ddd8",
          500: "#8f1f22",
          700: "#681416",
          900: "#3f0d0f"
        },
        sandstone: {
          50: "#fffaf2",
          100: "#f5ead7",
          200: "#e7d2ad",
          400: "#c49b63"
        },
        ink: {
          900: "#211b18",
          700: "#4a403b",
          500: "#756b64"
        }
      },
      fontFamily: {
        serif: ["Cormorant Garamond", "Georgia", "serif"],
        sans: ["Source Sans 3", "Arial", "sans-serif"]
      },
      borderRadius: {
        heritage: "8px"
      },
      boxShadow: {
        soft: "0 18px 50px rgb(63 13 15 / 0.08)"
      },
      transitionTimingFunction: {
        out: "cubic-bezier(0.23, 1, 0.32, 1)"
      }
    }
  },
  plugins: []
};
