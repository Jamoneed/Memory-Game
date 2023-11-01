const gameContainer = document.getElementById("game");
let card1 = null;
let card2 = null;
let cardsFlipped = 0;
let pause = false;

const colors = [
  "#f95959",
  "#56a4ff",
  "#99d8bd",
  "#ffa96e",
  "#bbc2ff",
  "#ffe5a4",
  "#ff85e5",
  "#f95959",
  "#56a4ff",
  "#99d8bd",
  "#ffa96e",
  "#bbc2ff",
  "#ffe5a4",
  "#ff85e5"
];

function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(colors);


function createDivsForColors(colors) {
  for (let color of colors) {
    const newDiv = document.createElement("div");
    newDiv.classList.add(color);
    newDiv.addEventListener("click", handleCardClick);
    newDiv.style.backgroundColor = "#adb7b9"
    gameContainer.append(newDiv);
  }

}

function handleCardClick(e) {
  if (pause) return;
  if (e.target.classList.contains("flipped")) return;

  let currentCard = e.target;
  currentCard.style.backgroundColor = currentCard.classList[0];

  if (!card1 || !card2) {
    currentCard.classList.add("flipped");
    card1 = card1 || currentCard;
    card2 = currentCard === card1 ? null : currentCard;
  }

  if (card1 && card2) {
    pause = true;
    // debugger
    let cardcolor1 = card1.className;
    let cardcolor2 = card2.className;

    if (cardcolor1 === cardcolor2) {
      cardsFlipped += 2;
      card1.removeEventListener("click", handleCardClick);
      card2.removeEventListener("click", handleCardClick);
      card1 = null;
      card2 = null;
      pause = false;
    } else {
      setTimeout(function() {
        card1.style.backgroundColor = "#adb7b9";
        card2.style.backgroundColor = "#adb7b9";
        card1.classList.remove("flipped");
        card2.classList.remove("flipped");
        card1 = null;
        card2 = null;
        pause = false;
      }, 1000);
    }
  }

  if (cardsFlipped === colors.length){
    setTimeout(function(){
      alert("CONGRATULATIONS YOU WON!");
    },500)
  } 
}

createDivsForColors(shuffledColors);
