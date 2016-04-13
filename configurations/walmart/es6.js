"use strict";

module.exports = {
  "extends": [
    "defaults/configurations/walmart/es5",
    "defaults/rules/eslint/es6/walmart"
  ],
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "module",
    "ecmaFeatures": {
      "impliedStrict": true
    }
  }
};
