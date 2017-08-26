//Autonomous Steering Agent
// Automaton has limited ability to percieve its environment
//process the environment and calculate an action
//no global plan/leader
var font;
var points;
var pixelSize = 500;

function preload(){
    font = loadFont("fredoka.ttf");
}

function setup(){
  createCanvas(1500, 500);
  background(51);
  // pixelSize = createSlider(2, 50, 5);
  textFont(font);
  textSize(220);
  fill(255);
  noStroke();
  points = font.textToPoints("delesslin", 250, 300);
  console.log(points);

}

function draw(){
  background(51);
  for(var i = 0; i < points.length; i++){
    fill(255);
    noStroke();
    ellipse(points[i].x, points[i].y, pixelSize, pixelSize);
  }

  if(pixelSize>5){
    pixelSize-=1;
  }

}
