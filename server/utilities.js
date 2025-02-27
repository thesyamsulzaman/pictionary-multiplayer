const getRandomPet = () => {
  const Pets = [
    "Dog",
    "Cat",
    "Fish",
    "Bird",
    "Rabbit",
    "Hamster",
    "Guinea pig",
    "Lizard",
    "Snake",
    "Turtle",
    "Horse",
    "Ferret"
  ];

  const randomIndex = Math.floor(Math.random() * Pets.length);
  return Pets[randomIndex];
};

const getOtherGuestOptions = (guess) => {
  return [guess, getRandomPet(), getRandomPet()]
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

const getRandomColor = () => {
  let color = "#";
  const letters = "0123456789ABCDEF";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}


const getClientId = () => {
  function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }

  return (S4() + S4() + "-" + S4() + "-4" + S4().substr(0, 3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase()
}

module.exports = { getRandomPet, getRandomColor, getClientId, getOtherGuestOptions }