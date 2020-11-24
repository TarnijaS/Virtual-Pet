var dog, happyDog; 
var foodS, foodStock;
var database;

function preload()
{
  dogImage = loadImage("images/dogImg.png");
  dogImage2 = loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(500,500);
  database = firebase.database();
  
  dog = createSprite(250,250,10,10);
  dog.addImage(dogImage);
  dog.scale= 0.5

  foodStock=database.ref('food');
  foodStock.on("value",readStock);
}


function draw() {  
   background(49,139,87);

   if(keyWentDown(UP_ARROW)){
     writeStock(foodS);
     dog.addImage(dogImage2);
   }
   
   //readStock();
   //writeStock();

  drawSprites();
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Print foodStock from the database",100,50);
  text("Note: Press the Up Arrow to feed Drago milk",50,450);

}

function readStock(data){
  foodS=data.val();
}

function writeStock(x){
  
  if(x<=0){
    x=0;
  }else{
    x=x-1
  }
  
  database.ref('/').update({
    Food:x
  })
}
