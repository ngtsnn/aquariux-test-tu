import { nextui } from "@nextui-org/react";
import commonColors from "tailwindcss/colors";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      // you can configure the container to be centered
      center: true,

      // or have default horizontal padding
      padding: "1rem",

      // default breakpoints but with 40px removed
      screens: {
        sm: "600px",
        md: "728px",
        lg: "984px",
        xl: "1240px",
        "2xl": "1240px",
      },
    },
    extend: {},
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            primary: {
              foreground: commonColors.white,
              DEFAULT: commonColors.orange[400],
              ...commonColors.orange,
            },
          },
        },
        dark: {
          colors: {
            primary: {
              foreground: commonColors.white,
              DEFAULT: commonColors.orange[600],
              ...commonColors.orange,
            },
          },
        },
      },
    }),
  ],
};

export default config;
