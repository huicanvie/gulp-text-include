/**
 * @file file handle
 */
let fs = require('fs');
let path = require('path')


/**
 * main
 * @author huicanvie<81681445@qq.com>
 * @augments disHtmlText, base, srcpath
 * @return disHtmlText
 */

 function generateFile (disHtmlText, base, srcpath) {
     /**
      * 1.find put the module text
      * 2.replace <include src=""> or <include src=""></include>
      */
     
        /**
         * 
         */
        
        srcpath.forEach(item => {
           let reg = new RegExp('(<\\s*include\\s*src="' + item + '"\\s*>'+'\\s*<\/include\\s*>' + '|' +'<\\s*include\\s*src="' + item + '"\\s*>)','gi')
           let contents = fs.readFileSync(path.resolve(__dirname, base + item), 'utf8')
           console.log(reg.source)
           disHtmlText = disHtmlText.replace(reg, contents);
        })
        
    return disHtmlText
 }


 module.exports = generateFile;