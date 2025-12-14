import js from "@eslint/js";
import jsxA11y from "eslint-plugin-jsx-a11y";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import reactPlugin from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import eslintPluginSortDestructureKeys from "eslint-plugin-sort-destructure-keys";
import { defineConfig, globalIgnores } from "eslint/config";
import globals from "globals";
import { configs as tseslintConfigs } from "typescript-eslint";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{js,ts,tsx}"],
    extends: [
      js.configs.recommended,
      jsxA11y.flatConfigs.recommended,
      reactPlugin.configs.flat.recommended,
      reactPlugin.configs.flat["jsx-runtime"],
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
      tseslintConfigs.recommended,
      eslintPluginPrettierRecommended,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "sort-destructure-keys": eslintPluginSortDestructureKeys,
    },
    rules: {
      "react/jsx-fragments": [2, "element"],
      "sort-destructure-keys/sort-destructure-keys": 2,
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
]);
