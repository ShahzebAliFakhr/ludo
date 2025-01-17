let dice = document.querySelector('.dice-img');
let players = ['red', 'blue', 'yellow', 'green'];
let currentPlayer = players[0];
let diceNumber, player;
let gameStarted = false;
let diceEnabled = false;

const playerData = {
  players: {
    red: {
      close: ['goat-red-1', 'goat-red-2', 'goat-red-3', 'goat-red-4'],
      open: [],
      win: [],
      route: ['rs2', 'rs3', 'rs4', 'rs5', 'rs6', 'be6', 'be5', 'be4', 'be3', 'be2', 'be1', 'bc1', 'bs1', 'bs2', 'bs3', 'bs4', 'bs5', 'bs6', 'bs4', 'ye6', 'ye5', 'ye4', 'ye3', 'ye2', 'ye1', 'yc1', 'ys1', 'ys2', 'ys3', 'ys4', 'ys5', 'ys6', 'ge6', 'ge5', 'ge4', 'ge3', 'ge2', 'ge1', 'gc1', 'gs1', 'gs2', 'gs3', 'gs4', 'gs5', 'gs6', 're6', 're5', 're4', 're3', 're2', 're1', 'rc1', 'rc2', 'rc3', 'rc4', 'rc5', 'rc6']
    },
    blue: {
      close: ['goat-blue-1', 'goat-blue-2', 'goat-blue-3', 'goat-blue-4'],
      open: [],
      win: [],
      route: ['bs2', 'bs3', 'bs4', 'bs5', 'bs6', 'bs4', 'ye6', 'ye5', 'ye4', 'ye3', 'ye2', 'ye1', 'yc1', 'ys1', 'ys2', 'ys3', 'ys4', 'ys5', 'ys6', 'ge6', 'ge5', 'ge4', 'ge3', 'ge2', 'ge1', 'gc1', 'gs1', 'gs2', 'gs3', 'gs4', 'gs5', 'gs6', 're6', 're5', 're4', 're3', 're2', 're1', 'rc1', 'rs1', 'rs2', 'rs3', 'rs4', 'rs5', 'rs6', 'be6', 'be5', 'be4', 'be3', 'be2', 'be1', 'bc1', 'bc2', 'bc3', 'bc4', 'bc5', 'bc6']
    },
    yellow: {
      close: ['goat-yellow-1', 'goat-yellow-2', 'goat-yellow-3', 'goat-yellow-4'],
      open: [],
      win: [],
      route: ['ys2', 'ys3', 'ys4', 'ys5', 'ys6', 'ge6', 'ge5', 'ge4', 'ge3', 'ge2', 'ge1', 'gc1', 'gs1', 'gs2', 'gs3', 'gs4', 'gs5', 'gs6', 're6', 're5', 're4', 're3', 're2', 're1', 'rc1', 'rs1', 'rs2', 'rs3', 'rs4', 'rs5', 'rs6', 'be6', 'be5', 'be4', 'be3', 'be2', 'be1', 'bc1', 'bs1', 'bs2', 'bs3', 'bs4', 'bs5', 'bs6', 'bs4', 'ye6', 'ye5', 'ye4', 'ye3', 'ye2', 'ye1', 'yc1', 'yc2', 'yc3', 'yc4', 'yc5', 'yc6']
    },
    green: {
      close: ['goat-green-1', 'goat-green-2', 'goat-green-3', 'goat-green-4'],
      open: [],
      win: [],
      route: ['gs2', 'gs3', 'gs4', 'gs5', 'gs6', 're6', 're5', 're4', 're3', 're2', 're1', 'rc1', 'rs1', 'rs2', 'rs3', 'rs4', 'rs5', 'rs6', 'be6', 'be5', 'be4', 'be3', 'be2', 'be1', 'bc1', 'bs1', 'bs2', 'bs3', 'bs4', 'bs5', 'bs6', 'bs4', 'ye6', 'ye5', 'ye4', 'ye3', 'ye2', 'ye1', 'yc1', 'ys1', 'ys2', 'ys3', 'ys4', 'ys5', 'ys6', 'ge6', 'ge5', 'ge4', 'ge3', 'ge2', 'ge1', 'gc1', 'gc2', 'gc3', 'gc4', 'gc5', 'gc6']
    }
  },
  currentPlayer() {
    player = this.players[currentPlayer];
    let homeContainers = document.querySelectorAll('.home-container');
    homeContainers.forEach((v) => v.classList.remove('home-active'));
    document.querySelector(`#home-${currentPlayer}`).classList.add('home-active');
  },
  nextPlayer() {
    diceEnabled = true;
    currentPlayer = players[(players.indexOf(currentPlayer) + 1) % players.length];
    this.currentPlayer();
  },
  highlightGoats(goats) {
    goats.forEach((v) => document.querySelector(`#${v}`).classList.add('active'));
  },
  removeHighlightGoats(goats) {
    goats.forEach((v) => document.querySelector(`#${v}`).classList.remove('active'));
  },
  removeHighlightAllGoats() {
    let goats = document.querySelectorAll('.goat-btn');
    goats.forEach((e) => e.classList.remove('active'));
  },
};

