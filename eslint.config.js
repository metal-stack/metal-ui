import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import tseslint from "typescript-eslint";
import prettier from "eslint-config-prettier";

export default tseslint.config(
  { ignores: ["dist", "node_modules"] },
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      "no-console": "error",
      // Existing code violates these; tracked as follow-ups, so warn only.
      "react-hooks/set-state-in-effect": "warn",
      "@typescript-eslint/no-explicit-any": "warn",
      // TanStack Table is flagged as "incompatible" with the React Compiler,
      // which this project does not use.
      "react-hooks/incompatible-library": "off",
    },
  },
  prettier,
);
