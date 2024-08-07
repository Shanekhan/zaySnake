
// Initialize game variables
let inputDir = { x: 0, y: 0 }; 
const foodSound = new Audio('food.mp3'); 
const gameOverSound = new Audio('gameover.mp3'); 
let speed = 9;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [{ x: 13, y: 15 }];
let food = { x: 6, y: 7 };

// Ensure 'board' element is defined
const board = document.getElementById('board'); 

// Main game loop function
function main(ctime) {
    window.requestAnimationFrame(main);

    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

// Check for collisions
function isCollide(snake) {
    // Check if snake bumps into itself
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }
    // Check if snake bumps into wall
    if (snake[0].x >= 18 || snake[0].x < 0 || snake[0].y >= 18 || snake[0].y < 0) {
        return true;
    }
    return false;
}

// Game engine function
function gameEngine() {
    // Check for collision
    if (isCollide(snakeArr)) {
        gameOverSound.play();
        inputDir = { x: 0, y: 0 };
        alert("Play Again Loser!");
        snakeArr = [{ x: 13, y: 15 }];
        score = 0;
        
    }

    // Check if snake eats the food
    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        foodSound.play();
        score += 1;
        scoreBox.innerHTML ="Score:" + score;
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y });
        const a = 2;
        const b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) };
    }

    // Move the snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] };
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    // Display snake
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        const snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        snakeElement.classList.add('snake');
        if (index === 0) {
            snakeElement.classList.add('head');
        } else {
            snakeElement.classList.add('body');
        }
        board.appendChild(snakeElement);
    });

    // Display food
    const foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}

// Start game loop
window.requestAnimationFrame(main);

// Handle keydown events for direction control
window.addEventListener('keydown', e => {
    switch (e.key) {
        case "ArrowUp":
            if (inputDir.y === 0) { 
                inputDir = { x: 0, y: -1 };
            }
            break;

        case "ArrowDown":
            if (inputDir.y === 0) {
                inputDir = { x: 0, y: 1 };
            }
            break;

        case "ArrowLeft":
            if (inputDir.x === 0) { 
                inputDir = { x: -1, y: 0 };
            }
            break;

        case "ArrowRight":
            if (inputDir.x === 0) { 
                inputDir = { x: 1, y: 0 };
            }
            break;

        default:
            break;
    }
});
