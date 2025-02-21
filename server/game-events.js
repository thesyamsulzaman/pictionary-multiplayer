const EventEmitter = require("events");
const Game = require("./game");

class GameEvents extends EventEmitter {
  constructor() {
    super();
    this.games = {};
    this.roomId = "";
  }

  handleEvent(type, event) {
    if (this[type]) {
      this[type](event);
    }
  }

  CREATE_GAME(event) {
    this.roomId = event?.roomId
    this.games[this.roomId] = new Game(this.roomId);
    this.games[this.roomId].addClient({
      name: event.name,
      color: event.color,
      clientId: event.clientId,
    });

    this.emit("sendResponse", "CREATE_GAME", this.games[this.roomId]);
  }

  JOIN_GAME(event) {
    const game = this.games[this.roomId];
    game.addClient({
      name: event.name,
      color: event.color,
      clientId: event.clientId,
    });
    game.setPlayerRoles();
    this.emit("broadcastResponse", "JOIN_GAME", game);
  }

  GAME_STATUS_UPDATE(event) {
    const game = this.games[this.roomId];
    game.updateStatus(event.status);
    this.emit("broadcastResponse", "GAME_STATUS_UPDATE", game);
  }

  DRAWING(event) {
    const game = this.games[this.roomId];
    game.strokes = { ...event };
    this.emit("broadcastResponse", "DRAWING", game);
  }
}

module.exports = GameEvents;
