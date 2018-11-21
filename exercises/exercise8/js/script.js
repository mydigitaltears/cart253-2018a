// Project 3 Prototype 1
// I want to make a fun and simple roleplaying game
// in which the player explores a natural kind of
// environement and interacts with different elements
// in nature. For this I'll use p5 play to use sprite animations

// Full Scene width and height
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
  // other animation for elements in nature (trees, flowers, grass, etc...)
  treeSprite = loadAnimation("assets/images/tree.png");
  grassSprite = loadAnimation("assets/images/grass.png");
  spriteTYFlower = loadAnimation("assets/images/tulippeJ.png");
  spriteTRFlower = loadAnimation("assets/images/tulippeR.png");
  spritePFlower = loadAnimation("assets/images/pinkF.png");
  spriteVFlower = loadAnimation("assets/images/purpleF.png");
  spriteWFlower = loadAnimation("assets/images/whiteF.png");
  spriteYFlower = loadAnimation("assets/images/yellowF.png");
}

// setup function
function setup() {
  // canvas is now the actual size of the camera
  createCanvas(800,600);
  background("green");
  frameRate(30);
  imageMode(CENTER);
  // Creating trees at random places
  myTrees = new Group();
  for (var i=0;i<50;i++){
    myTree = new Tree(random(SCENE_W), random(SCENE_H), 80,150);
    myTree.createTree();
    myTree.sprite.addToGroup(myTrees);
  }
  // Creating grass at random places
  for (var i=0;i<500;i++){
    myGrass = new Grass(random(SCENE_W), random(SCENE_H), 30,60);
    myGrass.createGrass();
  }
  // Creating flowers at random palces
  for (var i=0;i<500;i++){
    myFlower = new Flower(random(SCENE_W), random(SCENE_H), 30,60);
    myFlower.createFlower();
  }
  // Avatar setup
  myAvatar = new Avatar(SCENE_W/2, SCENE_H/2, 5, 5);
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
  myAvatar.collide();
}

function keyReleased(){
  myAvatar.keyReleased();
}
function keyPressed(){
  myAvatar.keyPressed();
}
