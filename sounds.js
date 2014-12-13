var sounds = {
  'solid'					: new Audio('sound/solid.ogg'),
  'liquid'				: new Audio('sound/liquid.ogg'),
  'gas'					: new Audio('sound/gas.ogg'),
  'music'					: new Audio('sound/music.ogg')
};
var soundAvailable = {};
var totalSounds = 0, loadedSounds = 0;
var json = null; // save json data
var loadedImages = loadedImages || 0; // prevent undefined errors
var totalImages = totalImages || 0;
function checkAndStart() {
  if (json && loadedSounds === totalSounds && loadedImages === totalImages && loadedImages > 0 && loadedSounds > 0)
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
  }
}

function Sound(name) {
  this.sound = sounds[name];
  this.sound.currentTime = 0;
  this.sound.play();
}

function playSound(name) {
  var newSound;
  if (isSound)
    newSound = new Sound(name);
}

