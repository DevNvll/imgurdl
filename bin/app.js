#!/usr/bin/env node
var imgurdl = require('../imgurdl');
var program = require('commander');
var path = require('path');

program
  .version('0.0.4')
  .option('--path <path>', 'Save album to a custom path')
  .parse(process.argv);

imgurdl.setClientId('3432f685f05e620');
var args = process.argv.slice(2);

if(args[0] === undefined) {
  console.log('Missing album id. Usage: imgurdl albumId');
}
else {
  if (program.path) {
    console.log('Downloading:', args[0]);
    imgurdl.download(args[0], path.normalize(program.path));
  } else {
    console.log('Downloading:', args[0]);
    imgurdl.download(args[0]);
  }
}
