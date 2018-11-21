// Tree constructor
function Tree(x,y,w,h){
  this.x=x;
  this.y=y;
  this.w=w;
  this.h=h;
  this.sprite=null;
}

// Create tree function
Tree.prototype.createTree = function(){
  this.sprite = createSprite(this.x,this.y,this.w,this.h)
  this.sprite.setCollider("rectangle",0,this.sprite.width/2,this.sprite.height/2,15);
  this.sprite.addAnimation("default", treeSprite);
}
