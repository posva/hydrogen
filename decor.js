function Decor() {

  this.backgroundX = 0;
  this.frontX = 0;

  this.draw = function() {

    decorBackground.draw(canvasMy);

    for (var i = stars.length; i--;) {
      stars[i].draw();
    }

    decorBackgroundFront.draw(canvasMy*2);
    nuage.draw(canvasMy);
  }
}

function HUD() {

  this.draw = function() {
    canvasHUD.save();
    canvasHUD.font = '200 18px Helvetica Neue';
    canvasHUD.translate(GAME_W-120, 47);
    canvasHUD.fillStyle = 'white';
    canvasHUD.textAlign = 'right';
    canvasHUD.fillText(P.energy+" eV", 0, 0);
    canvasHUD.restore();

    canvasHUD.drawImage(img[currentElement].HUDbackgroundtopright, GAME_W-247, 0);
    canvasHUD.drawImage(img[currentElement].picto, GAME_W-100, 20);
  }
}

function ImgLoop(c, image, elemX, elemY, elemSpeedX, elemSpeedY) {

  this.speedX  = elemSpeedX;
  this.speedY  = elemSpeedY;
  this.context = c;
  this.img     = image;
  this.x       = elemX;
  this.y       = elemY;

  if (P.state == 2) this.y = -30;

  this.draw = function(cY) {

    cY = cY | 0;

    this.x += this.speedX;

    this.context.drawImage(this.img, this.x, this.y+cY);

    if (this.img.width - -this.x <= GAME_W) {
      this.context.drawImage(this.img, (this.img.width - -this.x), this.y+cY);

      if (this.img.width - -this.x <= 0) this.x = 0;
    }
  }
}
