const path = require('path')
const app = require('express')()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const Max = require('max-api')
// Import a custom ngrok initialiser from our “lib” directory
const ngrokInit = require('./lib/ngrok-init')

const PORT = 3000

// Define our server’s response for the '/' path (the homepage):
// send index.html
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'index.html'))
})

// When a user connects (triggered by the socket.io code in index.html),
// show a message in the Max window
io.on('connection', function (socket) {
  Max.post('a user connected')

  // When we get a “chat message” event,
  // post the message to the Max window & send it out of the node.script object
  socket.on('chat message', function (msg) {
    Max.post('message: ' + msg)
    Max.outlet('input ' + msg)
  })
})

// Listen for connections on the correct port
http.listen(PORT, function () {
  Max.post(`listening on *:${PORT}`)
})

// Call our ngrok initialiser and once we have established a connection,
// post and output the URL to Max
let URL
ngrokInit(PORT)
  .then(url => {
    URL = url
    Max.post('URL: ' + url)
    Max.outlet('server ' + url)
  })
  // If there are any errors, catch them and report them to the console
  // (the console is available using the [node.debug] object in Max)
  .catch(console.error)

// Allow us to get the server URL later in our Max patch, not just at the
// moment we connect
Max.addHandler('getServerUrl', () => {
  Max.post('URL: ' + URL)
  Max.outlet('server ' + URL)
})
