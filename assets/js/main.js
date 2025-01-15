let dice = document.querySelector('.dice-img');

let players = ['red', 'blue', 'yellow', 'green'];

let red_route = ['rs2', 'rs3', 'rs4', 'rs5', 'rs6', 'be6', 'be5', 'be4', 'be3', 'be2', 'be1', 'bc1', 'bs1', 'bs2', 'bs3', 'bs4', 'bs5', 'bs6', 'bs4', 'ye6', 'ye5', 'ye4', 'ye3', 'ye2', 'ye1', 'yc1', 'ys1', 'ys2', 'ys3', 'ys4', 'ys5', 'ys6', 'ge6', 'ge5', 'ge4', 'ge3', 'ge2', 'ge1', 'gc1', 'gs1', 'gs2', 'gs3', 'gs4', 'gs5', 'gs6', 're6', 're5', 're4', 're3', 're2', 're1', 'rc1', 'rc2', 'rc3', 'rc4', 'rc5', 'rc6'];
let blue_route = ['bs2', 'bs3', 'bs4', 'bs5', 'bs6', 'bs4', 'ye6', 'ye5', 'ye4', 'ye3', 'ye2', 'ye1', 'yc1', 'ys1', 'ys2', 'ys3', 'ys4', 'ys5', 'ys6', 'ge6', 'ge5', 'ge4', 'ge3', 'ge2', 'ge1', 'gc1', 'gs1', 'gs2', 'gs3', 'gs4', 'gs5', 'gs6', 're6', 're5', 're4', 're3', 're2', 're1', 'rc1', 'rs1', 'rs2', 'rs3', 'rs4', 'rs5', 'rs6', 'be6', 'be5', 'be4', 'be3', 'be2', 'be1', 'bc1', 'bc2', 'bc3', 'bc4', 'bc5', 'bc6'];
let yellow_route = ['ys2', 'ys3', 'ys4', 'ys5', 'ys6', 'ge6', 'ge5', 'ge4', 'ge3', 'ge2', 'ge1', 'gc1', 'gs1', 'gs2', 'gs3', 'gs4', 'gs5', 'gs6', 're6', 're5', 're4', 're3', 're2', 're1', 'rc1', 'rs1', 'rs2', 'rs3', 'rs4', 'rs5', 'rs6', 'be6', 'be5', 'be4', 'be3', 'be2', 'be1', 'bc1', 'bs1', 'bs2', 'bs3', 'bs4', 'bs5', 'bs6', 'bs4', 'ye6', 'ye5', 'ye4', 'ye3', 'ye2', 'ye1', 'yc1', 'yc2', 'yc3', 'yc4', 'yc5', 'yc6'];
let green_route = ['gs2', 'gs3', 'gs4', 'gs5', 'gs6', 're6', 're5', 're4', 're3', 're2', 're1', 'rc1', 'rs1', 'rs2', 'rs3', 'rs4', 'rs5', 'rs6', 'be6', 'be5', 'be4', 'be3', 'be2', 'be1', 'bc1', 'bs1', 'bs2', 'bs3', 'bs4', 'bs5', 'bs6', 'bs4', 'ye6', 'ye5', 'ye4', 'ye3', 'ye2', 'ye1', 'yc1', 'ys1', 'ys2', 'ys3', 'ys4', 'ys5', 'ys6', 'ge6', 'ge5', 'ge4', 'ge3', 'ge2', 'ge1', 'gc1', 'gc2', 'gc3', 'gc4', 'gc5', 'gc6'];

let red_open = [];
let blue_open = [];
let yellow_open = [];
let green_open = [];

let red_close = ['goat-red-1', 'goat-red-2', 'goat-red-3', 'goat-red-4'];
let blue_close = ['goat-blue-1', 'goat-blue-2', 'goat-blue-3', 'goat-blue-4'];
let yellow_close = ['goat-yellow-1', 'goat-yellow-2', 'goat-yellow-3', 'goat-yellow-4'];
let green_close = ['goat-green-1', 'goat-green-2', 'goat-green-3', 'goat-green-4'];

let playerData = {
  red: {
    close: red_close,
    open: red_open,
    route: red_route
  },
  blue: {
    close: blue_close,
    open: blue_open,
    route: blue_route
  },
  yellow: {
    close: yellow_close,
    open: yellow_open,
    route: yellow_route
  },
  green: {
    close: green_close,
    open: green_open,
    route: green_route
  }
};

let gameStart, diceEnabled = 0;
let current_player = players[0];
let diceNumber, player;

function resetGame(){
  window.location.reload();
}

function startGame(){
  gameStart = 1;
  diceEnabled = 1;
  currentPlayer();
}

function currentPlayer(){
  player = playerData[current_player];
  let homeContainers = document.querySelectorAll('.home-container');
  homeContainers.forEach(function(v, i){
    v.classList.remove('home-active');
  });
  document.querySelector(`#home-${current_player}`).classList.add('home-active');
}

function nextPlayer(){
  diceEnabled = 1;
  let currentPlayerIndex = players.indexOf(current_player);
  current_player = (currentPlayerIndex === players.length - 1) ? players[0] : players[currentPlayerIndex + 1];
  currentPlayer();
}

function goatOpen(){
  let shiftedElement = player.close.shift();
  player.open.unshift(shiftedElement);
  let goat = document.querySelector(`.${shiftedElement}`);
  document.querySelector(`#${player.route[0]}`).innerHTML += `<button class="goat-btn goat-${current_player} ${shiftedElement}" onclick="moveGoat(this)"></button>`;
  goat.remove();
}

function diceRoll() {
  if (gameStart) {
    if(diceEnabled){
      diceEnabled = 0;
      dice.classList.remove('rolling');
      diceNumber = Math.floor(Math.random() * 6) + 1;
      dice.classList.add('rolling');
      dice.src = 'assets/images/dice/' + diceNumber + '.png';
      setTimeout(() => {
        dice.classList.remove('rolling');
      }, 500);

      let goatBtns = document.querySelectorAll('.goat-btn');
      goatBtns.forEach(function(v, i){
        v.classList.remove('active');
      });

      player.open.forEach(function(v, i){
        document.querySelector(`.${v}`).classList.add('active');
      });

      if (diceNumber == 6){
        if(player.open.length == 0){
          goatOpen();
        }else{
          player.close.forEach(function(v, i){
            document.querySelector(`.${v}`).classList.add('active');
          });
        }
        diceEnabled = 1;
      }

      if(player.open.length == 0){
        nextPlayer();
      }
    }else{
      alert('Please move your goats.');
    }
  }else{
    alert('Please Start the Game.');
  }
}

function moveGoat(e){
  if(e.classList.value.includes(current_player)){
    let current_position = e.closest('td').id;
    player.open.forEach(function(v, i){
      document.querySelector(`.${v}`).classList.remove('active');
    });

    player.close.forEach(function(v, i){
      document.querySelector(`.${v}`).classList.remove('active');
    });

    if(diceNumber != 6){
      nextPlayer();
    }
  }
}