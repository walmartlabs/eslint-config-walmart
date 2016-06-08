"use strict";

module.exports = {
  "extends": [
    "walmart/rules/eslint/best-practices/on",
    "walmart/rules/eslint/errors/on",
    "walmart/rules/eslint/es6/off",
    "walmart/rules/eslint/node/off",
    "walmart/rules/eslint/strict/on",
    "walmart/rules/eslint/style/on",
    "walmart/rules/eslint/variables/on",
    "walmart/rules/filenames/on"
  ],
  "parserOptions": {
    "ecmaVersion": 5,
    "sourceType": "script",
    "ecmaFeatures": {}
  },
  "env": {
    "amd": true
  },
  "globals": {
    "module": false,
    "process": false
  },
  "rules": {}
};
