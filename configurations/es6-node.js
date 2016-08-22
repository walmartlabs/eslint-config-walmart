"use strict";

module.exports = {
  "extends": [
    "walmart/configurations/es6",
    "walmart/rules/eslint/node/on"
  ],
  "env": {
    "node": true
  },
  "parserOptions": {
    "sourceType": "script",
    "ecmaFeatures": {
      "impliedStrict": false
    }
  },
  "globals": {},
  "rules": {
    // verify super() callings in constructors
    "constructor-super": 0,
    // disallow modifying variables of class declarations
    "no-class-assign": 0,
    // disallow modifying variables that are declared using const
    "no-dupe-class-members": 0,
    // disallow to use this/super before super() calling in constructors.
    "no-this-before-super": 0,
    // suggest using Reflect methods where applicable
    "prefer-reflect": 0,
    // require that all functions are run in strict mode
    "strict": [2, "global"]
  }
};
