score = 0;
cross = true;

audio = new Audio('..music.mp3');
audiogo = new Audio('gameover.mp3');
setTimeout(() => {
    audio.play()
}, 1000);

document.addEventListener('keydown', function (e) {
    console.log("Key code is: ", e.which); // we are using e.code or e.which method to getting a code of key in form integers & Logs the key code as an integer
    if(e.which == 38){
        dino = document.querySelector('.dino');
        dino.classList.add('animateDino');
        setTimeout(() => {
            dino.classList.remove('animateDino')
        }, 700);
    }
    if(e.which == 39){
        dino = document.querySelector('.dino');
        dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dino.style.left = dinoX + 112 + "px";
    }
    if(e.which == 37){
        dino = document.querySelector('.dino');
        dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dino.style.left = (dinoX - 112) + "px";
    }
});

setInterval(() => {
    dino = document.querySelector('.dino');
    gameOver = document.querySelector('.gameOver');
    obstacle = document.querySelector('.obstacle');

    // By use of window.getComputedStyle and .getpropertyValue we get left value of dino
    dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
    dy = parseInt(window.getComputedStyle(dino, null).getPropertyValue('top'));
    // similarly for obstacle!
    ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'));
    oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('top'));

    // calculate the x and y value of dino and obstacle!
    offsetX = Math.abs(dx-ox); // here we are useing math.abs method for taking absolute value of the diffrence of dino and obstacle!
    offsetY = Math.abs(dy-oy); 
    // console.log(offsetX, offsetY);
    if(offsetX<93 && offsetY<52){
        gameOver.innerHTML = "Game Over - Reload to Play Again"
        obstacle.classList.remove('obstacleAni');
    }
    else if(offsetX < 145 && cross){
        score += 1;
        updateScore(score);
        cross = false;
        setTimeout(() => {
            cross = true;
        }, 1000);
        setTimeout(() => {
            aniDur = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('animation-duration'));
            newDur = aniDur - 0.3;
            obstacle.style.animationDuration = newDur + 's'; 
            console.log("new ani duration", newDur)
        }, 1000);
    }
}, 100);

function updateScore(score){
    scorecount.innerHTML = "Your score: " + score
}