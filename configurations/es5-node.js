"use strict";

module.exports = {
  "extends": [
    "defaults/configurations/es5",
    "defaults/rules/eslint/node/on"
  ],
  "env": {
    "node": true
  },
  "rules": {
    "strict": [2, "global"]
  }
};
