"use strict";

module.exports = {
  "plugins": [
    "filenames"
  ],
  "rules": {
    // Enforce dash-cased filenames
    "filenames/match-regex": [2, "^[a-z0-9\\-\\.]+$", true],
    // Match the file name against the default exported value in the module
    "filenames/match-exported": 0,
    // Don't allow index.js files
    "filenames/no-index": 0
  }
};
