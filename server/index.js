const http = require("http");
const WebSocketServer = require("websocket").server;

const httpServer = http.createServer(() => {
  console.log("[SERVER] Received a request");
});

// HTTP Server containing a tcp connection
const wss = new WebSocketServer({
  httpServer,
});


httpServer.listen(8080, () => {
  console.log("[SERVER] Running on 8080");
});
