# Authentiq authentication with ExpressJS and PassportJS

[Authentiq](https://www.authentiq.com/) is a great way to securely setup authentication in your application.

First off you will need to register for an account at [Authentiq](https://www.authentiq.com/).

With this template you will need to create a Server Side Application, providing a redirect URI. If working locally, you will need to setup a SSL as PassportJS requires HTTPS. An easy way to get around this is to use another service called [ngrok](https://ngrok.com/). Your callback URI should be setup both in your authentiq account and in the passport-setup.js file. Also in the same file provide the Client ID.

Note:
* Tested Node v10.0.0
* ES6 & Async/Await has been used

Required environment variables:
* MONOGO_URL
* SESSION_SECRET
* AUTHENTIQ_SECRET
* NODE_ENV
  * "development"; or
  * "production"

In development mode sessions are setup to use a session file which creates a directory named sessions. In production it will use REDIS.

If using the built in script to run the server e.g. `npm run dev`, you will need to install nodemon if you don't have it. `npm i -g nodemon`.
