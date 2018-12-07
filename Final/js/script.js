// Final project for cart 253!
// By: Xavier Touikan
//
// I made a hide and seek kind of game where the user
// looks for his friends in a forest. When the user approaches
// one of his friends they will start to flee and he will have
// to try to catch them. I wanted to implement a boost mechanic
// that makes the user faster than the bots, but slower at normal
// speed. Finally I did try to implement a kind of lvlup system
// where the user gain pers on each level, but I'm unsure of the
// balance yet. Every level will increase the number of friend to
// find by 1 and the timer by 5 seconds.

// Full Scene width and height
var SCENE_W = 1800;
var SCENE_H = 1800;
// timer var
var timer = 45;
var gameStart = false;
var nbFriends = 1;
var myFriends = [];
var speed = 6;

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
  // same process for the friend animation
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
  background(0,200,100);
  createCanvas(windowWidth,windowHeight-10);
  // found out that using a reset function is better than
  // calling setup()
  resetSketch();

} // end of setup

// reset function()
function resetSketch() {
  background(0,200,100);
  frameRate(30);
  imageMode(CENTER);
  // Creating trees at random places
  myTrees = new Group();
  for (var i=0;i<90;i++){
    myTree = new Tree(random(SCENE_W), random(SCENE_H), 80,150);
    myTree.createTree();
    myTree.sprite.addToGroup(myTrees);
  }
  // Creating grass at random places
  myGrasses = new Group();
  for (var i=0;i<500;i++){
    myGrass = new Grass(random(SCENE_W), random(SCENE_H), 30,60);
    myGrass.createGrass();
    myGrass.sprite.addToGroup(myGrasses);
  }
  // Creating flowers at random palces
  myFlowers = new Group();
  for (var i=0;i<200;i++){
    myFlower = new Flower(random(SCENE_W), random(SCENE_H), 30,60);
    myFlower.createFlower();
    myFlower.sprite.addToGroup(myFlowers);
  }
  // creating friends behind trees
  for (var i=0;i<nbFriends;i++){
    var randX=random(SCENE_W);
    var randY=random(SCENE_H);
    myTree = new Tree(randX,randY, 80,150);
    myTree.createTree();
    myTree.sprite.addToGroup(myTrees);
    myFriend = new Friend(randX, randY+15, 20);
    myFriend.createFriend();
    myFriends.push(myFriend);
  }
  // avatar setup
  myAvatar = new Avatar(windowWidth/2,windowHeight/2, 20);
  myAvatar.createAvatar();
  //set the existing sprites' depths in relation to their position
  for(var i=0; i<allSprites.length; i++) {
    var pos = allSprites[i].position.y;
    var hei = allSprites[i].height/2;
    allSprites[i].depth = pos+hei;
  }
  // starting message
  drawSprites();
  fill(0,200,100,200);
  noStroke();
  rectMode(CENTER);
  rect(windowWidth/2,windowHeight/2-50,windowWidth-200,windowHeight-200);
  textAlign(CENTER);
  textSize(30);
  textStyle(BOLD);
  fill(255,255,255);
  text("-> You are playing hide and seek in the forest, catch all of your friends to win", windowWidth/2,windowHeight/2-200);
  text("-> Use the arrow keys to move and shift to sprint", windowWidth/2,windowHeight/2-100);
  text("-> Watch your stamina bar", windowWidth/2,windowHeight/2);
  text("-> press the ENTER key to start the game!", windowWidth/2,windowHeight/2+100);
}

