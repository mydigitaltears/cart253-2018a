function Tree(x,y,w,h){
  this.x=x;
  this.y=y;
  this.w=w;
  this.h=h;
  this.sprite=null;
}

Tree.prototype.createTree = function(){
  this.sprite = createSprite(this.x,this.y,this.w,this.h)
  this.sprite.addAnimation("default", treeSprite);
}
