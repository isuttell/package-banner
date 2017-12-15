# ship-components-banner

[![npm version](https://img.shields.io/npm/v/ship-components-banner.svg?style=flat)](https://www.npmjs.com/package/ship-components-banner)
[![dependencies](https://img.shields.io/david/ship-components/ship-components-banner.svg?style=flat)](https://david-dm.org/ship-components/ship-components-banner)

Generates a banner from a package.json file.

## Install

```shell
npm install ship-components-banner --save-dev
```

## Usage

```js
var ShipComponentsBanner = require('ship-components-banner');

// Basic Usage
var banner = new ShipComponentsBanner().build();

console.log(banner);

/*!
 * ___.
 * \_ |__ _____    ____   ____   ___________
 *  | __ \\__  \  /    \ /    \_/ __ \_  __ \
 *  | \_\ \/ __ \|   |  \   |  \  ___/|  | \/
 *  |___  (____  /___|  /___|  /\___  >__|
 *      \/     \/     \/     \/     \/
 * ship-components-banner X.X.X
 * Description: Generates a fancy banner from a package.json file
 * Author: Isaac Suttell <isaac.suttell@sony.com>
 * License: MIT
 */

```

## Options

```js
var ShipComponentsBanner = require('ship-components-banner');

var banner = new ShipComponentsBanner({
  /**
   * Either takes a path or an object. It defaults to the package.json in your process.cwd()
   * @type    {String|Object}
   */
  pkg: 'package.json',

  /**
   * ASCII Font to use. See below for more options.
   * @type    {String}
   */
  font: 'graffiti',

  /**
   * Should an ascii art title be generated?
   * @type    {Boolean}
   */
  fancy: true,

  /**
   * Default line ending us UNIX
   * @type    {String}
   */
  lineEnding: '\n',

  /**
   * Wrap everything in a comment or just create the text
   * @type    {Boolean}
   */
  wrap: true,

  /**
   * Add a line break at the end
   * @type    {Boolean}
   */
  lastLineBreak: true,

  /**
   * Add a timestamp which can be useful for automated build systems
   * @type    {Boolean}
   */
  timestamp: false,

  /**
   * An array of keys to include in order
   * @type    {Array}
   */
  keys: ['name', 'description', 'author', 'homepage', 'bugs', 'license'],

}).build();

```

## Fonts

You can get a list of fonts with a preview of each by running:

```shell
$ npm run fonts
```

From the command line of your project.

## License

The MIT License (MIT)

Copyright (c) 2017 SHIP

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
