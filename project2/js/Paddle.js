// Paddle
//
// A class that defines how a paddle behaves, including the ability
// to specify the input keys to move it up and down

// Paddle constructor
//
// Sets the properties with the provided arguments or defaults
function Paddle(x,y,w,h,speed,downKey,upKey,score) {
  this.x = x;
  this.y = y;
  this.vx = 0;
  this.vy = 0;
  this.w = w;
  this.h = h;
  this.speed = speed;
  this.downKey = downKey;
  this.upKey = upKey;
  //////// NEW ////////
  // added score
  this.score = score;
  //////// END NEW ////////
}

// handleInput()
//
// Check if the up or down keys are pressed and update velocity
// appropriately
Paddle.prototype.handleInput = function() {
  if (keyIsDown(this.upKey)) {
    this.vy = -this.speed;
  }
  else if (keyIsDown(this.downKey)) {
    this.vy = this.speed;
  }
  else {
    this.vy = 0;
  }
}

// update()
// Update y position based on velocity
// Constrain the resulting position to be within the canvas
Paddle.prototype.update = function() {
  this.y += this.vy;
  this.y = constrain(this.y,0,height-this.h);
}

// display()
//
// Draw the paddle as a rectangle on the screen
Paddle.prototype.display = function() {
  ////// NEW //////
  // fill that goes in reverse with the background
  fill((Math.sin(t/100)*200)*-1,(Math.cos(t/100)*150)*-1,(Math.cos(t/100)*50)*-1);
  ////// END NEW //////
  rect(this.x,this.y,this.w,this.h);
}

////// NEW //////
// scored() function that change the height and inset of paddles
Paddle.prototype.scored = function() {
  // augment score
  this.score ++;
  if (this.score < 10){
    // reduce paddle height up to a max
    this.h-=this.score;
  }
}
// slowed function, reduce the speed
Paddle.prototype.slowed = function () {
  this.speed = 6;
}
// unslowed function, puts the speed back to normal
Paddle.prototype.unslowed = function () {
  this.speed = 10;
}
////// END NEW //////
