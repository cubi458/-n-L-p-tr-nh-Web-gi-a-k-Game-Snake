//board
var blockSize = 25;
var rows = 20;
var cols = 20;
var board;
var context;

//Đầu rắn
var snakeX = blockSize * 5;
var snakeY = blockSize * 5;

var velocityX = 0;
var velocityY = 0;

var snakeBody = []

//Đồ ăn
var foodX = blockSize * 10;
var foodY = blockSize * 10;
window.onload = function (){
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context= board.getContext("2d");//Sử dụng để vẽ trên bảng

    placeFood();
    document.addEventListener("keyup", changeDirection);
    // update();
    setInterval(update, 1000/10); //100 mili giây
}
function update(){
    context.fillStyle="black";
    context.fillRect(0,0, board.width, board.height);

    context.fillStyle="red";
    context.fillRect(foodX, foodY, blockSize, blockSize);

    context.fillStyle="lime";
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);

    context.fillStyle="green";
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    for (let i = 0; i < snakeBody.length; i++){
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }
    if(snakeX == foodX  && snakeY == foodY){
        snakeBody.push([foodX,foodY])
         placeFood();
    }
    for(let i = snakeBody.length-1; i > 0; i--){
        snakeBody[i] = snakeBody[i-1];
    }
    if (snakeBody.length){
        snakeBody[0] = [snakeX, snakeY];
    }
}
    function changeDirection(e){
        if(e.code == "ArrowUp" && velocityY != 1){
            velocityX = 0;
            velocityY = -1;
        }
        else if(e.code == "ArrowDown" && velocityY != -1){
            velocityX = 0;
            velocityY = 1;
        }
        else if(e.code == "ArrowLeft" && velocityX != 1){
            velocityX = -1;
            velocityY = 0;
        }
        else if(e.code == "ArrowRight"&& velocityX != -1){
            velocityX = 1;
            velocityY = 0;
        }
    }
    function placeFood(){

    foodX = Math.floor(Math.random()* cols) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
    }