var brotli = require('iltorb')
var http = require('http')
var pump = require('pump')
var fs = require('fs')

http.createServer(compress).listen(8080)

function compress (req, res) {
  var source = fs.createReadStream('index.html')

  res.writeHead(200, 'bbbbbbbbrrrrrotttli m8', { 'Content-Encoding': 'bz' })
  pump(source, brotli.compressStream(), res, handler)

  function handler (err) {
    if (err) console.log('errrrr pipe finished with', err)
  }
}
