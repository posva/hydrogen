var sounds = {
  'solid'      : new Audio('sound/solid.ogg'),
  'liquid'     : new Audio('sound/liquid.ogg'),
  'gas'        : new Audio('sound/gas.ogg'),
  'music'      : new Audio('sound/music.ogg')
};
var soundsSrc = {
  'solid'  : 'sound/solid.ogg',
  'liquid' : 'sound/liquid.ogg',
  'gas'    : 'sound/gas.ogg',
  'music'  : 'sound/music.ogg'
};
sounds.music.loop = true; // doesn't work everywhere??
var reloadOnStop = function() { // needed in order to play again the audio
  this.load();
};
var soundAvailable = {};
var totalSounds = 0, loadedSounds = 0;
var json = null; // save json data
var loadedImages = loadedImages || 0; // prevent undefined errors
var totalImages = totalImages || 0;

function checkAndStart() {
  
  $('#sounds').text(loadedSounds+'/'+totalSounds);
  $('#imgs').text(loadedImages+'/'+totalImages);
  
  if (json /*&& loadedSounds === totalSounds*/ && loadedImages === totalImages && loadedImages > 0/* && loadedSounds > 0*/)
    startGame();
    
}
  
var soundOnLoad = function(ev) {
  loadedSounds++;
  console.log('sounds:'+loadedSounds+'/'+totalSounds);
  checkAndStart();
};

for (var k in sounds) {
  if (sounds.hasOwnProperty(k)) {
    totalSounds++;
    sounds[k].addEventListener('loadeddata', soundOnLoad);
    //if (k !== 'music') sounds[k].addEventListener('ended', reloadOnStop.bind(sounds[k]));
    sounds[k].src = soundsSrc[k];

    sounds[k].load();
  }
}
sounds.music.addEventListener('ended', function() {
  sounds.music.load();
  sounds.music.play();
});

function Sound(name) {
  this.sound = sounds[name];
  
 //  this.sound.pause();
  this.sound.currentTime = 0;
  this.sound.play();
}

function playSound(name) {/*
  var newSound;
   if (isSound) newSound = new Sound(name);
   */
}

