import js from '@eslint/js'
import eslintConfigPrettier from 'eslint-config-prettier'
import pluginImport from 'eslint-plugin-import'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),

  {
    files: ['**/*.{ts,tsx}'],

    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
      pluginImport.flatConfigs.recommended,
    ],

    languageOptions: {
      globals: globals.browser,
      ecmaVersion: 'latest',
      parser: tseslint.parser,
      parserOptions: {
        tsconfigRootDir: import.meta.dirname,
        sourceType: 'module',
      },
    },

    rules: {
      // JavaScript
      'prefer-const': 'warn',
      'no-unused-vars': 'off',

      // TypeScript
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],

      // any 사용 금지
      '@typescript-eslint/no-explicit-any': 'error',

      // 배열 타입 표기 통일
      '@typescript-eslint/array-type': [
        'warn',
        {
          default: 'array-simple',
        },
      ],

      // Import
      'import/no-unresolved': 'off',
      'import/named': 'off',

      'import/order': [
        'warn',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
    },
  },

  // ESLint와 Prettier 충돌 방지
  eslintConfigPrettier,
])
