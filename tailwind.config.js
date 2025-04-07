module.exports = {
  theme: {
    extend: {
      colors: {
        "primary-blue": "#0890A8",
        "primary-white": "#FFFFFF",
        "primary-black": "#000000",
        "secondary-black": "#444444",
        "neutral-gray": "#ACACAC",
        "light-gray": "#F7F7F7",
        "primary-blue-transparent": "rgba(8, 144, 168, 0.40)",
        "success-green": "#058F3A",
        "vibrant-purple": "#7E2EFF",
        "lightest-gray": "#FAFAFA",
        "overlay-gray": "rgba(182, 182, 182, 0.50)",

        // Add more colors as needed
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeOut: {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        scaleOut: {
          "0%": { opacity: "1", transform: "scale(1)" },
          "100%": { opacity: "0", transform: "scale(0.95)" },
        },
      },
      animation: {
        fadeIn: "fadeIn 200ms ease-out",
        fadeOut: "fadeOut 200ms ease-in forwards",
        scaleIn: "scaleIn 200ms ease-out",
        scaleOut: "scaleOut 200ms ease-in forwards",
      },
    },
  },
};
