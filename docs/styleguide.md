# Walmart JavaScript Style Guide

*Walmart's guide to code style and best practices*

## Table of Contents

1. [Types](#types)
1. [Acknowledgements](#acknowledgements)
1. [References](#references)
1. [Objects](#objects)
1. [Arrays](#arrays)
1. [Destructuring](#destructuring)
1. [Strings](#strings)
1. [Functions](#functions)
1. [Classes & Constructors](#classes--constructors)

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

## References
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

<a name="references--block-scope"></a><a name="2.3"></a>
- [2.3](#references--block-scope) Note that both `let` and `const` are block-scoped.

  ```js
  // const and let only exist in the blocks they are defined in.
  {
    let a = 1;
    let b = 1;
  }
  console.log(a); // ReferenceError
  console.log(b); // ReferenceError
  ```

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
  > Walmart code style preference

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

## Acknowledgements
The Walmart JavaScript Style Guide was inspired by:
* [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)

**[⬆️ back to top](#table-of-contents)**
