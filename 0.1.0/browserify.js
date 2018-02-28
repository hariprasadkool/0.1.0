//Using browserify programatically
//Browserify isn’t just a command-line tool. You can use it in node modules and applications as well.

//Here’s an example that does the same thing as browserify index.js -o bundle.js:
// CLI - browserify index.js -o bundle.js

var fs = require('fs');
var path = require('path');
var browserify = require('browserify');

var input = path.join(__dirname, './src/js/index.js');
var output = path.join(__dirname, './dist/bundle.js');

var Browserify = browserify(input);

// https://github.com/browserify/browserify/wiki/list-of-transforms
// Browserify.transform('brfs')

Browserify.bundle(function (err, buf) {
  if (err) return console.log(err)
  fs.writeFile(output, buf, function (err) {
    if (err) return console.log(err)
  })
});














// Reference :-
// https://writingjavascript.org/posts/introduction-to-browserify