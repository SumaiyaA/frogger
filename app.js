// This is superclass
var character = function (x,y) {
    this.x = x;
    this.y = y;
};

// This is enemy subclass
// Enemies our player must avoid
var Enemy = function(x,y,speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = "images/enemy-bug.png";
    character.call(this,x,y);
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {

    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x + 100 <= 500)
        this.x += 100 * dt;
    else
        this.x = Math.floor(Math.random() * 100 - 200);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// This is player subclass
// Now write your own player class
// This class requires an update(), render() and
var Player = function(x,y) {
    // image sprite for our player
    this.sprite = "images/char-boy.png";
    character.call(this,x,y);
};

Player.prototype.update = function(dt) {
    if (this.y < -18) {
        this.startOver();
        alert("you win! GameOver");
    } else {
        this.checkCollisions();
    }
};

Player.prototype.startOver = function() {
    this.x = 200;
    this.y = 420;

};

// Draw the enemy on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// collision control are given
Player.prototype.checkCollisions = function() {
    for (var i = 0; i < allEnemies.length; i++) {
        if (allEnemies[i].x + 30 > this.x && this.x + 30 > allEnemies[i].x && allEnemies[i].y + 40 > this.y && this.y + 40 > allEnemies[i].y) {
            this.startOver();
        }
    }
};

var TILE_WIDTH = 101,
    TILE_HEIGHT = 83;
// a handleInput() method.
Player.prototype.handleInput = function(s) {
    if (s === 'left' && this.x > 0)
        this.x = this.x - 20;
    else if (s === 'right' && this.x < 400)
        this.x = this.x + 20;
    else if (s === 'up' && this.y > -50)
        this.y = this.y - 20;
    else if (s === 'down' && this.y < 400)
        this.y = this.y + 20;
};

// Now instantiate your objects.
var enemy1 = new Enemy(-100, 60);
var enemy2 = new Enemy(-165, 140);
var enemy3 = new Enemy(-200, 220);
var enemy4 = new Enemy(-350, 60);
var player1 = new Player(200, 400);

// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [enemy1, enemy2, enemy3, enemy4];
var player = player1;

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
