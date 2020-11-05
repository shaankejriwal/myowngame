var PLAY = 1;
var END = 0;
var gameState = PLAY;

var car,car2,carImg,ca2Img;
var track,trackImg;
var car2Group;
var carCollided;

function preload(){
  
	carImg = loadImage("car.png");
	car2Img = loadImage("car2.jpg");
	trackImg = loadImage("track.png");
	carCollided = loadImage("crash.jpg");
}



function setup() {
  createCanvas(1200,600);
  
  car = createSprite(50,160,20,50);
  car.addImage("car.png",carImg);
  car.scale = 0.1;
  
  track = createSprite(300,100,1200,400);
  track.addImage("track.png",trackImg);
  
  score = 0;
  
  car2Group = createGroup();
  
}


function draw() {
  
  text("score: " + score,500,50);
  
  if(gameState === PLAY){

    camera.position.y = car.y;
    
    if(keyDown("RIGHT_ARROW")){
      car.velocityX = 5;
	}
	
	if(keyDown("LEFT_ARROW")){
		car.velocityX = -5;
	}

    spawnCar2();
    
    if(car2Group.isTouching(car)){
	  car.addImage("crash.jpg",carCollided);
	  car.scale = 0.1;
      gameState = END;   
    }
    
  } 
  else if(gameState === END){
      
    car2.velocityY =0;
    car.velocityY = 0;
    
    car2Group.setLifetimeEach(-1);

    car2Group.setVelocityXEach(0);
  
  }

  
  drawSprites();
  
}

function spawnCar2(){
  if (frameCount % 80 === 0) {
    car2 = createSprite(200,180,20,20);
    car2.addImage("car2.jpg",car2Img);
    car2.velocityY = 4;
  
    car2.scale = 0.1;
    car2.lifetime = 1000;
  
    car2Group.add(car2);
  }
  
}

