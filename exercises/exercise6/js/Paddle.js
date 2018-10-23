// Paddle
//
// A class that defines how a paddle behaves, including the ability
// to specify the input keys to move it up and down
////// Fixed ////// (line should be in comment, added "//")
//Paddle constructor
////// Fixed ////// (same as above, added "//")
//Sets the properties with the provided arguments or defaults
////// Fixed ////// (changed "Pladdle" to "Paddle")
function Paddle(x,y,w,h,speed,downKey,upKey) {
  this.x = x;
  this.y = y;
  this.xv = 0;
  this.yv = 0;
  this.w = w;
  this.h = h;
  ////// Fixed ////// (changed "speeed" to "speed")
  this.speed = speed;
  this.downKey = downKey;
  this.upKey = upKey;
}

// handleInput()
//
// Check if the up or down keys are pressed and update velocity
// appropriately
////// Fixed ////// (changed "proto" to "prototype")
Paddle.prototype.handleInput = function() {
  ////// Fixed ////// (changed "keyDown" to "keyIsDown")
  if (keyIsDown(upKey)) {
    this.vy = -this.speed;
  }
  else if (keyIsDown(downKey)) {
    this.vy = -this.speed;
  }
}

// update()
// Update y position based on velocity
// Constrain the resulting position to be within the canvas
Paddle.prototype.update = function() {
  this.y += this.vy;
  this.y = constraint(this.y,0,hight-this.h);
}

// display()
//
// Draw the paddle as a rectangle on the screen
////// FIXED ////// (changed "disploy" to "display" and removed a ")" after function)
Paddle.prototype.display = function() {
  ////// Fixed ////// (changed "rectangle" to "rect")
  rect(this.x,this.y,this.w,this.h);
}
