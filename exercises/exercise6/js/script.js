// Broken Basic OO Pong
// by Pippin Barr
//
// A broken primitive implementation of Pong with no scoring system
// just the ability to play the game with the keyboard.
//
// Arrow keys control the right hand paddle, W and S control
// the left hand paddle.
//
// Written with JavaScript OOP.

// Variable to contain the objects representing our ball and paddles
////// Fixed ////// (changed "bal" to "ball")
var ball;
var leftPaddle;
var rightPaddle;

// setup()
//
// Creates the ball and paddles
function setup() {
  ////// Fixed ////// (changed "crateCanvas" to "createCanvas")
  createCanvas(640,480);
  ////// Fixed ////// (removed the "noStroke()" to see the objects)
  //noStroke();
  // Create a ball
  ////// Fixed ////// (changed the speed, vx and vy to 5)
  ball = new Ball(width/2,height/2,5,5,10,5);
  // Create the right paddle with UP and DOWN as controls
  ////// Fixed ////// (put both paddles height to 100 and switched up and down arrows)
  rightPaddle = new Paddle(width-10,height/2,10,100,10,DOWN_ARROW,UP_ARROW);
  // Create the left paddle with W and S as controls
  // Keycodes 83 and 87 are W and S respectively
  ////// Fixed ////// (added a ")" at the end)
  leftPaddle = new Paddle(0,height/2,10,100,10,83,87);
////// Fixed ////// (added a "}" to end the setup)
}
// draw()
//
// Handles input, updates all the elements, checks for collisions
// and displays everything.
function draw() {
  background(0);

  leftPaddle.handleInput();
  rightPaddle.handleInput();
  ////// Fixed ////// (added "()" after update)
  ball.update();
  leftPaddle.update();
  rightPaddle.update();

  ////// Fixed ////// (added a "}" to start the if statement and changed "isOffTheScreen" to "isOffScreen")
  if (ball.isOffScreen()) {
  ////// Fixed ////// (added "ball")
    ball.reset();
  }

  ball.handleCollision(leftPaddle);
  ball.handleCollision(rightPaddle);

  ball.display();
  leftPaddle.display();
  ////// Fixed ////// (added a ")")
  rightPaddle.display();
}
