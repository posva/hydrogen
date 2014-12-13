function Coin(line) {
	this.line 	= line;
	this.w;
	this.h;
	this.x;
	this.y;
	this.hitZoneW;
	this.hitZoneH;
	this.hitZoneX;
	this.hitZoneH;
	this.opacity;
	this.rotation;
	this.floatingUp = true;
	this.floatingY = 0;
	var _ = this;
	
	this.init = function() {
		_.x			= GAME_W;
		_.hitZoneX	= GAME_W;
		_.w			= JSON.coin.w;
		_.h 		= JSON.coin.h;
		_.hitZoneW 	= JSON.coin.hitZoneW;
		_.hitZoneH	= JSON.coin.hitZoneH;
		_.opacity 	= Math.random();
		_.rotation 	= Math.floor(Math.random()*360);
		_.y = _.hitZoneY = JSON.coinLine[this.line];	
	}
	
	this.draw = function() {
		_.x 		+= speedX;
		_.hitZoneX 	+= speedX;
		_.rotation 	+= 10;
		
		if (_.floatingUp) {
			
			if (_.floatingY < 5 && _.floatingY >= 0) {
				_.floatingY += .5;
			} else {
				_.floatingY++;
			}
			
			
			if (_.floatingY >= 20) {
				_.floatingUp = false;
			}
		} else {
			
			if (_.floatingY < 5 && _.floatingY > 0) {
				_.floatingY -= .5;
			} else {
				_.floatingY--;
			}
			
			if (_.floatingY <= 0) {
				_.floatingUp = true;
			}
		}
		
		if (Math.random()>.5) 	_.opacity 	+= .05;
		else					_.opacity 	-= .05;
		
		_.opacity 	= Math.max(.5,Math.min(1,_.opacity));
		
		if (_.rotation >= 360) _.rotation = 0;
		
		if (DEBUG) {
			canvasM.fillStyle = "rgba(0,255,0,.5)";
			canvasM.fillRect(_.hitZoneX, _.hitZoneY, _.hitZoneW, _.hitZoneH);
		}
		
		canvasM.save();
		canvasM.translate(_.x + _.w/2, _.y + _.h/2 + _.floatingY - 16);
		canvasM.drawImage(imgCoin, -_.w/2+3, -_.h/2+3-canvasMy);
		canvasM.restore();
		
			
		_.checkIfIsOut();	
	}
	
	this.checkIfIsOut = function() {
		if (_.x + _.w < 0) {
			_.remove();
		}		
	}
	
	this.remove = function() {
		coins.splice(coins.indexOf(_),1);
	}
}

function createCoin() {
	var state = P.state;
	var r = Math.floor(Math.random()*3);
	
	var coin = new Coin(r);
	coin.init();
	coins.push(coin);
}