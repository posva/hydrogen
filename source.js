window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;



$(function(){
  $.ajax({
    url: "data.json",
    dataType: "text",
    success: function(data) {
      JSON = $.parseJSON(data);
      loadJSON();
      debug('loaded');
      startGame();
    }
  });

  var hammertime = new Hammer(document.getElementById('hydrogen'), {});
  hammertime.on('swipedown', function(ev) {
    P.goDown();
  })

  hammertime.on('swipeup', function(ev) {
    P.goUp();
  });
});

var DEBUG = false;
var BOT = true;

var Game;

var GAME_W = 880,
GAME_H = 440;

var canvasB, canvasM, canvasF, canvasHUD;

var decor,
coins,
obstacles,
effectsBCK,
effects,
effectsVIP,
HUD,
P,
element,
mancheTimestamp,
mancheStep = 0,
mancheEtape,
speed = 0,
speedX = 0;

var isSound = true;

var LIQUID = 0,
SOLID = 1,
GAS	= 2,
PLASMA = 3;

var stateToElem = {
  0:"liquid",
  1:"solid",
  2:"gas"
};

var energyEarned = 1;
energyLostByMoving = 0;

var imgSolid = new Image(),
imgLiquid = new Image(),
imgGas = new Image(),
imgStar = new Image(),
imgCoin = new Image(),
imgCoin2 = new Image(),
imgBlackScreen = new Image(),
imgSolidToLiquid = new Image(),
imgLiquid2Solid = new Image(),
imgSolid2Liquid = new Image(),
imgSolid2Gas = new Image(),
imgGas2Solid = new Image(),
imgFlashEnergy = new Image();

var imgHalo = new Array();

var	decorBackground,
decorBackgroundFront,
nuage;

var currentLineCoin = 0
currentElement = 1;

var img = new Array();

var canvasBy = 0,
canvasMy = 0,
canvasFy = 0;

var playerTransitionY = [200,200,-30];
var playerTransitionX = [50,40,10];
// liquid > solid > gas


function loadJSON() {
  imgGas.src 		= JSON.states[GAS].sprite;
  imgSolid.src 	= JSON.states[SOLID].sprite;
  imgLiquid.src 	= JSON.states[LIQUID].sprite;

  imgLiquid2Solid.src 	= 'img/liquid2solid_bottom.png';
  imgSolid2Liquid.src 	= 'img/solid2liquid_bottom.png';

  imgSolid2Gas.src 	= 'img/solid2gas.png';
  imgGas2Solid.src 	= 'img/gas2solid.png';

  imgCoin.src		= JSON.coin.sprite;
  imgCoin2.src	= JSON.coin.sprite2;

  imgHalo[LIQUID] = new Image(),
  imgHalo[SOLID] = new Image(),
  imgHalo[GAS] = new Image();

  imgHalo[LIQUID].src = 'img/haloliquid.png';
  imgHalo[SOLID].src 	= 'img/halosolid.png';
  imgHalo[GAS].src 	= 'img/halogas.png';

  imgStar.src 	= 'img/star.png';
  imgBlackScreen.src 	= 'img/blackscreen.png';
  imgFlashEnergy.src 	= 'img/flashenergy.png';

  imgGas.src 		= JSON.states[GAS].sprite;


  	for (var i = 0; i <= JSON.elements.length-1; i++) {
 // for (var i = 1; i <= 1; i++) {
    img[i] = new Object();

    img[i].decorBackground 			= newImage("img/"+JSON.elements[i].id+"/background.png");
    img[i].decorBackgroundFront 	= newImage("img/"+JSON.elements[i].id+"/background_front.png");
    img[i].nuage 					= newImage("img/"+JSON.elements[i].id+"/nuage.png");
    img[i].front 					= newImage("img/"+JSON.elements[i].id+"/front.png");
    img[i].picto 					= newImage("img/"+JSON.elements[i].id+"/picto.png");
    img[i].HUDbackgroundtopright 	= newImage("img/"+JSON.elements[i].id+"/hud_background_topright.png");

    img[i].obstacles = new Array();

    for (var j = 0; j <= JSON.obstacles.length-1; j++) {
      img[i].obstacles[j] = newImage("img/"+JSON.elements[i].id+"/"+JSON.obstacles[j].id+".png");
    }
  }
}

function sprite(options) {

  var that = {},
  frameIndex 		= 0,
  tickCount 		= 0,
  ticksPerFrame 	= options.ticksPerFrame || 0,
  numberOfFrames 	= options.numberOfFrames || 1;

  that.context = options.context;
  that.width = options.width;
  that.height = options.height;
  that.image = options.image;

  that.draw = function(x,y) {
    that.update();
    that.render(x,y);
  }

  that.refresh = function() {
    tickCount = -1;
  }

  that.update = function () {

    tickCount ++;

    if (tickCount > ticksPerFrame) {

      tickCount = 0;

      // If the current frame index is in range
      if (frameIndex < numberOfFrames - 1) {
        // Go to the next frame
        frameIndex += 1;
      } else {
        frameIndex = 0; // BLOCK THIS BABY
      }
    }
  };

  that.render = function (x,y) {

    // Clear the canvas
    //  that.context.clearRect(0, 0, that.width, that.height);

    // Draw the animation
    that.context.drawImage(
      that.image,
      frameIndex * that.width / numberOfFrames,
      0,
      that.width / numberOfFrames,
      that.height,
      x,
      y,
      that.width / numberOfFrames,
      that.height);
  };

  return that;
}

function debug(txt) {
  if (DEBUG) console.log(txt);
}

function newImage(src) {
  var image = new Image();
  image.src = src;
  return image;
}
