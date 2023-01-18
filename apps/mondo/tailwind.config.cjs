const config = require("tailwind-config");

module.exports = {
  ...config,
  content: [
    ...config.content,
    '../../packages/ui/**/*.{js,jsx,ts,tsx}'
  ]
};