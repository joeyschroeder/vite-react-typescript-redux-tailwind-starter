import '@stylistic/eslint-plugin'; // required for eslint-config-airbnb-extended
import 'eslint-import-resolver-typescript'; // required for eslint-config-airbnb-extended
import 'eslint-plugin-import-x'; // required for eslint-config-airbnb-extended
import 'eslint-plugin-react-hooks'; // required for eslint-config-airbnb-extended
import 'typescript-eslint'; // required for eslint-config-airbnb-extended

import js from '@eslint/js';
import { defineConfig, globalIgnores } from 'eslint/config';
import { configs, plugins } from 'eslint-config-airbnb-extended';
import { rules as prettierConfigRules } from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';
import reactPlugin from 'eslint-plugin-react';
import reactRefresh from 'eslint-plugin-react-refresh';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import eslintPluginSortDestructureKeys from 'eslint-plugin-sort-destructure-keys';
import globals from 'globals';

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
      react: {
        version: 'detect',
      },
    },
  },
]);
