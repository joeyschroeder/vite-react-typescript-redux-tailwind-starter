/** @type {import("stylelint").Config} */
export default {
  extends: ['stylelint-config-standard'],
  plugins: ['stylelint-prettier'],
  rules: {
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          // ignore Tailwind CSS at-rules
          'apply',
          'custom-variant',
          'layer',
          'responsive',
          'screen',
          'tailwind',
          'theme',
          'variant',
          'variants',
        ],
      },
    ],
    'prettier/prettier': true,
  },
};
