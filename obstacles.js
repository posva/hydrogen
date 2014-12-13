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
       _.w 		= json.obstacles[type].w;
       _.h			= json.obstacles[type].h;
       */

    _.x			= json.obstacles[type].x;
    _.y 		= json.obstacles[type].y;
    _.hitZoneW 	= json.obstacles[type].hitZoneW;
    _.hitZoneH	= json.obstacles[type].hitZoneH;
    _.hitZoneX	= json.obstacles[type].hitZoneX;
    _.hitZoneY 	= json.obstacles[type].hitZoneY;
    _.allowList = json.obstacles[type].allowList;

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
  //  console.log(currentElement+' '+type);
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
  var type = json.obstaclesFreq[Math.floor(Math.random() * json.obstaclesFreq.length)];
  var obstacle = new Obstacle(type);
  obstacle.init();
  obstacles.push(obstacle);
}
