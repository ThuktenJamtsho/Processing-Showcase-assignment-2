let player;
let objects = [];
let projectiles = [];
let score = 0;

function setup() {
  createCanvas(500, 500);
  player = new Player();
  for (let i = 0; i < 8; i++) {
    objects.push(new Collectible());
  }
}

function draw() {
  background(0);
  player.display();
  player.move();

  // Display and move projectiles
  for (let projectile of projectiles) {
    projectile.display();
    projectile.move();
  }

  // collisions between projectiles and objects
  for (let i = projectiles.length - 1; i >= 0; i--) {
    for (let j = objects.length - 1; j >= 0; j--) {
      if (projectiles[i].collide(objects[j])) {
        objects.splice(j, 1);
        projectiles.splice(i, 1);
        objects.push(new Collectible());
        score++;
        break; // Exit inner loop after collision
      }
    }
  }

  // Display objects and check for collisions with player
  for (let obj of objects) {
    obj.display();
    obj.move();

    if (player.collide(obj)) {
      objects.splice(objects.indexOf(obj), 1);
      objects.push(new Collectible());
      score++;
    }
  }

  // Display score
  textSize(30);
  fill(255, 0, 0); // Set text color to red
  text(`Score: ${score}`, 30, 30);
}

function keyPressed() {
  if (key === ' ' || keyCode === 32) { // Check if spacebar is pressed
    let projectile = new Projectile(player.x + 10, player.y);
    projectiles.push(projectile);
  }
}

class Player {
  constructor() {
    this.x = width / 2;
    this.y = height - 30;
  }

  display() {
    fill(0, 0, 255);
    rect(this.x, this.y, 50, 20);
  }

  move() {
    if (keyIsDown(LEFT_ARROW) && this.x > 0) {
      this.x -= 5;
    }
    if (keyIsDown(RIGHT_ARROW) && this.x < width - 20) {
      this.x += 5;
    }
  }

  collide(object) {
    return (
      this.x < object.x + object.width &&
      this.x + 20 > object.x &&
      this.y < object.y + object.height &&
      this.y + 20 > object.y
    );
  }
}

class Collectible {
  constructor() {
    this.x = random(width - 20);
    this.y = random(height - 20);
    this.width = 30;
    this.height = 40;
    this.speedX = random(-2, 2); 
    this.speedY = random(-2, 2); 
    this.color = color(random(255), random(255), random(255));}

  display() {
    fill(this.color); 
    ellipse(this.x + this.width / 2, this.y + this.height / 2, this.width);
  }

  move() {
    
    this.x += this.speedX;
    this.y += this.speedY;

    // Bounce off the canvas edges
    if (this.x < 0 || this.x + this.width > width) {
      this.speedX *= -1;
    }
    if (this.y < 0 || this.y + this.height > height) {
      this.speedY *= -1;
    }
  }
}

class Projectile {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = 6;
  }

  display() {
    fill(0, 0, 225);
    ellipse(this.x, this.y, this.radius * 2);
  }

  move() {
    this.y -= 6; // Move the projectile upward
  }

  collide(object) {
    let d = dist(this.x, this.y, object.x + object.width / 2, object.y + object.height / 2);
    return d < this.radius + max(object.width, object.height) / 2;
  }
}
