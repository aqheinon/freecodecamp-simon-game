var game = {
  count: 0,
  buttons: ['#red', '#green', '#blue', '#yellow'],
  currentGame: [],
  player: [],
  sound: {
    red: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3'),
    green: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3'),
    blue: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3'),
    yellow: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3')
  },
  strict: false,
}

function resetGame() {
  game.currentGame = [];
  game.count = 0;
  $('#display').html('--');
  setTimeout(function() {
    addCount();
  }, 200);
}

function showMoves() {
  var i = 0;
  var moves = setInterval(function() {
    playGame(game.currentGame[i]);
    i++;
    if (i >= game.currentGame.length) {
      clearInterval(moves);
    }
  }, 700)
  game.player = [];
}

function strict() {
  if (game.strict == false) {
    game.strict = true;
    $('#strict').find('i').toggleClass('fa-toggle-off fa-toggle-on');
  } else {
    game.strict = false;
    $('#strict').find('i').toggleClass('fa-toggle-on fa-toggle-off');
  }
  showMoves();
}

function generateMove() {
  game.currentGame.push(game.buttons[(Math.floor(Math.random() * 4))]);
  showMoves();
}

function addCount() {
  game.count++;
  $('#display').hide().html(game.count).fadeIn("slow");
  generateMove();
}

function sound(name) {
  switch (name) {
    case '#red':
      game.sound.red.play();
      break;
    case '#green':
      game.sound.green.play();
      break;
    case '#blue':
      game.sound.blue.play();
      break;
    case '#yellow':
      game.sound.yellow.play();
      break;
  };
}

function addToPlayer(id) {
  var button = "#" + id
  game.player.push(button);
  playerTurn(button);
}

function playerTurn(x) {
  if (game.player[game.player.length - 1] !== game.currentGame[game.player.length - 1]) {
    if (game.strict) {
      $('#display').hide().html('Game over!').fadeIn("slow");
      setTimeout(function() {
        resetGame();
      }, 1000);
    } else {
      $('#display').hide().html('Try again!').fadeIn("slow");
      setTimeout(function() {
        $('#display').hide().html(game.count).fadeIn("slow");
        showMoves();
      }, 1000);
    }
  } else {
    sound(x);
    if (game.player.length === game.currentGame.length) {
      if (game.count == 20) {
        $('#display').hide().html('You won!').fadeIn("slow");
        setTimeout(function() {
          resetGame();
        }, 1000);
      } else {
        addCount();
      }
    }
  }
}

function playGame(button) {
  $(button).addClass('activate');
  sound(button);
  setTimeout(function() {
    $(button).removeClass('activate');
  }, 300);
}