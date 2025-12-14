import js from "@eslint/js";
import "@stylistic/eslint-plugin"; // required for eslint-config-airbnb-extended
import { configs, plugins } from "eslint-config-airbnb-extended";
import { rules as prettierConfigRules } from "eslint-config-prettier";
import "eslint-import-resolver-typescript"; // required for eslint-config-airbnb-extended
import "eslint-plugin-import-x"; // required for eslint-config-airbnb-extended
import prettierPlugin from "eslint-plugin-prettier";
import reactPlugin from "eslint-plugin-react"; // required for eslint-config-airbnb-extended
import "eslint-plugin-react-hooks"; // required for eslint-config-airbnb-extended
import reactRefresh from "eslint-plugin-react-refresh";
import eslintPluginSortDestructureKeys from "eslint-plugin-sort-destructure-keys";
import { defineConfig, globalIgnores } from "eslint/config";
import globals from "globals";
import "typescript-eslint"; // required for eslint-config-airbnb-extended

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{js,ts,tsx}"],
    extends: [
      js.configs.recommended,
      plugins.stylistic,
      plugins.importX,
      ...configs.base.recommended,
      plugins.react,
      plugins.reactHooks,
      plugins.reactA11y,
      ...configs.react.recommended,
      plugins.typescriptEslint,
      ...configs.base.typescript,
      ...configs.react.typescript,
      reactPlugin.configs.flat["jsx-runtime"],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      prettier: prettierPlugin,
      "sort-destructure-keys": eslintPluginSortDestructureKeys,
    },
    rules: {
      ...prettierConfigRules,
      "prettier/prettier": "warn",
      "import-x/prefer-default-export": "off",
      "sort-destructure-keys/sort-destructure-keys": 2,
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
]);
