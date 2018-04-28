/**
 * @file 文件处理模块
 */
let fs = require('fs-extra');
let path = require('path')


/**
 * 生成文件主函数
 * @author huicanvie<81681445@qq.com>
 * @augments disHtmlText, srcpath
 * @return undefined
 */

 function generateFile (disHtmlText, srcpath) {
     /**
      * 主要是2个流程
      * 1.找到指定路径的模板文件并读取内容,模板文件可能是多个
      * 2.替换<include src="">或者 <include src=""></include>
      */
     
        /**
         * 循环模板文件路径。用模板文件内容替换到目标文件的对应标签
         */
        srcpath.forEach(item => {
           fs.readFileSync(path.resolve(__dirname, item), 'utf8', (err, data) => {
               let reg = new RegExp('<include\s*src="' + item + '"\s*>' + '|' + '<include\s*src="' + item + '"\s*>\s*</inlude>')
               disHtmlText = disHtmlText.replace(reg, data);
           })
        })
        
        return disHtmlText;

 }


 module.exports = generateFile;