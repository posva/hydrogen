$('body').on('keydown',function(e){
  if(e.keyCode == 32){ // Space
    BOT = !BOT;
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

  if (e.keyCode == 69) { // D
    currentElement++;
    
    if (currentElement == 4) currentElement = 1;
    
    if (currentElement == 1) $('html, body').css('background-image','url(img/pattern_azote.png)');
    if (currentElement == 2) $('html, body').css('background-image','url(img/pattern_cuivre.png)');
    if (currentElement == 3) $('html, body').css('background-image','url(img/pattern_mercure.png)');
    
    decorBackground 		= new ImgLoop(canvasB, img[currentElement].decorBackground, 0, -10, -1, 0);
    decorBackgroundFront 	= new ImgLoop(canvasB, img[currentElement].decorBackgroundFront, 0, 205, -10, 0);
    nuage 					= new ImgLoop(canvasM, img[currentElement].nuage, 0, -10, -7, 0);
    front 					= new ImgLoop(canvasF, img[currentElement].front, 0, 335, -10, 0);

  }


}).on('click',function(){
  createObstacle();
  //	createCoin();
});
