// MiddleWall

//MiddleWall constructor
function MiddleWall(x,y,w,h,vy){
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.vy = vy;
}

// update()
// Update y position based on velocity
// Constrain the resulting position to be within the canvas
MiddleWall.prototype.update = function() {
  this.y += this.vy;
  if(this.y < 0){
    this.vy = -this.vy;
  }
  if(this.y+this.h > height){
    this.vy = -this.vy;
  }
}

// display()
//
// Draw the paddle as a rectangle on the screen
MiddleWall.prototype.display = function() {
  ////// NEW //////
  // fill that goes in reverse with the background
  fill((Math.sin(t/100)*200)*-1,(Math.cos(t/100)*150)*-1,(Math.cos(t/100)*50)*-1);
  ////// END NEW //////
  rect(this.x,this.y,this.w,this.h);
}
