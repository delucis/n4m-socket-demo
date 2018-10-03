// populate environment variables from a '.env' file
require('dotenv').config()
const ngrok = require('ngrok')

/**
 * Connect to ngrok and receive a public URL for your Express server
 * @param {Number} [port=3000] The number of the port to tunnel to
 * @return {Promise<String>} The ngrok URL your server is available at
 */
module.exports = function ngrokInit (port = 3000) {
  const options = {
    addr: port
  }

  // The token is secret so should be made available in your environment
  // variables. Using the “dotenv” package allows us to store it in a “.env”
  // file locally, but this token should not be made public, so never commit
  // the “.env” file! (See README)
  // Here we make sure the token is available and if not, try to connect to
  // ngrok without authentication
  if (process.env.NGROK_TOKEN) {
    options.authtoken = process.env.NGROK_TOKEN
  }

  return ngrok.connect(options)
}
