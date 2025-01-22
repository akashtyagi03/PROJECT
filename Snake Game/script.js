// game constant and variable
let inputdir = {x: 0, y: 0};
const foodSound = new Audio("food.mp3");
const gameover = new Audio("gameover.mp3");
const move = new Audio("move.mp3");
const music = new Audio("music.mp3");
let speed = 4;
score = 0;
let lastPaintTime = 0;
let snakearr = [
    {x: 13, y: 15}
]

eat = {x: 6, y: 7};

// game function
function main(ctime){
    window.requestAnimationFrame(main);
    // console.log(ctime)
    // this function use to repaint or rundering
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(snake) {
    //if you bumb into yourself
    for (let i = 1; i < snakearr.length; i++){
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    // if you bump into the wall
    if(snakearr[0].x >= 18 || snakearr[0].x <= 0 || snakearr[0].y >= 18 || snakearr[0].y <= 0){
        return true;
    }   
}

function gameEngine(){
    // part 1 updating the snake array and food
    if(isCollide(snakearr)){
        gameover.play();
        music.pause();
        inputdir = {x: 0, y: 0};
        alert("Game over, press any key to play again!")
        snakearr =[{x: 13, y: 15}];
        // music.play()
        score = 0;
    }
    // if you have eat food, increment the score and regenrate the food
    if(snakearr[0].y === eat.y && snakearr[0].x === eat.x){
        foodSound.play(); 
        score += 1; 

        // set high score!
        if(score>hiscoreval){
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML = "HiScore: " + hiscoreval;
        }
        scoreBox.innerHTML = "score: " + score;
        // unshift is used to add one or more element in begning of the array.
        snakearr.unshift({x: snakearr[0].x + inputdir.x, y: snakearr[0].y + inputdir.y});
        let a = 2;
        let b = 16;
        // if we want genrate a no. between a and b then we have do use random method and if we want nearest of that no. then we can use round method, a+(b-a)*math.round()
        eat = {x: Math.round(a+(b-a)* Math.random()), y: Math.round(a+(b-a)* Math.random())}
    }

    // moving the snake
    for (let i = snakearr.length-2; i>=0; i--) {
        snakearr[i+1] = {...snakearr[i]};
    }

    snakearr[0].x += inputdir.x;
    snakearr[0].y += inputdir.y;


    // part 2 or display the snake and food
    //display the snake
    board.innerHTML = "";
    snakearr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if(index === 0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });
    //display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = eat.y;
    foodElement.style.gridColumnStart = eat.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement);
}




// main logic start here 
// musicSound.play();
// here we are set high score for this we have use localstorage in js.
let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else{
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "HiScore: " + hiscore;
}
// here we are using game loop logic , and why we use "requestanimationframe", instead of set interval fuction! 
// becouse it better than setinterval function! it give highest fps , it udertsand working of game loop to the engine js then setinterval
window.requestAnimationFrame(main);
window.addEventListener('keydown', e =>{
    inputdir = {x:0, y:1} // start the game
    move.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("Arrowup");
            inputdir.x = 0;
            inputdir.y = -1;
            break;
        case "ArrowDown":
            console.log("Arrowdown");
            inputdir.x = 0;
            inputdir.y = 1;
            break;
        case "ArrowLeft":
            console.log("Arrowleft");
            inputdir.x = -1;
            inputdir.y = 0;
            break;
        case "ArrowRight":
            console.log("Arrowright");
            inputdir.x = 1;
            inputdir.y = 0;
            break;
        default:
            break;
    }
})