import { CanvasView } from './view/CanvasView';
import { Ball } from './sprites/Ball';
import { Paddle } from './sprites/Paddle';
// Images
import PADDLE_IMAGE from './images/paddle.png';
import BALL_IMAGE from './images/ball.png';
// Level and colors
import { PADDLE_SPEED, PADDLE_WIDTH, PADDLE_HEIGHT, PADDLE_STARTX, BALL_SPEED, BALL_SIZE, BALL_STARTX, BALL_STARTY, } from './setup';
// Helpers
import { createBricks } from './helpers';
var gameOver = false;
var score = 0;
var targetFps = 60;
var lastTimestamp = 0;
var frameDuration = 1000 / targetFps;
function setGameOver(screen) {
    screen.drawInfo('Game Over!');
    gameOver = false;
}
function setGameWin(screen) {
    screen.drawInfo('Game Won!');
    gameOver = false;
}
function gameLoop(timestamp, view, bricks, paddle, ball) {
    var timeNow = performance.now();
    var deltaTime = (timestamp - timeNow) / frameDuration;
    lastTimestamp = timeNow;
    if (lastTimestamp >= deltaTime) {
        view.clear();
        view.drawBricks(bricks);
        view.drawSprite(paddle);
        view.drawSprite(ball);
        // Move paddle and check so it won't exit the playfield
        if ((paddle.isMovingLeft && paddle.pos.x > 0) ||
            (paddle.isMovingRight && paddle.pos.x < view.canvas.width - paddle.width)) {
            paddle.movePaddle();
        }
        requestAnimationFrame(function (timestamp) {
            return gameLoop(timestamp, view, bricks, paddle, ball);
        });
    }
}
function startGame(view) {
    // Reset displays
    score = 0;
    view.drawInfo('');
    view.drawScore(0);
    // Create all bricks
    var bricks = createBricks();
    // Create a Ball
    var ball = new Ball(BALL_SPEED, BALL_SIZE, { x: BALL_STARTX, y: BALL_STARTY }, BALL_IMAGE);
    // Create a Paddle
    var paddle = new Paddle(PADDLE_SPEED, PADDLE_WIDTH, PADDLE_HEIGHT, {
        x: PADDLE_STARTX,
        y: view.canvas.height - PADDLE_HEIGHT - 5,
    }, PADDLE_IMAGE);
    gameLoop(lastTimestamp, view, bricks, paddle, ball);
}
// Create a new view
var view = new CanvasView('#playField');
view.initStartButton(startGame);
//# sourceMappingURL=index.js.map