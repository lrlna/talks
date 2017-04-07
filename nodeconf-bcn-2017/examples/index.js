var zlib = require('zlib')
var http = require('http')
var pump = require('pump')
var fs = require('fs')

http.createServer(compress).listen(8080)

function compress (req, res) {
  var accept = req.headers['Accept-Encoding']
  var source = fs.createReadStream('index.html')

  if (accept.match(/\bgzip\b/)) {
    res.writeHead(200, 'whooooaaa gzip', {'Content-Encoding': 'gzip'})
    pump(source, zlib.createGzip(), res, handler)
  } else if (accept.match(/\bdeflate\b/)) {
    res.writeHead(200, 'whooooaaa deflate', {'Content-Encoding': 'deflate'})
    pump(source, zlib.createDeflate(), res, handler)
  } else {
    pump(source, res, handler)
  }

  function handler (err) {
    if (err) console.log('whoooo pipin didnt work', err)
  }
}
