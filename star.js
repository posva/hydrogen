function Star() {
  this.x        = -30+Math.floor(Math.random()*(GAME_W+60));
  this.y        = -30+Math.floor(Math.random()*(GAME_H-150));
  this.opacity  = 0;
  this.rotation = Math.floor(Math.random()*360);
  var _         = this;

  this.init = function() {
  }

  this.draw = function() {
    _.rotation 	+= 1;

    if (_.floatingUp) {

      if (_.floatingY < 5 && _.floatingY >= 0) {
        _.floatingY += .5;
      } else {
        _.floatingY++;
      }


      if (_.floatingY >= 30) {
        _.floatingUp = false;
      }
    } else {

      if (_.floatingY < 5 && _.floatingY > 0) {
        _.floatingY -= .5;
      } else {
        _.floatingY--;
      }

      if (_.floatingY <= 0) {
        _.floatingUp = true;
      }
    }

    _.x 	+= -8;

    /*
       _.x 	+= Math.random()*2-1;
       _.y 	+= Math.random()*2-1;
       */

    if (Math.random()>.5) 	_.opacity 	+= .05;
    else					_.opacity 	-= .05;

    _.opacity 	= Math.max(0,Math.min(1,_.opacity));

    if (_.rotation >= 360) _.rotation = 0;

    canvasB.save();
    canvasB.translate(_.x, _.y);
    canvasB.rotate(_.rotation * Math.PI/180);
    canvasB.globalAlpha = _.opacity;
    canvasB.drawImage(imgStar, -25, -25);
    canvasB.restore();

    _.checkIfIsOut();

  }


  this.checkIfIsOut = function() {
    if (_.x + 50 < 0) {
      _.remove();
    }
  }

  this.remove = function() {
    stars.splice(stars.indexOf(_),1);
    stars.push(new Star());
  }
}
