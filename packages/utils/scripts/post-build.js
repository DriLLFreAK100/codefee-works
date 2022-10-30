const fs = require('fs');

const main = () => {
  const overrides = {
    "name": "@codefee/utils",
    "main": "./dist/utils.cjs",
    "module": "./dist/utils.js",
    "types": "./dist/index.d.ts",
    "exports": {
      ".": {
        "import": "./dist/utils.js",
        "require": "./dist/utils.umd.cjs"
      }
    },
  }

  // Read package.json

  // Override entrypoints

  // Output
}

main();