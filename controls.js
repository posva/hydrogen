$('body').on('keydown',function(e){
  if(e.keyCode == 32){ // Space
    BOT = !BOT;
  }

  if (!Game.isGameOver && Game.isPlayable) {
    if (e.keyCode == 37) { // LEFT
    }

    if (e.keyCode == 38) { // UP
      P.goUp();
    }

    if (e.keyCode == 40) { // DOWN
      P.goDown();
    }
  }
  
  
  
  else {
    if (e.keyCode == 38) { // UP
     Game.newGame();
         }

    if (e.keyCode == 40) { // DOWN
      Game.newGame();
    }

    if (e.keyCode == 39) { // RIGHT
      Game.newGame();
    }
  }
    

  if (e.keyCode == 68) { // D
    DEBUG = !DEBUG;
  }

  if (e.keyCode == 69) { // E
    nextElementForDemo();
  }


}).on('click',function(){
 // createObstacle();
  //	createCoin();
  
  if (Game.isGameOver) {
    Game.newGame();
  }
});
