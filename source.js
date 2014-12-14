window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;



var DEBUG = false;
var BOT = false;

var isSound = true;

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

var LIQUID = 0,
SOLID = 1,
GAS	= 2,
PLASMA = 3;

var stateToElem = {
  0:"liquid",
  1:"solid",
  2:"gas"
};

var energyEarned = 50;
energyLostByMoving = 0;

var imgSolid,
imgLiquid,
imgGas,
imgStar,
imgCoin,
imgCoin2,
imgBlackScreen,
imgSolidToLiquid,
imgLiquid2Solid,
imgSolid2Liquid,
imgSolid2Gas,
imgGas2Solid,
imgFeu,
imgGlace,
imgGotoUp,
imgGotoDown,
imgFreezeScreen,
imgFireScreen,
imgFlashBar,
imgFlashEnergy;

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
  imgSolid = newImage(json.states[SOLID].sprite),
  imgLiquid = newImage(json.states[LIQUID].sprite),
  imgGas = newImage(json.states[GAS].sprite),
  imgStar = newImage('img/star.png'),
  imgCoin = newImage(json.coin.sprite),
  imgCoin2 = newImage(json.coin.sprite2),
  imgBlackScreen = newImage('img/blackscreen.png'),
  //imgSolidToLiquid = new Image(),
  imgLiquid2Solid = newImage('img/liquid2solid_bottom.png'),
  imgSolid2Liquid = newImage('img/solid2liquid_bottom.png'),
  imgSolid2Gas = newImage('img/solid2gas.png'),
  imgGas2Solid = newImage('img/gas2solid.png'),
  imgFeu = newImage('img/boule_feu.png'),
  imgGlace = newImage('img/boule_froid.png'),
  imgGotoUp = newImage('img/gotoup.png'),
  imgGotoDown = newImage('img/gotodown.png'),
  imgFreezeScreen = newImage('img/freezescreen.png'),
  imgFireScreen = newImage('img/firescreen.png'),
  imgFlashBar = newImage('img/flashbar.png'),
  imgFlashEnergy = newImage('img/flashenergy.png');

  imgHalo[LIQUID] = newImage('img/haloliquid.png'),
  imgHalo[SOLID] = newImage('img/halosolid.png'),
  imgHalo[GAS] = newImage('img/halogas.png');


  	for (var i = 1; i <= json.elements.length-1; i++) {
 // for (var i = 1; i <= 1; i++) {
    img[i] = new Object();

    img[i].decorBackground       = newImage("img/"+json.elements[i].id+"/background.png");
    img[i].decorBackgroundFront  = newImage("img/"+json.elements[i].id+"/background_front.png");
    img[i].nuage                 = newImage("img/"+json.elements[i].id+"/nuage.png");
    img[i].front                 = newImage("img/"+json.elements[i].id+"/front.png");
    img[i].picto                 = newImage("img/"+json.elements[i].id+"/picto.png");
    img[i].bigPicto                 = newImage("img/"+json.elements[i].id+"/bigpicto.png");
    img[i].HUDbackgroundtopright = newImage("img/"+json.elements[i].id+"/hud_background_topright.png");

    img[i].obstacles = new Array();

    for (var j = 1; j <= json.obstacles.length-1; j++) {
      img[i].obstacles[j] = newImage("img/"+json.elements[i].id+"/"+json.obstacles[j].id+".png");
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
  totalImages++;
  image.onload = function() {
    loadedImages++;
  //  console.log('images:'+loadedImages+'/'+totalImages);
    checkAndStart();
  };
  image.src = src;
  return image;
}

function nextElementForDemo() {

  playNextMusic(currentElement);
    currentElement++;

    if (currentElement == 4) currentElement = 1;

    if (currentElement == 1) $('html, body').css('background-image','url(img/pattern_azote.png)');
    if (currentElement == 2) $('html, body').css('background-image','url(img/pattern_cuivre.png)');
    if (currentElement == 3) $('html, body').css('background-image','url(img/pattern_mercure.png)');

    decorBackground 		= new ImgLoop(canvasB, img[currentElement].decorBackground, 0, -10, -1, 0);
    decorBackgroundFront 	= new ImgLoop(canvasB, img[currentElement].decorBackgroundFront, 0, 205, -10, 0);
    nuage 					      = new ImgLoop(canvasM, img[currentElement].nuage, 0, -10, -7, 0);
    front 					      = new ImgLoop(canvasF, img[currentElement].front, 0, 335, -10, 0);
    
    addEffectVIP(new BigPicto());
}

function initElement(ce) {


    if (ce == 4) ce = 1;

    if (ce == 1) $('html, body').css('background-image','url(img/pattern_azote.png)');
    if (ce == 2) $('html, body').css('background-image','url(img/pattern_cuivre.png)');
    if (ce == 3) $('html, body').css('background-image','url(img/pattern_mercure.png)');

    decorBackground 		= new ImgLoop(canvasB, img[ce].decorBackground, 0, -10, -1, 0);
    decorBackgroundFront 	= new ImgLoop(canvasB, img[ce].decorBackgroundFront, 0, 205, -10, 0);
    nuage 					      = new ImgLoop(canvasM, img[ce].nuage, 0, -10, -7, 0);
    front 					      = new ImgLoop(canvasF, img[ce].front, 0, 335, -10, 0);
    
    currentElement = ce;
    
    addEffectVIP(new BigPicto());
    
    return ce;
}




$(function(){
var HEIGHT = $(window).height();

  $.ajax({
    url: "data.json",
    dataType: "text",
    success: function(data) {
      json = $.parseJSON(data);
      loadJSON();
      debug('loaded');
      checkAndStart();
    }
  });

  document.body.addEventListener('touchstart', function(e){ e.preventDefault(); });

//  var hammertime = new Hammer(document.getElementsByTagName('html')[0], {});

  $('html').hammer({}).bind('swipedown',function(){
    if (Game.isGameOver) {
      Game.newGame();
    } else { 
      P.goDown(); 
    }
  })
  
   $('html').hammer({}).bind('swipeup',function(){
   if (Game.isGameOver) {
     Game.newGame();
    } else {
    P.goUp();
    }
  })
  
   $('html').hammer({}).bind('tap',function(ev){
    
      if (Game.isGameOver) {
       Game.newGame();
      } else if (Game.isPlayable) {
      
       if (ev.gesture.pointers[0].clientY >= HEIGHT/2) {
         P.goDown();
       }
       else {
         P.goUp();
       }
     }
  });



//  var toBotOrNotToBot = new Hammer(document.getElementById('tobotornottobot'), {});

  $('#tobotornottobot').hammer({}).bind('tap',function(){ 
   BOT = !BOT;
  });



  $('.switch div').on('click',function(){
    changeSwitchDiv($(this));  
  });

  $('.switch div').hammer({}).bind('tap',function(){
    changeSwitchDiv($(this));  
  //  alert('hey');
  });
  
  
  $('.playit').on('click',function(){
    playIt($(this));
  });
  
  
  $('.playit').hammer({}).bind('tap',function(){
    playIt($(this));  
 //   alert($(this));
  });
  
  function changeSwitchDiv(t) {
    var level = t.closest('.level');
    
    level.removeClass('showtabquestions showtabachievements showtabanecdotes').addClass('showtab'+t.data('id'));
    level.find('.switch div').removeClass('active');
    t.addClass('active');
  }
  
  function playIt(t) {
    initElement(parseInt(t.data('element')));
    Game.newGame();
  }

});
