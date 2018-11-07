// Basic OO Pong
// by Pippin Barr
//
// A primitive implementation of Pong with no scoring system
// just the ability to play the game with the keyboard.
//
// Arrow keys control the right hand paddle, W and S control
// the left hand paddle.
//
// Written with JavaScript OOP.

// Variable to contain the objects representing our ball and paddles
var ball;
var leftPaddle;
var rightPaddle;
////// NEW //////
var badballs = [];
var middlewall;
// start title trigger
var title = true;
// ending screen trigger
var gameover = false;
// t variable for the sin background function
var t = 0;
// many timeout viriables to put a delay on resets
var badballtimeoutl = false;
var badballtimeoutr = false;
var scoredtimeoutr = false;
var scoredtimeoutl = false;
////// END NEW ///////

// setup()
//
// Creates the ball and paddles
function setup() {
  createCanvas(640,480);
  // Create a ball
  ball = new Ball(width/2,height/2,5,5,10,5);
  // Create the right paddle with UP and DOWN as controls
  //////// NEW ////////
  // changed paddles height, added score as 0
  rightPaddle = new Paddle(width-10,height/2,10,100,10,DOWN_ARROW,UP_ARROW,0);
  // Create the left paddle with W and S as controls
  // Keycodes 83 and 87 are W and S respectively
  leftPaddle = new Paddle(0,height/2,10,100,10,83,87,0);
  //first badball of the array
  badballs.push( new BadBall(width/2,height/2,1,1,15,1));
  // middle wall
  middlewall = new MiddleWall(width/2,height/2,10,100,5);
  // reset the text proprieties on restart
  textSize(20);
  textAlign(CENTER);
  //////// END NEW ////////
}

// draw()
//
// Handles input, updates all the elements, checks for collisions
// and displays everything.
function draw() {
  ////// NEW //////
  // title screen
  if (title){
    background(0);
    textSize(30);
    text('PONG', width/2, height/2);
    textSize(20);
    text('Hit the white square and evade the red balls', width/2, height/1.6);
    text('Controls --> Left Player: "w" and "s", Right Player: "up" and "down"', width/2, height/1.4);
    text('The first player who scores 11 points wins!', width/2, height/1.3);
    text('press the mouse to start', width/2, height/1.1);
    textAlign(CENTER);
    fill(255);
    // trigger to start the game
    if (mouseIsPressed){
      title = false;
    }
  }
  // actual game starts here
  else if (gameover === false){
    // time variable for the sin function
    t ++;
    // Fill the background with a smooth sin function
    background(Math.sin(t/100)*200+150,Math.cos(t/100)*150+150,Math.cos(t/100)*50+150);
    ////// END NEW ///////

    leftPaddle.handleInput();
    rightPaddle.handleInput();
    leftPaddle.update();
    rightPaddle.update();
    leftPaddle.display();
    rightPaddle.display();

    ////// NEW //////
    // middle wall functions
    middlewall.display();
    middlewall.update();
    // maximum score for ending screen
    if(leftPaddle.score > 5 || rightPaddle.score > 5){
      gameover = true;
    }
    // ball display after 50 frames and in function of the set timeouts
    if(t>50 && !scoredtimeoutl && !scoredtimeoutr){
      ball.update();
      ball.display();
      ball.handleCollision(leftPaddle);
      ball.handleCollision(rightPaddle);
      // middle wall has the same collision proprieties as the paddles, I used the same function
      ball.handleCollision(middlewall);
    }
    // ball ofscreen / scoring part
    if (ball.isOffScreen() && ball.vx > 0) {
      scoredtimeoutl = true;
      leftPaddle.scored();
      ball.reset();
      setTimeout(function(){scoredtimeoutl=false},3000);
    }
    else if (ball.isOffScreen() && ball.vx < 0) {
      scoredtimeoutr = true;
      rightPaddle.scored();
      ball.reset();
      setTimeout(function(){scoredtimeoutr=false},3000);
    }
    // text for when a player scores
    if(scoredtimeoutl){
      fill((Math.sin(t/100)*200)*-1,(Math.cos(t/100)*150)*-1,(Math.cos(t/100)*50)*-1);
      text('LEFT PLAYER SCORE: '+leftPaddle.score+' ', width/2, height/1.1);
    }
    if(scoredtimeoutr){
      fill((Math.sin(t/100)*200)*-1,(Math.cos(t/100)*150)*-1,(Math.cos(t/100)*50)*-1);
      text('RIGHT PLAYER SCORE: '+rightPaddle.score, width/2, height/1.1);
    }
    // bad ball display after 100 frames and in functions of the set timeouts
    if (t>100 && !badballtimeoutl && !badballtimeoutr){
      // unslow the paddles when the badballs reapears
      rightPaddle.unslowed();
      leftPaddle.unslowed();
      // for loop to display and update all badballs
      for(var i = 0; i<badballs.length; i++){
        badballs[i].update();
        badballs[i].display();
        badballs[i].isOffScreen();
        badballs[i].middleWallCollision(middlewall);
        // collision handler for when bad balls hit the paddles
        if(badballs[i].handleCollision(leftPaddle)){
            badballtimeoutl = true;
            // reset all badballs
            for(var j = 0; j<badballs.length; j++){
              badballs[j].reset();
            }
            // create a new badball, maximum of 3
            if(badballs.length < 3){
              badballs.push( new BadBall(width/2,height/2,1,1,15,1));
            }
            // timeout so the badballs don't reset instantly (5seconds)
            setTimeout(function(){badballtimeoutl = false}, 5000);
        }
        // same as above for right player
        if(badballs[i].handleCollision(rightPaddle)){
            badballtimeoutr = true;
            for(var j = 0; j<badballs.length; j++){
              badballs[j].reset();
            }
            if(badballs.length < 3){
              badballs.push( new BadBall(width/2,height/2,1,1,15,1));
            }
            setTimeout(function(){badballtimeoutr = false}, 5000);
        }
      }
    }
    // text for when a badball hit a paddle and the player is slowed down
    if(badballtimeoutl){
      fill((Math.sin(t/100)*200)*-1,(Math.cos(t/100)*150)*-1,(Math.cos(t/100)*50)*-1);
      text('Oups, left player is slowing down!', width/2, height/4);
      // slowed function to slow the player for 5 seconds
      leftPaddle.slowed();
    }
    if(badballtimeoutr){
      fill((Math.sin(t/100)*200)*-1,(Math.cos(t/100)*150)*-1,(Math.cos(t/100)*50)*-1);
      text('Oups, right player is slowing down!', width/2, height/4);
      rightPaddle.slowed();
    }
  }
  // ending screen
  else if(gameover){
    background(0);
    textSize(30);
    text('GAME OVER', width/2, height/2);
    textSize(20);
    text('press the mouse to restart', width/2, height/1.5);
    textAlign(CENTER);
    fill(255);
    // pop all the badballs of the array at the end
    for(var i=0; i<=badballs.length; i++){
      badballs.pop();
    }
    if (mouseIsPressed){
      gameover = false;
      setup();
      console.log(gameover);
    }
  }
  ////// END NEW //////
}
