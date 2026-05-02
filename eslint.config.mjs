import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

export default [
  ...nextVitals,
  ...nextTs,
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "react/no-unescaped-entities": "off",
      "@next/next/no-img-element": "off",
      "react-hooks/set-state-in-effect": "off",
      "react-hooks/purity": "off",
      "react-hooks/immutability": "off",
      "react-hooks/incompatible-library": "off",
      "react-hooks/exhaustive-deps": "off",
      "jsx-a11y/alt-text": "off",
    },
  },
  {
    ignores: [
      ".next/*", 
      "node_modules/*", 
      "dist/*", 
      "next-env.d.ts", 
      ".intlayer/*", 
      "next.config.mjs", 
      "postcss.config.mjs"
    ],
  },
];
