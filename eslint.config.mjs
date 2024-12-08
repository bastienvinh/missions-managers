import typescriptEslint from '@typescript-eslint/eslint-plugin'
import react from 'eslint-plugin-react'
import jsonFormat from 'eslint-plugin-json-format'
import drizzle from 'eslint-plugin-drizzle'
import globals from 'globals'
import tsParser from '@typescript-eslint/parser'
import path from 'node:path'
import {fileURLToPath} from 'node:url'
import js from '@eslint/js'
import {FlatCompat} from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
})

export default [
  {
    ignores: ['src/components/ui/*'],
  },
  ...compat.extends(
    'next/core-web-vitals',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:@typescript-eslint/strict',
    'plugin:drizzle/recommended'
  ),
  {
    plugins: {
      '@typescript-eslint': typescriptEslint,
      react,
      'json-format': jsonFormat,
      drizzle,
    },

    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.jest,
      },

      parser: tsParser,
      ecmaVersion: 'latest',
      sourceType: 'module',
    },

    rules: {
      'filenames/match-regex': 'off',
      // 'unicorn/prefer-global-this': 'off',
      'no-unescaped-entities': 'off',
      'import/no-commonjs': 'off',
      'import/no-namespace': 'off',
      'import/named': 'off',
      // 'unicorn/prevent-abbreviations': 'off',
      // 'unicorn/prefer-module': 'off',
      // 'unicorn/filename-case': 'off',
      'no-console': 'off',
      'no-unused-vars': 'off',
      // 'promise/always-return': 'error',
      // 'promise/no-return-wrap': 'error',
      // 'promise/param-names': 'error',
      // 'promise/catch-or-return': 'error',
      // 'promise/no-native': 'off',
      // 'promise/no-nesting': 'warn',
      // 'promise/no-promise-in-callback': 'warn',
      // 'promise/no-callback-in-promise': 'warn',
      // 'promise/no-new-statics': 'error',
      // 'promise/no-return-in-finally': 'warn',
      // 'promise/valid-params': 'warn',
      // 'promise/avoid-new': 'off',
      'react/prop-types': 'off',
      'i18n-text/no-en': 'off',
      // 'github/no-implicit-buggy-globals': 'off',

      // 'eslint-comments/no-use': [
      //   'error',
      //   {
      //     allow: ['eslint-disable', 'eslint-disable-next-line'],
      //   },
      // ],

      camelcase: 'off',
      'no-shadow': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },
  {
    files: ['src/app/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            '@/db/*',
            'drizzle-orm',
            '@/services/product-service',
            '@/services/interceptors/product-service-logger-interceptor',
          ],
        },
      ],
    },
  },
  {
    files: ['src/db/**/*.ts', 'src/services/**/*.ts'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: ['@/app/*', '@/services/validation/ui/*'],
        },
      ],
    },
  },
  {
    // Nouvelle règle pour le dossier `services`
    files: ['src/services/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: 'react',
              importNames: ['cache'],
              message:
                'L’utilisation de `cache` depuis `react` est interdite dans les services.',
            },
          ],
        },
      ],
    },
  },
]
