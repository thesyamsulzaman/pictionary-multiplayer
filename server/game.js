const { getRandomPet } = require("./utilities");

class Game {
  constructor(roomId) {
    const guess = getRandomPet();

    this.roomId = roomId;
    this.status = "GAME_LOBBY"; // GAME_LOBBY, GAME_PLAY, GAME_END
    this.guess = guess;
    this.guessOptions = [guess, getRandomPet(), getRandomPet()]
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);

    this.strokes = {};
    this.player = {
      drawer: null,
      guessers: [],
    };
    this.clients = [];
  }

  addClient(client) {
    this.clients.push(client);
  }

  setPlayerRoles() {
    const drawer =
      this.clients[Math.floor(Math.random() * this.clients.length)];
    const guessers = this.clients.filter(
      (client) => client.clientId !== drawer.clientId
    );

    this.player.drawer = drawer;
    this.player.guessers = guessers;
  }

  updateStatus(status) {
    this.status = status;
  }
}

module.exports = Game;
