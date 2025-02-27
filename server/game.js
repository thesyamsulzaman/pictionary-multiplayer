const { getRandomPet, getOtherGuestOptions } = require("./utilities");

class Game {
  constructor(roomId) {
    const guess = getRandomPet();

    this.roomId = roomId;
    this.status = "GAME_LOBBY"; // GAME_LOBBY, GAME_PLAY, GAME_END
    this.guess = guess;
    this.guessOptions = getOtherGuestOptions(guess)
    this.strokes = {};
    this.player = {
      drawer: null,
      guessers: [],
    };
    this.clients = [];
  }
}

module.exports = Game;