'use strict';
let through = require('through2');
let gutil = require('gulp-util');
let myFile = require('./lib/file');
let PluginError = gutil.PluginError;

const PLUGIN_NAME = 'gulp-html-include'

function err (text) {
    return new PluginError(PLUGIN_NAME,text)
}
function change2Stream (text) {
    var stream = through();
    stream.write(text);
    return stream;
}
function htmlInclude() {
  let reg = /(<include[^<>]*>)/gi;
   
   /////
   let stream = through.obj(function(file, enc, cb) {
        let base = file.base
        
       // console.log(file.contents.setEncoding('utf-8'))
       if ( file.isStream()) {
            let contents = ''
            file.contents.setEncoding('utf8')
            file.contents.on('data',(chunk) => {
                contents += chunk
            })
            file.contents.on('end',(chunk) => {
                let replaceTagArr = contents.match(reg)  ///["<include src="tt.html">"]
                let pathArr = []
                replaceTagArr.forEach(tag => {
                    if (/src="(.*)"/gi.test(tag)){
                        pathArr.push(RegExp.$1);
                    }
                });
                console.log(pathArr)
                ////find out the file
                let newHtmlText = myFile(contents,base,pathArr)
                let streamer = change2Stream(newHtmlText);
                console.log(streamer)
                console.log(newHtmlText)
               streamer.on('error', this.emit.bind(this, 'error'));
               file.contents = streamer;
            })
           
       }

       if (file.isBuffer()) {
        let contents = file.contents.toString('utf8')
        let replaceTagArr = contents.match(reg)  ///["<include src="tt.html">"]
        let pathArr = []

        
        replaceTagArr.forEach(tag => {
            if (/src="(.*)"/gi.test(tag)){
                pathArr.push(RegExp.$1);
            }
        });
       console.log(pathArr)
        ////find out the file
        let newHtmlText = myFile(contents,base,pathArr)
          file.contents = new Buffer(newHtmlText)
       }
      
       this.push(file);

       cb();
   })
   return stream;
}

module.exports = htmlInclude