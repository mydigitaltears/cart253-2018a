// Project 3 Prototype 1
// I want to make a fun and simple roleplaying game
// in which the player explores a natural kind of
// environement and interacts with different elements
// in nature. For this I'll use p5 play to use sprite animations

// Full Scene width and height
var SCENE_W = 1000;
var SCENE_H = 1000;


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
  f1AUP = loadAnimation("assets/images/friend1_0011.png","assets/images/friend1_0010.png",
  "assets/images/friend1_0012.png","assets/images/friend1_0010.png");
  f1ADOWN = loadAnimation("assets/images/friend1_0002.png","assets/images/friend1_0001.png",
  "assets/images/friend1_0003.png","assets/images/friend1_0001.png");
  f1ALEFT = loadAnimation("assets/images/friend1_0005.png","assets/images/friend1_0004.png",
  "assets/images/friend1_0006.png","assets/images/friend1_0004.png");
  f1ARIGHT = loadAnimation("assets/images/friend1_0008.png","assets/images/friend1_0007.png",
  "assets/images/friend1_0009.png","assets/images/friend1_0007.png");
  f1SUP = loadAnimation("assets/images/friend1_0010.png");
  f1SDOWN = loadAnimation("assets/images/friend1_0001.png");
  f1SLEFT = loadAnimation("assets/images/friend1_0004.png");
  f1SRIGHT = loadAnimation("assets/images/friend1_0007.png");
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
  createCanvas(windowWidth,windowHeight-10);
  background("green");
  frameRate(30);
  imageMode(CENTER);
  // Creating trees at random places
  myTrees = new Group();
  for (var i=0;i<10;i++){
    myTree = new Tree(random(SCENE_W), random(SCENE_H), 80,150);
    myTree.createTree();
    myTree.sprite.addToGroup(myTrees);
  }
  // Creating grass at random places
  for (var i=0;i<100;i++){
    myGrass = new Grass(random(SCENE_W), random(SCENE_H), 30,60);
    myGrass.createGrass();
  }
  // Creating flowers at random palces
  for (var i=0;i<50;i++){
    myFlower = new Flower(random(SCENE_W), random(SCENE_H), 30,60);
    myFlower.createFlower();
  }
  // Avatar setup
  var randX=random(SCENE_W);
  var randY=random(SCENE_H);
  myTree = new Tree(randX,randY, 80,150);
  myTree.createTree();
  myTree.sprite.addToGroup(myTrees);
  myFriend = new Friend(randX, randY+15, 20);
  myFriend.createFriend();
  myAvatar = new Avatar(SCENE_W/2, SCENE_H/2, 20);
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
  myAvatar.showEndBar();
  myFriend.moveFriend();
  myFriend.animation();
  myFriend.collide();
  checkDistance();
  gotchu();
}

function keyReleased(){
  myAvatar.keyReleased();
}
function keyPressed(){
  myAvatar.keyPressed();
}

function gotchu(){
  if(keyCode === 32){
    if(myAvatar.sprite.overlap(myFriend.sprite)){
      myFriend.catched=true;

    }
  }
  if(myFriend.catched == true){
    //myFriend.sprite.position.x=myAvatar.sprite.position.x+20;
    myFriend.vy=myAvatar.vy;
    myFriend.vx=myAvatar.vx;
    myFriend.stop=true;
    //myFriend.sprite.position.y=myAvatar.sprite.position.y+20;
    console.log("catch");
  }
}

function checkDistance(){
  var xd = abs(myAvatar.sprite.position.x-myFriend.sprite.position.x);
  var yd = abs(myAvatar.sprite.position.y-myFriend.sprite.position.y);

  //console.log(xd,yd);
  if (xd < 60 && yd < 60){
    myFriend.start = true;
  }
  if (xd+yd < 100 && myFriend.start == true && myFriend.stop == false){
    if (xd>yd){

      if (myAvatar.sprite.position.x>myFriend.sprite.position.x){
        // myFriend.vx=-7;
        // myFriend.vy=0;
        myFriend.orientation = f1ALEFT;
      }
      else {
        // myFriend.vx=7;
        // myFriend.vy=0;
        myFriend.orientation = f1ARIGHT;
      }
    }
    else if (xd<yd){
      if (myAvatar.sprite.position.y>myFriend.sprite.position.y){
        // myFriend.vy=-7;
        // myFriend.vx=0;
        myFriend.orientation = f1AUP;
      }
      else {
        // myFriend.vy=7;
        // myFriend.vx=0;
        myFriend.orientation = f1ADOWN;
      }
    }

  }
}