function resetGame() {
  window.location.reload();
}

function startGame() {
  gameStarted = true;
  diceEnabled = true;
  playerData.currentPlayer();
}

function diceRoll() {
  if (gameStarted) {
    if (diceEnabled) {
      diceEnabled = false;
      dice.classList.remove('rolling');
      diceNumber = Math.floor(Math.random() * 6) + 1;
      dice.classList.add('rolling');
      dice.src = 'assets/images/dice/' + diceNumber + '.png';
      setTimeout(() => {
        dice.classList.remove('rolling');
      }, 500);

      playerData.removeHighlightAllGoats();

      if (diceNumber === 6) {
        if (player.open.length || player.close.length) {
          playerData.highlightGoats(player.close.concat(player.open));
        } else {
          diceEnabled = true;
        }
      } else {
        if (player.open.length) {
          playerData.highlightGoats(player.open);
        } else {
          playerData.nextPlayer();
        }
      }
    } else {
      alert('Please move your goats.');
    }
  } else {
    alert('Please Start the Game.');
  }
}

function goatAction(e, action) {
  if (e.classList.value.includes(currentPlayer) && e.classList.value.includes('active')) {
    let goatID = e.id;
    let current_position = e.closest('td').id;
    let current_index = playerData.players[currentPlayer].route.indexOf(current_position);
    let new_position = playerData.players[currentPlayer].route[current_index + diceNumber];

    if (action === 'open') {
      let arrayIndex = playerData.players[currentPlayer].close.indexOf(goatID);
      playerData.players[currentPlayer].close.splice(arrayIndex, 1);
      playerData.players[currentPlayer].open.unshift(goatID);
      document.querySelector(`#${goatID}`).remove();
      document.querySelector(`#${playerData.players[currentPlayer].route[0]}`).innerHTML += `<button class="goat-btn goat-${currentPlayer}" id="${goatID}" onclick="goatAction(this, 'move')"></button>`;
    } else if (action === 'move') {

      if(new_position){
        document.querySelector(`#${goatID}`).remove();
        document.querySelector(`#${new_position}`).innerHTML += `<button class="goat-btn goat-${currentPlayer}" id="${goatID}" onclick="goatAction(this, 'move')"></button>`;
      }else{
        alert('You can\nt play this goat.');
      }
      
    }

    playerData.removeHighlightGoats(playerData.players[currentPlayer].close);
    playerData.removeHighlightGoats(playerData.players[currentPlayer].open);

    if (diceNumber !== 6) {
      playerData.nextPlayer();
    } else {
      diceEnabled = true;
    }
  }
}