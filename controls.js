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



Leap.loop(function(frame) {
	/*
	if (Game.isSendingScore && (frame.hands.length == 0 || frame.hands.length > 1)) {
		$('#prompt2 div').removeClass('active');
	}
	
	if (Game.isPlayable && (frame.hands.length == 0)) {
		P2.signalLost();
	}
	*/
	frame.hands.forEach(function(hand, index) {
  
  //	console.log(hand.palmPosition[0]+' '+hand.palmPosition[1]+' '+hand.palmPosition[2]);
  	//	console.log(hand.screenPosition());
  		
        /*
        if (position > 350) {
          console.log('down');
        }
        if (position <= 350 && position > 100) {
          console.log('middle');
        }
        if (position <= 100) {
          console.log('up');
        }
        
     //   console.log(position[2]);
  		
  		*/
    if (!Game.isGameOver && P) {
      var position = hand.screenPosition();
      position = position[1];
      
      
    //  console.log(position);
          
          
      if (position > 250) {
      	P.goDown();
      	P.goDown();
    	}
        
        else if (position <= 250 && position > 50) {
      	if (P.state == 2) P.goDown();
      	if (P.state == 0) P.goUp();
    	}
        else if (position <= 50) {
      	P.goUp();
      	P.goUp();
    	}
  	}
  	
  	
  	
  	//console.log(parseInt(hand.screenPosition()));
  	/*
		if (Game.isPlayable) {
		 	P2.moveFromHand(parseInt(hand.screenPosition()));
		 	P2.checkIfThrowMissile(hand.fingers);
		 	
		 	
 		}
 		if (Game.isSendingScore) {
 			if (frame.hands.length == 1 && canSend == true) P2.moveLetters(hand.screenPosition());
 		}*/
 	});
 	
 	
}).use('screenPosition', {scale: 0.25});
