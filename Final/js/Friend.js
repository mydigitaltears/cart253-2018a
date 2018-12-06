// Friend constructor
function Friend(x,y,size){
  this.x=x;
  this.y=y;
  this.vx=0;
  this.vy=0;
  this.size=size;
  this.start=false;
  this.stop=false;
  this.catched=false;
  this.orientation;
  this.c;
  this.c2;
  this.change=false;
  this.sprite = null;
}

// Create avatar function
Friend.prototype.createFriend = function(){
  this.sprite = createSprite(this.x, this.y, this.size, this.size);
  // Collider so the avatar can't walk over trees
  this.sprite.setCollider("rectangle",0,this.sprite.width/2,60,60);
  this.sprite.addAnimation("default", f1SDOWN);
}


// collide function
Friend.prototype.collide = function(){
  for(var i=0; i<myTrees.length; i++){
    this.sprite.collide(myTrees[i]);
    // if (this.sprite.overlap(myTrees[i])){
    //   var k = int(random(1,2))
    //   if(abs(this.vx)>0){
    //     if(k == 1){
    //       // this.vy=6;
    //       // this.vx=0;
    //       this.orientation = f1ADOWN;
    //     }
    //     else {
    //       // this.vy=-6;
    //       // this.vx=0;
    //       this.orientation = f1AUP;
    //     }
    //   }
    //   else if(abs(this.vy)>0){
    //     console.log("yup");
    //     if(k == 1){
    //       // this.vx=6;
    //       // this.vy=0;
    //       this.orientation = f1ARIGHT;
    //     }
    //     else {
    //       // this.vx=-6;
    //       // this.vy=0;
    //       this.orientation = f1ALEFT;
    //     }
    //   }
    // }
  }
}


Friend.prototype.animation = function(){
  stroke(3);
  rect(this.sprite.position.x-10,this.sprite.position.y-10,20,20)
  // if (this.vx < 0){
  //   this.orientation = f1ALEFT;
  // }
  // else if (this.vx > 0){
  //   this.orientation = f1ARIGHT;
  // }
  // else if (this.vy < 0){
  //   this.orientation = f1AUP;
  // }
  // else if (this.vy > 0){
  //   this.orientation = f1ADOWN;
  // }
  this.c = this.vx+this.vy;
  if(this.c2 != this.c){
    this.change = true;
  }
  if (this.orientation == f1ALEFT){
    this.vx = -7;
  }
  if (this.orientation == f1ARIGHT){
    this.vx = 7;
  }
  if (this.orientation == f1AUP){
    this.vy = -7;
  }
  if (this.orientation == f1ADOWN){
    this.vy = 7;
  }
  this.c2 = this.c;

  if (this.orientation == f1ALEFT && this.change == true){
    this.sprite.addAnimation("default", f1ALEFT);
    this.change = false;
  }
  else if (this.orientation == f1ARIGHT && this.change == true){
    this.sprite.addAnimation("default", f1ARIGHT);
    this.change = false;
  }
  else if (this.orientation == f1ADOWN && this.change == true){
    this.sprite.addAnimation("default", f1ADOWN);
    this.change = false;
  }
  else if (this.orientation == f1AUP && this.change == true){
    this.sprite.addAnimation("default", f1AUP);
    this.change = false;
  }
}

// moveAvatar function
Friend.prototype.moveFriend = function(){
  // this bloc is to change the depth of the avatar accordingly to it's y position
  var pos = this.sprite.position.y;
  var hei = this.sprite.height/2;
  this.sprite.depth = pos+hei;

  // standard avatar movement code
  this.sprite.position.x+= this.vx;
  this.sprite.position.y+= this.vy;

  if (this.sprite.position.x < 0){
    //this.sprite.position.x= 0;
    //this.vx=-this.vx;
    this.orientation = f1ARIGHT;
  }
  if (this.sprite.position.x > SCENE_W){
    // this.sprite.position.x = SCENE_W;
    // this.vx=-this.vx;
    this.orientation = f1ALEFT;
  }
  if (this.sprite.position.y < 0){
    // this.sprite.position.y = 0;
    // this.vy=-this.vy;
    this.orientation = f1ADOWN;
  }
  if (this.sprite.position.y > SCENE_H){
    // this.sprite.position.y = SCENE_H;
    // this.vy=-this.vy;
    this.orientation = f1AUP;
  }
}
