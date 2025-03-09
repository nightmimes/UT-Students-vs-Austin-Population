const colorNames = ['rgb(212, 123, 80)', 'rgb(207, 149, 114)']; // creates array of pie colors
const hoverColorNames = ['rgb(214, 96, 36)', 'rgb(224, 111, 40)']; // creates array of pie colors if hovered
const radius = 400; // assigns value to 'radius'
let segments = [51800, 926963]; // array of the size of each pie piece
let angles; 
let centerX, centerY;
let a;
let hoverColors;
let studentClicked = false;
let start = 0;

function setup() {
  createCanvas(600, 500);
  
  background(219, 201, 162);
  ellipseMode(RADIUS);
  angleMode(DEGREES);
  centerX = 600 / 2;
  centerY = 500 / 2;
  a = 0;
  noStroke();
  let total = segments.reduce((v, s) => v + s, 0); // sums array of 'segments' and reduces values to be represented by 'v'
  angles = segments.map(v => v / total * 360); // maps out each value 'v' in order to calculate the degree value to find angles
  colors = colorNames.map(n => color(n)); // maps out each color value in 'colorNames' array
  hoverColors = hoverColorNames.map(m => color(m)); // maps out each hover color values in 'hoverColorNames' array
}

function draw() {
  background(219, 201, 162);
  
  push();
  let scaleFactor = 0.5; 
  scale(scaleFactor);
  
  fill(168, 74, 50);
  textSize(50);
  noStroke();
  text('Share of', 20, 70);
  fill(214, 96, 36);
  textSize(75);
  stroke(168, 74, 50);
  strokeWeight(6);
  text('UT', 206, 75);
  fill(168, 74, 50);
  textSize(50);
  noStroke();
  text('vs.', 318, 70);
  fill(224, 111, 40);
  textSize(75);
  stroke(168, 74, 50);
  strokeWeight(6);
  text('Non-UT', 392, 75);
  fill(168, 74, 50);
  textSize(50);
  noStroke();
  text('Students', 660, 70);
  fill(168, 74, 50);
  textSize(50);
  noStroke();
  text("in Austin's", 843, 70);
  fill(168, 74, 50);
  textSize(50);
  noStroke();
  text("2019", 1070, 70);
  fill(168, 74, 50);
  textSize(45);
  noStroke();
  text("Total Population", 870, 115);
  
  /* Austin population pie chart */
  let start = 0;
  let mouseAngle = atan2(mouseY - centerY, mouseX - centerX); // recenter at origin to calculate angle between mouse coords and origin 
  
  if(mouseAngle < 0){ // add 360 if negative values are returned
    mouseAngle += 360;
  }
  
  let mouseDist = dist(600/2, 500/2, mouseX, mouseY); // find distance between circle center and mouse coords
  
  for(let p = 0; p < angles.length; p++){ 
    let student = 51800 / 978763 * 360; // 'student' angle value calculation
    let nonstudent = 926963 / 978763 * 360; // 'nonstudent' angle value calculation 
    
    let hoverNonstudent = mouseDist < 200 && mouseAngle >= student && mouseAngle < angles[p] + nonstudent; // constrains the area of 'nonstudent' arc
    
    let hoverStudent = mouseDist < 200 && mouseAngle >= start && mouseAngle < start + student; // constrains the area of 'student' arc
    
    let hover = mouseDist < 200 && mouseAngle >= start && mouseAngle < start + angles[p]; // constrains entire circle area
    noStroke();
    if (hover && hoverNonstudent === true) { // change color to hover color if hovering over entire circle AND nonstudent arc
      fill(168, 74, 50);
      textSize(45);
      text('94.7%', 102, 700);
      fill(184, 102, 70);
      textSize(28);
      text('or', 150, 727);
      fill(168, 74, 50);
      textSize(45);
      text('926,963', 100, 767);
      fill(168, 74, 50);
      textSize(30);
      text('people', 180, 797);
      fill(207, 131, 101);
      textSize(35);
      text('of Austinites', 145, 835);
      fill(207, 131, 101);
      textSize(35);
      text('are', 130, 865);
      fill(214, 96, 36);
      textSize(37);
      text('UT Students', 180, 865);
      
      stroke(168, 74, 50);
      strokeWeight(6);
      fill(hoverColors[p]);
    } else if (hover && hoverStudent === true) { // change color to hover color if hovering over entire circle AND student arc
      fill(168, 74, 50);
      textSize(45);
      text('5.3%', 1030, 540);
      fill(207, 131, 101);
      textSize(28);
      text('or', 1055, 565);
      fill(168, 74, 50);
      textSize(45);
      text('51,800', 1012, 605);
      fill(168, 74, 50);
      textSize(30);
      text('people', 1030, 633);
      fill(207, 131, 101);
      textSize(35);
      text('of Austinites', 980, 672);
      fill(207, 131, 101);
      textSize(35);
      text('are', 955, 704);
      fill(214, 96, 36);
      textSize(37);
      text('UT Students', 1005, 704);
      
      stroke(168, 74, 50);
      strokeWeight(6);
      fill(hoverColors[p]);
    } else { // fill default 'colorNames' colors if not hovering any specific arc (outside of the circle) 
      fill(colors[p]);
    }
    
    arc(600, 500, radius, radius, start, start + angles[p]); // creates arcs using 'angles' values, beginning at start (0) with x,y coords at the circle center and radius (400)
    start += angles[p]; // start at start PLUS each iteration of 'angles' values

  }
  pop();
}
