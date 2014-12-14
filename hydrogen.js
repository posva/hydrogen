    
function Game() {
  this.isPlayable			= false; 	// Users can play
  this.isVisible			= false; 	// The game is visible
  this.isGameOver		 	= false;	// After the game, before the score sending
  this.isAnecdote 	  = false;	// Users are sending their scores
  this.isWaitingForGame 	= true;		// No user is present, the game is waiting
  this.isIntro			= false;	// 3...2...1...startGame();
  this.isStats			= false;	// Showing the stats of all the games
  
  this.init = function() {
    
    canvasB = document.getElementById('canvas_back').getContext('2d');
    canvasM = document.getElementById('canvas_mid').getContext('2d');
    canvasF = document.getElementById('canvas_front').getContext('2d');
    canvasHUD = document.getElementById('canvas_hud').getContext('2d');

    coins 		= new Array();
    obstacles 	= new Array();
    effectsBCK 	= new Array();
    effects 	= new Array();
    effectsVIP 	= new Array();
    stars 		= new Array();

    for (var i = 0; i <= 10; i++) {
      stars.push(new Star());
    }
    
    speedX = 0;


    this.initAnimations();

    decor = new Decor();

    initElement(1);
  }

  this.frame = function() {

    if (Game.isPlayable) {

      mancheStep++;

      if (mancheStep == speed) {
        mancheStep = 0;
        if (!Game.isGameOver) createObstacle();
      }

      if (mancheStep > 35
       && mancheStep < speed-10
       && mancheStep % 10 == 0) {
          if (!Game.isGameOver)
            createCoin(mancheStep === Math.floor((speed-11)/10) * 10);
        }
        //console.log('step:'+mancheStep+'.speed:'+(speed - 10)+'.calc:'+Math.floor((speed-11)/10));


        canvasB.clearRect(0, -GAME_H,	GAME_W, GAME_H * 3);
        canvasM.clearRect(0, -GAME_H,	GAME_W, GAME_H * 3);
        canvasF.clearRect(0, -GAME_H,	GAME_W, GAME_H * 3);
        canvasHUD.clearRect(0, -GAME_H,	GAME_W, GAME_H * 3);


        canvasB.save();
        canvasM.save();
        canvasF.save();
        canvasHUD.save();


        effectsBCK.forEach(function(effectBCK){
          effectBCK.draw();
        });

        // make player move by himself
        var obs = obstacles[0];
        if (BOT && obs && P.nextObs !== obs) {
          if (obs.x < playerX || obs.x - playerX < 500) {
            var goTo = json.obstacles[obs.type].allowList[0];
            var i, diff;
            i = 0;
            diff = Math.abs(P.state - goTo);
            var moveUp = function() {
              P.goUp();
            },
            moveDown = function() {
              P.goDown();
            };
            P.nextObs = obs;
            var moveFunc = P.state < goTo ? moveUp : moveDown;
            while (i < diff) {
              setTimeout(moveFunc, i * 300);
              i++;
            }
          }
        }

        decor.draw();

        effects.forEach(function(effect){
          effect.draw();
        });

        for (var i = obstacles.length; i--;) {
          obstacles[i].draw();
        }

        for (var i = coins.length; i--;) {
          coins[i].draw();
        }

        if (Game.isGameOver) {
          Game.anecdote();
        }

        else {
          P.drawPlayer();
        }


        //	front.draw(canvasMy);


        for (var i = effectsVIP.length; i--;) {
          effectsVIP[i].draw();
        }

        HUD.draw();


        canvasB.restore();
        canvasM.restore();
        canvasF.restore();
        canvasHUD.restore();
    }

    requestAnimationFrame(Game.frame);
  }

  this.newGame = function() {
    Game.isPlayable			= true;
    Game.isVisible			= true;
    Game.isGameOver		 	= false;
    Game.isAnecdote 	  = false;	// Users are sending their scores
    Game.isWaitingForGame 	= false;
    Game.isIntro			= true;
    Game.isStats			= false;

    playSound('music');
    
    HUD = new HUD();


    P = new Player(SOLID);
    P.init();

    $('#menu').addClass('showforplayable');

    speed = 100;
    speedX = -10;
    
    
    
    
    console.log('new game');

    debug('newGame');
  }
  
  
  
  this.anecdote = function() {
    Game.isPlayable			= true;
    Game.isVisible			= true;
    Game.isGameOver		 	= true;
    Game.isAnecdote 	  = true;	// Users are sending their scores
    Game.isWaitingForGame 	= false;
    Game.isIntro			= true;
    Game.isStats			= false;
    
    canvasHUD.save();
    canvasHUD.font = '200 60px Helvetica Neue';
    canvasHUD.translate(GAME_W/2, GAME_H/2-10);
    canvasHUD.fillStyle = 'white';
    canvasHUD.textAlign = 'center';
    canvasHUD.fillText(P.energy+" eV", 0, 0);
    canvasHUD.restore();
    
    
    canvasHUD.save();
    
    canvasHUD.font = '200 36px Helvetica Neue';
    canvasHUD.translate(GAME_W/2, GAME_H/2+50);
    canvasHUD.fillStyle = 'white';
    canvasHUD.textAlign = 'center';
    canvasHUD.fillText("Tap anywhere to restart!", 0, 0);
    canvasHUD.restore();
    
    
    
 //   console.log('anecdote');
  }


  this.initAnimations = function() {
    imgAnimSolidToLiquid = sprite({
      context: canvasF,
      width: 1380,
      height: 166,
      image: imgSolidToLiquid,
      numberOfFrames: 6,
      ticksPerFrame: 2
    });

    imgAnimGas = sprite({
      context: 		canvasF,
      width: 			1000,
      height: 		102,
      image: 			imgGas,
      numberOfFrames: 4,
      ticksPerFrame: 	3
    });

    imgAnimLiquid = sprite({
      context: 		canvasF,
      width: 			1000,
      height: 		80,
      image: 			imgLiquid,
      numberOfFrames: 4,
      ticksPerFrame: 	2
    });

    imgAnimSolid = sprite({
      context: 		canvasF,
      width: 			1750,
      height: 		174,
      image: 			imgSolid,
      numberOfFrames: 7,
      ticksPerFrame: 	3
    });
  }
}

function startGame() {

  Game = new Game();
  Game.init();
 // Game.newGame();

  requestAnimationFrame(Game.frame);
}

