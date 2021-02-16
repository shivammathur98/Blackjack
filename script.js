// Challenge 1 : Days calculate
const el = document.getElementById('input');
el.addEventListener('keypress', resu);
function resu(evt) {
  if (evt.keyCode == 13) {
    res(el.value);
  }
}
function res() {
  document.getElementById('result').style.display = 'block';
  var year = document.getElementById('input').value;
  var d = new Date();
  var n = d.getFullYear();
  var age = n - year;
  var result = age * 365;
  document.getElementById(
    'result'
  ).innerHTML = `You are ${age} years / ${result} days old`;
}
function reset() {
  document.getElementById('result').style.display = 'none';
  document.getElementById('input').value = '';
}
// Challenge 2 : Cat Generator
function gen() {
  document.getElementById('flex-cat-gen').style.display = 'flex';
  var image = document.createElement('img');
  var div = document.getElementById('flex-cat-gen');
  image.src = 'images/cat.jpg';
  div.appendChild(image);
}
// Challenge 3 : rps
function rpsGame(yourChoice) {
  var humanChoice, botChoice;
  humanChoice = yourChoice.id;

  botChoice = numberToChoice(randInt());
  console.log(`Computer Choice: ${botChoice}`);

  resultss = decideWinner(humanChoice, botChoice);
  console.log(resultss);

  message = finalMessage(resultss);
  console.log(message);
  rpsfrontend(yourChoice.id, botChoice, message);
}
function randInt() {
  return Math.floor(Math.random() * 3);
}
function numberToChoice(number) {
  return ['rock', 'paper', 'scissors'][number];
}
function decideWinner(yourChoice, computerChoice) {
  var rpsDatabase = {
    rock: {
      scissors: 1,
      rock: 0.5,
      paper: 0,
    },
    paper: {
      rock: 1,
      paper: 0.5,
      scissors: 0,
    },
    scissors: {
      rock: 0,
      paper: 1,
      scissors: 0.5,
    },
  };
  var yourScore = rpsDatabase[yourChoice][computerChoice];
  var computerScore = rpsDatabase[computerChoice][yourChoice];

  return [yourScore, computerScore];
}
function finalMessage([yourScore, computerScore]) {
  if (yourScore === 0) {
    return { message: 'You lose!', color: 'red' };
  } else if (yourScore === 0.5) {
    return { message: "It's a tie !!", color: 'yellow' };
  } else {
    return { message: 'You Won :)', color: 'green' };
  }
}
function rpsfrontend(humanImageChoice, botImageChoice, finalMessage) {
  var imagesDatabase = {
    rock: document.getElementById('rock').src,
    paper: document.getElementById('paper').src,
    scissors: document.getElementById('scissors').src,
  };
  // remove images
  document.getElementById('rock').remove();
  document.getElementById('paper').remove();
  document.getElementById('scissors').remove();
  // create div
  var humanDiv = document.createElement('div');
  var messageDiv = document.createElement('div');
  var botDiv = document.createElement('div');
  // make human, bot choice & message visible
  humanDiv.innerHTML =
    "<img src = '" +
    imagesDatabase[humanImageChoice] +
    "' height = 100 width = 100 style ='box-shadow: 0px 10px 50px rgba(37, 50, 233, 1);'>";
  messageDiv.innerHTML =
    "<h1 style='color:" +
    finalMessage['color'] +
    "; font-size: 40px; padding:20px'>" +
    finalMessage['message'] +
    '</h1>';
  botDiv.innerHTML =
    "<img src = '" +
    imagesDatabase[botImageChoice] +
    "' height = 100 width = 100 style ='box-shadow: 0px 10px 50px rgba(243, 38, 24, 1);'>";
  // display final outcome
  document.getElementById('rps-div').appendChild(humanDiv);
  document.getElementById('rps-div').appendChild(messageDiv);
  document.getElementById('rps-div').appendChild(botDiv);
}
// Challenge 4: btn color change
var all_buttons = document.getElementsByTagName('button');
var copyAllButtons = [];
for (let i = 0; i < all_buttons.length; i++) {
  copyAllButtons.push(all_buttons[i].classList[1]);
}
function buttonColorChange(buttonthing) {
  if (buttonthing.value === 'red') {
    buttonRed();
  } else if (buttonthing.value === 'blue') {
    buttonBlue();
  } else if (buttonthing.value === 'green') {
    buttonGreen();
  } else if (buttonthing.value === 'reset') {
    buttonReset();
  } else if (buttonthing.value === 'random') {
    buttonRandom();
  }
}
function buttonRed() {
  for (let i = 0; i < all_buttons.length; i++) {
    all_buttons[i].classList.remove(all_buttons[i].classList[1]);
    all_buttons[i].classList.add('btn-danger');
  }
}
function buttonBlue() {
  for (let i = 0; i < all_buttons.length; i++) {
    all_buttons[i].classList.remove(all_buttons[i].classList[1]);
    all_buttons[i].classList.add('btn-primary');
  }
}
function buttonGreen() {
  for (let i = 0; i < all_buttons.length; i++) {
    all_buttons[i].classList.remove(all_buttons[i].classList[1]);
    all_buttons[i].classList.add('btn-success');
  }
}
function buttonReset() {
  for (let i = 0; i < all_buttons.length; i++) {
    all_buttons[i].classList.remove(all_buttons[i].classList[1]);
    all_buttons[i].classList.add(copyAllButtons[i]);
  }
}
function buttonRandom() {
  var choices = [
    'btn-primary',
    'btn-secondary',
    'btn-warning',
    'btn-success',
    'btn-danger',
  ];
  for (let i = 0; i < all_buttons.length; i++) {
    let randomNumber = Math.floor(Math.random() * 5);
    all_buttons[i].classList.remove(all_buttons[i].classList[1]);
    all_buttons[i].classList.add(choices[randomNumber]);
  }
}
// Challenge 5: Blackjack
let blackjackGame = {
  you: { scoreSpan: '#your-blackjack-result', div: '#your-box1', score: 0 },
  dealer: {
    scoreSpan: '#dealer-blackjack-result',
    div: '#dealer-box1',
    score: 0,
  },
  cards: ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'K', 'Q', 'J', 'A'],
  cardsMap: {
    '2': 2,
    '3': 3,
    '4': 4,
    '5': 5,
    '6': 6,
    '7': 7,
    '8': 8,
    '9': 9,
    '10': 10,
    K: 10,
    J: 10,
    Q: 10,
    A: [1, 11],
  },
  wins: 0,
  losses: 0,
  draws: 0,
  isStand: false,
  turnsOver: false,
};

