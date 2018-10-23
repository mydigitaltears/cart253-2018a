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
  ////// Fixed ////// (changed "keyDown" to "keyIsDown" and added "this." before the actual key)
  if (keyIsDown(this.upKey)) {
    ////// Fixed ////// (removed the "-" so the paddle go up on upkey)
    this.vy = this.speed;
  }
  else if (keyIsDown(this.downKey)) {
    this.vy = -this.speed;
  }
  ////// Fixed ////// (added a vy value to the paddles so they appear)
  else {
    this.vy=0;
  }
}

// update()
// Update y position based on velocity
// Constrain the resulting position to be within the canvas
Paddle.prototype.update = function() {
  this.y += this.vy;
  ////// Fixed ////// (changed "hight" to "height", also changed "constraint" to "constrain")
  this.y = constrain(this.y,0,height-this.h);
}

// display()
//
// Draw the paddle as a rectangle on the screen
////// FIXED ////// (changed "disploy" to "display" and removed a ")" after function)
Paddle.prototype.display = function() {
  ////// Fixed ////// (added a fill)
  fill(255);
  ////// Fixed ////// (changed "rectangle" to "rect")
  rect(this.x,this.y,this.w,this.h);
}
