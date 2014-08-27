'use strict';

// Load in local modules
var fs = require('graceful-fs');
var mustache = require('mustache');
var tmpl = {
  'css': fs.readFileSync(__dirname + '/css.mustache', 'utf8'),
  'scss': fs.readFileSync(__dirname + '/scss.mustache', 'utf8'),
  'sass': fs.readFileSync(__dirname + '/sass.mustache', 'utf8'),
  'less': fs.readFileSync(__dirname + '/less.mustache', 'utf8'),
  'stylus': fs.readFileSync(__dirname + '/stylus.mustache', 'utf8')
};

// Define our css template fn ({items, options}) -> css
function cssTemplate (params) {
  // Localize parameters
  var items = params.items;
  var options = params.options;
  var tmplParams = {
    sprite: null,
    retina: null,
    items: [],
    options: options
  };

  var classFn = function (name, sep) {
    if (options.cssClass) {
      return '.' + options.cssClass + sep + name;
    }
    else {
      return '.icon' + sep + name;
    }
  };

  // Add class to each of the options
  items.forEach(function saveClass (item) {
    if (item.type === 'sprite') {
      item['class'] = classFn('', '');
      tmplParams.sprite = item;
    }
    else if (item.type === 'retina') {
      item['class'] = classFn('', '');
      tmplParams.retina = item;
    }
    else {
      item['class'] = classFn(item.name, '-');
      tmplParams.items.push(item);
    }
  });


  // Add the date to the template parameters
  // so we can cache bust new images
  tmplParams["bust"] = new Date().getTime();

  // Render and return CSS
  var css = mustache.render(tmpl[options.processor], tmplParams);
  return css;
}

// Export our CSS template
module.exports = cssTemplate;

  var items = params.items;
  var options = params.options;
  var tmplParams = {
    sprite: null,
    retina: null,
    items: [],
    options: options
  };

  var classFn = function (name, sep) {
    if (options.cssClass) {
      return '.' + options.cssClass + sep + name;
    }
    else {
      return '.icon' + sep + name;
    }
  };

  // Add class to each of the options
  items.forEach(function saveClass (item) {
    if (item.type === 'sprite') {
      item['class'] = classFn('', '');
      tmplParams.sprite = item;
    }
    else if (item.type === 'retina') {
      item['class'] = classFn('', '');
      tmplParams.retina = item;
    }
    else {
      item['class'] = classFn(item.name, '-');
      tmplParams.items.push(item);
    }
  });
  // Render and return CSS
  var css = mustache.render(tmpl[options.processor], tmplParams);
  return css;
}

// Export our CSS template
module.exports = cssTemplate;
