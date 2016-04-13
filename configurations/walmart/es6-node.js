"use strict";

module.exports = {
  "extends": [
    "defaults/configurations/walmart/es6",
    "defaults/rules/eslint/node/walmart"
  ],
  rules: {
    // verify super() callings in constructors
    "constructor-super": 0,
    // disallow modifying variables of class declarations
    "no-class-assign": 0,
    // disallow modifying variables that are declared using const
    "no-dupe-class-members": 0,
    // disallow to use this/super before super() calling in constructors.
    "no-this-before-super": 0,
    // suggest using Reflect methods where applicable
    "prefer-reflect": 0
  }
};
