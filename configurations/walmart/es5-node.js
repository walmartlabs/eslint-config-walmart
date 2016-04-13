"use strict";

module.exports = {
  "extends": [
    "defaults/configurations/walmart/es5",
    "defaults/rules/eslint/node/walmart"
  ],
  "env": {
    "node": true
  },
  "rules": {
    "strict": [2, "global"]
  }
};
