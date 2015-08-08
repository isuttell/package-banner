var Figlet = require('figlet');
var _ = require('lodash');
var fs = require('fs');

/**
 * Takes a package.json file and generates a banner out of it
 *
 * @param     {Path|Object}    pkg
 * @param     {Object}         options
 * @return    {String}
 */
function packageBanner(pkg, options) {
  // Apply some defaults
  options = _.extend({
    font: 'graffiti',
    lineEnding: '\n',
    wrap: true,
    lastLineBreak: true,
    timestamp: false
  }, options);

  // Read the file if it's not an object
  if(_.isString(pkg)) {
    pkg = fs.readFileSync(pkg, {
      encoding: 'utf8'
    });
    pkg = JSON.parse(pkg);
  } else if(!_.isObject(pkg)) {
    throw new TypeError('pkg has to be an object or pathname');
  }

  // Put it all together in an array
  var lines = getLines(pkg, options);

  // Construct the string
  return buildBanner(lines, options);
}

/**
 * Take an object and convert it an array of lines we banner to display
 *
 * @param     {Object}    pkg        package.json
 * @param     {Object}    options    settings
 * @return    {Array<string>}
 */
function getLines(pkg, options) {
  var lines = [];

  if(pkg.name) {
    var title = Figlet.textSync(pkg.name, options.font).split('\n');
    lines = lines.concat(title);
  }

  if(pkg.name  && pkg.version) {
    lines.push(pkg.name + ' ' + pkg.version);
  }

  if(pkg.description) {
    lines.push(pkg.description);
  }

  if(pkg.author) {
    lines.push('Author: ' + pkg.author);
  }

  if(pkg.homepage) {
    lines.push('Homepage: ' + pkg.homepage);
  }

  if(_.isObject(pkg.bugs) && pkg.bugs.url) {
    lines.push('Bugs: ' + pkg.bugs.url);
  } else if (_.isString(pkg.bugs)) {
    lines.push('Bugs: ' + pkg.bugs);
  }

  if(pkg.license) {
    lines.push('License: ' + pkg.license);
  }

  return lines;
}

/**
 * Takes an array of lines of constructs a banner based on options
 *
 * @param     {Array<string>}    lines
 * @param     {Options}           options
 * @return    {String}
 */
function buildBanner(lines, options) {
  if(options.wrap !== true) {
    return lines.join(options.lineEnding);
  }
  lines = lines.map(function(line){
    return ' * ' + line;
  });
  var result = '/*!' + options.lineEnding;
  result += lines.join(options.lineEnding);
  result += '\n */';
  if(options.lastLineBreak === true) {
    result += options.lineEnding;
  }
  return result;
}

module.exports = packageBanner;
