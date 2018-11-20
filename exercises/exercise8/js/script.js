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
// orientation variable to keep track of the avatar orientation so
// when the avatar stops the stopped animation face the good way
let orientation;
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
  // animation for when the avatar is stopped
  animSUP = loadAnimation("assets/images/avatarI_0010.png");
  animSDOWN = loadAnimation("assets/images/avatarI_0001.png");
  animSLEFT = loadAnimation("assets/images/avatarI_0004.png");
  animSRIGHT = loadAnimation("assets/images/avatarI_0007.png");
}

// setup function
function setup() {
  createCanvas(640,480);
  background("green");
  frameRate(30);
  imageMode(CENTER);
  myAvatar = new Avatar(width/2, height/2, 2, 20);
  myAvatar.createAvatar();
}

// draw function
function draw() {
  background("green");
  drawSprites();
  myAvatar.moveAvatar();
  myAvatar.handleInput();
  myAvatar.stop();
}

function keyReleased(){
  myAvatar.keyReleased();
}
function keyPressed(){
  myAvatar.keyPressed();
}
