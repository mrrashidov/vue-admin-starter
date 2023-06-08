/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  env: {
    node: true,
    browser: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier'
  ],
  plugins: ['check-file'],
  overrides: [
    {
      files: ['cypress/e2e/**/*.{cy,spec}.{js,ts,jsx,tsx}'],
      extends: ['plugin:cypress/recommended']
    }
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    'vue/multi-word-component-names': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/ban-ts-comment': ['error', { 'ts-ignore': 'allow-with-description' }],
    '@typescript-eslint/consistent-type-imports': [
      'error',
      { prefer: 'type-imports', disallowTypeAnnotations: false }
    ],
    '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
    '@typescript-eslint/prefer-ts-expect-error': 'error',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'check-file/filename-naming-convention': [
      'error',
      {
        'src/**/utils/**/*.ts': 'SNAKE_CASE',
        'src/**/stores/**/*.ts': 'SNAKE_CASE',
        'src/**/components/**/*.{test.ts,vue}': 'PASCAL_CASE',
        'src/**/views/**/*.vue': 'KEBAB_CASE'
      },
      { ignoreMiddleExtensions: true }
    ],
    'check-file/folder-naming-convention': [
      'error',
      {
        'src/!(components,views)/**/': 'SNAKE_CASE',
        'components/*/': 'PASCAL_CASE',
        'views/!(__tests__)/**/': 'KEBAB_CASE'
      }
    ]
  }
}
