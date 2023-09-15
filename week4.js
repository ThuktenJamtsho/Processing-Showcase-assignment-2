function setup() {
  createCanvas(500, 500);
}

function draw() {
  background(0,110,180);

  // 3D circular structure
  fill(220, 100, 80);
  noStroke();
  ellipse(250, 250, 200, 200);
  fill(0,230,120);
  ellipse(150, 250, 150, 150);
  fill (0,230,120)
  ellipse(340, 200, 150, 150);

  // House construction process
  strokeWeight(2);
  stroke(10,80,200);
  line(width / 2, height / 2 - 80, width / 2, height / 2 + 80); // Vertical line
  line(width / 2 - 80, height / 2, width / 2 + 80, height / 2); // Horizontal line
  line(width / 2 - 40, height / 2 - 40, width / 2 - 40, height / 2 + 40); // Left diagonal line
  line(width / 2 + 40, height / 2 - 40, width / 2 + 40, height / 2 + 40); // Right diagonal line

  // Roof structure (Inclined Line)
  stroke(10,80,200); 
  line(width / 2 - 60, height / 2 - 30, width / 2, height / 2 - 80); // Left inclined line
  line(width / 2 + 60, height / 2 - 30, width / 2, height / 2 - 80); // Right inclined line

  // curved text
  noStroke();
  fill(20);
  textSize(20);
  let curveText = "  BUILDING  NOITCURTSNOC";
  let circleRadius = 120; 

  for (let i = 0; i < curveText.length; i++) {
    let angle = map(i, 0, curveText.length, -PI, PI);
    let x = 250 + circleRadius * cos(angle);
    let y = 250 + circleRadius * sin(angle);
    text(curveText.charAt(i), x, y);
  }
}
