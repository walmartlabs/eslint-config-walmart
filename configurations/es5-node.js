"use strict";

module.exports = {
  "extends": [
    "walmart/configurations/es5",
    "walmart/rules/eslint/node/on"
  ],
  "env": {
    "node": true
  },
  "rules": {
    "strict": [2, "global"]
  }
};
