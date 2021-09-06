module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:react-hooks/recommended',
    'next',
    'next/core-web-vitals',
  ],
  ignorePatterns: [
    // break
    '**/node_modules/**',
    '**/dist/**',
    '**/.next/**',
    '**/.rush/**',
    '**/.serverless/**',
    '**/.serverless_nextjs/**',
  ],
  globals: { __dirname: true, process: true },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
    project: ['tsconfig.json']
  },
  plugins: ['react', 'prettier', '@typescript-eslint', 'import'],
  rules: {
    'prettier/prettier': ['warn', require('./.prettierrc.js')],
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'react/display-name': 'off',
    'react/no-unescaped-entities': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
    'jsx-a11y/anchor-is-valid': 'off',
    'jsx-a11y/accessible-emoji': 'warn',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'comma-dangle': [
      'off',
      {
        arrays: 'ignore',
        objects: 'always',
        imports: 'never',
        exports: 'never',
        functions: 'ignore',
      },
    ],
    'import/order': [
      'warn',
      {
        alphabetize: { order: 'asc' },
        groups: [['index', 'external', 'internal', 'builtin', 'object'], 'parent', 'sibling'],
      },
    ],
  },
  settings: {
    react: {
      pragma: 'React',
      version: 'detect',
    },
    linkComponents: ['Hyperlink', { name: 'Link', linkAttribute: 'href' }],
  },
};
