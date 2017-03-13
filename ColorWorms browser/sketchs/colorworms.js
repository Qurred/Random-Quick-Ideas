var c; //The Canvas
var colorWorms = [];
var amount = 100;


function setup() {
  c = createCanvas(window.innerWidth, window.innerHeight);
  background(0);
  for(var i = 0; i < amount; i++){
    colorWorms.push(new worm);
    colorWorms[i].create();
  }
}

function draw(){
  //background(0);
  noFill();
  for(var i = 0; i < amount; i++){
    colorWorms[i].update();
    colorWorms[i].draw();
  }
}


function worm() {

  this.weight;
  this.color;
  this.x;
  this.y;
  this.stepSize;
  this.stepHistory;
  this.historyLimit;

  this.create = function() {
    this.weight = 3;
    this.historyLimit = 5;
    this.stepHistory = [];
    this.color = floor(random(255));
    this.x = floor(random( width / 2 -10, width / 2 + 10));
    this.y = floor(random(height / 2 -10,height / 2 +10));
    this.stepSize = floor(random(3,10));
  }
  this.update = function(){
    if(this.stepHistory.length < this.historyLimit){
      this.stepHistory.push({'x':this.x,'y': this.y});
    }else{
      this.stepHistory.splice(0, this.stepHistory.length+1);
      this.stepHistory.push({'x':this.x,'y': this.y});
    }
    this.tmp = floor(random(4));
    switch (this.tmp) {
      case 0:
        this.y -=this.stepSize;
        if(this.y < 0){
          this.y = height + this.y;
          this.stepHistory = [];
          this.stepHistory.push({'x':this.x,'y': this.y});
        }
        break;
      case 1:
        this.x += this.stepSize;
        if(this.x > width){
          this.x = this.x - width;
          this.stepHistory = [];
          this.stepHistory.push({'x':this.x,'y': this.y});
        }
        break;
      case 2:
        this.y += this.stepSize;
        if(this.y > height){
          this.y = this.y - height;
          this.stepHistory = [];
          this.stepHistory.push({'x':this.x,'y': this.y});
        }
        break;
      case 3:
        this.x -=this.stepSize;
        if(this.x < 0){
          this.x = width + this.x;
          this.stepHistory = [];
          this.stepHistory.push({'x':this.x,'y': this.y});
        }
        break;
      default:
        break;
    }
  }

  this.draw = function(){
    stroke(255,30,200,54);
    strokeWeight(this.weight);
    beginShape();
    for(var i = 0; i < this.stepHistory.length; i++){
      vertex(this.stepHistory[i].x, this.stepHistory[i].y);
    }
    endShape();
  }
}
