"use strict";

module.exports = {
  "plugins": [
    "react"
  ],
  "rules": {
    // Prevent missing displayName in a React component definition
    "react/display-name": 0,
    // Forbid certain propTypes
    "react/forbid-prop-types": 0,
    // Prevent usage of dangerous JSX properties
    "react/no-danger": 0,
    // Prevent usage of deprecated methods
    "react/no-deprecated": 2,
    // Prevent usage of setState in componentDidMount
    "react/no-did-mount-set-state": 2,
    // Prevent usage of setState in componentDidUpdate
    "react/no-did-update-set-state": 2,
    // Prevent direct mutation of this.state
    "react/no-direct-mutation-state": 2,
    // Prevent usage of isMounted
    "react/no-is-mounted": 2,
    // Prevent multiple component definition per file
    "react/no-multi-comp": 0,
    // Prevent usage of setState
    "react/no-set-state": 0,
    // Prevent using string references in ref attribute.
    "react/no-string-refs": 0,
    // Prevent usage of unknown DOM property
    "react/no-unknown-property": 2,
    // Enforce ES5 or ES6 class for React Components
    "react/prefer-es6-class": 2,
    // Enforce stateless React Components to be written as a pure function
    "prefer-stateless-function": 0,
    // Prevent missing props validation in a React component definition
    "react/prop-types": 2,
    // Prevent missing React when using JSX
    "react/react-in-jsx-scope": 2,
    // Restrict file extensions that may be required
    "react/require-extension": 0,
    // Enforce ES5 or ES6 class for returning value in render function
    "require-render-return": 0,
    // Prevent extra closing tags for components without children
    "react/self-closing-comp": 2,
    // Enforce component methods order
    "react/sort-comp": 0,
    // Enforce propTypes declarations alphabetical sorting
    "sort-prop-types": 0,
    // Prevent missing parentheses around multilines JSX
    "react/wrap-multilines": 2,

    // ========================================================================
    //                                JSX Specific Rules
    // ========================================================================

    // Enforce boolean attributes notation in JSX
    "react/jsx-boolean-value": 2,
    // Validate closing bracket location in JSX
    "react/jsx-closing-bracket-location": [2, "tag-aligned"],
    // Enforce or disallow spaces inside of curly braces in JSX attributes
    "react/jsx-curly-spacing": 0,
    // Enforce or disallow spaces around equal signs in JSX attributes (fixable)
    "react/jsx-equals-spacing": 0,
    // Enforce position of the first prop in JSX
    "react/jsx-first-prop-new-line": 0,
    // Enforce event handler naming conventions in JSX
    "react/jsx-handler-names": 1,
    // Validate JSX indentation
    "react/jsx-indent": 0,
    // Validate props indentation in JSX
    "react/jsx-indent-props": [2, 2],
    // Validate JSX has key prop when in array or iterator
    "react/jsx-key": 2,
    // Limit maximum of props on a single line in JSX
    "react/jsx-max-props-per-line": 0,
    // Prevent usage of .bind() and arrow functions in JSX props
    "react/jsx-no-bind": 0,
    // Prevent duplicate props in JSX
    "react/jsx-no-duplicate-props": 0,
    // Prevent usage of unwrapped JSX strings
    "react/jsx-no-literals": 0,
    // Prevent usage of unsafe target='_blank'
    "react/jsx-no-target-blank": 0,
    // Disallow undeclared variables in JSX
    "react/jsx-no-undef": 2,
    // Enforce PascalCase for user-defined JSX components
    "react/jsx-pascal-case": 2,
    // Enforce propTypes declarations alphabetical sorting
    "react/jsx-sort-props": 0,
    // Validate spacing before closing bracket in JSX (fixable)
    "react/jsx-space-before-closing": 0,
    // Prevent React to be incorrectly marked as unused
    "react/jsx-uses-react": 2,
    // Prevent variables used in JSX to be incorrectly marked as unused
    "react/jsx-uses-vars": 2
  }
};
