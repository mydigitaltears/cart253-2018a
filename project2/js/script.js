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
var badballs = [];
var middlewall;
////// NEW //////
var title = true;
var gameover = false;
// t variable for the sin background function
var t = 0;
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
  //////// END NEW ////////
  badballs.push( new BadBall(width/2,height/2,1,1,15,1));
  middlewall = new MiddleWall(width/2,height/2,10,100,5);
  textSize(20);
  textAlign(CENTER);
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
    if (mouseIsPressed){
      title = false;
    }
  }
  ////// END NEW //////
  else if (gameover === false){
    ////// NEW //////
    // time variable for the sin function
    t ++;
    // Fill the background with a smooth sin function
    background(Math.sin(t/100)*200+150,Math.cos(t/100)*150+150,Math.cos(t/100)*50+150);
    ////// END NEW ///////

    leftPaddle.handleInput();
    rightPaddle.handleInput();


    leftPaddle.update();
    rightPaddle.update();

    ////// NEW //////
    //Changed in the draw because this script uses ball method and changes paddles data

    ////// END NEW //////


    leftPaddle.display();
    rightPaddle.display();

    middlewall.display();
    middlewall.update();

    ////// NEW //////
    // maximum score for ending screen
    if(leftPaddle.score > 5 || rightPaddle.score > 5){
      gameover = true;
      console.log(gameover);
    }

    if(t>50 && !scoredtimeoutl && !scoredtimeoutr){
      ball.update();
      ball.display();
      ball.handleCollision(leftPaddle);
      ball.handleCollision(rightPaddle);
      ball.handleCollision(middlewall);
    }
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
    if(scoredtimeoutl){
      fill((Math.sin(t/100)*200)*-1,(Math.cos(t/100)*150)*-1,(Math.cos(t/100)*50)*-1);
      text('LEFT PLAYER SCORE: '+leftPaddle.score+' ', width/2, height/1.1);
    }
    if(scoredtimeoutr){
      fill((Math.sin(t/100)*200)*-1,(Math.cos(t/100)*150)*-1,(Math.cos(t/100)*50)*-1);
      text('RIGHT PLAYER SCORE: '+rightPaddle.score, width/2, height/1.1);
    }

    if (t>100 && !badballtimeoutl && !badballtimeoutr){
      rightPaddle.unslowed();
      leftPaddle.unslowed();
      for(var i = 0; i<badballs.length; i++){
        badballs[i].update();
        badballs[i].display();
        badballs[i].isOffScreen();
        badballs[i].middleWallCollision(middlewall);
        if(badballs[i].handleCollision(leftPaddle)){
            badballtimeoutl = true;
            for(var j = 0; j<badballs.length; j++){
              badballs[j].reset();
            }
            if(badballs.length < 3){
              badballs.push( new BadBall(width/2,height/2,1,1,15,1));
            }
            setTimeout(function(){badballtimeoutl = false}, 5000);
        }
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

    if(badballtimeoutl){
      fill((Math.sin(t/100)*200)*-1,(Math.cos(t/100)*150)*-1,(Math.cos(t/100)*50)*-1);
      text('Oups, left player is slowing down!', width/2, height/4);
      leftPaddle.slowed();
    }
    if(badballtimeoutr){
      fill((Math.sin(t/100)*200)*-1,(Math.cos(t/100)*150)*-1,(Math.cos(t/100)*50)*-1);
      text('Oups, right player is slowing down!', width/2, height/4);
      rightPaddle.slowed();
    }
  }
  ////// NEW //////
  // ending screen
  else if(gameover){
    background(0);
    textSize(30);
    text('GAME OVER', width/2, height/2);
    textSize(20);
    text('press the mouse to restart', width/2, height/1.5);
    textAlign(CENTER);
    fill(255);
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
