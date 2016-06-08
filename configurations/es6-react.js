"use strict";

module.exports = {
  "parser": "babel-eslint",
  "extends": [
    "walmart/configurations/es6",
    "walmart/rules/react/on"
  ],
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "globals": {
    "fetch": false
  },
  "rules": {
    "no-extra-parens": 0,
    "no-var": 2
  }
};
