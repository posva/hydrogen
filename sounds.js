var soundOnLoad = function(ev) {
  loadedSounds++;
  console.log('sounds:'+loadedSounds+'/'+totalSounds);
  checkAndStart();
};
var totalSounds = 0, loadedSounds = 0;
var json = null; // save json data
var loadedImages = loadedImages || 0; // prevent undefined errors
var totalImages = totalImages || 0;
function checkAndStart() {
  /*
  $('#sounds').text(loadedSounds+' '+totalSounds);
  $('#imgs').text(loadedImages+' '+totalImages);
  */
  if (json && loadedSounds === totalSounds && loadedImages === totalImages && loadedImages > 0 && loadedSounds > 0)
    startGame();
    
}

var sounds = {
  'solid'    : null,
  'liquid'   : null,
  'gas'      : null,
  'music1'   : null,
  'music2'   : null,
  'music3'   : null,
  'blueBall' : null,
  'redBall'  : null,
  'coin'     : null,
};

for (var k in sounds) {
  if (sounds.hasOwnProperty(k)) {
    totalSounds++;
    sounds[k] = new Howl({
      urls: ['sound/'+k+'.ogg', 'sound/'+k+'.mp3'],
      onload: soundOnLoad,
      loop: k.indexOf('music') >= 0,
      onloaderror: soundOnLoad,
      autoplay: false,
    });
  }
}

// last music playing
var oldPlaying = '';

function playNextMusic(oldElement) {
  sounds['music'+oldElement].fade(1, 0, 300, function() {
    playMusic(currentElement);
  });
}

function playSound(name) {
  sounds[name].volume(1);
  sounds[name].play();
}

function playMusic(n) {
  var name = 'music'+n;
  if (oldPlaying) {
    sounds[oldPlaying].stop();
  }
  sounds[name].volume(1);
  sounds[name].play();
  oldPlaying = name;
}
