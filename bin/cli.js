#!/usr/bin/env node
'use strict';

var sprite = require('../index');
var gaze = require('gaze');
var opts = require('nomnom')
  .option('out', {
    position: 0,
    abbr: 'o',
    required: true,
    metavar: 'DIR',
    default: process.cwd(),
    help: 'path of directory to write sprite file to'
  })
  .option('src', {
    position: 1,
    abbr: 's',
    required: true,
    list: true,
    metavar: 'GLOB',
    help: 'glob strings to find source images to put into the sprite'
  })
  .option('cssPath', {
    abbr: 'c',
    full: 'css-image-path',
    default: '../images',
    help: 'http path to images on the web server (relative to css path or absolute path)'
  })
  .option('name', {
    abbr: 'n',
    default: 'sprite.png',
    help: 'name of the sprite file'
  })
  .option('processor', {
    abbr: 'p',
    choices: ['css', 'less', 'sass', 'scss', 'stylus'],
    default: 'css',
    help: 'output format of the css. one of css, less, sass, scss or stylus'
  })
  .option('style', {
    abbr: 'st',
    help: 'file to write css to, if ommited no css is written'
  })
  .option('watch', {
    abbr: 'w',
    flag: true,
    help: 'continuously create sprite'
  })
  .option('margin', {
    default: 5,
    help: 'margin in px between tiles'
  })
  .option('orientation', {
    choices: ['vertical', 'horizontal'],
    default: 'vertical',
    help: 'orientation of the sprite image'
  })
  .script('css-sprite')
  .parse();

if (opts.watch) {
  gaze(opts.src, function () {
    console.log('Watching for file changes ...')
    this.on('all', function () {
      sprite.create(opts, function () {
        console.log('> Sprite created in ' + opts.out);
      });
    });
  });
}
else {
  sprite.create(opts);
}