const YOU = blackjackGame['you'];
const DEALER = blackjackGame['dealer'];

const hitSound = new Audio('sounds/swish.m4a');
const winSound = new Audio('sounds/cash.mp3');
const lossSound = new Audio('sounds/aww.mp3');

document
  .querySelector('#blackjack-hit-button')
  .addEventListener('click', blackjackHit);
document
  .querySelector('#blackjack-stand-button')
  .addEventListener('click', dealerLogic);
document
  .querySelector('#blackjack-deal-button')
  .addEventListener('click', blackjackDeal);

function blackjackHit() {
  if (blackjackGame['isStand'] === false) {
    let card = randomCard();
    showCard(card, YOU);
    updateScore(card, YOU);
    showScore(YOU);
  }
}
function randomCard() {
  let randomIndex = Math.floor(Math.random() * 13);
  return blackjackGame['cards'][randomIndex];
}
function showCard(card, activePLayer) {
  if (activePLayer['score'] <= 21) {
    let cardImage = document.createElement('div');
    cardImage.innerHTML = `"<img src = 'images/${card}.jpg' height = 140 width = 90 style = 'border-radius : 17px ; padding:10px'>"`;
    document.querySelector(activePLayer['div']).appendChild(cardImage);
    hitSound.play();
  }
}
function blackjackDeal() {
  if (blackjackGame['turnsOver'] === true) {
    blackjackGame['isStand'] = false;
    let yourImages = document
      .querySelector('#your-box1')
      .querySelectorAll('div');
    let dealerImages = document
      .querySelector('#dealer-box1')
      .querySelectorAll('div');
    for (let i = 0; i < yourImages.length; i++) {
      yourImages[i].remove();
    }
    for (let i = 0; i < dealerImages.length; i++) {
      dealerImages[i].remove();
    }
    YOU['score'] = 0;
    DEALER['score'] = 0;
    document.querySelector('#your-blackjack-result').textContent = 0;
    document.querySelector('#your-blackjack-result').style = 'white';

    document.querySelector('#dealer-blackjack-result').textContent = 0;
    document.querySelector('#dealer-blackjack-result').style = 'white';

    document.querySelector('#blackjack-result').textContent =
      "Let's play again";
    document.querySelector('#blackjack-result').style = 'black';
    blackjackGame['turnsOver'] = true;
  }
}
function updateScore(card, activePLayer) {
  if (card === 'A') {
    // If adding 11 keeps total below 21, add 11, othervise add 1
    if (activePLayer['score'] + blackjackGame['cardsMap'][card][1] <= 21) {
      activePLayer['score'] += blackjackGame['cardsMap'][card][1];
    } else {
      activePLayer['score'] += blackjackGame['cardsMap'][card][0];
    }
  } else {
    activePLayer['score'] += blackjackGame['cardsMap'][card];
  }
}
function showScore(activePLayer) {
  if (activePLayer['score'] > 21) {
    document.querySelector(activePLayer['scoreSpan']).textContent = 'BUST';
    document.querySelector(activePLayer['scoreSpan']).style.color = 'red';
  } else {
    document.querySelector(activePLayer['scoreSpan']).textContent =
      activePLayer['score'];
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
async function dealerLogic() {
  blackjackGame['isStand'] = true;

  while (DEALER['score'] < 16 && blackjackGame['isStand'] === true) {
    let card = randomCard();
    showCard(card, DEALER);
    updateScore(card, DEALER);
    showScore(DEALER);
    await sleep(1000);
  }
  blackjackGame['turnsOver'] = true;
  let winner = computeWinner();
  showResult(winner);
}
// compute winner and return who won
// update the wins, losses and draws
function computeWinner() {
  let winner;

  if (YOU['score'] <= 21) {
    // condition: higher score than dealer or when dealer busts but you're under or equal to 21
    if (YOU['score'] > DEALER['score'] || DEALER['score'] > 21) {
      blackjackGame['wins']++;
      winner = YOU;
    } else if (YOU['score'] < DEALER['score']) {
      blackjackGame['losses']++;
      winner = DEALER;
    } else if (YOU['score'] === DEALER['score']) {
      blackjackGame['draws']++;
    }
    // condition: when user busts but dealer does not.
  } else if (YOU['score'] > 21 && DEALER['score'] <= 21) {
    blackjackGame['losses']++;
    winner = DEALER;

    // condition : when you both bust
  } else if (YOU['score'] > 21 && DEALER['score'] > 21) {
    blackjackGame['draws']++;
  }
  return winner;
}

function showResult(winner) {
  let message, messageColor;

  if (blackjackGame['turnsOver'] === true) {
    if (winner === YOU) {
      document.querySelector('#wins').textContent = blackjackGame['wins'];
      message = 'You won!';
      messageColor = 'green';
      winSound.play();
    } else if (winner === DEALER) {
      document.querySelector('#losses').textContent = blackjackGame['losses'];
      message = 'You lost';
      messageColor = 'red';
      lossSound.play();
    } else {
      document.querySelector('#draws').textContent = blackjackGame['draws'];
      message = 'It is a draw';
      messageColor = 'black';
    }
    document.querySelector('#blackjack-result').textContent = message;
    document.querySelector('#blackjack-result').style.color = messageColor;
  }
}
