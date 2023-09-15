let circles = []; // Array to store circle objects
let lineColor; // Color of the dividing line


function setup() {
  createCanvas(500, 500);
  background(250); 

  // Initialize the line color as a random color
  lineColor = color(0);

  // Create initial circles
  for (let i = 0; i < 13; i++) {
    let x = random(width);
    let y = random(height);
    let speedX = random(-1, 1); // Reduced speed
    let speedY = random(-1, 1); // Reduced speed
    let radius = random(5, 8);
    let fillColor = color(random(255), random(255), random(255)); // Random fill color
    circles.push({ x, y, speedX, speedY, radius, fillColor });
  }
}

function draw() {
  //  the dividing line with a random color
  stroke(lineColor);
  strokeWeight(10);
  line(0, height / 2, width, height / 2);

  // Move and draw circles
  for (let i = circles.length - 1; i >= 0; i--) {
    let circle = circles[i];

    // Check if the circle hits the dividing line
    if (
      circle.y - circle.radius <= height / 2 &&
      circle.y + circle.radius >= height / 2
    ) {
      // Break the circle into two smaller circles with random colors
      circles.splice(i, 1); // Remove the original circle

      //  two smaller circles with random colors
      let smallerRadius = circle.radius / 2;
      let smallerSpeedX = random(-1, 1); // Reduced speed
      let smallerSpeedY = random(-1, 1); // Reduced speed
      let color1 = color(random(255), random(255), random(255));
      let color2 = color(random(255), random(255), random(255));

      circles.push({
        x: circle.x,
        y: circle.y,
        speedX: smallerSpeedX,
        speedY: smallerSpeedY,
        radius: smallerRadius,
        fillColor: color1,
      });
      circles.push({
        x: circle.x,
        y: circle.y,
        speedX: -smallerSpeedX,
        speedY: -smallerSpeedY,
        radius: smallerRadius,
        fillColor: color2,
      });

     
    } else {
      // Draw the circle with its fill color and no stroke
      fill(circle.fillColor || 255);  
      noStroke();
      ellipse(circle.x, circle.y, circle.radius * 2, circle.radius * 2);

      // Bounce off the edges of the canvas
      if (circle.x - circle.radius < 0 || circle.x + circle.radius > width) {
        circle.speedX *= -1;
      }
      if (circle.y - circle.radius < 0 || circle.y + circle.radius > height) {
        circle.speedY *= -1;
      }

      // Update the circle's position
      circle.x += circle.speedX;
      circle.y += circle.speedY;
    }
  }
}
