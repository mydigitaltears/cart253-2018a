// Flower constructor
function Flower(x,y,w,h){
  this.x=x;
  this.y=y;
  this.w=w;
  this.h=h;
  this.sprite=null;
}

// Create flower function
Flower.prototype.createFlower = function(){
  // I use random() to distribute the flower types randomly
  var r = random(0,0.6)
  if (r < 0.1){
    this.sprite = createSprite(this.x,this.y,this.w,this.h);
    this.sprite.addAnimation("default",spritePFlower);
  }
  else if (r < 0.2){
    this.sprite = createSprite(this.x,this.y,this.w,this.h);
    this.sprite.addAnimation("default",spriteVFlower);
  }
  else if (r < 0.3){
    this.sprite = createSprite(this.x,this.y,this.w,this.h);
    this.sprite.addAnimation("default",spriteWFlower);
  }
  else if (r < 0.4){
    this.sprite = createSprite(this.x,this.y,this.w,this.h);
    this.sprite.addAnimation("default",spriteYFlower);
  }
  else if (r < 0.5){
    this.sprite = createSprite(this.x,this.y,this.w,this.h);
    this.sprite.addAnimation("default",spriteTYFlower);
  }
  else if (r < 0.6){
    this.sprite = createSprite(this.x,this.y,this.w,this.h);
    this.sprite.addAnimation("default",spriteTRFlower);
  }
}
