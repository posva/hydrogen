var sounds = {
  'solid'					: new Audio('sound/solid.ogg'),
  'liquid'				: new Audio('sound/liquid.ogg'),
  'gas'					: new Audio('sound/gas.ogg'),
  'music'					: new Audio('sound/music.ogg')
};
var soundAvailable = {};

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

