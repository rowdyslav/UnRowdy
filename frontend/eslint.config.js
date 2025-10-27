import tseslint from 'typescript-eslint'
import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import eslintConfigPrettier from 'eslint-config-prettier'
import featureSliced from '@feature-sliced/eslint-config'

export default tseslint.config(
  {
    ignores: ['dist', 'node_modules', 'build', '*.config.js'],
  },
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.recommended,
      reactRefresh.configs.vite,
      featureSliced,
      eslintConfigPrettier,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
        ...globals.es2020,
      },
      parserOptions: {
        project: './tsconfig.json',
      },
    },
    rules: {
      // Дополнительные правила
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  })