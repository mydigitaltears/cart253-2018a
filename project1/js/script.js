/******************************************************

Game - Chaser
Pippin Barr

A simple game of cat and mouse.

Physics-based movement, keyboard controls, health/stamina,
sprinting, random movement, screen wrap.

******************************************************/

// Track whether the game is over
var gameOver = false;

// Player position, size, velocity
var playerX;
var playerY;
var playerRadius = 40;
var playerVX = 0;
var playerVY = 0;
var playerMaxSpeed = 4;
// Player health
var playerHealth;
var playerMaxHealth = 255;
// Player image
var playerImage;
//dying speed
var dyingSpeed = 0.5;

// Prey position, size, velocity
var preyX;
var preyY;
var preyRadius = 40;
var preyVX;
var preyVY;
var tx = 0;
var ty = 0;
var preySpeed;
var preyNormalSpeed = 1;
var preyFastSpeed;
// Prey health
var preyHealth;
var preyMaxHealth = 100;

// Prey image
var preyImage;

// Amount of health obtained per frame of "eating" the prey
var eatHealth = 5;
// Number of prey eaten during the game
var preyEaten = 0;
// lvl up random number
var lvlup;
// Background image
var bg;
// Sucking sound
var mySound;
// Lvlup sound
var lvlSound;
// Boolean for bitting
var bite = false;
// toggle for shift at beginning
var pressShift = false;

//preload images
function preload() {
  playerImage = loadImage("assets/images/M.png");
  preyImage = loadImage("assets/images/H.png");
  mySound = loadSound("assets/sounds/mysound.mp3")
  lvlSound = loadSound("assets/sounds/lvl.mp3")
}
// setup()
//
// Sets up the basic elements of the game
function setup() {
  bg = loadImage("assets/images/P.jpg");
  createCanvas(900,680);

  noStroke();

  setupPrey();
  setupPlayer();
}

// setupPrey()
//
// Initialises prey's position, velocity, and health
function setupPrey() {
  preyX = width/5;
  preyY = height/2;
  preyVX = -preySpeed;
  preyVY = preySpeed;
  preyHealth = preyMaxHealth;
}

// setupPlayer()
//
// Initialises player position and health
function setupPlayer() {
  playerX = 4*width/5;
  playerY = height/2;
  playerHealth = playerMaxHealth;
}

// draw()
//
// While the game is active, checks input
// updates positions of prey and player,
// checks health (dying), checks eating (overlaps)
// displays the two agents.
// When the game is over, shows the game over screen.
function draw() {
  background(0,0,0);
  if (!gameOver) {
    tint(255);
    imageMode(CORNER);
    background(bg);
    handleInput();

    movePlayer();
    movePrey();

    updateHealth();
    checkEating();

    drawPrey();
    drawPlayer();
    console.log(preySpeed);
    console.log(pressShift);
    lvl();
  }
  else {
    showGameOver();
  }
}



// handleInput()
//
// Checks arrow keys and adjusts player velocity accordingly
function handleInput() {
  // Check for horizontal movement
  if (keyIsDown(LEFT_ARROW)) {
    playerVX = -playerMaxSpeed;
  }
  else if (keyIsDown(RIGHT_ARROW)) {
    playerVX = playerMaxSpeed;
  }
  else {
    playerVX = 0;
  }

  // Check for vertical movement
  if (keyIsDown(UP_ARROW)) {
    playerVY = -playerMaxSpeed;
  }
  else if (keyIsDown(DOWN_ARROW)) {
    playerVY = playerMaxSpeed;
  }
  else {
    playerVY = 0;
  }

  // Press shift advice
  if(!pressShift){
    textFont("Helvetica");
    textSize(25);
    textAlign(CENTER,CENTER);
    noStroke();
    fill(255,0,0);
    text("PRESS SHIFT TO GO FASTER, BUT LOSE MORE BLOOD \n \n BITE ALL HUMANS",width/2,height/10);
  }
  //Sprint feature
  if(keyIsDown(SHIFT)){
    pressShift = true;
    playerVX *= 3;
    playerVY *= 3;
    playerHealth = constrain(playerHealth - (dyingSpeed*3),0,playerMaxHealth);
  }
}

// movePlayer()
//
// Updates player position based on velocity,
// wraps around the edges.
function movePlayer() {
  // Update position
  playerX += playerVX;
  playerY += playerVY;

  // Wrap when player goes off the canvas
  playerX = constrain(playerX,0+(playerRadius/2),width-(playerRadius/2));
  playerY = constrain(playerY,0+(playerRadius/2),height-(playerRadius/2));
}

// updateHealth()
//
// Reduce the player's health (every frame)
// Check if the player is dead
function updateHealth() {
  // Reduce player health, constrain to reasonable range
  playerHealth = constrain(playerHealth - dyingSpeed,0,playerMaxHealth);
  // Check if the player is dead
  if (playerHealth === 0) {
    // If so, the game is over
    gameOver = true;
  }
}

