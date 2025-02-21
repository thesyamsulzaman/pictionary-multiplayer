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

const getRandomColor = () => {
  let color = "#";
  const letters = "0123456789ABCDEF";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}


module.exports = { getRandomPet, getRandomColor }