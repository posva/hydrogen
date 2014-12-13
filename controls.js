$('body').on('keydown',function(e){
  if(e.keyCode == 32){ // Space
  }

  if (!Game.isGameOver) {
    if (e.keyCode == 37) { // LEFT
    }

    if (e.keyCode == 38) { // UP
      P.goUp();
    }

    if (e.keyCode == 39) { // RIGHT
    }

    if (e.keyCode == 40) { // DOWN
      P.goDown();
    }
  }

  if (e.keyCode == 68) { // D
    DEBUG = !DEBUG;
  }


}).on('click',function(){
  createObstacle();
  //	createCoin();
});
