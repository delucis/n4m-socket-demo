# n4m-socket-demo

This repository demonstrates how to use Node for Max to create a simple websockets application with [`express`][xprss], [`socket.io`][sckt], and a public URL via [`ngrok`][ngrk].

Be sure to also check out the examples in the official [Cycling ’74 `n4m-examples` repository][c74]!

## Set-up

1. Download this repository and open `index.maxpat`.
    ```sh
    # using the command line:
    git clone https://github.com/delucis/n4m-socket-demo.git
    cd n4m-socket-demo
    open index.maxpat
    ```

2. In Max, click the `script npm install` message button to install the dependencies for this repository. (You could also do this from the command line by running `npm install` in the repository directory).

3. Press `script start` to launch the web server and create a tunnel to ngrok.

4. Open your browser to <http://0.0.0.0:3000> or the ngrok URL displayed on-screen

5. Try typing and sending messages using the browser interface. You should be able to receive them inside Max. Hooray! 🎉

## Authenticating with `ngrok`

`ngrok` allows you to sign up and then authenticate your session using a secret token. It would be a bad idea to commit that to GitHub, because then everyone would see your secrets 😱

Instead, we can have our `index.js` code look for an “environment variable” (available as a property of the `process.env` global variable in Node) and use that if available.

By default this example will not authenticate with `ngrok` and is therefore subject to certain restrictions. To provide a secret token create a file called `.env` in the root directory of this repository and add the following line:

```
NGROK_TOKEN=MyVerySecretTokenFromNgrok
```

This example uses the [`dotenv` Node package][.env] to load the variables declared in your `.env` file into the environment variables. As mentioned above, _**do not upload your secrets to GitHub**_.

To get a token you should [sign up for an ngrok account][ngrknew]. Once you have an account, [go get your authtoken][ngrkauth].

[c74]: https://github.com/Cycling74/n4m-examples
[ngrk]: https://ngrok.com/
[ngrknew]: https://dashboard.ngrok.com/user/signup
[ngrkauth]: https://dashboard.ngrok.com/auth
[sckt]: https://socket.io/
[xprss]: https://expressjs.com/
[.env]: https://www.npmjs.com/package/dotenv
