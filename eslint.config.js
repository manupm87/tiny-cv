import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  {
    ignores: [
      'dist',
      'coverage',
      'e2e-coverage',
      '.nyc_output',
      'playwright-report',
      'test-results',
      'playwright.config.js',
      'vite.config.js',
      'eslint.config.js',
    ],
  },
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      // `motion` is only ever used as a JSX member expression (<motion.div>), which core
      // no-unused-vars cannot see without a JSX-aware plugin - same reason as the ^[A-Z_] rule.
      'no-unused-vars': ['error', { varsIgnorePattern: '^(motion$|[A-Z_])' }],
    },
  },
  {
    // Node-side code: Playwright specs/helpers, build + image scripts.
    files: ['tests/**/*.js', 'scripts/**/*.{js,mjs}'],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
  },
])
