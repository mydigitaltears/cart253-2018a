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
// orientation booleans to trigger the animation once
let upa = false;
let doa = false;
let lea = false;
let ria = false;


// preload function
function preload() {
  // I use 3 images for the walking animation, I think it's the way that my spritesheet works
  animUP = loadAnimation("assets/images/avatarI_0011.png","assets/images/avatarI_0010.png",
  "assets/images/avatarI_0012.png","assets/images/avatarI_0010.png");
  animDOWN = loadAnimation("assets/images/avatarI_0002.png","assets/images/avatarI_0001.png",
  "assets/images/avatarI_0003.png","assets/images/avatarI_0001.png");
  animLEFT = loadAnimation("assets/images/avatarI_0005.png","assets/images/avatarI_0004.png",
  "assets/images/avatarI_0006.png","assets/images/avatarI_0004.png");
  animRIGHT = loadAnimation("assets/images/avatarI_0008.png","assets/images/avatarI_0007.png",
  "assets/images/avatarI_0009.png","assets/images/avatarI_0007.png");
}

// setup function
function setup() {
  createCanvas(640,480);
  background("green");
  frameRate(30);
  imageMode(CENTER);
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
    lea=true;
  }
  else if (keyIsDown(RIGHT_ARROW)) {
    avatarVX = avatarSpeed;
    ria=true;
  }
  else {
    avatarVX = 0;
  }
  // Check for vertical movement
  if (keyIsDown(UP_ARROW)) {
    avatarVY = -avatarSpeed;
    upa=true;
  }
  else if (keyIsDown(DOWN_ARROW)) {
    avatarVY = avatarSpeed;
    doa=true;
  }
  else {
    avatarVY = 0;
  }
}

// keyReleased to falsify the animation booleans
function keyReleased() {
  if (keyCode === LEFT_ARROW){
    lea=false;
  }
  if (keyCode === RIGHT_ARROW){
    ria=false;
  }
  if (keyCode === DOWN_ARROW){
    doa=false;
  }
  if (keyCode === UP_ARROW){
    upa=false;
  }
}

function keyPressed() {
  if (lea === true){
    myAvatar.addAnimation("default", animLEFT);
  }
  else if (ria === true){
    myAvatar.addAnimation("default", animRIGHT);
  }
  if (doa === true){
    myAvatar.addAnimation("default", animDOWN);
  }
  if (upa === true){
    myAvatar.addAnimation("default", animUP);
  }
}
