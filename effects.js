function addEffectBCK(func) {effectsBCK.push(func); }
function addEffect(func) {effects.push(func); }
function addEffectVIP(func) {effectsVIP.push(func); }


function MoveWorldForLiquid() {
  this.time = 0;
  this.maxTime = 10;
  this.y = 0;
  this.maxY = -10;

  this.draw = function() {
    if (canvasMy > this.maxY) {
      this.time++;

      canvasMy += this.maxY/this.maxTime;
    }
    else {
      this.remove();
    }
  }

  this.remove = function(){
    effectsBCK.splice(effectsBCK.indexOf(this),1);
  }
}





function MoveWorldForSolid() {
  this.time = 0;
  this.maxTime = 10;
  this.y = canvasMy;
  this.maxY = 0;

  this.draw = function() {
    this.time++;

    if (canvasMy > this.maxY) { canvasMy -= 10/this.maxTime; }
    if (canvasMy < this.maxY) { canvasMy += 10/this.maxTime; }

    if (canvasMy == this.maxY) this.remove();
  }

  this.remove = function(){
    effectsBCK.splice(effectsBCK.indexOf(this),1);
  }
}





function MoveWorldForGas() {
  this.time = 0;
  this.maxTime = 10;
  this.y = 0;
  this.maxY = 10;

  this.draw = function() {
    if (canvasMy < this.maxY) {
      this.time++;

      canvasMy += this.maxY/this.maxTime;
    }
    else {
      this.remove();
    }
  }

  this.remove = function(){
    effectsBCK.splice(effectsBCK.indexOf(this),1);
  }
}





function Halo(state) {
  this.time = 0;
  this.maxTime = 30;
  this.img = imgHalo[state];

  this.draw = function() {
    this.time++;

    canvasF.save();
    canvasF.globalAlpha = .5-(this.time/this.maxTime*.5);
    canvasF.drawImage(this.img,0,0);
    canvasF.restore();


    canvasF.save();
    canvasF.globalAlpha = 1-(this.time/this.maxTime);
    canvasF.drawImage(imgFlashEnergy,640,10);
    canvasF.restore();
    

    canvasF.save();
    canvasF.globalAlpha = 1-(this.time/this.maxTime);
    canvasF.drawImage(imgFlashBar, (GAME_W - 32 - 220) * Math.min(1, HUD.currentEnergy / json.elements[currentElement].maxEnergy)-20, -12);
    canvasF.restore();


    if (this.time >= this.maxTime) this.remove();
  }

  this.remove = function(){
    effectsVIP.splice(effectsVIP.indexOf(this),1);
  }
}




function FreezeScreen() {
  this.time = 0;
  this.maxTime = 30;

  this.draw = function() {
    this.time++;
    
    canvasF.save();
    canvasF.globalAlpha = .8-(this.time/this.maxTime*.8);
    canvasF.drawImage(imgFreezeScreen,0,0);
    canvasF.restore();


    if (this.time >= this.maxTime) this.remove();
  }

  this.remove = function(){
    effectsVIP.splice(effectsVIP.indexOf(this),1);
  }
}


function FireScreen() {
  this.time = 0;
  this.maxTime = 30;

  this.draw = function() {
    this.time++;

    canvasF.save();
    canvasF.globalAlpha = .8-(this.time/this.maxTime*.8);
    canvasF.drawImage(imgFireScreen,0,0);
    canvasF.restore();


    if (this.time >= this.maxTime) this.remove();
  }

  this.remove = function(){
    effectsVIP.splice(effectsVIP.indexOf(this),1);
  }
}



function TransitingPlayer(state, stateOld) {

  this.time     = 0;
  this.maxTime  = 10; // 10
  this.from     = playerTransitionY[stateOld];
  this.to       = playerTransitionY[state];
  this.fromX    = playerTransitionX[stateOld];
  this.toX      = playerTransitionX[state];
  this.playerY  = 0;
  this.playerX  = 0;
  this.state    = state;
  this.stateOld = stateOld;

  this.draw = function() {
    this.time++;

    this.playerY = (this.to-(this.to-this.from)/this.time);
    this.playerX = (this.toX-(this.toX-this.fromX)/this.time);

    if (this.stateOld == 0 && this.state == 1) 	{ imgAnimLiquid2Solid.draw(this.playerX, this.playerY); }
    if (this.stateOld == 1 && this.state == 0) 	{ imgAnimSolid2Liquid.draw(this.playerX, this.playerY); }

    if (this.stateOld == 1 && this.state == 2) 	{ imgAnimSolid2Gas.draw(this.playerX, this.playerY); }
    if (this.stateOld == 2 && this.state == 1) 	{ imgAnimGas2Solid.draw(this.playerX, this.playerY); }

    if (this.time >= this.maxTime) {
      this.remove();
      isTransiting = false;
    }

  }

  this.remove = function(){
    effectsVIP.splice(effectsVIP.indexOf(this),1);
  }
}


function BlackScreen() {

  this.opac = 1;
  this.time = 0;

  this.draw = function() {
    this.time++;

    if (this.time <= 40) 	this.opac = 1;
    else 					this.opac = this.opac - .01;

    if (this.opac <= 0.5)   this.opac = .5;


    canvasF.save();
    canvasF.translate(0,0);
    canvasF.globalAlpha = this.opac;
    canvasF.drawImage(imgBlackScreen, 0, 0);
    canvasF.restore();


  }

  this.remove = function(){
    effectsVIP.splice(effectsVIP.indexOf(this),1);
  }
}