// draw function
function draw() {
  // gamestart function to start playing
  if(!gameStart){
    myAvatar.camera();
    if(keyCode === ENTER){
      gameStart = true;
    }
  }
  // main part of the draw function
  else if(gameStart && timer > 0){
    background(0,200,100);
    drawSprites();
    myAvatar.moveAvatar();
    myAvatar.showEndBar();
    myAvatar.handleInput();
    myAvatar.camera();
    myAvatar.stop();
    myAvatar.collide();
    for(var i=0; i<myFriends.length; i++){
      myFriends[i].moveFriend();
      myFriends[i].animation();
      myFriends[i].collide();
    }
    checkDistance();
    gotchu();
    if(frameCount%30==0){
      timer--;
    }
  }
  // if the user runs out of time
  else if (timer == 0){
    timer = 0;
    text("FAILED, you reached the lvl "+nbFriends, camera.position.x,camera.position.y)
    text("Press ENTER to restart", camera.position.x,camera.position.y+70);
    noLoop();
    // press ENTER to reset the game
    if (keyCode === ENTER){
      // removing the sprites in a for loop wasn't working properly
      // so I had to use this do / while function
      do {
          allSprites[0].remove();
      } while(allSprites[0] !== undefined)

      // removing the friends
      for(var i=0;i<myFriends.length;i++){
        myFriends[i].catched=false;
        myFriends.splice(0);
      }
      // resetting the settings
      speed = 6;
      myAvatar.endurance = 100;
      myAvatar.refillSpeed = 1;
      timer = 45;
      nbFriends=1;
      resetSketch();
      loop();
    }
  }
} // end of draw

// success function()
function success(){
  // text on success
  fill(255,255,255);
  text("SUCCESS", camera.position.x,camera.position.y+70)
  text("Press the ENTER to increase your base speed", camera.position.x,camera.position.y+140);
  text("Press the SPACE to increase your endurance / refill speed", camera.position.x,camera.position.y+180);
  noLoop();
  // two choice of power ups on success
  // first choice, increase speed
  if (keyCode === ENTER) {
    speed += 0.2;
    do {
        allSprites[0].remove();
    } while(allSprites[0] !== undefined)

    for(var i=0;i<myFriends.length;i++){
      myFriends[i].catched=false;
      myFriends.splice(0);
    }
    timer = 45+5*nbFriends;
    nbFriends++;
    resetSketch();
    loop();
  }
  // 2nd choice, increase stamina
  else if (keyCode === 32) {
    myAvatar.endurance += 10;
    myAvatar.refillSpeed += 0.1;
    do {
        allSprites[0].remove();
    } while(allSprites[0] !== undefined)

    for(var i=0;i<myFriends.length;i++){
      myFriends[i].catched=false;
      myFriends.splice(0);
    }
    timer = 45+5*nbFriends;
    nbFriends++;
    resetSketch();
    loop();
  }
}

// keyreleased for animation purpose
function keyReleased(){
  myAvatar.keyReleased();
}
// keyPressed to restart the loop and aniation purpose too
function keyPressed(){
  if(keyCode == ENTER || keyCode === 32){
    loop();
  }
  myAvatar.keyPressed();
}

// function that counts the overlaps for catch
// and tracks the number of friends already catched
function gotchu(){
  var z = nbFriends;
  for(var i=0; i<myFriends.length; i++){
    if(myAvatar.sprite.overlap(myFriends[i].sprite)){
      myFriends[i].catched=true;
    }
    if(myFriends[i].catched == true){
      myFriends[i].stop=true;
      text("You Got me!",myFriends[i].sprite.position.x,myFriends[i].sprite.position.y-30);
      z--;
      console.log(z);
    }
  }
  if(z==0){
    success();
  }
}

// check the distance for the flee mechanic
function checkDistance(){
  for(var i=0; i<myFriends.length; i++){
    var xd = abs(myAvatar.sprite.position.x-myFriends[i].sprite.position.x);
    var yd = abs(myAvatar.sprite.position.y-myFriends[i].sprite.position.y);
    // when the user is under 200 points near a friend this one will start to flee
    if (xd < 200 && yd < 200){
        myFriends[i].start = true;
    }
    // the friend will go in the opposite direction of the user
    if (xd+yd < 200 && myFriends[i].start == true && myFriends[i].stop == false){
      if (xd>yd){
        if (myAvatar.sprite.position.x>myFriends[i].sprite.position.x){
          myFriends[i].orientation = f1ALEFT;
        }
        else {
          myFriends[i].orientation = f1ARIGHT;
        }
      }
      else if (xd<yd){
        if (myAvatar.sprite.position.y>myFriends[i].sprite.position.y){
          myFriends[i].orientation = f1AUP;
        }
        else {
          myFriends[i].orientation = f1ADOWN;
        }
      }
    }
  }
}
