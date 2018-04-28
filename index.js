'use strict';
let through = require('through2');
let gutil = require('gulp-util');
let myFile = require('./file');
let PluginError = gutil.PluginError;

const PLUGIN_NAME = 'gulp-html-include'

function err (text) {
    return new PluginError(PLUGIN_NAME,text)
}
function findFile (path) {
    
}
function htmlInclude(htmlText) {
  let reg = /(<include[^<>]*>)/gi;
   if (!htmlText) {
       throw err('Missing html text!')
   }

   htmlTextBuffer = new Buffer(htmlText);

   /////
   let stream = through.obj(function(file, enc, cb) {
       if (file.isStream()) {
           this.emit('error', err('Streams are not supported!'))
           return cb();
       }

       if (file.isBuffer()) {
           file.contents = htmlTextBuffer
       }
       let contents = file.contents.toString('utf8')
       let replaceTagArr = contents.match(reg)  ///["<include src="tt.html">"]
       let pathArr = []

       console.log(contents)
       replaceTagArr.forEach(tag => {
           if (/src="(.*)"/gi.test(tag)){
               pathArr.push(RegExp.$1);
           }
       });
       console.log(pathArr)

       ////find out the file
       let newHtmlText = myFile(contents,pathArr)

       file.contents = new Buffer(newHtmlText)
      
       this.push(file);

       cb();
   })
   ///return steam
   return steam;
}

module.exports = htmlInclude