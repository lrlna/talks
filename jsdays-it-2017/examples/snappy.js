var snappy = require('node-snappy')
var fs = require('fs')

var source = fs.createReadStream('./index.html')

snappy.compress(source, function (err, compressed) {
  console.log(compressed)
})
