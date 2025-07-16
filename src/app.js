import "bootstrap";
import "./style.css";


import "./assets/img/rigo-baby.jpg";
import "./assets/img/4geeks.ico";

window.onload = function () {
  //write your code here

  const suits = ["♥", "♦", "♠", "♣"];
  const values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];

  let cards = [];

  function getRandomValues() {
    const randomSuit = suits[Math.floor(Math.random() * suits.length)];
    const randomValue = values[Math.floor(Math.random() * values.length)];

    return { value: randomValue, suit: randomSuit };
  }


  //creamos la estructura que deberia estar en el html, o que teniamos en el otro projecto
  function createStructure(card) {

    const cardDiv = document.createElement("div");
    cardDiv.className = "card";

    const colorSuit = (card.suit === "♥" || card.suit === "♦") ? "red" : "black";

    const topLeft = document.createElement("div");
    topLeft.className = "card-top-left " + colorSuit;
    topLeft.textContent = card.suit;

    const middleValue = document.createElement("div");
    middleValue.className = "card-center-value " + colorSuit;
    middleValue.textContent = card.value;

    const bottomRight = document.createElement("div");
    bottomRight.className = "card-bottom-right " + colorSuit;
    bottomRight.textContent = card.suit;

    cardDiv.appendChild(topLeft);
    cardDiv.appendChild(middleValue);
    cardDiv.appendChild(bottomRight);

    return cardDiv;


  }


  //Generate card
  document.getElementById("drawBtn").addEventListener("click", () => {

    console.log("Draw button was clicked")
    const numCards = parseInt(document.getElementById("numberOfCards").value)
    const container = document.getElementById("containerRandomCards");

    console.log("user wants to draw", numCards, "cards");
    //removes old values
    container.innerHTML = "";

    cards = [];

    for (let i = 0; i < numCards; i++) {
      const card = getRandomValues();
      const cardStructure = createStructure(card);

      //add a new card with the structure of the divs inside the container
      container.appendChild(cardStructure);
      console.log("cards inside for", card)

      cards.push(card);
      console.log("cards inside for", cards)
    }
    console.log("cards outside for", cards)


  })

  function getCardValue(val) {
    if (val === "A") return 1;
    if (val === "J") return 11;
    if (val === "Q") return 12;
    if (val === "K") return 13;
    return parseInt(val);
  }

  //Sort execution
  document.getElementById("sortBtn").addEventListener("click", () => {

    for (let i = 0; i < cards.length - 1; i++) {
      for (let j = 0; j < cards.length - 1 - i; j++) {
        if (getCardValue(cards[j].value) > getCardValue(cards[j + 1].value)) {
          // Swap cards if out of order
          [cards[j], cards[j + 1]] = [cards[j + 1], cards[j]];

          log([...cards]);
        }
      }
    }


    const container = document.getElementById("containerRandomCards");
    container.innerHTML = "";

    cards.forEach(card => {
      const cardHTML = createStructure(card);
      container.appendChild(cardHTML)

    })


  })


  function log(cards) {

    const logContainer = document.getElementById("containerLogCards");
    const logDiv = document.createElement("div");

    logDiv.className = "log";

    cards.forEach(card => {
      const cardHTML = createStructure(card);
      logDiv.appendChild(cardHTML)
    });

    logContainer.appendChild(logDiv);

  }
};