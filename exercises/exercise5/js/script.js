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
//////// NEW ////////
var paddleInset = 0;
var t = 0;
//////// END NEW ////////
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
}

// draw()
//
// Handles input, updates all the elements, checks for collisions
// and displays everything.
function draw() {
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
    leftPaddle.score ++;
    console.log(leftPaddle.score);
    leftPaddle.scored();
    ball.reset();
  }
  else if (ball.isOffScreen() && ball.vx < 0) {
    rightPaddle.score ++;
    console.log(rightPaddle.score);
    rightPaddle.scored();
    ball.reset();
  }
  ////// END NEW //////

  ball.handleCollision(leftPaddle);
  ball.handleCollision(rightPaddle);

  ball.display();
  leftPaddle.display();
  rightPaddle.display();
}
