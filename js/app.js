// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    // Set the initial location so that the bug starts off the
    // canvas and "walks" onto it on one of the three strips
    // of rock set by the y position
    this.x = -101;
    this.y = Math.floor(Math.random()*3 + 1) * 83 - 83 * 0.3;
    // Set the speed randomly
    this.speed = Math.floor(Math.random() * 200) + 100;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x < 505){
        this.x = this.x + this.speed * dt;
    }
    // If the enemy is off the canvas, reset the enemy's
    // position and speed
    else {
        this.x = -101;
        this.y = Math.floor(Math.random()*3 +1) * 83 - 83 * 0.3;
        this.speed = Math.floor(Math.random() * 200) + 100;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = 202;
    this.y = 405;
};

// Updates the player's position
Player.prototype.update = function(dt) {
    // Resets the player's position if the player
    // reaches the water
    if (this.y < 40){
        this.x = 202;
        this.y = 405;
    }
    // Resets the player's position if the player collides
    // with an enemy by comparing the positions of each enemy
    // and the player
    for(var i = 0; i < allEnemies.length; i++) {
        // If the player collides with the enemy from below
        if ((allEnemies[i].y < this.y) && (allEnemies[i].y + 20 > this.y)){
            if ((allEnemies[i].x < this.x) && (this.x < (allEnemies[i].x + 80))){
                this.x = 202;
                this.y = 405;
            }
            else if((allEnemies[i].x < this.x + 80) && (allEnemies[i].x + 80 > this.x + 80)){
                this.x = 202;
                this.y = 405;
            }
        }
        // If the player collides with the enemy from above
        else if((allEnemies[i].y < this.y + 20) && (allEnemies[i].y + 20 > this.y + 20)){
            if ((allEnemies[i].x < this.x) && (allEnemies[i].x + 80 > this.x)){
                this.x = 202;
                this.y = 405;
            }
            else if ((allEnemies[i].x < this.x + 80) && (allEnemies[i].x + 80 > this.x + 80)){
                this.x = 202;
                this.y = 405;
            }
        }
    }
};

// Draws the player on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Takes in the keyboard input and moves the player
Player.prototype.handleInput = function(_key) {
    if (_key == 'left') {
        if (this.x > 0){
            this.x = this.x - 101;
        }
    }
    else if (_key == 'up') {
        if (this.y > 0) {
            this.y = this.y - 83;
        }
    }
    else if (_key == 'right') {
        if (this.x < 404) {
            this.x = this.x + 101;
        }
    }
    else if (_key == 'down') {
        if (this.y < 400) {
            this.y = this.y + 83;
        }
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var player = new Player();
var allEnemies = [new Enemy(), new Enemy(), new Enemy()];

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