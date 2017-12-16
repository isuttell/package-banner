/**
 * @file Generate a fancy banner from a package.json file
 */

var Figlet = require('figlet');
var _ = require('lodash');
var path = require('path');
var fs = require('fs');

/**
 * Creates a pretty banner for the top of a file
 * @param    {Object}    options     Settings
 */
function ShipComponentsBanner(options) {
  // Apply some defaults
  this.options = _.extend({
    pkg: 'package.json',
    font: 'graffiti',
    fancy: true,
    lineEnding: '\n',
    wrap: true,
    lastLineBreak: true,
    timestamp: false,
    keys: ['name', 'description', 'author', 'homepage', 'bugs', 'license']
  }, options);


  // Read the file if it's not an object
  if (_.isString(this.options.pkg)) {
    var pathname = path.resolve(process.cwd() + '/' + this.options.pkg);
    this.pkg = fs.readFileSync(pathname, {
      encoding: 'utf8'
    });
    this.pkg = JSON.parse(this.pkg);
  } else if (_.isObject(this.options.pkg)) {
    this.pkg = this.options.pkg;
  } else {
    throw new TypeError('options.pkg has to be an object or string');
  }
}

/**
 * Gets a key from the package and applies any special formatting
 * @param     {String}    key    Property to get
 * @return    {String}
 */
ShipComponentsBanner.prototype.get = function(key) {
  switch(key) {
  case 'name':
    return this.pkg.name + ' ' + this.pkg.version;
  case 'bugs':
    if(_.isObject(this.pkg.bugs) && this.pkg.bugs.url) {
      return 'Bugs: ' + this.pkg.bugs.url;
    } else if (_.isString(this.pkg.bugs)) {
      return 'Bugs: ' + this.pkg.bugs;
    }
    break;
  default:
    if(_.isString(this.pkg[key])) {
      return _.capitalize(key) + ': ' + this.pkg[key];
    }
  }
  return void 0;
};

/**
 * Take the pkg and create an array with each element being a line
 * @return    {Array<string>}
 */
ShipComponentsBanner.prototype._constructLines = function() {
  var lines = this.options.keys
    .map(function(key){
      return this.get(key);
    }.bind(this))
    .filter(function(line){
      return _.isString(line);
    });

  if (this.options.fancy) {
    lines = Figlet.textSync(this.pkg.name, this.options.font).split('\n').concat(lines);
  }

  if(this.options.timestamp) {
    lines.push('Generated: ' + new Date());
  }

  return lines;
};

/**
 * Construct the final result
 * @return    {String}
 */
ShipComponentsBanner.prototype.build = function() {
  if (this._cache) {
    return this._cache;
  }

  var lines = this._constructLines();

  if(this.options.wrap !== true) {
    return lines.join(this.options.lineEnding);
  }

  lines = lines.map(function(line){
    return ' * ' + line;
  });

  var result = '/*!' + this.options.lineEnding;
  result += lines.join(this.options.lineEnding);
  result += '\n */';
  if(this.options.lastLineBreak === true) {
    result += this.options.lineEnding;
  }

  this._cache = result;

  return result;
};

/**
 * Return a string with examples of each font
 * @return    {String}
 */
ShipComponentsBanner.prototype.fonts = function() {
  var fonts = [];
  ShipComponentsBanner.fonts().forEach(function(font){
    fonts.push('****************************');
    fonts.push(font);
    fonts.push(Figlet.textSync(this.pkg.name, font));
    fonts.push(this.options.lineEnding);
  }.bind(this));
  return fonts.join(this.options.lineEnding);
};

/**
 * Get a list of all available fonts
 * @static
 * @alias
 * @return    {Array<string>}
 */
ShipComponentsBanner.fonts = function() {
  return Figlet.fontsSync();
};

module.exports = ShipComponentsBanner;
