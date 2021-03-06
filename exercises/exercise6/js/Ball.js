// Ball
//
// A class to define how a ball behaves. Including bouncing on the top
// and bottom edges of the canvas, going off the left and right sides,
// and bouncing off paddles.

// Ball constructor
//
// Sets the properties with the provided arguments
function Ball(x,y,vx,vy,size,speed) {
  this.x = x;
  this.y = y;
  this.vx = vx;
  this.vy = vy;
  this.size = size;
  this.speed = speed;
}

// update()
//
// Moves according to velocity, constrains y to be on screen,
// checks for bouncing on upper or lower edgs, checks for going
// off left or right side.
//////// FIXED //////// ("faction" to "function", also changed "updated" to "update")
Ball.prototype.update = function () {
  // Update position with velocity
  ////// Fixed ////// (added a "+")
  this.x += this.vx;
  this.y += this.vy;

  // Constrain y position to be on screen
  this.y = constrain(this.y,0,height-this.size);

  // Check for touching upper or lower edge and reverse velocity if so
  ////// Fixed ////// (changed "=" to a "===")
  if (this.y === 0 || this.y + this.size === height) {
    this.vy = -this.vy;
  }
}

// isOffScreen()
//
// Checks if the ball has moved off the screen and, if so, returns true.
// Otherwise it returns false.
Ball.prototype.isOffScreen = function () {
  // Check for going off screen and reset if so
  ////// FIXED ////// ("iff" to "if" and "++" to "+", also changed the "&&" to an "||")
  if (this.x + this.size < 0 || this.x > width) {
    return true;
  }
  else {
    return false;
  }
}

// display()
//
// Draw the ball as a rectangle on the screen
Ball.prototype.display = function () {
  ////// Fixed ////// (added a fill)
  fill(255);
  ////// FIXED ////// (added a ","" between the two arguments, also added the with and height of the rectangle)
  rect(this.x, this.y, this.size, this.size);
}

// handleCollision(paddle)
//
// Check if this ball overlaps the paddle passed as an argument
// and if so reverse x velocity to bounce
////// FIXED ////// (removed a "()" and added a "e" at prototype)
Ball.prototype.handleCollision = function(paddle) {
  // Check if the ball overlaps the paddle on x axis
  if (this.x + this.size > paddle.x && this.x < paddle.x + paddle.w) {
    // Check if the ball overlaps the paddle on y axis
    if (this.y + this.size > paddle.y && this.y < paddle.y + paddle.h) {
      // If so, move ball back to previous position (by subtracting current velocity)
      this.x -= this.vx;
      this.y -= this.vy;
      // Reverse x velocity to bounce
      ////// Fixed ////// (velocity not reversed, added a "-" before this.vx)
      this.vx = -this.vx;
    }
  }
}

// reset()
//
// Set position back to the middle of the screen
////// Fixed ////// (changed "rest" to "reset")
Ball.prototype.reset = function () {
  this.x = width/2;
  this.y = height/2;
}
