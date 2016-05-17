"use strict";

module.exports = {
  "extends": [
    "defaults/rules/eslint/best-practices/walmart",
    "defaults/rules/eslint/errors/walmart",
    "defaults/rules/eslint/es6/off",
    "defaults/rules/eslint/node/off",
    "defaults/rules/eslint/strict/walmart",
    "defaults/rules/eslint/style/walmart",
    "defaults/rules/eslint/variables/walmart",
    "defaults/rules/filenames/walmart"
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
