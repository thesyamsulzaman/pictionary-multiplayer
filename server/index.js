const http = require("http");
const WebSocketServer = require("websocket").server;
const { getRandomPet } = require("./utilities");
const GameEvents = require("./game-events");

const httpServer = http.createServer(() => {
  console.log("[SERVER] Received a request");
});

// HTTP Server containing a tcp connection
const wss = new WebSocketServer({
  httpServer,
});

let connection;
const gameEvents = new GameEvents();

wss.on("request", (request) => {
  try {
    connection = request.accept(null, request.origin);
    console.log("Connection accepted");

    connection.on("message", (message) => {
      if (message.type === "utf8") {
        try {
          const data = JSON.parse(message.utf8Data);
          const event = data.payload;

          gameEvents.handleEvent(data.type, event);
        } catch (error) {
          console.error("Error parsing message or storing data:", error);
          connection.sendUTF(
            JSON.stringify({
              type: "ERROR",
              message: "Parsing or processing error",
            })
          );
        }
      }
    });
  } catch (e) {
    console.error("Error during connection:", e);
  }

  connection.on("close", () => {
    console.log("Client has disconnected.");
  });

  connection.on("error", (error) => {
    console.error("Connection error:", error);
  });
});

gameEvents.on("broadcastResponse", (type, game) => {
  wss.connections.forEach((client) => {
    if (client.readyState === client.OPEN) {
      client.sendUTF(
        JSON.stringify({
          type,
          game,
        })
      );
    }
  });
});

gameEvents.on("sendResponse", (type, game) => {
  connection.send(
    JSON.stringify({
      type,
      game,
    })
  );
});

httpServer.listen(8080, () => {
  console.log("[SERVER] Running on 8080");
});
