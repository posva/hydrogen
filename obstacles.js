function Obstacle(type) {
  this.type 	= type;
  this.w;
  this.h;
  this.x;
  this.y;
  this.hitZoneW;
  this.hitZoneH;
  this.hitZoneX;
  this.hitZoneH;
  var _		= this;

  this.init = function() {
    /*
       _.w 		= JSON.obstacles[type].w;
       _.h			= JSON.obstacles[type].h;
       */

    _.x			= JSON.obstacles[type].x;
    _.y 		= JSON.obstacles[type].y;
    _.hitZoneW 	= JSON.obstacles[type].hitZoneW;
    _.hitZoneH	= JSON.obstacles[type].hitZoneH;
    _.hitZoneX	= JSON.obstacles[type].hitZoneX;
    _.hitZoneY 	= JSON.obstacles[type].hitZoneY;
    _.allowList = JSON.obstacles[type].allowList;

    _.w 		= img[currentElement].obstacles[type].width;
    _.h 		= img[currentElement].obstacles[type].height;
  }

  this.draw = function() {
    _.x 		+= speedX;
    _.hitZoneX 	+= speedX;

    if (DEBUG) {
      canvasM.fillStyle = "rgba(0,255,0,.5)";
      canvasM.fillRect(_.hitZoneX, _.hitZoneY, _.hitZoneW, _.hitZoneH);
    }

    canvasM.drawImage(img[currentElement].obstacles[type], _.x, _.y+canvasMy);

    _.checkIfIsOut();
  }

  this.checkIfIsOut = function() {
    if (_.x + _.w < 0) {
      _.remove();
    }
  }

  this.remove = function() {
    obstacles.splice(obstacles.indexOf(_),1);
  }
}

function createObstacle() {
  var type = JSON.obstaclesFreq[Math.floor(Math.random() * JSON.obstaclesFreq.length)];
  var obstacle = new Obstacle(type);
  obstacle.init();
  obstacles.push(obstacle);
}
