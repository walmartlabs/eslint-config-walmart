# Walmart JavaScript Style Guide

*Walmart's guide to code style and best practices*

## Table of Contents

1. [Types](#types)
1. [Acknowledgements](#acknowledgements)
1. [References](#references)
1. [Objects](#objects)

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

## Acknowledgements
The Walmart JavaScript Style Guide was inspired by:
* [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)

**[⬆️ back to top](#table-of-contents)**
