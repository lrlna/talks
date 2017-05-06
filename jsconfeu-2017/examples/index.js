var http = require('http')
var fs = require('fs')

http.createServer(compress).listen(8080)

function compress (req, res) {
  var accept = req.headers['Accept-Encoding']
  if (!accept) accept = ''

  function handler (err) {
    if (err) console.log('errrrr pipe finished with', err)
  }
}