// checkEating()
//
// Check if the player overlaps the prey and updates health of both
function checkEating() {
  // Get distance of player to prey
  var d = dist(playerX,playerY,preyX,preyY);
  // Check if it's an overlap
  if (d < playerRadius + preyRadius) {
    // Increase the player health
    playerHealth = constrain(playerHealth + eatHealth,0,playerMaxHealth);
    // Reduce the prey health
    preyHealth = constrain(preyHealth - eatHealth,0,preyMaxHealth);
    // Increase prey speed while bitting
    bite = true;
    console.log(bite);
    // Check if the prey died
    if (preyHealth === 0) {
      //lvl up system every 5 prey eaten
      if((preyEaten+1)%5==0&&preyEaten>1){
        //play lvlup sound
        lvlSound.setVolume(0.2);
        lvlSound.play();
        //lvlup random perk
        lvlup = Math.floor(Math.random()*5);
        // reduce prey max preyMaxSpeed
        if (lvlup == 0){
          preyNormalSpeed -= 2;
        }
        //increase player playerMaxSpeed
        if (lvlup == 1){
          playerMaxSpeed+=2;
        }
        //increase player max health
        if (lvlup == 2){
          playerMaxHealth += 50;
        }
        // increase the eatHealth
        if (lvlup == 3){
          eatHealth+=2;
        }
        // increse prey max health
        if (lvlup == 4){
          preyMaxHealth += 50;
        }
        //full health restored every lvl up
        playerHealth=playerMaxHealth;
      }
      // Move the "new" prey to a random position
      preyX = random(0,width);
      preyY = random(0,height);
      // Give it full health
      preyHealth = preyMaxHealth;
      // Track how many prey were eaten
      preyEaten++;
      // increase prey max speed at every prey eaten
      preyNormalSpeed+=0.5;
      // Increase player dyingSpeed at every prey eaten
      dyingSpeed += 0.05;
      // Play sucking sound
      mySound.setVolume(0.5);
      mySound.play();
    }
  }
  else {
    bite = false;
  }

}

function lvl(){
  // Prepare our typography
  if(preyEaten>4){
    textFont("Helvetica");
    textSize(20);
    textAlign(CENTER,CENTER);
    noStroke();
    fill(255,255,255);
    // Tell them they won!
    if (lvlup == 0){
      text("LVL: "+int(preyEaten/5)+" HUMANS RUN SLOWER!",width/2,height/1.1);
    }
    //increase player playerMaxSpeed
    if (lvlup == 1){
      text("LVL: "+int(preyEaten/5)+" YOU GO FASTER!",width/2,height/1.1);
    }
    //increase player max health
    if (lvlup == 2){
      text("LVL: "+int(preyEaten/5)+" YOU ARE BIGGER!",width/2,height/1.1);
    }
    // increase the eatHealth
    if (lvlup == 3){
      text("LVL: "+int(preyEaten/5)+" YOU DRINK FASTER!",width/2,height/1.1);
    }
    // increase prey max health
    if (lvlup == 4){
      text("LVL: "+int(preyEaten/5)+" HUMANS ARE FATTER!",width/2,height/1.1);
    }
  }
}

// movePrey()
//
// Moves the prey based on random velocity changes
function movePrey() {
  preyFastSpeed = preyNormalSpeed+10;
  if (bite) {
    preySpeed = preyFastSpeed;
  }
  else {
    preySpeed = preyNormalSpeed;
  }

  //use the map to convert the 0 to 1 value of noise to actual prey speed
  preyVX = map(noise(tx),0,1,-preySpeed,preySpeed);
  preyVY = map(noise(ty),0,1,-preySpeed,preySpeed);

  // Update prey position based on velocity
  preyX += preyVX;
  preyY += preyVY;
  tx += 0.02;
  ty += 0.03;

  // Screen wrapping
  preyX = constrain(preyX,0+(preyRadius/2),width-(preyRadius/2));
  preyY = constrain(preyY,0+(preyRadius/2),height-(preyRadius/2));
}

// drawPrey()
//
// Draw the prey as an ellipse with alpha based on health
function drawPrey() {
  tint(255,preyHealth*2+50);
  // Make the prey radius vary with it's health
  preyRadius = (preyHealth/2)+60;
  imageMode(CENTER);
  image(preyImage, preyX, preyY, preyRadius+10, preyRadius+10);
}

// drawPlayer()
//
// Draw the player as an ellipse with alpha based on health
function drawPlayer() {
  tint(255,playerHealth*2+50);
  // Make the player radius vary with it's health
  playerRadius = (playerHealth/4)+20;
  imageMode(CENTER);
  image(playerImage, playerX, playerY, playerRadius+10, playerRadius+10);
  //ellipse(playerX,playerY,playerRadius/3,playerRadius/3);
}

// showGameOver()
//
// Display text about the game being over!
function showGameOver() {
  textSize(32);
  textAlign(CENTER,CENTER);
  fill(255);
  var gameOverText = "GAME OVER\n";
  gameOverText += "You've bitten " + preyEaten + " humans\n";
  gameOverText += "and reached lvl "+int(preyEaten/5)+"\n"
  gameOverText += "before you died."
  gameOverText += "\n Press enter to restart!"
  text(gameOverText,width/2,height/2);
  //restart game on enter, restore all default values
  if (keyIsDown(ENTER)) {
    gameOver = false;
    playerMaxHealth = 255;
    playerHealth = playerMaxHealth;
    playerRadius = 40;
    playerMaxSpeed = 4;
    dyingSpeed = 0.5;
    preyRadius = 40;
    tx = 0;
    ty = 0;
    preyNormalSpeed = 1;
    preyMaxHealth = 100;
    preyEaten = 0;
    eatHealth = 5;
    pressShift = false;
    setupPrey();
    setupPlayer();
  }
}
