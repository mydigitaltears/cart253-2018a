// Friend constructor
function Friend(x,y,size){
  this.x=x;
  this.y=y;
  this.vx=0;
  this.vy=0;
  this.speed=8;
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

// Create friend function
Friend.prototype.createFriend = function(){
  this.sprite = createSprite(this.x, this.y, this.size, this.size);
  // Collider so the friend can't walk over trees
  this.sprite.setCollider("rectangle",0,this.sprite.width/2,60,60);
  this.sprite.addAnimation("default", f1SDOWN);
}


// collide function
Friend.prototype.collide = function(){
  for(var i=0; i<myTrees.length; i++){
    this.sprite.collide(myTrees[i]);
  }
}

// animation function to handle the animation with the orienation of the sprite
Friend.prototype.animation = function(){
  this.c = this.vx+this.vy;
  // I had to use two values (c and c2) to make the code execute once
  // otherwise the animation would be stuck on the first frame
  if(this.c2 != this.c){
    this.change = true;
  }
  if (this.orientation == f1ALEFT && this.stop==false){
    this.vx = -this.speed;
  }
  if (this.orientation == f1ARIGHT && this.stop==false){
    this.vx = this.speed;
  }
  if (this.orientation == f1AUP && this.stop==false){
    this.vy = -this.speed;
  }
  if (this.orientation == f1ADOWN && this.stop==false){
    this.vy = this.speed;
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
  // stay still on stop
  if(this.stop == true){
    this.vx=0;
    this.vy=0;
  }
}

// moveFriend function
// same as moveAvatar
Friend.prototype.moveFriend = function(){
  // this bloc is to change the depth of the friend accordingly to it's y position
  var pos = this.sprite.position.y;
  var hei = this.sprite.height/2;
  this.sprite.depth = pos+hei;

  // standard friendmovement code
  this.sprite.position.x+= this.vx;
  this.sprite.position.y+= this.vy;

  if (this.sprite.position.x < 0){
    this.orientation = f1ARIGHT;
  }
  if (this.sprite.position.x > SCENE_W){
    this.orientation = f1ALEFT;
  }
  if (this.sprite.position.y < 0){
    this.orientation = f1ADOWN;
  }
  if (this.sprite.position.y > SCENE_H){
    this.orientation = f1AUP;
  }
}
