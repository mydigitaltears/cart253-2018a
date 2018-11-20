// Project 3 Prototype 1
// I want to make a fun and simple roleplaying game
// in which the player explores a natural kind of
// environement and interacts with different elements
// in nature. For this I'll use p5 play to use sprite animations

var SCENE_W = 1600;
var SCENE_H = 1600;


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
  treeSprite = loadAnimation("assets/images/tree.png");
  grassSprite = loadAnimation("assets/images/grass.png");
}

// setup function
function setup() {
  createCanvas(800,600);
  background("green");
  frameRate(30);
  imageMode(CENTER);
  for (var i=0;i<25;i++){
    myTree = new Tree(random(SCENE_W), random(SCENE_H), 30,60);
    myTree.createTree();
  }
  for (var i=0;i<500;i++){
    myGrass = new Grass(random(SCENE_W), random(SCENE_H), 30,60);
    myGrass.createGrass();
  }
  myAvatar = new Avatar(SCENE_W/2, SCENE_H/2, 5, 20);
  myAvatar.createAvatar();
  //set the existing sprites' depths in relation to their position
  for(var i=0; i<allSprites.length; i++) {
    var pos = allSprites[i].position.y;
    var hei = allSprites[i].height/2;
    allSprites[i].depth = pos+hei;
  }
}

// draw function
function draw() {
  background("green");
  drawSprites();
  myAvatar.moveAvatar();
  myAvatar.handleInput();
  myAvatar.stop();
  myAvatar.camera();
}

function keyReleased(){
  myAvatar.keyReleased();
}
function keyPressed(){
  myAvatar.keyPressed();
}
