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
var badball;
////// NEW //////
var title = true;
var gameover = false;
// t variable for the sin background function
var t = 0;
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
  rightPaddle = new Paddle(width-10,height/2,10,100,10,DOWN_ARROW,UP_ARROW,0,0);
  // Create the left paddle with W and S as controls
  // Keycodes 83 and 87 are W and S respectively
  leftPaddle = new Paddle(0,height/2,10,100,10,83,87,0,0);
  //////// END NEW ////////
  badball = new BadBall(width/3,height/3,3,5,15,5);
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
    text('press the mouse to start', width/2, height/1.5);
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

    ball.update();
    leftPaddle.update();
    rightPaddle.update();

    ////// NEW //////
    //Changed in the draw because this script uses ball method and changes paddles data
    if (ball.isOffScreen() && ball.vx > 0) {
      leftPaddle.scored();
      ball.reset();
    }
    else if (ball.isOffScreen() && ball.vx < 0) {
      rightPaddle.scored();
      ball.reset();
    }
    ////// END NEW //////

    ball.handleCollision(leftPaddle);
    ball.handleCollision(rightPaddle);

    ball.display();
    leftPaddle.display();
    rightPaddle.display();

    ////// NEW //////
    // maximum score for ending screen
    if(leftPaddle.score > 10 || rightPaddle.score > 10){
      gameover = true;
      console.log(gameover);
    }
    ////// END NEW //////
    badball.update();
    badball.display();
    badball.isOffScreen();
    badball.handleCollision(leftPaddle);
    badball.handleCollision(rightPaddle);
    if(badball.handleCollision(leftPaddle)){
      for(var i = 0; i<10; i++){
        background(255,0,0);
      }
    }
    if(badball.handleCollision(rightPaddle)){
      for(var i = 0; i<10; i++){
        background(255,0,0);
      }
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
    if (mouseIsPressed){
      gameover = false;
      setup();
      console.log(gameover);
    }
  }
  ////// END NEW //////
}
