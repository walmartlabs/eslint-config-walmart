"use strict";

module.exports = {
  "extends": [
    "defaults/configurations/walmart/es6",
    "defaults/rules/react/walmart"
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
