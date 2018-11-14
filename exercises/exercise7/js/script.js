// Project 3 Prototype 1
// I want to make a fun and simple roleplaying game
// in which the player explores a natural kind of
// environement and interacts with different elements
// in nature. For this I'll use p5 play to use sprite animations


// avatar variables
let avatarVX = 0;
let avatarVY = 0;
let avatarSpeed = 2;
let myAvatar;

// setup function
function setup() {
  createCanvas(640,480);
  background("green");
  frameRate(30);
  // trying to use a sprite for my avatar
  myAvatar = createSprite(width/2, height/2, 20, 20);
}

// draw function
function draw() {
  background("green");
  drawSprites();
  moveMyAvatar();
  handleInput();
}

// update avatar position with vx and vy
function moveMyAvatar(){
  myAvatar.position.x+= avatarVX;
  myAvatar.position.y+= avatarVY;
  if (myAvatar.position.x < 0){
    myAvatar.position.x= 0;
  }
  if (myAvatar.position.x > width){
    myAvatar.position.x = width;
  }
  if (myAvatar.position.y < 0){
    myAvatar.position.y = 0;
  }
  if (myAvatar.position.y > height){
    myAvatar.position.y = height;
  }
}

// basic input handler to move the avatar with arrowkeys
function handleInput() {
  // Check for horizontal movement
  if (keyIsDown(LEFT_ARROW)) {
    avatarVX = -avatarSpeed;
  }
  else if (keyIsDown(RIGHT_ARROW)) {
    avatarVX = avatarSpeed;
  }
  else {
    avatarVX = 0;
  }
  // Check for vertical movement
  if (keyIsDown(UP_ARROW)) {
    avatarVY = -avatarSpeed;
  }
  else if (keyIsDown(DOWN_ARROW)) {
    avatarVY = avatarSpeed;
  }
  else {
    avatarVY = 0;
  }
}
