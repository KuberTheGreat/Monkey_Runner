// NOTE: Double press the space bar, when stuck in the obstacle/rock
// NOTE: The size reduces after a while, don't know why...


// variable section
var monkey, monkey_running;
var banana, banana_image;
var obstacle, obstacle_image;

var ground, ground_image;

var bananaGroup, obstacleGroup;

// don't know if it is necessary, but adding the game states 
var PLAY = 1;
var COLLIDE = 0;
var gamestate = 1;

var score;

// function to load the images, animation or sounds
function preload() {

  // setting the background image
  ground_image = loadImage("background0.jpg");

  // setting the monkey walking animation
  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png");

  // setting the banana and obstacle images
  banana_image = loadImage("banana.png");
  obstacle_image = loadImage("obstacle.png");

}

// setuo function to call all the functions
function setup() {
  createCanvas(600, 400);

  // creates the banana and obstacle groups
  bananaGroup = new Group();
  obstacleGroup = new Group();

  // calls all the functions
  // calls the ground function
  createGround();

  // calls the monkey function 
  createMonkey();
}

function draw() {
  // sets the background color to the hexadecimal number
  background(255);

  var invisible_ground;
  invisible_ground = createSprite(200, 400, 600, 20);
  invisible_ground.visible = false;

  // makes the monkey collide with the ground and obstacles
  monkey.collide(invisible_ground);
  monkey.collide(obstacleGroup);

  if(monkey.x <= 0){
    monkey.x = 100;
  }
  
  // if gamestate is equal to playing
  if (gamestate == 1) {
    // if monkey collides to the obstacles
    if (obstacleGroup.collide(monkey)) {
      // gamestate stets to collide
      gamestate = 0;
    }

    // makes the ground infinitlly running
    if (ground.x <= 0) {
      ground.x = ground.width / 2;
    }

    // if spacebar is pressed, the monkey jumps
    if (keyDown("space") && monkey.y >= 300) {
      monkey.velocityY = -13;
    }
    // Giving gravity to the monkey
    monkey.velocityY = monkey.velocityY + 0.4;

    // calling the banana and obstacles functions
    spawnBanana();
    spawnRocks();
  }
  // else if gamestate is equal to colliding
  else if (gamestate == 0) {
    // sets the monkey velocity to 0
    monkey.velocityX = 0;

    // sets the ground velocity to 0
    ground.velocityX = 0;

    // sets the velocity of the obstacle and banana groups to 0
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);

    // makes the obstacle and banana group non vanishing
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);

    // while the monkey is colliding with the obstacle
    // if the monkey jumps \/
    if (keyDown("space")) {
      monkey.velocityY = -13;

      // resets the ground velocity to normal
      ground.velocityX = -5;

      // again gives the obstacle and banana group the normal velocity
      obstacleGroup.setVelocityXEach(-3);
      bananaGroup.setVelocityXEach(-3);
    
      // again gives the obstacle and banana group a lifetime
      obstacleGroup.setLifetimeEach(200);
      bananaGroup.setLifetimeEach(200);

      // return the gamestate to playing
      gamestate = 1;
    }
    // Giving gravity to the monkey
    monkey.velocityY = monkey.velocityY + 0.8;
  }

  // increasing the size of the monkey as per the score
  switch(score){
    case 10:
      monkey.scale = 0.14;
      break;
    case 20:
      monkey.scale = 0.15;
      break;
    case 30:
      monkey.scale = 0.16;
      break;
    case 40:
      monkey.scale = 0.17;
      break;
    default:
      break;
  }

  // decreasing the size of the monkey as per the score
  if(obstacleGroup.isTouching(monkey)){
    monkey.scale = 0.10;
  }

  // draw all the sprties
  drawSprites();

  // text properties like stroke, fill etc.
  stroke(257, 157, 14);
  fill(247, 147, 221);
  textSize(20);

  // setting the score system by the frameCount and frameRate division
  score = Math.ceil(frameCount / frameRate());
  text("score : " + score, 100, 50);
}

// funcition to create the ground
function createGround() {
  // creates the ground sprite, gives it a velocity, and makes it infinite
  ground = createSprite(200, 200, 20, 20);
  ground.addImage(ground_image);
  ground.velocityX = -3;
  ground.x = ground.width / 2;
  ground.scale = 2.45;
}

// function to create the monkey
function createMonkey() {
  // creates the monkey sprite, adds an image to it and scales it down
  monkey = createSprite(100, 390, 20, 20);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.13;
}

// function to create and spawn obstacles/ rocks
function spawnRocks() {
  // after every 300 frames the obstalces are displayed
  if (frameCount % 300 === 0) {
    // creates the obstacle sprite, adds image to it
    obstacle = createSprite(600, 350, 20, 20);
    obstacle.addImage("rock", obstacle_image);
    // gives a velocity to it, scales it down, and gives a lifetime
    obstacle.velocityX = -5
    obstacle.scale = 0.2;
    obstacle.lifetime = 200;

    // adds the obstacle to the obstacle group
    obstacleGroup.add(obstacle);
  }
}

//function to create and spawn bananas
function spawnBanana() {
  // after every 100 frames the banans are displayed
  if (frameCount % 100 === 0) {
    // create the banana sprite, adds the image to it, gives velocity to it
    banana = createSprite(600, 200, 20, 20);
    banana.addImage("kela", banana_image);
    banana.velocityX = -5
    // scales it down, gives it a lifetime, and gives it a random y position
    banana.scale = 0.1;
    banana.lifetime = 200;
    banana.y = Math.round(random(20, 200));

    // adds the banana to the banana group
    bananaGroup.add(banana);
  }
}