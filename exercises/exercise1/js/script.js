// Exercise 1 - Moving pictures
// Pippin Barr
//
// Starter code for exercise 1.
// It moves two pictures around on the canvas.
// One moves linearly down the screen.
// One moves toward the mouse cursor.


// The image of a clown face
var clownImage;
// The current position of the clown face
var clownImageX;
var clownImageY;

// The transparent image of "felt" that wipes down the canvas
var feltTextureImage;
// The current position of the transparent image of "felt"
var feltTextureImageX;
var feltTextureImageY;

// The image of a turtle
var turtle;
// The current position of the turtle;
var turtleX;
var turtleY;

// The image of a banana
var banana;
// The current position of the banana
var bananaX;
var bananaY;

// The image of a wave
var wave;
// The current position of the wave
var waveX;
var waveY;

// Little turtle
var lilturtle;
// Little turtle position
var lilturtleX;
var lilturtleY;


// preload()
//
// Load the two images we're using before the program starts

function preload() {
  clownImage = loadImage("assets/images/clown.png");
  feltTextureImage = loadImage("assets/images/black-felt-texture.png");
  turtle = loadImage("assets/images/turty.png")
  banana = loadImage("assets/images/banana.png")
  wave = loadImage("assets/images/wave.png")
  lilturtle = loadImage("assets/images/turty.png")
}


// setup()
//
// Set up the canvas, position the images, set the image mode.

function setup() {
  // Create our canvas
  createCanvas(640,640);

  // Start the clown image at the centre of the canvas
  clownImageX = width/2;
  clownImageY = height/2;

  // Start the banana image at the centre of the canvas
  bananaX = width/2;
  bananaY = width/2;

  // Start the wave image at the centre of the canvas
  waveX = width/2;
  waveY = width/2;

  // Start the felt image perfectly off screen above the canvas
  feltTextureImageX = width/2;
  feltTextureImageY = 0 - feltTextureImage.height/2;

  // Start the turtle image perfectly off screen at the left of the canvas
  turtleX= 0 - turtle.width/2;
  turtleY= width/2;

  // Start the little turtle image perfectly off screen at the left of the canvas
  lilturtleX= 0 - turtle.width/2;
  lilturtleY= width/2;


  // We'll use imageMode CENTER for this script
  imageMode(CENTER);
}


// draw()
//
// Moves the felt image linearly
// Moves the clown face toward the current mouse location

function draw() {

  // Move the felt image down by increasing its y position
  feltTextureImageY += 1;

  // Display the felt image
  image(feltTextureImage,feltTextureImageX,feltTextureImageY);

  // Move the turtle image right by increasing its x position
  turtleX += 1;

  // Display the turtle image
  image(turtle,turtleX,turtleY);

  // Move the little turtle image right by increasing its x position
  lilturtleX += 0.5;
  // Move the little turtle up and down with a sin wave;
  lilturtleY += Math.sin(lilturtleX/100);

  // Display the little turtle image
  image(lilturtle,lilturtleX,lilturtleY);

  // Move the wave of 1/30th of its current distance from the mouse

  // Calculate the distance in X and in Y
  var waveXdistance = mouseX - waveX;
  var waveYdistance = mouseY - waveY;
  // Add 1/30th of the x and y distance to the wave's current location
  waveX = waveX + waveXdistance/30;
  waveY = waveY + waveYdistance/30;

  // Display the wave image
  image(wave,waveX,waveY);

  // Move the clown by moving it 1/10th of its current distance from the mouse

  // Calculate the distance in X and in Y
  var xDistance = mouseX - clownImageX;
  var yDistance = mouseY - clownImageY;
  // Add 1/10th of the x and y distance to the clown's current (x,y) location
  clownImageX = clownImageX + xDistance/10;
  clownImageY = clownImageY + yDistance/10;

  // Display the clown image
  image(clownImage,clownImageX,clownImageY);

  //Move the banana at the mouse x and y location
  bananaX = mouseX;
  bananaY = mouseY;

  // Display the banana image
  image(banana,bananaX,bananaY);




}
