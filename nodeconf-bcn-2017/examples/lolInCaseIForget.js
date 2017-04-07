var zlib = require('zlib')
var pump = require('pump')
var http = require('http')
var fs = require('fs')

http.createServer(compress).listen(8080)

function compress (req, res) {
  var accept = req.headers['accept-encoding']
  if (!accept) accept = ''
  var source = fs.createReadStream('index.html')

  if (accept.match(/\bdeflate\b/)) {
    res.writeHead(200, 'whoa it dflt', { 'Content-Encoding': 'deflate' })
    pump(source, zlib.createDeflate(), res, handler)
  } else if (accept.match(/\bgzip\b/)) {
    res.writeHead(200, 'whooaaa it gzip', { 'Content-Encoding': 'gzip' })
    pump(source, zlib.createGzip(), res, handler)
  } else {
    res.writeHead(200, {})
    pump(source, res)
  }

  function handler (err) {
    if (err) console.log('errrrr pipe finished with', err)
  }
}
