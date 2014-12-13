var sounds = {
  'solid'					: new Audio('sound/solid.ogg'),
  'liquid'				: new Audio('sound/liquid.ogg'),
  'gas'					: new Audio('sound/gas.ogg'),
  'music'					: new Audio('sound/music.ogg')
};
var soundAvailable = {};

var loadedAudio = function(i){
  soundAvailable[i] = true;
};

for (var k in sounds) {
  if (sounds.hasOwnProperty(k)) {
    soundAvailable[k] = false;
    sounds[k].addEventListener('onloadeddata', (loadedAudio).bind(null, k));
    if (k === 'music') {
      sounds[k].addEventListener('ended', function() {
        this.currentTime = 0;
        this.play();
      }, false);
    }
  }
}


function Sound(name) {
  if (soundAvailable[name]) {
    this.sound = sounds[name];
    this.sound.currentTime = 0;
    this.sound.play();
  }
}

function playSound(name) {
  var newSound;
  if (isSound)
    newSound = new Sound(name);
}

