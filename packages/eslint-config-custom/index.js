module.exports = {
  ignorePatterns: ['dist/*', 'node_modules/*'],
  extends: ['next', 'next/core-web-vitals', 'turbo', 'prettier'],
  rules: {
    '@next/next/no-html-link-for-pages': 'off',
    '@next/next/no-img-element': 0,
    'react/jsx-key': 'off',
    semi: 'error',
    'no-unused-vars': 'error',
  },
};
