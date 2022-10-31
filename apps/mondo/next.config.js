const withTM = require('next-transpile-modules')(['modelite', 'utils']);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // experimental: {
  //   appDir: true,
  // },
};

module.exports = withTM(nextConfig);
