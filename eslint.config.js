import '@stylistic/eslint-plugin'; // required for eslint-config-airbnb-extended
import 'eslint-import-resolver-typescript'; // required for eslint-config-airbnb-extended
import 'eslint-plugin-import-x'; // required for eslint-config-airbnb-extended
import 'eslint-plugin-react-hooks'; // required for eslint-config-airbnb-extended
import 'typescript-eslint'; // required for eslint-config-airbnb-extended
import 'eslint-import-resolver-babel-module'; // required for babel-plugin-module-resolver support

import js from '@eslint/js';
import { defineConfig, globalIgnores } from 'eslint/config';
import { configs, plugins } from 'eslint-config-airbnb-extended';
import { rules as prettierConfigRules } from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';
import reactPlugin from 'eslint-plugin-react';
import reactRefresh from 'eslint-plugin-react-refresh';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import eslintPluginSortDestructureKeys from 'eslint-plugin-sort-destructure-keys';
import tailwind from 'eslint-plugin-tailwindcss';
import globals from 'globals';
import path from 'path';

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,ts,tsx}'],
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
      reactPlugin.configs.flat['jsx-runtime'],
      reactRefresh.configs.vite,
      tailwind.configs['flat/recommended'],
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      prettier: prettierPlugin,
      'simple-import-sort': simpleImportSort,
      'sort-destructure-keys': eslintPluginSortDestructureKeys,
    },
    rules: {
      ...prettierConfigRules,
      'import-x/order': 'warn',
      'import-x/prefer-default-export': 'off',
      'prettier/prettier': [
        'warn',
        {
          endOfLine: 'auto',
          singleQuote: true,
        },
      ],
      'simple-import-sort/imports': 'warn',
      'simple-import-sort/exports': 'warn',
      'sort-destructure-keys/sort-destructure-keys': 2,
    },
    settings: {
      'import/resolver': {
        'babel-module': {},
      },
      react: {
        version: 'detect',
      },
      // This is required because of a bug with eslint-plugin-tailwindcss
      // https://github.com/francoismassart/eslint-plugin-tailwindcss/issues/431
      tailwindcss: {
        config: path.resolve('./tailwind.config.js'),
      },
    },
  },
  {
    files: ['**/src/store/**/*.ts'],
    rules: {
      'no-param-reassign': 'off', // @reduxjs/toolkit slice actions often reassign state parameters
    },
  },
]);
