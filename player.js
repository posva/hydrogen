var letter = null,
letterIncrease = 0;

var playerX = 50,
playerY = [300,200,100,100];

var isTransiting = false;

function Player(state) {
  this.state		= state >= 0 ? state : SOLID;
  this.oldState   = -1;

  if (currentElement > 0)
    this.energy = json.elements[currentElement-1].maxEnergy;
  else
    this.energy = 150;


  this.init = function() {
    this.refreshPos();
    this.drawPlayerInit();
    this.drawPlayer();
  }

  this.drawPlayerInit = function() {
    console.log('init player');
  }

  this.drawPlayer = function() {
    if (DEBUG) {
      canvasM.fillStyle = 'rgba(0,255,0,.3)';
      canvasM.fillRect(this.hitZoneX, this.hitZoneY,this.hitZoneW,this.hitZoneH);
    }

    if (!isTransiting) {
      if 		(this.state == LIQUID)	{ imgAnimLiquid.draw(this.x, this.y); }
      else if (this.state == GAS)		{ imgAnimGas.draw(this.x, this.y); }
      else if (this.state == SOLID)	{ imgAnimSolid.draw(this.x, this.y); }
    }

    if (!Game.isGameOver) {
      for (var i = obstacles.length; i--;) {
        if (this.isCollidingWithObstacle(obstacles[i])) {
          debug("collision");
          addEffectVIP(new BlackScreen());
          Game.isGameOver = true;
        }
      }
      
      
      var obs = obstacles[0];
      
      if (obs) {
        if (obs.x > this.hitZoneX + this.hitZoneW) {
          if (obs.allowList.indexOf(this.state) == -1) {
            if (this.state == 0)
              goToUp = true; 
              
            if (this.state == 1) {
              if (obs.allowList.indexOf(0))
                goToUp = true;
                
              if (obs.allowList.indexOf(2))
                goToUp = false;
                
            }

            if (this.state == 2)
              goToUp = false; 
              
            canvasM.save();  
            canvasM.globalAlpha = (this.hitZoneX + this.hitZoneW)/(obs.x-this.hitZoneX);
              
            if (goToUp) 
              canvasM.drawImage(imgGotoUp, obs.x-80, obs.y-10-(this.hitZoneX + this.hitZoneW)/(obs.x)*100);
            
            else            
              canvasM.drawImage(imgGotoDown, obs.x-80, obs.y+obs.hitZoneH-70+(this.hitZoneX + this.hitZoneW)/(obs.x)*100);
              
            canvasM.restore();            
          }
        }
      }

      for (var i = coins.length; i--;) {
        var thisCoin = coins[i];
        if (this.isCollidingWithCoin(thisCoin)) {
          debug("coin");

          if (thisCoin.isSpecial) {
            P.nextObs = null;

            if (thisCoin.isFire) {
              
              addEffectVIP(new FireScreen());

              // 1 azote
              // 2 cuivre
              // 3 mercure

              if (currentElement == 1) {
                P.goUp();
                setTimeout(function(){ P.goUp(); },100);
              }
              
              if (currentElement == 2) {
                P.goDown();
                setTimeout(function(){ P.goDown(); },100);
              }
              
              if (currentElement == 3) {
                P.goUp();
                setTimeout(function(){ P.goUp(); },100);
              }

            }
            if (thisCoin.isFreeze) {
              
              addEffectVIP(new FreezeScreen());

              // 1 azote
              // 2 cuivre
              // 3 mercure

              if (currentElement == 1) {
                P.goUp();
                setTimeout(function(){ P.goUp(); },100);
              }
              
              if (currentElement == 2) {
                if (this.state == LIQUID) P.goUp();
                if (this.state == GAS)    P.goDown();  
              }
              
              if (currentElement == 3) {
                P.goDown();
                setTimeout(function(){ P.goDown(); },100);
              }
            }

          }
          else {
            this.earnEnergy();
          }

        }
      }
    }

    //	imgAnimLiquid2Solid.draw(this.x, this.y);


  }

  this.goUp = function() {
    if (this.state < GAS) {
      this.stateOld = this.state;
      this.state++;
    } else {
      this.stateOld = this.state;
      this.state = GAS;
    }

    this.refreshPos();
  }

  this.goDown = function() {
    if (this.state > LIQUID) {
      this.stateOld = this.state;
      this.state--;
    } else {
      this.stateOld = this.state;
      this.state = LIQUID;
    }

    this.refreshPos();
  }

  this.refreshPos = function() {
    this.hitZoneW	= json.states[this.state].hitZoneW;
    this.hitZoneH	= json.states[this.state].hitZoneH;
    this.hitZoneX	= json.states[this.state].hitZoneX;
    this.hitZoneY 	= json.states[this.state].hitZoneY;
    this.w 			= json.states[this.state].w;
    this.h 			= json.states[this.state].h;
    this.x			= json.states[this.state].x;
    this.y 			= json.states[this.state].y;

    if (this.state == LIQUID) {
      addEffectBCK(new MoveWorldForLiquid());
      //	speedX = -15;
    }

    if (this.state == SOLID) {
      addEffectBCK(new MoveWorldForSolid());
      //	speedX = -15;
    }

    if (this.state == GAS) {
      addEffectBCK(new MoveWorldForGas());
      //	speedX = -15;
    }

    this.energy -= energyLostByMoving;

    if (this.state != this.stateOld) {
      isTransiting = true;

      imgAnimLiquid2Solid = imgAnimSolid2Liquid = imgAnimSolid2Gas = null;

      imgAnimLiquid2Solid = sprite({
        context: 		canvasF,
        width: 			2750,
        height: 		200,
        image: 			imgLiquid2Solid,
        numberOfFrames: 11,
        ticksPerFrame: 	1
      });

      imgAnimSolid2Liquid = sprite({
        context: 		canvasF,
        width: 			2750,
        height: 		200,
        image: 			imgSolid2Liquid,
        numberOfFrames: 11,
        ticksPerFrame: 	1
      });

      imgAnimSolid2Gas = sprite({
        context: 		canvasF,
        width: 			2750,
        height: 		200,
        image: 			imgSolid2Gas,
        numberOfFrames: 11,
        ticksPerFrame: 	.5
      });

      imgAnimGas2Solid = sprite({
        context: 		canvasF,
        width: 			2750,
        height: 		200,
        image: 			imgGas2Solid,
        numberOfFrames: 11,
        ticksPerFrame: 	.5
      });

      if (this.stateOld == 0 && this.state == 1) 	{ imgAnimLiquid2Solid.refresh(); playSound('solid'); }
      if (this.stateOld == 1 && this.state == 0) 	{ imgAnimSolid2Liquid.refresh(); playSound('liquid'); }

      if (this.stateOld == 1 && this.state == 2) 	{ imgAnimSolid2Gas.refresh(); playSound('gas'); }
      if (this.stateOld == 2 && this.state == 1) 	{ imgAnimGas2Solid.refresh(); playSound('solid'); }


      addEffectVIP(new TransitingPlayer(this.state, this.stateOld));
    }
  }

  this.isCollidingWithObstacle = function(obstacle) {
    var o = obstacle,
    p = this;

    if ((o.hitZoneX+speedX + o.hitZoneW > p.hitZoneX
         && o.hitZoneX+speedX < p.hitZoneX + p.hitZoneW)
       && (o.hitZoneY+speedX + o.hitZoneH > p.hitZoneY
           && o.hitZoneY+speedX < p.hitZoneY + p.hitZoneH)) {

             if (o.allowList.indexOf(p.state) == -1) {
               return true;
             } else {
               return false;
             }
           }
  }

  this.isCollidingWithCoin = function(coin) {
    var c = coin,
    p = this;

    if ((c.hitZoneX+speedX + c.hitZoneW > p.hitZoneX
         && c.hitZoneX+speedX < p.hitZoneX + p.hitZoneW)
       && (c.hitZoneY+speedX + c.hitZoneH > p.hitZoneY
           && c.hitZoneY+speedX < p.hitZoneY + p.hitZoneH)) {

             if (!coin.isSpecial) addEffectVIP(new Halo(this.state));

             coin.remove();

             return true;
           }
  }

  this.earnEnergy = function() {
    this.energy += energyEarned;
    
    if (this.energy >= json.elements[currentElement].maxEnergy)
      nextElementForDemo();
  }


  this.isDead = function() {
    var isDead = true;

    if (this.i == 1) {
      this.pixels.forEach(function(col){
        col.forEach(function(ligne){
          if (ligne == 1) isDead = false;
        });
      });

      return isDead;
    }

    else {
      this.lines.forEach(function(ligne){
        if (ligne > 0) isDead = false;
      });

      return isDead;
    }
  }

  this.addPoint = function() {
    this.points++;
    this.drawPoints();
  }
}
