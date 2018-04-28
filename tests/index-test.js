let assert = require('assert');
let es = require('event-stream');
let File = require('vinyl');
let prefixer = require('../');

describe('gulp-html-include',function () {
    describe('in buffer mode', function () {
        it('should prepend text', function (done) {
            ///test file
            let fakeFile = new File({
                contents: new Buffer('<div><include src="../../test.html">测试</include></div>')
            })

            ///
            let myPrefixer = prefixer('prependthis');

            myPrefixer.write(fakeFile);

            myPrefixer.once('data', function (file) {
                assert(file.isBuffer());
                console.log(file.contents.toString('utf8'))
                assert.equal(file.contents.toString('utf8'),'prependthis<div><include src="../../test.html">测试</include></div>');
                done()
            })

        })
    })
})