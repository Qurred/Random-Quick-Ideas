var binary_H, binary_M, binary_S;
var lastSecond; //Comperable value to check if Binary_*s need for update
var offset;// = 130;
var ellipse_r; //= 60;
var distance;// = 30;
var c; //Canvas
var casul; //Casuuuuul mde for normal ppl
var touchlimiter;

function setup() {
  c = createCanvas(window.innerWidth, window.innerHeight);
  noCursor();
  lastSecond = second();
  touchlimiter = second();
  binary_H = toBinary(hour());
  binary_M = toBinary(minute());
  binary_S = toBinary(second());
  casul = false;
  ellipse_r = height / 6 ;
  if(ellipse_r * 6 > width){
    ellipse_r = width / 8;
  }
  distance = ellipse_r / 3;
  offset = ellipse_r - (distance * 1.3);
  document.title = "Binary Clock";
  smooth();
}

//Basic P5.js draw-function which is called in loop
function draw() {
  translate(width/2,height/2);
  //Checks if browsers innerSize has changed, replace later to event: onResize from ajax/jquery
  if(c.width != window.innerWidth || c.height != window.innerHeight){
    c.resize(window.innerWidth, window.innerHeight);
    ellipse_r = height / 6 ;
    if(ellipse_r * 6 > width){
      ellipse_r = width / 8;
    }
    distance = ellipse_r / 3;
    offset = ellipse_r - (distance * 1.3);
  }
  //Checks if Binary_Xs need to be updated
  if(lastSecond != second()){
    lastSecond = second();
    binary_H = toBinary(hour());
    binary_M = toBinary(minute());
    binary_S = toBinary(second());
  }
  background(25);
  if(casul){casulMode();}
  fill(0, 102, 153);
  drawBinaryIndicators(binary_H,-ellipse_r - distance);
  drawBinaryIndicators(binary_M, 0)
  drawBinaryIndicators(binary_S, ellipse_r + distance);
}

//Draws the binary indicators
function drawBinaryIndicators(x, y){
  var values = x.split("");
  rectMode(CENTER);
  for(var i = 0; i < values.length; i++){
    stroke(245,255);
    if(values[i] == '1'){
      fill(245,255);
    }else{
      noFill();
    }
    var loc_x
    //Calculating the location, try to simplify later
    if(i < 3){
      loc_x = -(3 * (ellipse_r)) + (i*ellipse_r) + (ellipse_r/2);
    }else {
      loc_x = ellipse_r + ((i % 3)*ellipse_r) - (ellipse_r/2);
    }
    ellipse(loc_x,y,ellipse_r,ellipse_r);
  }
}

//Shows the time in human readable format
function casulMode() {
  textSize(124);
  textAlign(CENTER);
  noStroke();
  fill(255,160);
  var indi = hour() + ":" + minute() + ":" + second();
  text(indi, 0,-ellipse_r - distance - offset);
}

//Creates a binary format from given parameter
function toBinary(x){
  var binary = "";
  var length = 6;
  while(length--){binary += (x >> length ) & 1;}
  return binary;
}

//P5 event, mousePressed
function mousePressed(){
  if(touchlimiter != second()){
    casul = !casul;
    touchlimiter = second();
  }
}
