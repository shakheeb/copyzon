import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        lightTheme: {
          primary: "#c000ff",

          secondary: "#0032ff",

          accent: "#525b00",

          neutral: "#051127",

          "base-100": "#ffffff",

          info: "#00cffb",

          success: "#38e385",

          warning: "#fa3300",

          error: "#ff7e85",
          body: {
            "background-color": "#e3e6e6",
          },
        },
      },
    ],
  },
};
export default config;
