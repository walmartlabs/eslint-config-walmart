# Walmart JavaScript Style Guide

*Walmart's guide to code style and best practices*

## Table of Contents

1. [Types](#types)
1. [References & Variables](#references--variables)
1. [Objects](#objects)
1. [Arrays](#arrays)
1. [Destructuring](#destructuring)
1. [Strings & Regular Expressions](#strings--regular-expressions)
1. [Functions](#functions)
1. [Classes & Constructors](#classes--constructors)
1. [Modules](#modules)
1. [Iterators & Generators](#iterators--generators)
1. [Comparison Operators & Equality](#comparison-operators--equality)
1. [Blocks & Whitespace](#blocks--whitespace)
1. [Comments](#comments)
1. [Commas & Semicolons](#commas--semicolons)
1. [Naming Conventions](#naming-conventions)
1. [Forbidden Features](#forbidden-features)
1. [React & JSX](#react--jsx)
1. [Acknowledgements](#acknowledgements)

## Types
<a name="types--primitives"></a><a name="1.1"></a>
- [1.1](#types--primitives) **Primitives**: When you access a primitive type you work directly on its value.
  + `string`
  + `number`
  + `boolean`
  + `null`
  + `undefined`

  ```js
  const foo = 1;
  let bar = foo;

  bar = 9;

  console.log(foo, bar); // => 1, 9
  ```

<a name="types--complex"></a><a name="1.2"></a>
- [1.2](#types--complex) **Complex**: When you access a complex type you work on a reference to its value.
  + `object`
  + `array`
  + `function`

  ```js
  const foo = [1, 2];
  const bar = foo;

  bar[0] = 9;

  console.log(foo[0], bar[0]); // => 9, 9
  ```

<a name="types--no-new-wrappers"></a><a name="1.3"></a>
- [1.3](#types--no-new-wrappers) Do not create primitive types using their constructors.

  > eslint: [`no-new-wrappers`](http://eslint.org/docs/rules/no-new-wrappers)
  >
  > defined in: `rules/eslint/best-practices`

  ```js
  // bad
  var booleanObject = new Boolean(false);
  var numberObject = new Number(1);
  var stringObject = new String("string");

  // good
  var boolean = false;
  var number = 1;
  var string = "string";
  ```

  > Why?
  >
  > Wrapping primitives in their constructor creates an object, which can have unintended side effects when making comparisons.

<a name="types--no-octal"></a><a name="1.4"></a>
- [1.4](#types--no-octal) Do not use octals or octal escapes.

  > eslint: [`no-octal`](http://eslint.org/docs/rules/no-octal), [`no-octal-escape`](http://eslint.org/docs/rules/no-octal-escape)
  >
  > defined in: `rules/eslint/best-practices`

  ```js
  // bad
  var octal = 058;
  var escapedOctal = "\058";

  // good
  var escapedHexadecimal = "\xA9";
  ```

  > Why?
  >
  > Octal is deprecated in ES5.

<a name="types--isnan"></a><a name="1.5"></a>
- [1.5](#types--isnan) Use `isNaN()` to check type `NaN`.

  > eslint: [`use-isnan`](http://eslint.org/docs/rules/use-isnan)
  >
  > defined in: `rules/eslint/errors`

  ```js
  // bad
  console.log(NaN === NaN); // false

  // good
  console.log(isNaN(NaN)); // true
  ```

  > Why?
  >
  > `NaN` is equal to nothing, including itself. Use `isNaN` to check if a value is `NaN`.

<a name="types--typeof"></a><a name="1.6"></a>
- [1.6](#types--typeof) Only use valid strings for `typeof` expressions.

  > eslint: [`valid-typeof`](http://eslint.org/docs/rules/valid-typeof)
  >
  > defined in: `rules/eslint/errors`

  ```js
  // bad
  typeof foo === "not a real type";

  // good
  typeof foo === "number";
  ```

  > Why?
  >
  > String comparisons to typeof can only evaluate as `true` if they are one of `"undefined"`, `"object"`, `"boolean"`, `"number"`, `"string"`, `"function"`, or `"symbol"`.

**[⬆️ back to top](#table-of-contents)**

## References & Variables

<a name="references--one-var"></a><a name="2.1"></a>
- [2.1](#references--one-var) Use only one variable declaration for each variable you wish to define.
  > eslint: [`one-var: never`](http://eslint.org/docs/rules/one-var)
  >
  > defined in: `rules/eslint/style`

  ```js
  // bad
  const a, b;

  // good
  const a;
  const b;
  ```

  > Why?
  >
  > Walmart code style preference.

<a name="references--prefer-const"></a><a name="2.2"></a>
- [2.2](#references--prefer-const) Use `const` for all of your references; do not use `var` and avoid using `let`.

  > eslint: [`prefer-const`](http://eslint.org/docs/rules/prefer-const)
  >
  > defined in: `rules/eslint/es6`

  ```js
  // bad
  var a = 1;
  let b = 2;

  // good
  const a = 1;
  const b = 2;
  ```

  > Why?
  >
  > This ensures that you can't reassign your references, which can lead to bugs and difficult to comprehend code.

<a name="references--no-var"></a><a name="2.3"></a>
- [2.3](#references--no-var) If you must reassign references, use `let` instead of `var`.

  > eslint: [`no-var`](http://eslint.org/docs/rules/no-var)
  >
  > defined in: `rules/eslint/es6`, `configurations/es6-react`

  ```js
  // bad
  var count = 1;
  if (true) {
    count += 1;
  }

  // good, use let
  let count = 1;
  if (true) {
    count += 1;
  }
  ```

  > Why?
  >
  > `let` is block-scoped rather than function-scoped like `var`. Read more in this [blog post](https://hackernoon.com/why-you-shouldnt-use-var-anymore-f109a58b9b70)

<a name="references--block-scope"></a><a name="2.4"></a>
- [2.4](#references--block-scope) Note that both `let` and `const` are block-scoped.

  ```js
  // const and let only exist in the blocks they are defined in.
  {
    let a = 1;
    let b = 1;
  }
  console.log(a); // ReferenceError
  console.log(b); // ReferenceError
  ```

<a name="variables--const"></a><a name="2.5"></a>
- [2.5](#variables--const) Always use `const` to declare variables. Do not initialze a variable to `undefined`.

  > eslint: [`no-undef`](http://eslint.org/docs/rules/no-undef), [`prefer-const`](http://eslint.org/docs/rules/prefer-const), [`no-undef-init`](http://eslint.org/docs/rules/no-undef-init)
  >
  > defined in: `rules/eslint/variables`, `rules/eslint/es6`, `rules/eslint/variables`

  ```js
  // bad
  superPower = new SuperPower();

  // good
  const superPower = new SuperPower();

  // bad
  let notSureYet = undefined;

  // good
  let notSureYet;
  ```

  > Why?
  >
  > Variables that aren't defined get hoisted to the global scope. Variables without a value at initialization are `undefined` by default.

<a name="variables--one-const"></a><a name="2.6"></a>
- [2.6](#variables--one-const) Use one `const` declaration per variable.

  > eslint: [`one-var`](http://eslint.org/docs/rules/one-var.html)
  >
  > defined in: `rules/eslint/style`

  ```js
  // bad
  const items = getItems(),
      goSportsTeam = true,
      dragonball = 'z';

  // bad
  // (compare to above, and try to spot the mistake)
  const items = getItems(),
      goSportsTeam = true;
      dragonball = 'z';

  // good
  const items = getItems();
  const goSportsTeam = true;
  const dragonball = 'z';
  ```

  > Why?
  >
  > It's easier to add new variable declarations this way, and you never have to worry about swapping out a `;` for a `,` or introducing punctuation-only diffs. You can also step through each declaration with the debugger, instead of jumping through all of them at once.

<a name="variables--const-let-group"></a><a name="2.7"></a>
- [2.7](#variables--const-let-group) Group all your `const`s and then group all your `let`s.

  ```js
  // bad
  let i, len, dragonball,
      items = getItems(),
      goSportsTeam = true;

  // bad
  let i;
  const items = getItems();
  let dragonball;
  const goSportsTeam = true;
  let len;

  // good
  const goSportsTeam = true;
  const items = getItems();
  let dragonball;
  let i;
  let length;
  ```

  > Why?
  >
  > This is helpful when later on you might need to assign a variable depending on one of the previous assigned variables.

<a name="variables--define-where-used"></a><a name="2.8"></a>
- [2.8](#variables--define-where-used) Assign variables where you need them, but place them in a reasonable place.

  ```js
  // bad - unnecessary function call
  function checkName(hasName) {
    const name = getName();

    if (hasName === 'test') {
      return false;
    }

    if (name === 'test') {
      this.setName('');
      return false;
    }

    return name;
  }

  // good
  function checkName(hasName) {
    if (hasName === 'test') {
      return false;
    }

    const name = getName();

    if (name === 'test') {
      this.setName('');
      return false;
    }

    return name;
  }
  ```

  > Why?
  >
  > `let` and `const` are block scoped and not function scoped.

<a name="variables--no-chain-assignment"></a><a name="2.9"></a>
- [2.9](#variables--no-chain-assignment) Don't chain variable assignments.

  ```js
  // bad
  (function example() {
    // JavaScript interprets this as
    // let a = ( b = ( c = 1 ) );
    // The let keyword only applies to variable a; variables b and c become
    // global variables.
    let a = b = c = 1;
  }());

  console.log(a); // undefined
  console.log(b); // 1
  console.log(c); // 1

  // good
  (function example() {
    let a = 1;
    let b = a;
    let c = a;
  }());

  console.log(a); // undefined
  console.log(b); // undefined
  console.log(c); // undefined

  // the same applies for `const`
  ```

  > Why?
  >
  > Chaining variable assignments creates implicit global variables.

<a name="variables--switch-blocks"></a><a name="2.10"></a>
- [2.10](#variables--switch-blocks) Use braces to create blocks in `case` and `default` clauses that contain lexical declarations (e.g. `let`, `const`, `function`, and `class`).

  > eslint: [`no-case-declarations`](http://eslint.org/docs/rules/no-case-declarations.html)
  >
  > defined in: `rules/eslint/best-practices`

  ```javascript
  // bad
  switch (foo) {
    case 1:
      let x = 1;
      break;
    case 2:
      const y = 2;
      break;
    case 3:
      function f() {}
      break;
    default:
      class C {}
  }

  // good
  switch (foo) {
    case 1: {
      let x = 1;
      break;
    }
    case 2: {
      const y = 2;
      break;
    }
    case 3: {
      function f() {}
      break;
    }
    case 4:
      bar();
      break;
    default: {
      class C {}
    }
  }
  ```

  > Why?
  >
  > Lexical declarations are visible in the entire `switch` block but only get initialized when assigned, which only happens when its `case` is reached. This causes problems when multiple `case` clauses attempt to define the same thing.

<a name="variables--no-magic-numbers"></a><a name="2.11"></a>
- [2.11](#variables--no-magic-numbers) Do not use magic numbers, except for `-1`, `0`, and `1`.

  > eslint: [`no-magic-numbers`](http://eslint.org/docs/rules/no-magic-numbers)
  >
  > defined in: `rules/eslint/best-practices`

  ```js
  // bad
  function getTotal(price) {
    return price * 1.12;
  }

  // good
  function getTotal(price) {
    const taxRate = 1.12;
    return price * taxRate;
  }
  ```

  > Why?
  >
  > Numbers should be assigned to constants to improve code readability and ease of refactoring. Magic numbers are allowed, however, in unit tests.

<a name="variables--no-native-reassign"></a><a name="2.12"></a>
- [2.12](#variables--no-native-reassign) Do not reassign native variables.

  > eslint: [`no-native-reassign`](http://eslint.org/docs/rules/no-native-reassign)
  >
  > defined in: `rules/eslint/best-practices`

  ```js
  // bad
  window = {};
  undefined = 1;
  ```

  > Why?
  >
  > There are several variables like `window` that are defined by the environment and should not be changed.

<a name="variables--no-redeclare"></a><a name="2.13"></a>
- [2.13](#variables--no-redeclare) Do not declare the same variable more than once in the same scope.

  > eslint: [`no-redeclare`](http://eslint.org/docs/rules/no-redeclare)
  >
  > defined in: `rules/eslint/best-practices`

  ```js
  // bad
  var a = 3;
  var a = 10;

  // good
  var a = 3;
  a = 10;
  ```

  > Why?
  >
  > Multiple declarations of the same variable can lead to confusion.

<a name="variables--unused-expressions"></a><a name="2.14"></a>
- [2.14](#variables--unused-expresions) Do not leave expressions unused.

  > eslint: [`no-unused-expressions`]
  >
  > defined in: `rules/eslint/best-practices`

  ```js
  // bad
  n + 1;
  0;
  "string";
  ```

  > Why?
  >
  > Unused expressions have no effect on the program.

<a name="variables--operator-shorthand"></a><a name="2.15"></a>
- [2.15](#variables--operator-shorthand) Use operator shorthand whenever possible.

  > eslint: [`operator-assignment`](http://eslint.org/docs/rules/operator-assignment)
  >
  > defined in: `rules/eslint/style`

  Use       | Instead of
  ----------|------------
  x += y    | x = x + y
  x -= y    | x = x - y
  x *= y    | x = x * y
  x /= y    | x = x / y
  x %= y    | x = x % y

  > Why?
  >
  > Operator assignment shorthand is more concise.

<a name="variables--catch"></a><a name="2.16"></a>
- [2.16](#variables--catch) Do not use the same variable name in a catch clause as a variable in the outer scope.

  > eslint: [`no-catch-shadow`](http://eslint.org/docs/rules/no-catch-shadow)
  >
  > defined in: `rules/eslint/variables`

  ```js
  // bad
  var error = "error";

  try {
    throw "problem";
  } catch (error) {
    console.log(error);
  }

  // good
  var error = "error";

  try {
    throw "problem";
  } catch (e) {
    console.log(e);
  }
  ```

  > Why?
  >
  > There is a bug in IE8 that can cause the `catch` argument to leak into the outer scope.

<a name="variables--labels"></a><a name="2.17"></a>
- [2.17](#variables--labels) Do not use a label with the same name as a variable in scope.

  > eslint: [`no-label-var`](http://eslint.org/docs/rules/no-label-var)
  >
  > defined in: `rules/eslint/variables`

  ```js
  // bad
  var first = 0;
  while (true) {
    first:
      while (true) {
        break first;
      }
  }
  ```

  > Why?
  >
  > Labels with the same name as a variable can be confused.

<a name="variables--no-shadow"></a><a name="2.18"></a>
- [2.18](#variables--no-shadow) Do not name a variable the same as a variable in the outer scope.

  > eslint: [`no-shadow`](http://eslint.org/docs/rules/no-shadow)
  >
  > defined in: `rules/eslint/variables`

  ```js
  // bad
  var a = 3;
  function() {
    var a = 4;
  }
  ```

  > Why?
  >
  > This can be confusing and the variable in the outer scope is no longer accessible from the inner scope.

<a name="variables--unused"></a><a name="2.19"></a>
- [2.19](#variables--unused) Don't leave variables unused.

  > eslint: [`no-unused-vars`](http://eslint.org/docs/rules/no-unused-vars)
  >
  > defined in: `rules/eslint/variables`

  ```js
  // bad
  var x = "unused";
  /* end of script */
  ```

  > Why?
  >
  > Unused variables are extra unnecessary clutter.

<a name="variables--no-use-before-define"></a><a name="2.20"></a>
- [2.20](#variables--no-use-before-define)

  > eslint: [`no-use-before-define`](http://eslint.org/docs/rules/no-use-before-define)
  >
  > defined in: `rules/eslint/variables`

  ```js
  // bad
  console.log(a);
  var a = "test";
  ```

  > Why?
  >
  > Variable declarations get hoisted to the top of the scope, so this is valid but confusing.

<a name="variables--no-const-assign"></a><a name="2.21"></a>
- [2.21](http://eslint.org/docs/rules/no-const-assign)

  > eslint: [`no-const-assign`](http://eslint.org/docs/rules/no-const-assign)
  >
  > defined in: `rules/eslint/es6`

  ```js
  // bad
  const doNotChange = "constant";
  doNotChange = "mutated";
  ```

  > Why?
  >
  > Changing a `const` assignment will result in a runtime error.

**[⬆️ back to top](#table-of-contents)**

## Objects

<a name="objects--no-new"></a><a name="3.1"></a>
- [3.1](#objects--no-new) Use the literal syntax for object creation

  > eslint: [`no-new-object`](http://eslint.org/docs/rules/no-new-object)
  >
  > defined in: `rules/eslint/style`

  ```js
  // bad
  const item = new Object();

  // good
  const item = {};
  ```

  > Why?
  >
  > Object literal syntax is more concise.

<a name="objects--computed-properties"></a><a name="3.2"></a>
- [3.2](#objects--computed-properties) Use computed property names when creating objects with dynamic property names.

  ```js
  function getKey(k) {
    return `a key named ${k}`;
  }

  // bad
  const obj = {
    id: 5,
    name: 'San Francisco',
  };
  obj[getKey('enabled')] = true;

  // good
  const obj = {
    id: 5,
    name: 'San Francisco',
    [getKey('enabled')]: true
  };
  ```

  > Why?
  >
  > ES6 computed properties allow you to define all the properties of an object in one place.

<a name="objects--object-shorthand"></a><a name="3.3"></a>
- [3.3](#objects--object-shorthand) Use object method shorthand.

  > eslint: [`object-shorthand`](http://eslint.org/docs/rules/object-shorthand)
  >
  > defined in: `rules/eslint/es6`

  ```js
  // bad
  const atom = {
    value: 1,

    addValue: function (value) {
      return atom.value + value;
    }
  };

  // good
  const atom = {
    value: 1,

    addValue(value) {
      return atom.value + value;
    }
  };
  ```

  > Why?
  >
  > ES6 object literal shorthand is more concise.

<a name="objects--object-concise"></a><a name="3.4"></a>
- [3.4](#objects--object-concise) Use property value shorthand.

  > eslint: [`object-shorthand`](http://eslint.org/docs/rules/object-shorthand)
  >
  > defined in: `rules/eslint/es6`

  ```js
  const lukeSkywalker = "Luke Skywalker";

  // bad
  const obj = {
    lukeSkywalker: lukeSkywalker
  };

  // good
  const obj = {
    lukeSkywalker
  };
  ```

  > Why?
  >
  > ES6 object literal shorthand is more concise.

<a name="objects--grouped-shorthand"></a><a name="3.5"></a>
- [3.5](#objects--grouped-shorthand) Group your shorthand properties at the beginning of your object declaration.

  ```js
  const anakinSkywalker = 'Anakin Skywalker';
  const lukeSkywalker = 'Luke Skywalker';

  // bad
  const obj = {
    episodeOne: 1,
    twoJediWalkIntoACantina: 2,
    lukeSkywalker,
    episodeThree: 3,
    mayTheFourth: 4,
    anakinSkywalker,
  };

  // good
  const obj = {
    lukeSkywalker,
    anakinSkywalker,
    episodeOne: 1,
    twoJediWalkIntoACantina: 2,
    episodeThree: 3,
    mayTheFourth: 4,
  };
  ```

  > Why?
  >
  > It is easier to tell which properties are using the shorthand.

<a name="objects--prototype-builtins"></a><a name="3.6"></a>
- [3.6](#objects--prototype-builtins) Do not call `Object.prototype` methods directly, such as `hasOwnProperty`, `propertyIsEnumerable`, and `isPrototypeOf`.

  ```js
  // bad
  console.log(object.hasOwnProperty(key));

  // good
  console.log(Object.prototype.hasOwnProperty.call(object, key));

  // best
  const has = Object.prototype.hasOwnProperty; // cache the lookup once, in module scope.
  /* or */
  const has = require('has');

  console.log(has.call(object, key));
  ```

  > Why?
  >
  > These methods may be shadowed by properties on the object in question. Consider `{ hasOwnProperty: false }`. Or, the object may be a null object (`Object.create(null)`).

<a name="objects--rest-spread"></a><a name="3.7"></a>
- [3.7](#objects--rest-spread) Prefer the object spread operator over `Object.assign` to shallow-copy objects. Use the object rest operator to get a new object with certain properties omitted.

  ```js
  // very bad
  const original = { a: 1, b: 2 };
  const copy = Object.assign(original, {c: 3}); // this mutates `original`
  delete copy.a; // so does this

  // bad
  const original = { a: 1, b: 2 };
  const copy = Object.assign({}, original, { c: 3 }); // copy => { a: 1, b: 2, c: 3 }

  // good
  const original = { a: 1, b: 2 };
  const copy = { ...original, c: 3 }; // copy => { a: 1, b: 2, c: 3 }

  const { a, ...noA } = copy; // noA => { b: 2, c: 3 }
  ```

  > Why?
  >
  > Mutating objects can lead to mistakes and tough to solve bugs. Object spread operator is more concise than `Object.assign`. Read more about using object rest to omit properties from an object in [this blog post](https://medium.com/@markbrouch/use-es2015-object-rest-operator-to-omit-properties-38a3ecffe90#.pi4y326ir).

<a name="objects--properties-dot"></a><a name="3.8"></a>
- [3.8](#objects--properties-dot) Use dot notation when accessing properties.

  > eslint: [`dot-notation`](http://eslint.org/docs/rules/dot-notation.html)
  >
  > defined in: `rules/eslint/best-practices`

  ```js
  const luke = {
    jedi: true,
    age: 28,
  };

  // bad
  const isJedi = luke['jedi'];

  // good
  const isJedi = luke.jedi;
  ```

  > Why?
  >
  > Walmart code style preference.

<a name="objects--properties-bracket"></a><a name="3.9"></a>
- [3.9](#objects--properties-bracket) Use bracket notation `[]` when accessing properties with a variable.

  ```js
  const luke = {
    jedi: true,
    age: 28,
  };

  function getProp(prop) {
    return luke[prop];
  }

  const isJedi = getProp('jedi');
  ```

<a name="objects--no-extend-native"></a><a name="3.10"></a>
- [3.10](#objects--no-extend-native) Do not extend native objects.

  > eslint: [`no-extend-native`](http://eslint.org/docs/rules/no-extend-native)
  >
  > defined in: `rules/eslint/best-practices`

  ```js
  // bad
  Object.prototype.a = "a";

  // good
  var CustomObject = new Object();
  CustomObject.prototype.a = "a";
  ```

  > Why?
  >
  > Extending native or "built-in" features of the language can conflict with expectations of how these features work. If you need custom functionality, create a new instance of the feature first.

<a name="objects--no-proto"></a><a name="3.11"></a>
- [3.11](#objects--no-proto) Do not use `__proto__`.

  > eslint: [`no-proto`](http://eslint.org/docs/rules/no-proto)
  >
  > defined in: `rules/eslint/best-practices`

  ```js
  // bad
  var proto = obj.__proto__;

  // good
  var proto = Object.getPrototypeOf(obj);
  ```

  > Why?
  >
  > `__proto__` is deprecated in ES3.1.

<a name="objects--no-dupe-keys"></a><a name="3.12"></a>
- [3.12](#objects--no-dupe-keys) Do not use the same key more than once in an object.

  > eslint: [`no-dupe-keys`](http://eslint.org/docs/rules/no-dupe-keys)
  >
  > defined in: `rules/eslint/errors`

  ```js
  // bad
  var obj = {
    myKey: "a",
    myKey: "b"
  };

  // good
  var obj = {
    myKey: "a",
    myOtherKey: "b"
  };
  ```

  > Why?
  >
  > Multiple keys with the same name can cause problems.

<a name="objects--global-objects"></a><a name="3.13"></a>
- [3.13](#objects--global-objects) Do not call global objects as functions.

  > eslint: [`no-obj-calls`](http://eslint.org/docs/rules/no-obj-calls)
  >
  > defined in: `rules/eslint/errors`

  ```js
  // bad
  Math();
  JSON();
  ```

  > Why?
  >
  > Global objects like `Math` and `JSON` can look like class functions due to their capitalization. However, they are objects and cannot be invoked as functions.

**[⬆️ back to top](#table-of-contents)**

## Arrays

<a name="arrays--literals"></a><a name="4.1"></a>
- [4.1](#arrays--literals) Use the literal syntax for array creation.

  > eslint: [`no-array-constructor`](http://eslint.org/docs/rules/no-array-constructor)
  >
  > defined in: `rules/eslint/style`

  ```js
  // bad
  const items = new Array();

  // good
  const items = [];
  ```

  > Why?
  >
  > Array literals are more concise.

<a name="arrays--push"></a><a name="4.2"></a>
- [4.2](#arrays--push) Use [Array.push](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/push) instead of direct assignment to add items to an array.

  ```js
  const someStack = [];

  // bad
  someStack[someStack.length] = "abracadabra";

  // good
  someStack.push("abracadabra");
  ```

  > Why?
  >
  > `Array.push` is more concise.

<a name="arrays--array-spreads"></a><a name="4.3"></a>
- [4.3](#arrays--array-spreads) Use array spreads `...` to copy arrays.

  ```js
  // bad
  const len = items.length;
  const itemsCopy = [];
  let i;

  for (i = 0; i < len; i++) {
    itemsCopy[i] = items[i];
  }

  // good
  const itemsCopy = [...items];
  ```

  > Why?
  >
  > Array spreads is much more concise.

<a name="arrays--no-sparse"></a><a name="4.4"></a>
- [4.4](#arrays--no-sparse) Do not use sparse arrays.

  > eslint: [`no-sparse-arrays`](http://eslint.org/docs/rules/no-sparse-arrays)
  >
  > `rules/eslint/errors`

  ```js
  // bad
  var items = [,,];

  // good
  var items = new Array(3);
  ```

  > Why?
  >
  > Sparse arrays can be confusing.

**[⬆️ back to top](#table-of-contents)**

## Destructuring

<a name="destructuring--object"></a><a name="5.1"></a>
- [5.1](#destructuring--object) Use object destructuring when accessing and using multiple properties of an object.

  ```js
  // bad
  function getFullName(user) {
    const firstName = user.firstName;
    const lastName = user.lastName;

    return `${firstName} ${lastName}`;
  }

  // good
  function getFullName(user) {
    const { firstName, lastName } = user;
    return `${firstName} ${lastName}`;
  }

  // best
  function getFullName({ firstName, lastName }) {
    return `${firstName} ${lastName}`;
  }
  ```

  > Why?
  >
  > Destructuring saves you from creating temporary references for those properties.

<a name="destructuring--array"></a><a name="5.2"></a>
- [5.2](#destructuring--array) Use array destructuring.

  ```js
  const arr = [1, 2, 3, 4];

  // bad
  const first = arr[0];
  const second = arr[1];

  // good
  const [first, second] = arr;
  ```

  > Why?
  >
  > Destructuring is more concise.

<a name="destructuring--object-over-array"></a><a name="5.3"></a>
- [5.3](#destructuring--object-over-array) Use object destructuring for multiple return values, not array destructuring.

  ```js
  // bad
  function processInput(input) {
    return [left, right, top, bottom];
  }

  // the caller needs to think about the order of return data
  const [left, __, top] = processInput(input);

  // good
  function processInput(input) {
    return { left, right, top, bottom };
  }

  // the caller selects only the data they need
  const { left, top } = processInput(input);
  ```
  > Why?
  >
  > You can add new properties over time or change the order of things without breaking call sites.

<a name="destructuring--no-empty-pattern"></a><a name="5.4"></a>
- [5.4](#destructuring--no-empty-pattern) Do not use an empty pattern in a destructuring command.

  > eslint: [`no-empty-pattern`](http://eslint.org/docs/rules/no-empty-pattern)
  >
  > defined in: `rules/eslint/best-practices`

  ```js
  // bad
  var {} = foo;
  var {a: {}} = foo;

  // good
  var {a = {}} = foo;
  ```

  > Why?
  >
  > Empty destructuring patterns do not create a variable and may be a typo on a default value assignment.

**[⬆️ back to top](#table-of-contents)**

## Strings & Regular Expressions

<a name="strings--quotes"></a><a name="6.1"></a>
- [6.1](#strings--quotes) Use double quotes `""` or backticks \` for strings.

  > eslint: [`quotes`](http://eslint.org/docs/rules/quotes.html)
  >
  > defined in: `rules/eslint/style`

  ```js
  // bad
  const name = 'Aaron Rodgers';

  // good
  const name = "Aaron Rodgers";
  const name = `Aaron Rodgers`;
  ```

  > Why?
  >
  > Walmart code style preference.

<a name="strings--template-literals"></a><a name="6.2"></a>
- [6.2](#strings--template-literals) When programmatically building up strings, use template strings instead of concatenation.

  > eslint: [`prefer-template`](http://eslint.org/docs/rules/prefer-template.html), [`no-useless-concat`](http://eslint.org/docs/rules/no-useless-concat)
  >
  > defined in: `rules/eslint/es6`, `rules/eslint/best-practices`

  ```js
  // bad
  var str = "a" + "b";

  // bad
  function sayHi(name) {
    return "How are you, " + name + "?";
  }

  // bad
  function sayHi(name) {
    return ["How are you, ", name, "?"].join();
  }

  // good
  function sayHi(name) {
    return `How are you, ${name}?`;
  }
  ```

  > Why?
  >
  > Template strings give you a readable, concise syntax with proper newlines and string interpolation features.

<a name="strings--multiline"></a><a name="6.3"></a>
- [6.3](#string--multiline) Do not use multiline strings.

  > eslint: [`no-multi-str`](http://eslint.org/docs/rules/no-multi-str)
  >
  > defined in: `rules/eslint/best-practices`

  ```js
  // bad
  var str = "Multi \
            Line";

  // good
  var str = "Multi\n" +
            "Line";

  // best
  var str = `Multi
            Line`;
  ```

  > Why?
  >
  > Walmart code style preference.

<a name="regex--no-empty-character"></a><a name="6.4"></a>
- [6.4](#regex--no-empty-character) Don't use empty character classes in regular expressions.

  > eslint: [`no-empty-character-class`](http://eslint.org/docs/rules/no-empty-character-class)
  >
  > defined in: `rules/eslint/errors`

  ```js
  // bad
  var regex = /^abc[]/;
  ```

  > Why?
  >
  > An empty character class in a regular expression doesn't match anything and is likely a mistake.

<a name="regex--no-invalid"></a><a name="6.5"></a>
- [6.5](#regex--no-invalid) Regular expressions must be valid.

  > eslint: [`no-invalid-regexp`](http://eslint.org/docs/rules/no-invalid-regexp)
  >
  > defined in: `rules/eslint/errors`

  ```js
  // bad
  var regex = /[/;

  // good
  var regex = /[a-z]/;
  ```

  > Why?
  >
  > Invalid regular expressions will throw an error when used.

<a name="regex--multiple-spaces"></a><a name="6.6"></a>
- [6.6](#regex--multiple-spaces) Regular expressions should not contain multiple spaces.

  > eslint: [`no-regex-spaces`](http://eslint.org/docs/rules/no-regex-spaces)
  >
  > defined in: `rules/eslint/errors`

  ```js
  // bad
  var regex = /foo   bar/;

  // good
  var regex = /foo {3}bar/;
  ```

  > Why?
  >
  > It is easier to read the repeating character regular expression.

**[⬆️ back to top](#table-of-contents)**

## Functions

<a name="functions--declarations"></a><a name="7.1"></a>
- [7.1](#functions--declarations) Use named function expressions instead of function declarations.

  > eslint: [`func-style`](http://eslint.org/docs/rules/func-style)
  >
  > defined in: `rules/eslint/style`

  ```js
  // bad
  function foo() {
  }

  // good
  const foo = function () {
  };
  ```

  > Why?
  >
  > Function declarations are hoisted, which means that it’s easy - too easy - to reference the function before it is defined in the file. This harms readability and maintainability. If you find that a function’s definition is large or complex enough that it is interfering with understanding the rest of the file, then perhaps it’s time to extract it to its own module!

<a name="functions--in-blocks"></a><a name="7.2"></a>
- [7.2](#functions--in-blocks) Never declare a function in a non-function block (if, while, etc). Assign the function to a variable instead.

  > eslint: [`no-loop-func`](http://eslint.org/docs/rules/no-loop-func.html)
  >
  > defined in: `rules/eslint/best-practices`

  ```js
  // bad
  for (var i = 0; i < 5; i++) {
    (function() { return i; })();
  }

  // ok
  var a = function() {};

  for (var i = 0; i < 5; i++) {
    a();
  }

  // best
  for (let i = 0; i < 5; i++) {
    (function() { return i; })();
  }
  ```

  > Why?
  >
  > Using `let` to properly scope your variable to the block prevents hoisting errors. See [this blog post](https://medium.com/@markbrouch/why-you-shouldnt-use-var-anymore-f109a58b9b70) for more information.

<a name="functions--arguments-shadow"></a><a name="7.3"></a>
- [7.3](#functions--arguments-shadow) Never name a parameter `arguments`.

  ```js
  // bad
  function nope(name, options, arguments) {
    // ...stuff...
  }

  // good
  function yup(name, options, args) {
    // ...stuff...
  }
  ```

  > Why?
  >
  > This will take precedence over the `arguments` object that is given to every function scope.

<a name="functions--default-parameters"></a><a name="7.4"></a>
- [7.4](#functions--default-parameters) Use default parameter syntax rather than mutating function arguments.

  ```js
  // really bad
  function handleThings(opts) {
    // No! We shouldn't mutate function arguments.
    // Double bad: if opts is falsy it'll be set to an object which may
    // be what you want but it can introduce subtle bugs.
    opts = opts || {};
    // ...
  }

  // still bad
  function handleThings(opts) {
    if (opts === void 0) {
      opts = {};
    }
    // ...
  }

  // good
  function handleThings(opts = {}) {
    // ...
  }
  ```

  > Why?
  >
  > Default parameters syntax ensures a default value is applied only if an argument is not passed.

<a name="functions--defaults-last"></a><a name="7.5"></a>
- [7.5](#functions--defaults-last) Always put default parameters last.

  ```js
  // bad
  function handleThings(opts = {}, name) {
    // ...
  }

  // good
  function handleThings(name, opts = {}) {
    // ...
  }
  ```

  > Why?
  >
  > This prevents the necessity of passing `null` as an argument.

<a name="functions--constructor"></a><a name="7.6"></a>
- [7.6](#functions--constructor) Never use the Function constructor to create a new function.

  > eslint: [`no-new-func`](http://eslint.org/docs/rules/no-new-func)
  >
  > defined in: `rules/eslint/best-practices`

  ```js
  // bad
  var add = new Function("a", "b", "return a + b");

  // still bad
  var subtract = Function("a", "b", "return a - b");

  // good
  var add = function(a, b) {
    return a + b;
  };
  ```

  > Why?
  >
  > Creating a function in this way evaluates a string similarly to `eval()`, which opens vulnerabilities.

<a name="functions--spread-vs-apply"></a><a name="7.7"></a>
- [7.7](#functions--spread-vs-apply) Prefer the use of the spread operator `...` to call variadic functions.

  > eslint: [`prefer-spread`](http://eslint.org/docs/rules/prefer-spread)
  >
  > defined in: `rules/eslint/es6`

  ```js
  // bad
  const x = [1, 2, 3, 4, 5];
  console.log.apply(console, x);

  // good
  const x = [1, 2, 3, 4, 5];
  console.log(...x);

  // bad
  new (Function.prototype.bind.apply(Date, [null, 2016, 08, 05]));

  // good
  new Date(...[2016, 08, 05]);
  ```

  > Why?
  >
  > It's cleaner, you don't need to supply a context, and you can not easily compose `new` with `apply`.

<a name="functions--arrows-use-them"></a><a name="7.8"></a>
- [7.8](#functions--arrows-use-them) When you must use function expressions (as when passing an anonymous function), use arrow function notation.

  > eslint: [`prefer-arrow-callback`](http://eslint.org/docs/rules/prefer-arrow-callback.html), [`arrow-spacing`](http://eslint.org/docs/rules/arrow-spacing.html)
  >
  > defined in: `rules/eslint/es6`

  ```js
  // bad
  [1, 2, 3].map(function (x) {
    const y = x + 1;
    return x * y;
  });

  // good
  [1, 2, 3].map((x) => {
    const y = x + 1;
    return x * y;
  });
  ```

  > Why?
  >
  > It creates a version of the function that executes in the context of `this`, which is usually what you want, and is a more concise syntax.

<a name="functions--arrows-paren-wrap"></a><a name="7.9"></a>
- [7.9](#functions--arrows-paren-wrap) In case the expression spans over multiple lines, wrap it in parentheses for better readability.

  ```js
  // bad
  ['get', 'post', 'put'].map(httpMethod => Object.prototype.hasOwnProperty.call(
      httpMagicObjectWithAVeryLongName,
      httpMethod
    )
  );

  // good
  ['get', 'post', 'put'].map(httpMethod => (
    Object.prototype.hasOwnProperty.call(
      httpMagicObjectWithAVeryLongName,
      httpMethod
    )
  ));
  ```

  > Why?
  >
  > It is easier to see where a multi-line function starts and ends when wrapped this way.

<a name="functions--complexity"></a><a name="7.10"></a>
- [7.10](#functions--complexity) Keep functions simple by limiting branching to 11 paths.

  > eslint: [`complexity`](http://eslint.org/docs/rules/complexity)
  >
  > defined in `rules/eslint/best-practices`

  ```js
  function getFlagType(name) {
    if (name === BEST_SELLER) {
      return bestSeller;  // 1st path
    } else if (name === CLEARANCE) {
      return clearance; // 2nd path
    } else if (name === OUT_OF_STOCK) {
      return outOfStock;  // 3rd path
    }
  }
  // do not exceed 11 paths
  ```

  > Why?
  >
  > Too many paths can be tough to wrangle. Consider refactoring.

<a name="functions--consistent-return"></a><a name="7.11"></a>
- [7.11](#functions--consistent-return) Make sure a function either never returns a value or always returns a value.

  > eslint: [`consistent-return`](http://eslint.org/docs/rules/consistent-return)
  >
  > defined in: `rules/eslint/best-practices`

  ```js
  // bad
  function(test) {
    if (test === true) {
      return true;
    }
  }

  // good
  function(test) {
    if (test === true) {
      return true;
    }
    return false;
  }
  ```

  > Why?
  >
  > If some but not all branches of a function have an explicit return value, this may be a sign of a typo.

<a name="functions--no-extra-bind"></a><a name="7.12"></a>
- [7.12](#functions--no-extra-bind) Do not use `bind()` unnecessarily.

  > eslint: [`no-extra-bind`](http://eslint.org/docs/rules/no-extra-bind)
  >
  > defined in: `rules/eslint/best-practices`

  ```js
  // bad
  var boundGetName = (function getName() {
    return "name";
  }).bind({ name: "name" });

  // good
  var boundGetName = (function getName() {
    return this.name;
  }).bind({ name: "name" });
  ```

  > Why?
  >
  > Functions that do not make reference to `this` do not benefit from binding `this` context.

<a name="functions--no-useless-call"></a><a name="7.13"></a>
- [7.13](#functions--no-useless-call) Do not use `call()` or `apply()` unnecessarily.

  > eslint: [`no-useless-call`](http://eslint.org/docs/rules/no-useless-call)
  >
  > defined in: `rules/eslint/best-practices`

  ```js
  // bad
  foo.call(undefined, 1, 2, 3);
  foo.apply(undefined, [1, 2, 3]);

  // good
  foo.call(obj, 1, 2, 3);
  foo.apply(obj, [1, 2, 3]);
  ```

  > Why?
  >
  > `call()` and `apply()` are slower than normal function invocation and should not be used when a regular function would suffice.

<a name="functions--no-return-assign"></a><a name="7.14"></a>
- [7.14](#functions--no-return-assign) Do not make assignments in a return statement.

  > eslint: [`no-return-assign`](http://eslint.org/docs/rules/no-return-assign)
  >
  > defined in: `rules/eslint/best-practices`

  ```js
  // bad
  function doSomething() {
    return foo = bar + 2;
  }

  // good
  function doSomething() {
    foo = bar + 2;
    return foo;
  }
  ```

  > Why?
  >
  > It can be confusing to understand if an equality check `===` was intended instead of an assignment when used in a return statement.

<a name="functions--throw"></a><a name="7.15"></a>
- [7.15](#functions--throw) Only throw `Error` objects.

  > eslint: [`no-throw-literal`](http://eslint.org/docs/rules/no-throw-literal)
  >
  > defined in: `rules/eslint/best-practices`

  ```js
  // bad
  throw "error";

  // good
  throw new Error();
  ```

  > Why?
  >
  > `Error` objects contain extra metadata about how they were thrown.

<a name="functions--no-dupe-args"></a><a name="7.16"></a>
- [6.17](#functions--no-dupe-args) Don't use the same parameter more than once in a function definition.

  > eslint: [`no-dupe-args`](http://eslint.org/docs/rules/no-dupe-args)
  >
  > defined in: `rules/eslint/errors`

  ```js
  // bad
  function doSomething(a, b, a) {
    console.log(`value of the second a: ${a}`);
  }
  ```

  > Why?
  >
  > The second parameter with the same name will take precedence, which is probably an error.

<a name="functions--no-exception-assign"></a><a name="7.17"></a>
- [7.17](#functions--no-exception-assign) Don't make an assignment on the exception parameter in a `catch` clause.

  > eslint: [`no-ex-assign`](http://eslint.org/docs/rules/no-ex-assign)
  >
  > defined in: `rules/eslint/errors`

  ```js
  try {
    doSomething();
  } catch (e) {
    e = 10;
  }
  ```

  > Why?
  >
  > Overwriting the exception variable will make it inaccessible.

<a name="functions--override-declarations"></a><a name="7.18"></a>
- [7.18](#functions--override-declarations") Do not override function declarations.

  > eslint: [`no-func-assign`](http://eslint.org/docs/rules/no-func-assign)
  >
  > defined in: `rules/eslint/errors`

  ```js
  // bad
  function myFunction() {}
  myFunction = function() {};
  ```

  > Why?
  >
  > Overriding a function declaration is likely a mistake.

<a name="functions--max-nested-callbacks"></a><a name="7.19"></a>
- [7.19](#functions--max-nested-callbacks) Do not nest callbacks more than three deep.

  > eslint: [`max-nested-callbacks`](http://eslint.org/docs/rules/max-nested-callbacks)
  >
  > defined in: `rules/eslint/style`

  ```js
  // bad
  callPlay(function() { // callback 1
    snapToRodgers(function() { // callback 2
      throwToJordy(function() { // callback 3
        scoreTouchdown(function() { // callback 4
          // win
        });
      });
    });
  });
  ```

  > Why?
  >
  > Nesting more than 3 callbacks can be difficult to read. Consider refactoring.

<a name="functions--max-params"></a><a name="7.20"></a>
- [7.20](#functions--max-params) Do not use more than three parameters in a function call.

  > eslint: [`max-params`](http://eslint.org/docs/rules/max-params)
  >
  > defined in: `rules/eslint/style`

  ```js
  // bad
  function doSomething(option1, option2, option3, option4) {
    return option1 + option2 + option3 + option4;
  }

  // good
  function doSomething(options) {
    const {
      option1,
      option2,
      option3,
      option4
    } = options;

    return option1 + option2 + option3 + option4;
  }
  ```

  > Why?
  >
  > It can be difficult to remember the order of many parameters. Pass an options object instead to handle large amounts of argument data.

<a name="functions--max-statements"></a><a name="7.21"></a>
- [7.21](#functions--max-statements) Do not have more than 15 statements in a function.

  > eslint: [`max-statements`](http://eslint.org/docs/rules/max-statements)
  >
  > defined in: `rules/eslint/style`

  ```js
  // bad
  function doSomething() {
    var a = 1; // statement 1
    var b = 2; // statement 2
    var c = 3; // statement 3;

    // more statements here

    var o = 15; // statement 15;
    var p = 16; // statement 16;
  }
  ```

  > Why?
  >
  > Prefer smaller functions. If number of statements exceeds 15, consider breaking the function up into smaller pieces.

**[⬆️ back to top](#table-of-contents)**

## Classes & Constructors

<a name="constructors--use-class"></a><a name="8.1"></a>
- [8.1](#constructors--use-class) Always use `class`. Avoid manipulating `prototype` directly.

  ```js
  // bad
  function Queue(contents = []) {
    this.queue = [...contents];
  }
  Queue.prototype.pop = function () {
    const value = this.queue[0];
    this.queue.splice(0, 1);
    return value;
  };


  // good
  class Queue {
    constructor(contents = []) {
      this.queue = [...contents];
    }
    pop() {
      const value = this.queue[0];
      this.queue.splice(0, 1);
      return value;
    }
  }
  ```

  > Why?
  >
  > `class` syntax is more concise and easier to reason about.

<a name="constructors--extends"></a><a name="8.2"></a>
- [8.2](#constructors--extends) Use `extends` for inheritance.

  ```js
  // bad
  const inherits = require('inherits');
  function PeekableQueue(contents) {
    Queue.apply(this, contents);
  }
  inherits(PeekableQueue, Queue);
  PeekableQueue.prototype.peek = function () {
    return this._queue[0];
  }

  // good
  class PeekableQueue extends Queue {
    peek() {
      return this._queue[0];
    }
  }
  ```

  > Why?
  >
  > It is a built-in way to inherit prototype functionality without breaking `instanceof`.

<a name="constructors--chaining"></a><a name="8.3"></a>
- [8.3](#constructors--chaining) Methods can return `this` to help with method chaining.

  ```js
  // bad
  Jedi.prototype.jump = function () {
    this.jumping = true;
    return true;
  };

  Jedi.prototype.setHeight = function (height) {
    this.height = height;
  };

  const luke = new Jedi();
  luke.jump(); // => true
  luke.setHeight(20); // => undefined

  // good
  class Jedi {
    jump() {
      this.jumping = true;
      return this;
    }

    setHeight(height) {
      this.height = height;
      return this;
    }
  }

  const luke = new Jedi();

  luke.jump()
    .setHeight(20);
  ```

  > Why?
  >
  > Method chaining allows for more concise code.

<a name="classes--no-duplicate-members"></a><a name="8.4"></a>
- [8.4](#classes--no-duplicate-members) Avoid duplicate class members.

  > eslint: [`no-dupe-class-members`](http://eslint.org/docs/rules/no-dupe-class-members)
  >
  > defined in: `rules/eslint/es6`

  ```js
  // bad
  class Foo {
    bar() { return 1; }
    bar() { return 2; }
  }

  // good
  class Foo {
    bar() { return 1; }
  }

  // good
  class Foo {
    bar() { return 2; }
  }
  ```

  > Why?
  >
  > Duplicate class member declarations will silently prefer the last one - having duplicates is almost certainly a bug.

<a name="classes--no-invalid-this"></a><a name="8.5"></a>
- [8.5](#classes-no-invalid-this) Do not allow `this` outside of classes and class-like objects.

  > eslint: [`no-invalid-this`](http://eslint.org/docs/rules/no-invalid-this)
  >
  > defined in: `rules/eslint/best-practices`

  ```js
  // bad
  var justARegularFunction = function() {
    this.a = "a"
  };

  // good
  var ThisIsAClass = function() {
    this.a = "a"
  };
  ```

  > Why?
  >
  > `this` could be undefined if referenced outside of an object or class.

<a name="constructors--new-parens"></a><a name="8.6"></a>
- [8.6](#constructors--new-parens) Always use parentheses when calling `new` on a constructor.

  > eslint: [`new-parens`](http://eslint.org/docs/rules/new-parens)
  >
  > defined in: `rules/eslint/style`

  ```js
  // bad
  var search = new Search;

  // good
  var search = new Search();
  ```

  > Why?
  >
  > Walmart code style preference.

<a name="constructors--super"></a><a name="8.7"></a>
- [8.7](#constructors--super) Use `super()` when required in constructors.

  > eslint: [`constructor-super`](http://eslint.org/docs/rules/constructor-super)
  >
  > defined in: `rules/eslint/es6`

  ```js
  // bad
  class Shape {
    constructor() {
      super();
    }
  }

  class Square extends Shape {
    constructor() {}
  }

  // good
  class Shape {
    constructor() {}
  }

  class Square extends Shape {
    constructor() {
      super();
    }
  }
  ```

  > Why?
  >
  > Derived classes must call `super()` and non derived classes must not.

  <a name="classes--assign"></a><a name="8.8"></a>
  - [8.8](#classes--assign) Do not modify class declaration variables.

  > eslint: [`no-class-assign`](http://eslint.org/docs/rules/no-class-assign)
  >
  > defined in: `rules/eslint/es6`

  ```js
  // bad
  class Component {}
  Component = undefined;
  ```

  > Why?
  >
  > Classes can be reassigned, but should not be.

<a name="constructors--this-before-super"></a><a name="8.9"></a>
- [8.9](#constructors--this-before-super) Do not call `this` before `super()` in a constructor.

  > eslint: [`no-this-before-super`](http://eslint.org/docs/rules/no-this-before-super)
  >
  > defined in: `rules/eslint/es6`

  ```js
  // bad
  class Square extends Shape {
    constructor() {
      this.sides = 4;
      super();
    }
  }


  // good
  class Square extends Shape {
    constructor() {
      super();
      this.sides = 4;
    }
  }
  ```

  > Why?
  >
  > In a derived class, use of `this` before `super()` causes a reference error.

**[⬆️ back to top](#table-of-contents)**

## Modules

<a name="modules--use-them"></a><a name="9.1"></a>
- [9.1](#modules--use-them) Always use modules (`import`/`export`) over a non-standard module system.

  ```js
  // bad
  const SearchUtil = require('./SearchUtil');
  module.exports = SearchUtil.fetch;

  // ok
  import SearchUtil from './SearchUtil';
  export default SearchUtil.fetch;

  // best
  import { fetch } from './SearchUtil';
  export default fetch;
  ```

  > Why?
  >
  > Module syntax is standard ES6.

<a name="modules--no-wildcard"></a><a name="9.2"></a>
- [9.2](#modules--no-wildcard) Do not use wildcard imports.

  ```js
  // bad
  import * as SearchUtil from './SearchUtil';

  // good
  import SearchUtil from './SearchUtil';
  ```

  > Why?
  >
  > This makes sure you have a single default export.

<a name="modules--no-export-from-import"></a><a name="9.3"></a>
- [9.3](#modules--no-export-from-import) Do not export directly from an import.

  ```js
  // bad
  // filename fetch.js
  export { fetch as default } from './SearchUtil';

  // good
  // filename fetch.js
  import { fetch } from './SearchUtil';
  export default fetch;
  ```

  > Why?
  >
  > Although the one-liner is concise, having one clear way to import and one clear way to export makes things consistent.

<a name="modules--multiline-imports-over-newlines"></a><a name="9.4"></a>
- [9.4](#modules--multiline-imports-over-newlines) Multiline imports should be indented just like multiline array and object literals.

  ```js
  // bad
  import {longNameA, longNameB, longNameC, longNameD, longNameE} from 'path';

  // good
  import {
    longNameA,
    longNameB,
    longNameC,
    longNameD,
    longNameE,
  } from 'path';
  ```

  > Why?
  >
  > The curly braces follow the same indentation rules as every other curly brace block in the style guide, as do the trailing commas.

**[⬆️ back to top](#table-of-contents)**

## Iterators & Generators

<a name="iterators--nope"></a><a name="10.1"></a>
- [10.1](#iterators--nope) Don't use iterators. Prefer JavaScript's higher-order functions instead of loops like `for-in` or `for-of`.

  > eslint: [`no-iterator`](http://eslint.org/docs/rules/no-iterator.html)
  >
  > defined in: `rules/eslint/best-practices`

  ```js
  const numbers = [1, 2, 3, 4, 5];

  // bad
  let sum = 0;
  for (let num of numbers) {
    sum += num;
  }

  sum === 15;

  // good
  let sum = 0;
  numbers.forEach(num => sum += num);
  sum === 15;

  // best
  const sum = numbers.reduce((total, num) => total + num, 0);
  sum === 15;
  ```

  > Why?
  >
  > This enforces our immutable rule. Dealing with pure functions that return values is easier to reason about than side effects.
  > Use `map()` / `every()` / `filter()` / `find()` / `findIndex()` / `reduce()` / `some()` / ... to iterate over arrays, and `Object.keys()` / `Object.values()` / `Object.entries()` to produce arrays so you can iterate over objects.

<a name="generators--spacing"></a>
- [10.2](#generators--spacing) Generators must have their function signature spaced properly.

  > eslint: [`generator-star-spacing`](http://eslint.org/docs/rules/generator-star-spacing)
  >
  > defined in: `rules/eslint/es6`

  ```js
  // bad
  function * foo() {
  }

  const bar = function * () {
  }

  const baz = function *() {
  }

  const quux = function*() {
  }

  function*foo() {
  }

  function *foo() {
  }

  // very bad
  function
  *
  foo() {
  }

  const wat = function
  *
  () {
  }

  // good
  function* foo() {
  }

  const foo = function* () {
  }
  ```

  > Why?
  >
  > `function` and `*` are part of the same conceptual keyword - `*` is not a modifier for `function`, `function*` is a unique construct, different from `function`.

<a name="iterators--lhs-negation"></a><a name="10.3"></a>
- [10.3](#iterators--lhs-negation) Do not negate the left hand side operand in `in` expressions.

  > eslint: [`no-negated-in-lhs`](http://eslint.org/docs/rules/no-negated-in-lhs)
  >
  > defined in: `rules/eslint/errors`

  ```js
  // bad
  if (!key in object)

  // good
  if (!(key in object))
  ```

  > Why?
  >
  > Negating the left hand operand in `in` expressions is likely a mistake.

<a name="generators--require-yield"></a><a name="10.4"></a>
- [10.4](#generators--require-yield) Generators must contain the `yield` keyword.

  > eslint: [`require-yield`](http://eslint.org/docs/rules/require-yield)
  >
  > defined in: `rules/eslint/es6`

  ```js
  // bad
  function* myGenerator() {
    return true;
  }

  // good
  function* myGenerator() {
    yield false;
    return true;
  }
  ```

  > Why?
  >
  > `yield` is required to pause the generator and pass a value to the generator's `next()` method.

**[⬆️ back to top](#table-of-contents)**

## Comparison Operators & Equality

<a name="comparison--eqeqeq"></a><a name="11.1"></a>
- [11.1](#comparison--eqeqeq) Use `===` and `!==` over `==` and `!=`.

  > eslint: [`eqeqeq`](http://eslint.org/docs/rules/eqeqeq.html)
  >
  > defined in: `rules/eslint/best-practices`

  ```js
  // bad
  if (a == b) {}
  if (a != b) {}

  // good
  if (a === b) {}
  if (a !== b) {}
  ```

  > Why?
  >
  > `==` and `!=` do type coercion which can cause difficult to spot bugs.

<a name="comparison--if"></a><a name="11.2"></a>
- [11.2](#comparison--if) Conditional statements such as the `if` statement evaluate their expression using coercion with the `ToBoolean` abstract method and always follow these simple rules:

  + **Objects** evaluate to **true**
  + **Undefined** evaluates to **false**
  + **Null** evaluates to **false**
  + **Booleans** evaluate to **the value of the boolean**
  + **Numbers** evaluate to **false** if **+0, -0, or NaN**, otherwise **true**
  + **Strings** evaluate to **false** if an empty string `''`, otherwise **true**

  ```javascript
  if ([0] && []) {
    // true
    // an array (even an empty one) is an object, objects will evaluate to true
  }
  ```

<a name="comparison--shortcuts"></a><a name="11.3"></a>
- [11.3](#comparison--shortcuts) Use shortcuts for booleans, but explicit comparisons for strings and numbers.

  ```js
  // bad
  if (isValid === true) {
    // ...stuff...
  }

  // good
  if (isValid) {
    // ...stuff...
  }

  // bad
  if (name) {
    // ...stuff...
  }

  // good
  if (name !== '') {
    // ...stuff...
  }

  // bad
  if (collection.length) {
    // ...stuff...
  }

  // good
  if (collection.length > 0) {
    // ...stuff...
  }
  ```

  > Why?
  >
  > Explicit comparisons for non-boolean values are more semantic.

<a name="comparison--nested-ternaries"></a><a name="11.4"></a>
- [11.4](#comparison--nested-ternaries) Ternaries should not be nested and generally be single line expressions.

  > eslint: [`no-nested-ternary`](http://eslint.org/docs/rules/no-nested-ternary.html)
  >
  > defined in: `rules/eslint/style`

  ```js
  // bad
  const foo = maybe1 > maybe2
    ? "bar"
    : value1 > value2 ? "baz" : null;

  // better
  const maybeNull = value1 > value2 ? 'baz' : null;

  const foo = maybe1 > maybe2
    ? 'bar'
    : maybeNull;

  // best
  const maybeNull = value1 > value2 ? 'baz' : null;

  const foo = maybe1 > maybe2 ? 'bar' : maybeNull;
  ```

  > Why?
  >
  > Nested ternaries can make code more difficult to read.

<a name="comparison--no-self-compare"></a><a name="11.5"></a>
- [11.5](#comparison--no-self-compare) Do not compare a variable to itself.

  > eslint: [`no-self-compare`](http://eslint.org/docs/rules/no-self-compare)
  >
  > defined in: `rules/eslint/best-practices`

  ```js
  // bad
  if (x === x) {
    doSomething();
  }
  ```

  > Why?
  >
  > This is usually a sign of a typo when refactoring.

<a name="comparison--yoda"></a><a name="11.6"></a>
- [11.6](#comparison--yoda) Do not use Yoda conditions.

  > eslint: [`yoda`](http://eslint.org/docs/rules/yoda)
  >
  > defined in: `rules/eslint/best-practices`

  ```js
  // bad
  if ("red" === color)

  // good
  if (color === "red")
  ```

  > Why?
  >
  > Walmart code style preference.

<a name="comparison--no-assign"></a><a name="11.7"></a>
- [11.7](#comparison--no-assign) Do not make assignments in conditional statements.

  > eslint: [`no-cond-assign`](http://eslint.org/docs/rules/no-cond-assign)
  >
  > defined in: `rules/eslint/errors`

  ```js
  // bad
  if (results.sortBy = "price")

  // good
  if (results.sortBy === "price")
  ```

  > Why?
  >
  > Assignments in a conditional statement are often a mistake when a comparison `===` was actually intended.

<a name="comparison--no-constant"></a><a name="11.8"></a>
- [11.8](#comparison--no-constant") Do not use a constant expression or literal as a test condition.

  > eslint: [`no-constant-condition`](http://eslint.org/docs/rules/no-constant-condition)
  >
  > defined in: `rules/eslint/errors`

  ```js
  // bad
  if (false)

  // good
  if (booleanTestCondition)
  ```

  > Why?
  >
  > A constant expression does not necessitate a comparison.

<a name="comparison--no-extra-boolean-cast"></a><a name="11.9"></a>
- [11.9](#comparison--no-extra-boolean-cast) Do not unecessarily cast a boolean variable.

  > eslint: [`no-extra-boolean-cast`](http://eslint.org/docs/rules/no-extra-boolean-cast)
  >
  > defined in: `rules/eslint/errors`

  ```js
  // bad
  if (!!testConditional)

  // bad
  !!ternaryConditional ? ifTrue() : ifFalse ();

  // bad
  var tripleNegative = !!!booleanValue;

  // good
  var castBoolean = !!notBooleanValue;

  // good
  if (!notConditional)
  ```

  > Why?
  >
  > This is just unnecessary.

**[⬆️ back to top](#table-of-contents)**

## Blocks & Whitespace

<a name="blocks--braces"></a><a name="12.1"></a>
- [12.1](#blocks--braces) Use braces only with multi-line blocks.

  > eslint: [`curly`](http://eslint.org/docs/rules/curly)
  >
  > defined in: `rules/eslint/best-practices`

  ```js
  // bad
  if (test)
    return false;

  // good
  if (test) {
    return false;
  }

  // also good
  if (test) return false;
  ```

  > Why?
  >
  > Walmart code style preference.

<a name="blocks--cuddled-elses"></a><a name="12.2"></a>
- [12.2](#blocks--cuddled-elses) If you're using multi-line blocks with `if` and `else`, put `else` on the same line as your `if` block's closing brace.

  > eslint: [`brace-style`](http://eslint.org/docs/rules/brace-style.html)
  >
  > defined in: `rules/eslint/style`

  ```js
  // bad
  if (test) {
    thing1();
    thing2();
  }
  else {
    thing3();
  }

  // good
  if (test) {
    thing1();
    thing2();
  } else {
    thing3();
  }
  ```

  > Why?
  >
  > Walmart code style preference.

<a name="whitespace--spaces"></a><a name="12.3"></a>
- [12.3](#whitespace--spaces) Use soft tabs set to 2 spaces.

  > eslint: [`no-mixed-spaces-and-tabs`](http://eslint.org/docs/rules/no-mixed-spaces-and-tabs), [`no-trailing-spaces`](http://eslint.org/docs/rules/no-trailing-spaces)
  >
  > defined in: `rules/eslint/style`

  ```js
  // bad
  function foo() {
  ∙∙∙∙const name;
  }

  // bad
  function bar() {
  ∙const name;
  }

  // good
  function baz() {
  ∙∙const name;
  }
  ```

  > Why?
  >
  > Walmart code style preference.

<a name="whitespace--before-blocks"></a><a name="12.4"></a>
- [12.4](#whitespace--before-blocks) Place 1 space before the leading brace.

  > eslint: [`space-before-blocks`](http://eslint.org/docs/rules/space-before-blocks.html)
  >
  > defined in: `rules/eslint/style`

  ```js
  // bad
  function test(){
    console.log('test');
  }

  // good
  function test() {
    console.log('test');
  }

  // bad
  dog.set('attr',{
    age: '1 year',
    breed: 'Bernese Mountain Dog',
  });

  // good
  dog.set('attr', {
    age: '1 year',
    breed: 'Bernese Mountain Dog',
  });
  ```

  > Why?
  >
  > Walmart code style preference.

<a name="whitespace--around-keywords"></a><a name="12.5"></a>
- [12.5](#whitespace--around-keywords) Place 1 space before the opening parenthesis in control statements (`if`, `while` etc.). Place no space between the argument list and the function name in function calls and declarations.

  > eslint: [`keyword-spacing`](http://eslint.org/docs/rules/keyword-spacing.html)
  >
  > defined in: `rules/eslint/style`

  ```js
  // bad
  if(isJedi) {
    fight ();
  }

  // good
  if (isJedi) {
    fight();
  }

  // bad
  function fight () {
    console.log ('Swooosh!');
  }

  // good
  function fight() {
    console.log('Swooosh!');
  }
  ```

  > Why?
  >
  > Walmart code style preference.

<a name="whitespace--infix-ops"></a><a name="12.6"></a>
- [12.6](#whitespace--infix-ops) Set off operators with spaces.

  > eslint: [`space-infix-ops`](http://eslint.org/docs/rules/space-infix-ops.html)
  >
  > defined in: `rules/eslint/style`

  ```javascript
  // bad
  const x=y+5;

  // good
  const x = y + 5;
  ```

  > Why?
  >
  > Walmart code style preference.

<a name="whitespace--newline-at-end"></a><a name="12.7"></a>
- [12.7](#whitespace--newline-at-end) End files with a single newline character.

  > eslint: [`eol-last`](http://eslint.org/docs/rules/eol-last)
  >
  > defined in: `rules/eslint/style`

  ```js
  // bad
  (function (global) {
    // ...stuff...
  })(this);
  ```

  ```javascript
  // bad
  (function (global) {
    // ...stuff...
  })(this);↵
  ↵
  ```

  ```javascript
  // good
  (function (global) {
    // ...stuff...
  })(this);↵
  ```

  > Why?
  >
  > Walmart code style preference.

<a name="whitespace--after-blocks"></a><a name="12.8"></a>
- [12.8](#whitespace--after-blocks) Leave a blank line after blocks and before the next statement.

  > eslint: [`no-multiple-empty-lines`](http://eslint.org/docs/rules/no-multiple-empty-lines)
  >
  > defined in: `rules/eslint/style`

  ```js
  // bad
  if (foo) {
    return bar;
  }
  return baz;

  // good
  if (foo) {
    return bar;
  }

  return baz;

  // bad
  const obj = {
    foo() {
    },
    bar() {
    },
  };
  return obj;

  // good
  const obj = {
    foo() {
    },

    bar() {
    },
  };

  return obj;

  // bad
  const arr = [
    function foo() {
    },
    function bar() {
    },
  ];
  return arr;

  // good
  const arr = [
    function foo() {
    },

    function bar() {
    },
  ];

  return arr;
  ```

  > Why?
  >
  > Walmart code style preference.

<a name="whitespace--in-parens"></a><a name="12.9"></a>
- [12.9](#whitespace--in-parens) Do not add spaces inside parentheses.

  > eslint: [`space-in-parens`](http://eslint.org/docs/rules/space-in-parens.html)
  >
  > defined in: `rules/eslint/style`

  ```js
  // bad
  function bar( foo ) {
    return foo;
  }

  // good
  function bar(foo) {
    return foo;
  }

  // bad
  if ( foo ) {
    console.log(foo);
  }

  // good
  if (foo) {
    console.log(foo);
  }
  ```

  > Why?
  >
  > Walmart code style preference.

<a name="whitespace--max-len"></a><a name="12.10"></a>
- [12.10](#whitespace--max-len) Avoid having lines of code that are longer than 100 characters (including whitespace). Note: URLs and `import` and `require` statements and  are exempt from this rule.

  > eslint: [`max-len`](http://eslint.org/docs/rules/max-len.html)
  >
  > defined in: `rules/eslint/style`

  ```js
  // bad
  const foo = jsonData && jsonData.foo && jsonData.foo.bar && jsonData.foo.bar.baz && jsonData.foo.bar.baz.quux && jsonData.foo.bar.baz.quux.xyzzy;

  // bad
  $.ajax({ method: "POST", url: "https://walmart.com/", data: { name: "John" } }).done(() => console.log("Congratulations!")).fail(() => console.log("Error."));

  // good
  const foo = jsonData
    && jsonData.foo
    && jsonData.foo.bar
    && jsonData.foo.bar.baz
    && jsonData.foo.bar.baz.quux
    && jsonData.foo.bar.baz.quux.xyzzy;

  // good
  $.ajax({
    method: "POST",
    url: "https://walmart.com/",
    data: { name: "John" },
  })
    .done(() => console.log("Congratulations!"))
    .fail(() => console.log("Error."));
  ```

  > Why?
  >
  > This ensures readability and maintainability.

<a name="blocks--no-fallthrough"></a><a name="12.11"></a>
- [12.11](#blocks--no-fallthrough) Do not allow switch statements to "fall through".

  > eslint: [`no-fallthrough`](http://eslint.org/docs/rules/no-fallthrough)
  >
  > defined in: `rules/eslint/best-practices`

  ```js
  // bad
  switch (action) {
    case POST:
      doSomething();
    case GET:
      doSomething();
  }

  // good
  switch (action) {
    case POST:
      doSomething();
      break;
    case GET:
      doSomething
      break;
  }
  ```

  > Why?
  >
  > Unintentional fallthroughs can cause unintended behavior. If a fallthrough is intentional, use the comment `// falls through` to indicate it is done purposefully.

<a name="blocks--no-labels"></a><a name="12.12"></a>
- [12.12](#blocks--no-labels) Do not use labels except with loops or switch statements.

  > eslint: [`no-labels`](http://eslint.org/docs/rules/no-labels)
  >
  > defined in: `rules/eslint/best-practices`

  ```js
  // bad
  customBlock: {
    console.log("log this");
    break customBlock;
    console.log("but not this");
  }
  console.log("and then log this");

  // good
  loopLabel:
    while (true) {
      break loopLabel;
    }
  ```

  > Why?
  >
  > Labels outside of switch statements and loops are not well-known and can be confusing to understand.

<a name="blocks--no-lone"></a><a name="12.13"></a>
- [12.13](#blocks--no-lone) Don't use unnecessary blocks.

  > eslint: [`no-lone-blocks`](http://eslint.org/docs/rules/no-lone-blocks)
  >
  > defined in: `rules/eslint/best-practices`

  ```js
  // bad
  if (foo) {
    bar();
    {
      baz();
    }
  }

  // good
  if (foo) {
    bar();
    baz();
  }

  // also ok
  if (foo) {
    bar();
    {
      let i = 1;
      baz(i);
    }
  }
  ```

  > Why?
  >
  > In ES5, blocks do not create new scope. In ES6, they are only useful when scoping `const` or `let`.

<a name="whitespace--no-multi"></a><a name="12.14"></a>
- [12.14](#whitespace--no-multi) Don't use multiple spaces in a row.

  > eslint: [`no-multi-spaces`](http://eslint.org/docs/rules/no-multi-spaces)
  >
  > defined in: `rules/eslint/best-practices`

  ```js
  // bad
  if (a  === b) {
    doSomething();
  }

  // good
  if (a === b) {
    doSomething();
  }
  ```

  > Why?
  >
  > Walmart code style preference.

<a name="blocks--no-duplicate-case"></a><a name="12.15"></a>
- [12.15](#blocks--no-duplicate-case) Don't use more than one `case` statement with the same name.

  > eslint: [`no-duplicate-case`](http://eslint.org/docs/rules/no-duplicate-case)
  >
  > defined in: `rules/eslint/errors`

  ```js
  // bad
  switch (a) {
    case 1:
      break;
    case 2:
      break;
    case 1:
      break;
  }
  ```

  > Why?
  >
  > Multiple `case` statements with the same is likely an error.

<a name="blocks--no-empty"></a><a name="12.16"></a>
- [12.16](#blocks--no-empty) Don't leave block statements empty.

  > eslint: [`no-empty`](http://eslint.org/docs/rules/no-empty)
  >
  > defined in: `rules/eslint/errors`

  ```js
  // bad
  if (condition) {
  }
  ```

  > Why?
  >
  > Empty blocks don't do anything.

<a name="blocks--no-inner-functions"></a><a name="12.17"></a>
- [12.17](#blocks--no-inner-functions) Do not declare functions inside blocks.

  > eslint: [`no-inner-declarations`](http://eslint.org/docs/rules/no-inner-declarations)
  >
  > defined in: `rules/eslint/errors`

  ```js
  // bad
  if (test) {
    function doSomething();
  }

  // good
  var doSomething;
  if (test) {
    doSomething = function() {};
  }
  ```

  > Why?
  >
  > Hoisting can cause unintended results.

<a name="whitespace--no-irregular"></a><a name="12.18"></a>
- [12.18](#whitespace--no-irregular) Do not use irregular whitespace characters outside of strings.

  > eslint: [`no-irregular-whitespace`](http://eslint.org/docs/rules/no-irregular-whitespace)
  >
  > defined in: `rules/eslint/errors`

  Invalid characters:
  ```
  \u000B - Line Tabulation (\v) - <VT>
  \u000C - Form Feed (\f) - <FF>
  \u00A0 - No-Break Space - <NBSP>
  \u0085 - Next Line
  \u1680 - Ogham Space Mark
  \u180E - Mongolian Vowel Separator - <MVS>
  \ufeff - Zero Width No-Break Space - <BOM>
  \u2000 - En Quad
  \u2001 - Em Quad
  \u2002 - En Space - <ENSP>
  \u2003 - Em Space - <EMSP>
  \u2004 - Tree-Per-Em
  \u2005 - Four-Per-Em
  \u2006 - Six-Per-Em
  \u2007 - Figure Space
  \u2008 - Punctuation Space - <PUNCSP>
  \u2009 - Thin Space
  \u200A - Hair Space
  \u200B - Zero Width Space - <ZWSP>
  \u2028 - Line Separator
  \u2029 - Paragraph Separator
  \u202F - Narrow No-Break Space
  \u205f - Medium Mathematical Space
  \u3000 - Ideographic Space
  ```

  > Why?
  >
  > Non-standard whitespace may be interpreted incorrectly and cause errors.

<a name="blocks--no-unreachable"></a><a name="12.19"></a>
- [12.19](#blocks--no-unreachable) Do not write code that will be unreachable in a block.

  > eslint: [`no-unreachable`](http://eslint.org/docs/rules/no-unreachable)
  >
  > defined in: `rules/eslint/errors`

  ```js
  // bad
  function() {
    var x = 2;
    return x;
    x = 3;
  }

  while (true) {
    break;
    console.log("this is unreachable");
  }
  ```

  > Why?
  >
  > Unreachable code will never be executed and is likely a mistake.

<a name="whitespace--objects"></a><a name="12.20"></a>
- [12.20](#whitespace--objects) Use one space after the colon and zero before in objects.

  > eslint: [`key-spacing`](http://eslint.org/docs/rules/key-spacing)
  >
  > defined in: `rules/eslint/style`

  ```js
  // bad
  var obj = {
    a : 1,
    b:2
  };

  // good
  var obj = {
    a: 1,
    b: 2
  };
  ```

  > Why?
  >
  > Walmart code style preference.

<a name="blocks--max-nested"></a><a name="12.21"></a>
- [12.21](#blocks--max-nested) Do not nest blocks more than 4 levels.

  > eslint: [`max-depth`](http://eslint.org/docs/rules/max-depth)
  >
  > defined in: `rules/eslint/style`

  ```js
  // bad
  function doSomething() {
    if (true) { // level 1
      if (true) { // level 2
        if (true) { // level 3
          if (true) { // level 4
            if (true) { // level 5
              console.log("3deep5me");
            }
          }
        }
      }
    }
  }
  ```

  > Why?
  >
  > Consider refactoring if you need to go more than 4 levels deep in nesting.

<a name="blocks--lonely-if"></a><a name="12.22"></a>
- [12.22](#blocks--lonely-if) Do not include an `if` block as the only statement in an `else` block.

  > eslint: [`no-lonely-if`](http://eslint.org/docs/rules/no-lonely-if)
  >
  > defined in: `rules/eslint/style`

  ```js
  // bad
  if (test) {
    doSomething();
  } else {
    if (test2) {
      doSomethingElse();
    }
  }

  // good
  if (test) {
    doSomething();
  } else if (test2) {
    doSomethingElse();
  }
  ```

  > Why?
  >
  > Lonley `if` statements are better suited for an `else if` statement.

<a name="whitespace--function-identifier"></a><a name="12.23"></a>
- [12.23](#whitespace--function-identifier) Do not add space between a function identifier and its application.

  > eslint: [`no-spaced-func`](http://eslint.org/docs/rules/no-spaced-func)
  >
  > defined in: `rules/eslint/style`

  ```js
  // bad
  doSomething (stuff);

  // good
  doSomething(stuff);
  ```

  > Why?
  >
  > Walmart code style preference.

<a name="whitespace--semicolons"></a><a name="12.24"></a>
- [12.24](#whitespace--semicolons) Always include a space after semicolons that are not at the end of a line and never include a space before a semicolon.

  > eslint: [`semi-spacing`](http://eslint.org/docs/rules/semi-spacing)
  >
  > defined in: `rules/eslint/style`

  ```js
  // bad
  var x = 8 ;
  var x = 2;var y = 3;

  // good
  var x = 8;
  var x = 2; var y = 3;
  ```

  > Why?
  >
  > Walmart code style preference.

<a name="whitespace--unary"></a><a name="12.25"></a>
- [12.25](#whitespace--unary) Use spacing after unary words and never use spacing before/after unary nonwords.

  > eslint: [`space-unary-ops`](http://eslint.org/docs/rules/space-unary-ops)
  >
  > defined in: `rules/eslint/style`

  ```js
  // bad
  var search = new[Search][0];

  page ++;

  // good
  var search = new Search();

  page++;
  ```

  > Why?
  >
  > Walmart code style preference.

**[⬆️ back to top](#table-of-contents)**

## Comments

<a name="comments--multiline"></a><a name="13.1"></a>
- [13.1](#comments--multiline) Use `/** ... */` for multi-line comments.

  ```js
  // bad
  // make() returns a new element
  // based on the passed in tag name
  //
  // @param {String} tag
  // @return {Element} element
  function make(tag) {

    // ...stuff...

    return element;
  }

  // good
  /**
    * make() returns a new element
    * based on the passed-in tag name
    */
  function make(tag) {

    // ...stuff...

    return element;
  }
  ```

  > Why?
  >
  > Walmart code style preference.

<a name="comments--singleline"></a><a name="13.2"></a>
- [13.2](#comments--singleline) Use `//` for single line comments. Place single line comments on a newline above the subject of the comment. Put an empty line before the comment unless it's on the first line of a block.

  ```javascript
  // bad
  const active = true;  // is current tab

  // good
  // is current tab
  const active = true;

  // bad
  function getType() {
    console.log('fetching type...');
    // set the default type to 'no type'
    const type = this._type || 'no type';

    return type;
  }

  // good
  function getType() {
    console.log('fetching type...');

    // set the default type to 'no type'
    const type = this._type || 'no type';

    return type;
  }

  // also good
  function getType() {
    // set the default type to 'no type'
    const type = this._type || 'no type';

    return type;
  }
  ```

  > Why?
  >
  > Walmart code style preference.

<a name="comments--todo"></a><a name="13.3"></a>
- [13.3](#comments--todo) Use `// TODO:` to annotate solutions to problems.

  ```js
  class Calculator extends Abacus {
    constructor() {
      super();

      // TODO: total should be configurable by an options param
      this.total = 0;
    }
  }
  ```

<a name="comments--jsdoc"></a><a name="13.4"></a>
- [13.4](#comments--jsdoc) Use valid JSDoc comments.

  > eslint: [`valid-jsdoc`](http://eslint.org/docs/rules/valid-jsdoc)
  >
  > defined in: `rules/eslint/errors`

  ```js
  // bad
  /**
   * Add two numbers.
   * @param {number} num The first number.
   * @returns The sum of the two numbers.
   */
  function add(num1, num2) {
    return num1 + num2;
  }

  // good
  /**
   * Add two numbers.
   * @params {number} num1 The first number.
   * @params {number} num2 The second number.
   * @returns The sum of the two numbers.
   */
  function add(num1, num2) {
    return num1 + num2;
  }
  ```

  > Why?
  >
  > Valid JSDoc syntax is required for properly generated documentation.


**[⬆️ back to top](#table-of-contents)**

## Commas & Semicolons

<a name="commas--leading-trailing"></a><a name="14.1"></a>
- [14.1](#commas--leading-trailing) Leading commas: **Nope.**

  > eslint: [`comma-style`](http://eslint.org/docs/rules/comma-style.html)
  >
  > defined in: `rules/eslint/style`

  ```js
  // bad
  const story = [
      once
    , upon
    , aTime
  ];

  // good
  const story = [
    once,
    upon,
    aTime,
  ];

  // bad
  const hero = {
      firstName: 'Ada'
    , lastName: 'Lovelace'
    , birthYear: 1815
    , superPower: 'computers'
  };

  // good
  const hero = {
    firstName: 'Ada',
    lastName: 'Lovelace',
    birthYear: 1815,
    superPower: 'computers',
  };
  ```

<a name="commas--dangling"></a><a name="14.2"></a>
- [14.2](#commas--dangling) Additional trailing comma: **Nope.**

  > eslint: [`comma-dangle`](http://eslint.org/docs/rules/comma-dangle.html)
  >
  > defined in: `rules/eslint/errors`

  ```js
  // bad
  const hero = {
    firstName: 'Dana',
    lastName: 'Scully',
  };

  const heroes = [
    'Batman',
    'Superman',
  ];

  // good
  const hero = {
    firstName: 'Dana',
    lastName: 'Scully'
  };

  const heroes = [
    'Batman',
    'Superman'
  ];
  ```

  > Why?
  >
  > Walmart code style preference.

<a name="semicolons--required"></a><a name="14.3"></a>
- [14.3](#semicolons--required) Semicolons required: **Yup.**

  > eslint: [`semi`](http://eslint.org/docs/rules/semi.html)
  >
  > defined in: `rules/eslint/style`

  ```js
  // bad
  (function () {
    const name = 'Skywalker'
    return name
  })()

  // good
  (function () {
    const name = 'Skywalker';
    return name;
  }());
  ```

  > Why?
  >
  > Walmart code style preference.

<a name="semicolons--no-extra"></a><a name="14.4"></a>
- [14.4](#semicolons--no-extra) Don't use extra semicolons.

  > eslint: [`no-extra-semi`](http://eslint.org/docs/rules/no-extra-semi)
  >
  > defined in: `rules/eslint/errors`

  ```js
  // bad
  var x = 5;;

  function myFunction() {

  };

  // good
  var x = 5;

  var myFunction = function() {

  };
  ```

  > Why?
  >
  > Only use semicolons once at the end of non-block lines.

<a name="semicolons--unexpected-multiline"></a><a name="14.5"></a>
- [14.5](#semicolons--unexpected-multiline) Do not create confusing multiline statements.

  > eslint: [`no-unexpected-multiline`](http://eslint.org/docs/rules/no-unexpected-multiline)
  >
  > defined in: `rules/eslint/errors`

  ```js
  // bad
  var foo = bar
  (1 || 2).baz();
  ```

  > Why?
  >
  > Omitting semicolons in some cases will cause multiple lines to be evaluated as one, which may not be the intended behavior.

**[⬆️ back to top](#table-of-contents)**

## Naming Conventions

<a name="naming--camelCase"></a><a name="15.1"></a>
- [15.1](#naming--camelCase) Use camelCase when naming objects, functions, and instances.

  > eslint: [`camelcase`](http://eslint.org/docs/rules/camelcase.html)
  >
  > defined in: `rules/eslint/style`

  ```js
  // bad
  const OBJEcttsssss = {};
  const this_is_my_object = {};
  function c() {}

  // good
  const thisIsMyObject = {};
  function thisIsMyFunction() {}
  ```

  > Why?
  >
  > Walmart code style preference.

<a name="naming--PascalCase"></a><a name="15.2"></a>
- [15.2](#naming--PascalCase) Use PascalCase only when naming constructors or classes.

  > eslint: [`new-cap`](http://eslint.org/docs/rules/new-cap.html)
  >
  > defined in: `rules/eslint/style`

  ```js
  // bad
  function user(options) {
    this.name = options.name;
  }

  const bad = new user({
    name: 'nope',
  });

  // good
  class User {
    constructor(options) {
      this.name = options.name;
    }
  }

  const good = new User({
    name: 'yup',
  });
  ```

  > Why?
  >
  > Walmart code style preference.

<a name="naming--self-this"></a><a name="15.3"></a>
- [15.3](#naming--self-this) Don't save references to `this`. Use arrow functions or [Function#bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind).

  ```js
  // bad
  function foo() {
    const self = this;
    return function () {
      console.log(self);
    };
  }

  // bad
  function foo() {
    const that = this;
    return function () {
      console.log(that);
    };
  }

  // good
  function foo() {
    return () => {
      console.log(this);
    };
  }
  ```

  > Why?
  >
  > Use of arrow functions or `bind` is more semantic and does not require declaring a new reference.

<a name="naming--camelCase-default-export"></a><a name="15.4"></a>
- [15.4](#naming--camelCase-default-export) Use camelCase when you export-default a function.

  ```js
  function buildSearchQuery() {
  }

  export default buildSearchQuery;
  ```

  > Why?
  >
  > Walmart code style preference.

<a name="naming--PascalCase-singleton"></a><a name="15.5"></a>
- [15.5](#naming--PascalCase-singleton) Use PascalCase when you export a constructor / class / singleton / function library / bare object.

  ```js
  const SearchConfig = {
    filter: {
    }
  };

  export default SearchConfig;
  ```

  > Why?
  >
  > Walmart code style preference.

<a name="accessors--boolean-prefix"></a><a name="15.6"></a>
- [15.6](#accessors--boolean-prefix) If the property/method is a `boolean`, use `isVal()` or `hasVal()`.

  ```js
  // bad
  if (!dragon.age()) {
    return false;
  }

  // good
  if (!dragon.hasAge()) {
    return false;
  }
  ```

  > Why?
  >
  > Accessor names should be descriptive of their action.

<a name="naming--consistent-this"></a><a name="15.7"></a>
- [15.7](#naming--consistent-this) If `this` must be stored in a variable, name the variable `self`.

  > eslint: [`consistent-this`](http://eslint.org/docs/rules/consistent-this)
  >
  > defined in: `rules/eslint/style`

  ```js
  // bad
  function doSomething() {
    const that = this;

    function doSomethingElse() {
      return that;
    }
  }

  // good
  function doSomething() {
    const self = this;

    function doSomethingElse() {
      return self;
    }
  }
  ```

  > Why?
  >
  > Walmart code style preference.

<a name="naming--restricted-names"></a><a name="15.8"></a>
- [15.8](#naming--restricted-names) Do not use restricted names.

  > eslint: [`no-shadow-restricted-names`](http://eslint.org/docs/rules/no-shadow-restricted-names)
  >
  > defined in: `rules/eslint/variables`

  ```js
  // bad
  var undefined = true;
  ```

  > Why?
  >
  > Just no.

<a name="naming--filenames"></a><a name="15.9"></a>
- [15.9](#naming--filenames) Name files using dash-casing.

  > eslint: [`filenames/match-regex`](https://github.com/selaux/eslint-plugin-filenames#consistent-filenames-via-regex-match-regex)
  >
  > defined in: `rules/filenames`

  ```
  # bad
  myComponent.jsx

  # good
  my-component.jsx
  ```

  > Why?
  >
  > Walmart file naming preference.

**[⬆️ back to top](#table-of-contents)**

## Forbidden Features

<a name="forbidden--no-alert"></a><a name="16.1"></a>
- [16.1](#forbidden--no-alert) Do not use `alert`.

  > eslint: [`no-alert`](http://eslint.org/docs/rules/no-alert)
  >
  > defined in: `rules/eslint/best-practices`

  ```js
  // bad
  alert("test");

  confirm("Is this working?");

  prompt("Why not?", "Because.");
  ```

  > Why?
  >
  > Alerts are bad UI and should not be used.

<a name="forbidden--no-caller"></a><a name="16.2"></a>
- [16.2](#forbidden--no-caller) Do not use `arguments.caller` or `arguments.callee`.

  > eslint: [`no-caller`](http://eslint.org/docs/rules/no-caller)
  >
  > defined in: `rules/eslint/best-practices`

  ```js
  // bad
  function foo(n) {
    arguments.callee(n - 1);
  }
  ```

  > Why?
  >
  > These are deprecated features of the language and do not work in ES5 stict mode.

<a name="forbidden--no-eval"></a><a name="16.3"></a>
- [16.3](#forbidden--no-eval) Do not use `eval()`.

  > eslint: [`no-eval`](http://eslint.org/docs/rules/no-eval), [`no-implied-eval`](http://eslint.org/docs/rules/no-implied-eval), [`no-script-url`](http://eslint.org/docs/rules/no-script-url)
  >
  > defined in: `rules/eslint/best-practices`

  ```js
  // bad
  eval("var a = 0");
  location.href = "javascript:void(0)";
  ```

  > Why?
  >
  > The use of `eval()` is dangerous and can open your application up to security vulnerabilities.

<a name="forbidden--no-sequences"></a><a name="16.4"></a>
- [16.4](#forbidden--no-sequences) Do not use sequences outside of `for` loops or without explicitly wrapping in parentheses.

  > eslint: [`no-sequences`](http://eslint.org/docs/rules/no-sequences)
  >
  > defined in: `rules/eslint/best-practices`

  ```js
  // bad
  if (doSomething(), !!test)

  // good
  for (var i = 0, j = 10; i < j; i++, j--)
  ```

  > Why?
  >
  > Sequences used in non-standard ways can be difficult to read.

<a name="forbidden--no-with"></a><a name="16.5"></a>
- [16.5](#forbidden--no-with) Do not use the `with` statement.

  > eslint: [`no-with`](http://eslint.org/docs/rules/no-with)
  >
  > defined in: `rules/eslint/best-practices`

  ```js
  // bad
  with (point) {
    r = Math.sqrt(x * x + y * y);
  }

  // good
  const r = ({x, y}) => Math.sqrt(x * x + y * y);
  ```

  > Why?
  >
  > `with` adds members of an object to the current scope, making it impossible to tell what a variable inside the block actually refers to.

<a name="forbidden--no-console"></a><a name="16.6"></a>
- [16.6](#forbidden--no-console) Do not use `console`.

  > eslint: [`no-console`](http://eslint.org/docs/rules/no-console)
  >
  > defined in: `rules/eslint/errors`

  ```js
  // bad
  console.log("test");
  console.warn("warning");
  console.error("error");
  ```

  > Why?
  >
  > Console logs should not exist in production code.

<a name="forbidden--no-debugger"></a><a name="16.7"></a>
- [16.7](#forbidden--no-debugger) Do not use `debugger` statement.

  > eslint: [`no-debugger`](http://eslint.org/docs/rules/no-debugger)
  >
  > defined in: `rules/eslint/errors`

  ```js
  // bad
  function doSomething() {
    debugger;
    return true;
  }
  ```

  > Why?
  >
  > Set breakpoints in your debugging tool instead.

<a name="forbidden--no-control-regex"></a><a name="16.8"></a>
- [16.8](#forbidden--no-control-regex) Do not use control characters in regular expressions.

  > eslint: [`no-control-regex`](http://eslint.org/docs/rules/no-control-regex)
  >
  > defined in: `rules/eslint/errors`

  ```js
  // bad
  var pattern = /\x1f/;

  // good
  var pattern = /\x20/;
  ```

  > Why?
  >
  > ASCII characters 0-31 are invisible characters rarely used in JavaScript and are probably an error if in a regular expression.

<a name="forbidden--strict"></a><a name="16.9"></a>
- [16.9](#forbidden--strict) Do not use directive `"use strict"`.

  > eslint: [`strict`](http://eslint.org/docs/rules/strict)
  >
  > defined in: `rules/eslint/strict`

  ```js
  // bad
  "use strict";
  ```

  > Why?
  >
  > Walmart code is transpiled.

<a name="forbidden--bitwise"></a><a name="16.10"></a>
- [16.10](#forbidden--bitwise) Do not use bitwise operators.

  > eslint: [`no-bitwise`](http://eslint.org/docs/rules/no-bitwise)
  >
  > defined in: `rules/eslint/style`

  ```js
  // bad
  var x = y | z;
  var x = y & z;
  var x = y ^ z;
  var x = ~ z;
  var x = y << z;
  var x = y >> 2;
  var x = y >>> z;
  x |= y;
  x &= y;
  x ^= y;
  x <<= y;
  x >>= y;
  x >>>=y;
  ```

  > Why?
  >
  > Bitwise operators are seldom needed and can be confused with logical operators.

<a name="forbidden--delete-var"></a><a name="16.11"></a>
- [16.11](#forbidden-delete-var) Do not use the `delete` operator on a variable.

  > eslint: [`no-delete-var`](http://eslint.org/docs/rules/no-delete-var)
  >
  > defined in: `rules/eslint/variables`

  ```js
  // bad
  var x = 1;
  delete x;
  ```

  > Why?
  >
  > `delete` is meant to be used for removing a property from an object. Using it on a variable may cause unexpected behavior.

**[⬆️ back to top](#table-of-contents)**

## React & JSX

<a name="jsx--quotes"></a><a name="17.1"></a>
- [17.1](#jsx--quotes) Use double quotes for JSX attributes.

  > eslint: [`jsx-quotes`](http://eslint.org/docs/rules/jsx-quotes)
  >
  > defined in: `rules/eslint/style`

  ```js
  // bad
  <Component name='myComponent' />

  // good
  <Component name="myComponent" />
  ```

  > Why?
  >
  > Walmart code style preference.

<a name="react--no-deprecated"></a><a name="17.2"></a>
- [17.2](#react--no-deprecated) Do not use deprecated methods.

  > eslint: [`react/no-deprecated`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-deprecated.md)
  >
  > defined in: `rules/react`

  ```jsx
  // bad
  React.render(<MyComponent />, root);

  // good
  ReactDOM.render(<MyComponent />, root);
  ```

  > Why?
  >
  > Deprecated methods will be removed in future versions of React.

<a name="react--no-lifecycle-set-state"></a><a name="17.3"></a>
- [17.3](#react--no-lifecycle-set-state) Do not call `setState()` inside of the `componentDidMount()` or `componentDidUpdate()` lifecycle methods.

  > eslint: [`react/no-did-mount-set-state`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-did-mount-set-state.md), [`react/no-did-update-set-state`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-did-update-set-state.md)
  >
  > defined in: `rules/react`

  ```js
  // bad
  class MyComponent extends React.Component {
    componentDidMount() {
      this.setState({
        name: this.props.name.toUpperCase()
      });
    }

    componentDidUpdate() {
      this.setState({
        name: this.props.name.toUpperCase()
      });
    }
  }
  ```

  > Why?
  >
  > Updating the state after a component mount or update will trigger a second `render()` call.

<a name="react--no-direct-mutation-state"></a><a name="17.4"></a>
- [17.4](#react--no-direct-mutation-state) Do not directly mutate `this.state`.

  > eslint: [`react/no-direct-mutation-state`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-direct-mutation-state.md)
  >
  > defined in: `rules/react`

  ```js
  // bad
  class MyComponent extends React.Component {
    componentWillMount: function() {
      this.state.name = this.props.name.toUpperCase();
    }
  }

  // good
  class MyComponent extends React.Component {
    componentWillMount: function() {
      this.setState({
        name: this.props.name.toUpperCase();=
      });
    }
  }
  ```

  > Why?
  >
  > [Shared mutable state is the root of all evil.](http://henrikeichenhardt.blogspot.com/2013/06/why-shared-mutable-state-is-root-of-all.html)

<a name="react--no-is-mounted"></a><a name="17.5"></a>
- [17.5](#react--no-is-mounted) Do not use `isMounted`.

  > eslint: [`react/no-is-mounted`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-is-mounted.md)
  >
  > defined in: `rules/react`

  ```js
  // bad
  var MyComponent = React.createClass({
    handleClick: function() {
      if (this.isMounted()) {
        return;
      }
    }
  });
  ```

  > Why?
  >
  > `isMounted` is not available to ES6 classes and will be deprecated.

<a name="jsx--no-unknown-property"></a><a name="17.6"></a>
- [17.6](#jsx--no-unknown-property) Do not use unknown properties in JSX.

  > eslint: [`react/no-unknown-property`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-unknown-property.md)
  >
  > defined in: `rules/react`

  ```jsx
  // bad
  var myJSX = <MyComponent class="wont-work" />;

  // good
  var myJSX = <MyComponent className="will-work" />;
  ```

  > Why?
  >
  > An unknown JSX property is probably a mistake.

<a name="react--prefer-es6-class"></a><a name="17.7"></a>
- [17.7](#react--prefer-es6-class) Use ES6 class instead of `React.createClass()`.

  > eslint: [`react/prefer-es6-class`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/prefer-es6-class.md)
  >
  > defined in: `rules/react`

  ```js
  // bad
  var MyComponent = React.createClass({
    render: // ...
  });

  // good
  class MyComponent extends React.Component {
    render() {
      // ...
    }
  }
  ```

  > Why?
  >
  > ES6 classes are the new and preferred method of creating a component.

<a name="react--prop-types"></a><a name="17.8"></a>
- [17.8](#react--prop-types) Always validate prop types.

  > eslint: [`react/prop-types`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/prop-types.md)
  >
  > defined in: `rules/react`

  ```jsx
  // bad
  const Button = ({ name }) => (
    <button>{name}</button>
  );

  // good
  const Button = ({ name }) => (
    <button>{name}</button>
  );

  Button.propTypes = {
    name: React.PropTypes.string.isRequired
  };
  ```

  > Why?
  >
  > Prop types helps catch errors.

<a name="jsx--react-scope"></a><a name="17.9"></a>
- [17.9](#jsx--react-scope) Make sure `React` is in scope when writing JSX.

  > eslint: [`react/react-in-jsx-scope`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/react-in-jsx-scope.md), [`react/jsx-uses-react`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-uses-react.md)
  >
  > defined in: `rules/react`

  ```jsx
  // bad
  var myJSX = (<span></span>);

  // good
  import React from "react";

  var myJSX = (<span></span>);
  ```

  > Why?
  >
  > JSX syntax requires `React` to compile.

<a name="jsx--self-closing"></a><a name="17.10"></a>
- [17.10](#jsx--self-closing) Don't use a closing tag on a self-closing tag.

  > eslint: [`react/self-closing-comp`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/self-closing-comp.md)
  >
  > defined in: `rules/react`

  ```jsx
  // bad
  var MyComponent = <MyComponent></MyComponent>;

  // good
  var MyComponent = <MyComponent />;
  ```

  > Why?
  >
  > Self-closing tags are more concise.

<a name="jsx--wrap-multilines"></a><a name="17.11"></a>
- [17.11](#jsx--wrap-multilines) Wrap multiline JSX in parentheses.

  > eslint: [`react/wrap-multilines`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-wrap-multilines.md)
  >
  > defined in: `rules/react`

  ```jsx
  // bad
  const MyComponent = <div>
    <p>Test</p>
  </div>;

  // good
  const MyComponent = (
    <div>
      <p>Test</p>
    </div>
  );
  ```

  > Why?
  >
  > This improves readability.

<a name="jsx--boolean-attributes"></a><a name="17.12"></a>
- [17.12](#jsx--boolean-attributes) Always write the value of a boolean attribute.

  > eslint: [`react/jsx-boolean-value`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-boolean-value.md)
  >
  > `rules/react`

  ```jsx
  // bad
  const checkbox = <Checkbox checked />;

  // good
  const checkbox = <Checkbox checked={true} />;
  ```

  > Why?
  >
  > This improves readability.

<a name="jsx--closing-bracket"></a><a name="17.13"></a>
- [17.13](#jsx--closing-bracket) Align a tag's closing bracket with the opening bracket.

  > eslint: [`react/jsx-closing-bracket-location`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-closing-bracket-location.md)
  >
  > defined in: `rules/react`

  ```jsx
  // bad
  <Button
    className="button"
    text="Button" />

  // bad
  <Button
    className="button"
    text="Button"
    />

  // good
  <Button
    className="button"
    text="button"
  />
  ```

  > Why?
  >
  > Walmart code style preference.

<a name="jsx--handler-names"></a><a name="17.14"></a>
- [17.14](#jsx--handler-names) Event handlers should be prefixed `handler`.

  > eslint: [`react/jsx-handler-names`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-handler-names.md)
  >
  > defined in: `rules/react`

  ```jsx
  // bad
  <MyComponent onClick={this.click} />

  // good
  <MyComponent onClick={this.handleClick} />
  ```

  > Why?
  >
  > Walmart code style preference.

<a name="jsx--indent-props"></a><a name="17.15"></a>
- [17.15](#jsx--indent-props) Multiline props should be indented 2 spaces.

  ```js
  // bad
  <Button
  name="button"
  className="button"
  />

  // good
  <Button
    name="button"
    className="button"
  />
  ```

  > Why?
  >
  > Walmart code style preference.

<a name="jsx--key"></a><a name="17.16"></a>
- [17.16](#jsx--key) Iterable elements should have a key prop.

  > eslint: [`react/jsx-key`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-key.md)
  >
  > defined in: `rules/react`

  ```jsx
  // bad
  list.map((item) => <li>{item}</li>);

  // good
  list.map((item, index) => <li key={index}>{item}</li>);
  ```

  > Why?
  >
  > React rendering benefits from key assignments.

<a name="jsx--no-undef"></a><a name="17.17"></a>
- [17.17](#jsx--no-undef) All components must be defined.

  > eslint: [`react/jsx-no-undef`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-undef.md), [`react/jsx-uses-vars`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-uses-vars.md)
  >
  > defined in: `rules/react`

  ```jsx
  // bad
  <MyComponent />

  // good
  import MyComponent from "./my-component";

  <MyComponent />
  ```

  > Why?
  >
  > Undefined components will cause a `ReferenceError` at runtime.

<a name="jsx--pascal-case"></a><a name="17.18"></a>
- [17.18](#jsx--pascal-case) JSX components should be named using PascalCase.

  > eslint: [`react/jsx-pascal-case`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-pascal-case.md)
  >
  > defined in: `rules/react`

  ```jsx
  // bad
  <myComponent />

  // good
  <MyComponent />
  ```

  > Why?
  >
  > This is to distinguish from native HTML tags.

**[⬆️ back to top](#table-of-contents)**

## Acknowledgements
The Walmart JavaScript Style Guide was inspired by:
* [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)

**[⬆️ back to top](#table-of-contents)**
