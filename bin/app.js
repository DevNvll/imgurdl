#!/usr/bin/env node
var imgurdl = require('../imgurdl');
var program = require('commander');
var path = require('path');

program
  .version('0.0.1')
  .option('--path <path>', 'Save album to a custom path')
  .parse(process.argv);


var args = process.argv.slice(2);

if(args[0] === undefined) {
  console.log('Missing album id. Usage: imgurdl albumId');
}
else {
  if (program.path) {
    imgurdl.album(args[0], path.normalize(program.path));
  } else {
    imgurdl.album(args[0]);
  }
}
