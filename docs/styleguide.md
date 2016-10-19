# Walmart JavaScript Style Guide

*Walmart's guide to code style and best practices*

## Table of Contents

1. [Types](#types)
1. [References & Variables](#references--variables)
1. [Objects](#objects)
1. [Arrays](#arrays)
1. [Destructuring](#destructuring)
1. [Strings](#strings)
1. [Functions](#functions)
1. [Classes & Constructors](#classes--constructors)
1. [Modules](#modules)
1. [Iterators & Generators](#iterators--generators)
1. [Comparison Operators & Equality](#comparison-operators--equality)
1. [Blocks & Whitespace](#blocks--whitespace)
1. [Comments](#comments)
1. [Commas & Semicolons](#commas--semicolons)
1. [Naming Conventions](#naming-conventions)
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

<a name="types-complex"></a><a name="1.2"></a>
- [1.2](#types-complex) **Complex**: When you access a complex type you work on a reference to its value.
  + `object`
  + `array`
  + `function`

  ```js
  const foo = [1, 2];
  const bar = foo;

  bar[0] = 9;

  console.log(foo[0], bar[0]); // => 9, 9
  ```
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
  > `let` is block-scoped rather than function-scoped like `var`.

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
- [2.5](#variables--const) Always use `const` to declare variables.

  > eslint: [`no-undef`](http://eslint.org/docs/rules/no-undef), [`prefer-const`](http://eslint.org/docs/rules/prefer-const)
  >
  > defined in: `rules/eslint/variables`, `rules/eslint/es6`

  ```js
  // bad
  superPower = new SuperPower();

  // good
  const superPower = new SuperPower();
  ```

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

<a name="arrays-array-spreads"></a><a name="4.3"></a>
- [4.3](#arrays-array-spreads) Use array spreads `...` to copy arrays.

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

**[⬆️ back to top](#table-of-contents)**

## Strings

<a name="strings--quotes"></a><a name="6.1"></a>
- [6.1](#strings--quotes) Use double quotes `""` for strings.

  > eslint: [`quotes`](http://eslint.org/docs/rules/quotes.html)
  >
  > defined in: `rules/eslint/style`

  ```js
  // bad
  const name = 'Aaron Rodgers';

  // bad - template literals should contain interpolation or newlines
  const name = `Aaron Rodgers`;

  // good
  const name = "Aaron Rodgers";
  ```

  > Why?
  >
  > Walmart code style preference.

<a name="strings--template-literals"></a><a name="6.2"></a>
- [6.2](#strings--template-literals) When programmatically building up strings, use template strings instead of concatenation.

  > eslint: [`prefer-template`](http://eslint.org/docs/rules/prefer-template.html)
  >
  > defined in: `rules/eslint/es6`

  ```js
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

<a name="functions--signature-spacing"></a><a name="7.7"></a>
- [7.7](#functions--signature-spacing) Spacing in a function signature.

  > eslint: [`space-before-function-paren`](http://eslint.org/docs/rules/space-before-function-paren), [`space-before-blocks`](http://eslint.org/docs/rules/space-before-blocks)
  >
  > defined in: `rules/eslint/style`

  ```js
  // bad
  const f = function(){};
  const g = function (){};
  const h = function() {};

  // good
  const x = function () {};
  const y = function a() {};
  ```

  > Why?
  >
  > Walmart code style preference.

<a name="functions--spread-vs-apply"></a><a name="7.8"></a>
- [7.8](#functions--spread-vs-apply) Prefer the use of the spread operator `...` to call variadic functions.

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

<a name="functions--arrows-use-them"></a><a name="7.9"></a>
- [7.9](#functions--arrows-use-them) When you must use function expressions (as when passing an anonymous function), use arrow function notation.

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

<a name="functions--arrows-parens"></a><a name="7.10"></a>
- [7.10](#functions--arrows-parens) If the function body consists of a single expression, omit the braces and use the implicit return. Otherwise, keep the braces and use a `return` statement.

  > eslint: [`arrow-parens`](http://eslint.org/docs/rules/arrow-parens.html)
  >
  > defined in: `rules/eslint/es6`

  ```js
  // bad
  [1, 2, 3].map(number => `A string containing the ${number}.`);

  // good
  [1, 2, 3].map((number) => `A string containing the ${number}.`);
  ```

  > Why?
  >
  > Forcing parens around arrow function parameters helps prevent accidental arrow syntax when a `<=` comparator was intended instead.

<a name="functions--arrows-paren-wrap"></a><a name="7.11"></a>
- [7.11](#functions--arrows-paren-wrap) In case the expression spans over multiple lines, wrap it in parentheses for better readability.

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

**[⬆️ back to top](#table-of-contents)**

## Blocks & Whitespace

<a name="blocks--braces"></a><a name="12.1"></a>
- [12.1](#blocks--braces) Use braces with all single- and multi-line blocks.

  ```javascript
  // bad
  if (test)
    return false;

  // good
  if (test) {
    return false;
  }
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

  > eslint: [`indent`](http://eslint.org/docs/rules/indent.html)
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
- [12.10](#whitespace--max-len) Avoid having lines of code that are longer than 100 characters (including whitespace). Note: URLs are exempt from this rule.

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

<a name="naming--PascalCase-singleton"></a><a name="15.5"></a>
- [15.5](#naming--PascalCase-singleton) Use PascalCase when you export a constructor / class / singleton / function library / bare object.

  ```js
  const SearchConfig = {
    filter: {
    }
  };

  export default SearchConfig;
  ```

**[⬆️ back to top](#table-of-contents)**

## Acknowledgements
The Walmart JavaScript Style Guide was inspired by:
* [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)

**[⬆️ back to top](#table-of-contents)**
