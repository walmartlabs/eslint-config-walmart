***
# NOTICE:
 
## This repository has been archived and is not supported.
 
[![No Maintenance Intended](http://unmaintained.tech/badge.svg)](http://unmaintained.tech/)
***
NOTICE: SUPPORT FOR THIS PROJECT HAS ENDED 

This projected was owned and maintained by Walmart. This project has reached its end of life and Walmart no longer supports this project.

We will no longer be monitoring the issues for this project or reviewing pull requests. You are free to continue using this project under the license terms or forks of this project at your own risk. This project is no longer subject to Walmart's bug bounty program or other security monitoring.


## Actions you can take

We recommend you take the following action:

  * Review any configuration files used for build automation and make appropriate updates to remove or replace this project
  * Notify other members of your team and/or organization of this change
  * Notify your security team to help you evaluate alternative options

## Forking and transition of ownership

For [security reasons](https://www.theregister.co.uk/2018/11/26/npm_repo_bitcoin_stealer/), Walmart does not transfer the ownership of our primary repos on Github or other platforms to other individuals/organizations. Further, we do not transfer ownership of packages for public package management systems.

If you would like to fork this package and continue development, you should choose a new name for the project and create your own packages, build automation, etc.

Please review the licensing terms of this project, which continue to be in effect even after decommission.

<h1 align="center">eslint-config-walmart</h1>

<p align="center">
  <a title='npm version' href="https://npmjs.org/package/eslint-config-walmart">
    <img src='http://img.shields.io/npm/v/eslint-config-walmart.svg' />
  </a>
  <a title='License' href="https://www.apache.org/licenses/LICENSE-2.0">
    <img src='https://img.shields.io/badge/License-Apache%202.0-blue.svg' />
  </a>
  <a title='Build Status' href='https://travis-ci.org/walmartlabs/eslint-config-walmart'>
    <img src='https://api.travis-ci.org/walmartlabs/eslint-config-walmart.svg?branch=master' />
  </a>
</p>

<h4 align="center">
  A composable set of ESLint configurations.
</h4>

---

This project is the maintained offshoot of [eslint-config-defaults](https://github.com/walmartlabs/eslint-config-defaults) with just the Walmart Labs-flavored rules included. It is `eslint@2+`-compatible and actively maintained (with love) by the friendly folks at Walmart Labs. Check out the [style guide](docs/styleguide.md) for a comprehensive list of rules.

## Installation

1.  Install this config package and ESLint:

    ```bash
    $ npm install --save-dev eslint eslint-config-walmart
    ```

2.  Then, install any additional dependencies required by your configuration. (See
    [Dependencies](#dependencies) section below.)

        e.g.
        ```bash
        $ npm install --save-dev eslint-plugin-filenames babel-eslint
        ```

## Usage

### Full Configurations

This package includes the following complete and ready to use configurations:

* `walmart` - ES6 config
* `walmart/configurations/off` - Disable all rules (ESLint's default at 1.0.0+)
* `walmart/configurations/es5-browser` - ES5 + browser
* `walmart/configurations/es5-node` - ES5 + node < 4.x
* `walmart/configurations/es5-test` - ES5 + test
* `walmart/configurations/es5` - ES5 config
* `walmart/configurations/es6-browser` - ES6 + browser
* `walmart/configurations/es6-node-test` - ES6 + node 4.x + test
* `walmart/configurations/es6-node` - ES6 + node 4.x
* `walmart/configurations/es6-react-test` - ES6 + react + test
* `walmart/configurations/es6-react` - ES6 + react
* `walmart/configurations/es6-test` - ES6 + test
* `walmart/configurations/es6` - ES6 config

###### Dependencies

* Any config (`walmart/configurations/<suffix>`) - [eslint-plugin-filenames](https://github.com/selaux/eslint-plugin-filenames)
* Any React config (`<prefix>-react`) - [eslint-plugin-react](https://www.npmjs.com/package/eslint-plugin-react), [babel-eslint](https://github.com/babel/babel-eslint)
* Any ES-next config (`es6-<suffix>`) - [babel-eslint](https://github.com/babel/babel-eslint)

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

* [ESLint](https://github.com/eslint/eslint) 2.10.2
* [eslint-plugin-react](https://www.npmjs.com/package/eslint-plugin-react) 5.1.1
* [eslint-plugin-filenames](https://www.npmjs.com/package/eslint-plugin-filenames) 1.0.0

## And A Special Thanks To

* [Nicholas C. Zakas](https://github.com/nzakas) for all the amazing work on [ESLint](https://github.com/eslint/eslint)
* [Keith Cirkel](https://github.com/keithamus) for painstakingly formatting all of ESLint's rules into JSON in [eslint-config-strict](https://github.com/keithamus/eslint-config-strict)
* [AirBnB](https://github.com/airbnb/javascript) for sharing all of their config in [JavaScript Style Guide](https://github.com/airbnb/javascript)
* [Google](https://google.github.io/styleguide/javascriptguide.xml) for sharing their styleguide
* [ES-Next Compat Table](https://github.com/kangax/compat-table) for the [excellent docs on node features](https://kangax.github.io/compat-table/es6/#node4)

---

## License

Copyright (c) 2015-present, WalmartLabs

Licensed under the [Apache License, Version 2.0](https://www.apache.org/licenses/LICENSE-2.0).
