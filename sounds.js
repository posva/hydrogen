var sounds = {
	'solid'					: new Audio('sound/solid.ogg'),
	'liquid'				: new Audio('sound/liquid.ogg'),
	'gas'					: new Audio('sound/gas.ogg'),
	'music'					: new Audio('sound/music.ogg')
};

function Sound(name) {
//	this.sound = new Audio('s/P'+player+'_'+name+'.mp3');
	this.sound = sounds[name];
	this.sound.currentTime = 0;
	this.sound.play();
}

function playSound(name) {
	if (isSound) var newSound = new Sound(name);
}