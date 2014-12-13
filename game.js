var Player;

function Game() {
  this.width = 880;
  this.height = 440;

  this.init = function() {
    Player = new Player();
    Player.init();
  }
}
