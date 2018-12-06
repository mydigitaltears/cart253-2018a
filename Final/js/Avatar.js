// Avatar constructor
function Avatar(x,y,size){
  this.x=x;
  this.y=y;
  this.vx=0;
  this.vy=0;
  this.speed=5;
  this.endurance=100;
  this.size=size;
  this.orientation;
  this.upa=false;
  this.doa=false;
  this.lea=false;
  this.ria=false;
  this.sprite = null;
}

// Create avatar function
Avatar.prototype.createAvatar = function(){
  this.sprite = createSprite(this.x, this.y, this.size, this.size);
  // Collider so the avatar can't walk over trees
  this.sprite.setCollider("rectangle",0,this.sprite.width/2,this.sprite.height/2,20);
  this.sprite.addAnimation("default", animSDOWN);
}

// camera function to center the canvas on the Avatar
Avatar.prototype.camera = function(){
  camera.zoom = 1;
  camera.position.x = this.sprite.position.x;
  camera.position.y = this.sprite.position.y;
}

Avatar.prototype.showEndBar = function(){
  fill(255, 230, 0);
  noStroke();
  rect(camera.position.x-25,camera.position.y-50,this.endurance/2,10);
  text(timer,camera.position.x-windowWidth/2+50,camera.position.y-windowHeight/2+65);
  fill(255,0,0);
  stroke(3);
  rect(this.sprite.position.x-10,this.sprite.position.y-10,20,20)
}

// collide function
Avatar.prototype.collide = function(){
  for(var i=0; i<myTrees.length; i++){
    this.sprite.collide(myTrees[i]);
  }
}

// moveAvatar function
Avatar.prototype.moveAvatar = function(){
  // this bloc is to change the depth of the avatar accordingly to it's y position
  var pos = this.sprite.position.y;
  var hei = this.sprite.height/2;
  this.sprite.depth = pos+hei;
  // standard avatar movement code
  this.sprite.position.x+= this.vx;
  this.sprite.position.y+= this.vy;
  if (this.sprite.position.x < 0){
    this.sprite.position.x= 0;
  }
  if (this.sprite.position.x > SCENE_W){
    this.sprite.position.x = SCENE_W;
  }
  if (this.sprite.position.y < 0){
    this.sprite.position.y = 0;
  }
  if (this.sprite.position.y > SCENE_H){
    this.sprite.position.y = SCENE_H;
  }
}

// handleInput function for movement
Avatar.prototype.handleInput = function(){
  // Check for horizontal movement
  if (keyIsDown(LEFT_ARROW)) {
    this.vx = -this.speed;
    this.orientation = animLEFT;
  }
  else if (keyIsDown(RIGHT_ARROW)) {
    this.vx = this.speed;
    this.orientation = animRIGHT;
  }
  else {
    this.vx = 0;
  }
  // Check for vertical movement
  if (keyIsDown(UP_ARROW)) {
    this.vy = -this.speed;
    this.orientation = animUP;
  }
  else if (keyIsDown(DOWN_ARROW)) {
    this.vy = this.speed;
    this.orientation = animDOWN;
  }
  else {
    this.vy = 0;
  }
  if( keyIsDown(SHIFT) && this.endurance > 1) {
    this.speed = 10;
    this.endurance -= 2;
  }
  else {
    this.speed = 5;
    if(this.endurance<100){
      this.endurance++;
    }
  }
}

// keyReleased to falsify the animation booleans
Avatar.prototype.keyReleased = function(){
  if (keyCode === LEFT_ARROW){
    this.lea=false;
  }
  if (keyCode === RIGHT_ARROW){
    this.ria=false;
  }
  if (keyCode === DOWN_ARROW){
    this.doa=false;
  }
  if (keyCode === UP_ARROW){
    this.upa=false;
  }
  if (this.lea === true){
    this.sprite.addAnimation("default", animLEFT);
  }
  if (this.ria === true){
    this.sprite.addAnimation("default", animRIGHT);
  }
  if (this.doa === true){
    this.sprite.addAnimation("default", animDOWN);
  }
  if (this.upa === true){
    this.sprite.addAnimation("default", animUP);
  }
}

// I figured that the keyPressed function is better to activate my animation since it only triggers once
Avatar.prototype.keyPressed = function(){
  if (keyCode === LEFT_ARROW){
    this.lea=true;
  }
  if (keyCode === RIGHT_ARROW){
    this.ria=true;
  }
  if (keyCode === DOWN_ARROW){
    this.doa=true;
  }
  if (keyCode === UP_ARROW){
    this.upa=true;
  }
  if (this.lea === true){
    this.sprite.addAnimation("default", animLEFT);
  }
  else if (this.ria === true){
    this.sprite.addAnimation("default", animRIGHT);
  }
  if (this.doa === true){
    this.sprite.addAnimation("default", animDOWN);
  }
  if (this.upa === true){
    this.sprite.addAnimation("default", animUP);
  }
}

// animation when avatar is stopped
Avatar.prototype.stop = function(){
  if (this.vx === 0 && this.vy === 0){
    if (this.orientation === animLEFT){
      this.sprite.addAnimation("default", animSLEFT);
    }
    else if (this.orientation === animRIGHT){
      this.sprite.addAnimation("default", animSRIGHT);
    }
    else if (this.orientation === animDOWN){
      this.sprite.addAnimation("default", animSDOWN);
    }
    else if (this.orientation === animUP){
      this.sprite.addAnimation("default", animSUP);
    }
  }
}
