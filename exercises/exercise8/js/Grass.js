// Grass constructor
function Grass(x,y,w,h){
  this.x=x;
  this.y=y;
  this.w=w;
  this.h=h;
  this.sprite=null;
}

// Create grass function
Grass.prototype.createGrass = function(){
  this.sprite = createSprite(this.x,this.y,this.w,this.h)
  this.sprite.addAnimation("default", grassSprite);
}
