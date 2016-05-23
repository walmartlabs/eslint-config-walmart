"use strict";

module.exports = {
  "extends": [
    "defaults/rules/eslint/best-practices/on",
    "defaults/rules/eslint/errors/on",
    "defaults/rules/eslint/es6/off",
    "defaults/rules/eslint/node/off",
    "defaults/rules/eslint/strict/on",
    "defaults/rules/eslint/style/on",
    "defaults/rules/eslint/variables/on",
    "defaults/rules/filenames/on"
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
