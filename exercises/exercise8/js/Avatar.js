function Avatar(x,y,speed,size){
  this.x=x;
  this.y=y;
  this.vx=0;
  this.vy=0;
  this.speed=speed;
  this.size=size;
  this.orientation;
  this.upa=false;
  this.doa=false;
  this.lea=false;
  this.ria=false;
  this.sprite = null;
}

Avatar.prototype.createAvatar = function(){
  this.sprite = createSprite(this.x, this.y, this.size, this.size);
  this.sprite.addAnimation("default", animSDOWN);
}

Avatar.prototype.moveAvatar = function(){
  this.sprite.position.x+= this.vx;
  this.sprite.position.y+= this.vy;
  if (this.sprite.position.x < 0){
    this.sprite.position.x= 0;
  }
  if (this.sprite.position.x > width){
    this.sprite.position.x = width;
  }
  if (this.sprite.position.y < 0){
    this.sprite.position.y = 0;
  }
  if (this.sprite.position.y > height){
    this.sprite.position.y = height;
  }
}

Avatar.prototype.handleInput = function(){
  // Check for horizontal movement
  if (keyIsDown(LEFT_ARROW)) {
    this.vx = -this.speed;
    this.lea = true;
    this.orientation = animLEFT;
    console.log("true")
  }
  else if (keyIsDown(RIGHT_ARROW)) {
    this.vx = this.speed;
    this.ria = true;
    this.orientation = animRIGHT;
  }
  else {
    this.vx = 0;
  }
  // Check for vertical movement
  if (keyIsDown(UP_ARROW)) {
    this.vy = -this.speed;
    this.upa = true;
    this.orientation = animUP;
  }
  else if (keyIsDown(DOWN_ARROW)) {
    this.vy = this.speed;
    this.doa = true;
    this.orientation = animDOWN;
  }
  else {
    this.vy = 0;
  }
}

// keyReleased to falsify the animation booleans
Avatar.prototype.keyReleased = function(){
  if (keyCode === LEFT_ARROW){
    this.lea=false;
    console.log("leafasle");
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
  // if (this.lea === true){
  //   this.sprite.addAnimation("default", animLEFT);
  // }
  // if (this.ria === true){
  //   this.sprite.addAnimation("default", animRIGHT);
  // }
  // if (this.doa === true){
  //   this.sprite.addAnimation("default", animDOWN);
  // }
  // if (this.upa === true){
  //   this.sprite.addAnimation("default", animUP);
  // }
}

// I figured that the keyPressed function is better to activate my animation since it only triggers once
Avatar.prototype.keyPressed = function(){
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
