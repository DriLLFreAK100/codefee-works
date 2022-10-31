const withTM = require('next-transpile-modules')(['modelite', 'ui', 'utils']);

module.exports = withTM({
  reactStrictMode: true,
});
