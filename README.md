<h1 align="center">eslint-config-walmart</h1>

<p align="center">
  <a title='npm version' href="https://npmjs.org/package/eslint-config-walmart">
    <img src='http://img.shields.io/npm/v/eslint-config-walmart.svg' />
  </a>
  <a title='License' href="https://opensource.org/licenses/MIT">
    <img src='https://img.shields.io/badge/license-MIT-blue.svg' />
  </a>
  <a title='Build Status' href='https://travis-ci.org/walmartlabs/eslint-config-walmart'>
    <img src='https://api.travis-ci.org/walmartlabs/eslint-config-walmart.svg?branch=master' />
  </a>
</p>

<h4 align="center">
  A composable set of ESLint configurations.
</h4>

***

This project is the maintained offshoot of [eslint-config-defaults](https://github.com/walmartlabs/eslint-config-defaults) with just the Walmart Labs-flavored rules included. It is `eslint@2+`-compatible and actively maintained (with love) by the friendly folks at Walmart Labs.

## Installation

1. Install this config package and ESLint:

    ```bash
    $ npm install --save-dev eslint eslint-config-walmart
    ```

2. Then, install any additional dependencies required by your configuration. (See
[Dependencies](#dependencies) section below.)

    e.g.
    ```bash
    $ npm install --save-dev eslint-plugin-filenames babel-eslint
    ```

## Usage

### Full Configurations

This package includes the following complete and ready to use configurations:

- `walmart` - ES6 config
- `walmart/configurations/off` - Disable all rules (ESLint's default at 1.0.0+)
- `walmart/configurations/es5-browser` - ES5 + browser
- `walmart/configurations/es5-node` - ES5 + node < 4.x
- `walmart/configurations/es5-test` - ES5 + test
- `walmart/configurations/es5` - ES5 config
- `walmart/configurations/es6-browser` - ES6 + browser
- `walmart/configurations/es6-node` - ES6 + node 4.x
- `walmart/configurations/es6-react-test` - ES6 + react + test
- `walmart/configurations/es6-react` - ES6 + react
- `walmart/configurations/es6-test` - ES6 + test
- `walmart/configurations/es6` - ES6 config

###### Dependencies

- Any config (`walmart/configurations/<suffix>`) - [eslint-plugin-filenames](https://github.com/selaux/eslint-plugin-filenames)
- Any React config (`<prefix>-react`) - [eslint-plugin-react](https://www.npmjs.com/package/eslint-plugin-react), [babel-eslint](https://github.com/babel/babel-eslint)
- Any ES-next config (`es6-<suffix>`) - [babel-eslint](https://github.com/babel/babel-eslint)

To consume and extend a config in ESLint just add the extends attribute to your `.eslintrc`. For
more details about how shareable configs work, see the
[ESLint documentation](http://eslint.org/docs/developer-guide/shareable-configs).

```yaml
---
"extends":
  - "walmart"
```

```yaml
---
"extends":
  - "walmart/configurations/es6-browser"
```

**NOTE:** Extending multiple complete configs can cause unexpected results, if you need to do this you should consider a piecemeal config as explained below. See https://github.com/walmartlabs/eslint-config-defaults/issues/38 for details.

### Piecemeal Configurations

ESLint configuration is broken apart in `./rules` containing ESLint's rules and rules for specific ESLint plugins. The full set of ESLint rules (`./rules/eslint`) are broken into categories that mirror ESLint's documentation. Under each rule type there are sets of configuration as well as an `off.js` file which turns off every rule in the category.

###### Examples

```yaml
---
"extends":
  - "walmart/rules/eslint/best-practices/on",
  - "walmart/rules/eslint/es6/off"
  - "walmart/rules/eslint/node/off"

"env":
  "phantom": true
```

## Limitations

Due to an issue with ESLint, config extension cannot be called from a globally installed (`npm install -g eslint`) eslint. It can however be run properly using eslint installed directly to your package's `node_modules`. This can be done by either calling it directly (`./node_modules/.bin/eslint .`) or from within an npm script since they automatically check local `node_modules` first. This will be tracked in issue [#43](https://github.com/walmartlabs/eslint-config-defaults/issues/43).

### This package tracks config in the following versions:

- [ESLint](https://github.com/eslint/eslint) 2.10.2
- [eslint-plugin-react](https://www.npmjs.com/package/eslint-plugin-react) 5.1.1
- [eslint-plugin-filenames](https://www.npmjs.com/package/eslint-plugin-filenames) 1.0.0

## And A Special Thanks To

* [Nicholas C. Zakas](https://github.com/nzakas) for all the amazing work on [ESLint](https://github.com/eslint/eslint)
* [Keith Cirkel](https://github.com/keithamus) for painstakingly formatting all of ESLint's rules into JSON in [eslint-config-strict](https://github.com/keithamus/eslint-config-strict)
* [AirBnB](https://github.com/airbnb/javascript) for sharing all of their config in [JavaScript Style Guide](https://github.com/airbnb/javascript)
* [Google](https://google.github.io/styleguide/javascriptguide.xml) for sharing their styleguide
* [ES-Next Compat Table](https://github.com/kangax/compat-table) for the [excellent docs on node features](https://kangax.github.io/compat-table/es6/#node4)

***

## License

[MIT License](http://opensource.org/licenses/MIT)
