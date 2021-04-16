// /**
//  * IMPORTANT:
//  * ---------
//  * Do not manually edit this file if you'd like to use Colyseus Arena
//  *
//  * If you're self-hosting (without Arena), you can manually instantiate a
//  * Colyseus Server as documented here: 👉 https://docs.colyseus.io/server/api/#constructor-options
//  */
// const { listen } = require("@colyseus/arena");

// // Import arena config
// const arenaConfig = require("./arena.config");

// // Create and listen on 2567 (or PORT environment variable.)
// listen(arenaConfig);
// Colyseus + Express
const colyseus = require("colyseus");
const http = require("http");
const express = require("express");
const port = process.env.port || 3000;
const path = require("path")
const app = express();
const { ChatRoom } = require("./rooms/ChatRoom");

app.use('/', express.static(path.join(__dirname, "static")));
app.use(express.json());

const gameServer = new colyseus.Server({
  server: http.createServer(app)
});
gameServer.define("chat", ChatRoom);

gameServer.listen(port);