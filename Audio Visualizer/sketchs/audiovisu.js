var c, audio, bg;
var amplitude, analyzer;
var defaultRange;
var isBeingLoaded = false;
function preload(){
//  bg = loadImage('data/bg.png');
//  audio = loadSound('data/audio.mp3');
}

function setup(){
  c = createCanvas(window.innerWidth, window.innerHeight);
  c.drop(handleFile);
  angleMode(DEGREES);
  smooth();
  defaultRange = 350;
  //Audio things
  if(audio){
    audio.setVolume(0.2);
    audio.play();
    amplitude = new p5.Amplitude();
    analyzer = new p5.FFT(0,128);
  }

}

function draw(){
  background(0);
  translate(width/2, height/2);
  if(bg){
    drawBackground();
  }else{
    textSize(54);
    textAlign(CENTER);
    noStroke();
    fill(255,245);
    text("Please drag-and-drop audio and background files", 0,0);
  }
  if(audio && audio.isLoaded()){
    drawVisualization();
  }
  if(isBeingLoaded){
    textSize(54);
    textAlign(CENTER);
    noStroke();
    fill(255,245);
    text("File is being loaded....", 0,60);
  }
}

function handleFile(data){
  var filetype = data.type;
  if(filetype == 'image'){
    bg = loadImage(data.data);
  }else if(filetype == 'audio'){
    isBeingLoaded = true;
    audio = loadSound(data.data, function(data){
      audio.setVolume(0.2);
      audio.play();
      amplitude = new p5.Amplitude();
      analyzer = new p5.FFT(0,64);
      isBeingLoaded = false;}
    );
  }
}

function drawBackground(){
  //Create an algorithm to scale the image without breaking the x:y
  imageMode(CENTER);
  image(bg, 0,0,width,height);
}

function drawVisualization(){
  var values = analyzer.analyze();
  var color_r = map(amplitude.getLevel(),0,1,200,255);
  fill(color_r,20,20,50);
  stroke(color_r,20,200,255);
  strokeWeight(3);
  beginShape(TRIANGLE_STRIP);
  var firstVectors;
  for(var i = 0; i < values.length; i++){
    var r = map(values[i],0,256, defaultRange,400);
    var a = map(i,0,values.length,0,360);
    var x = r * cos(a);
    var y = r * sin(a);
    var x_2 = (defaultRange - (r - defaultRange)) * cos(a);
    var y_2 = (defaultRange - (r - defaultRange)) * sin(a);
    if(i%2==1){
      vertex(x,y);
      vertex(x_2, y_2);
    }else{
      vertex(x_2, y_2);
      vertex(x,y);
    }
    if(i == 0){
    firstVectors = {
        'x_1':x,
        'y_1':y,
        'x_2':x_2,
        'y_2':y_2
      };
    }
  }
  vertex(firstVectors.x_1,firstVectors.y_1);
  vertex(firstVectors.x_2,firstVectors.y_2);
  endShape(CLOSE);
}

//Quick method to pause and unpause the audio
function mousePressed(){
  if(audio){
    if(audio.isPlaying()){
      audio.pause();
    }else{
      audio.play();
      audio.setVolume(0.3);
    }
  }
}
