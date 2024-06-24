import { CanvasView } from './view/CanvasView';
import { Ball } from './sprites/Ball';
import { Brick } from './sprites/Brick';
import { Paddle } from './sprites/Paddle';
// Images
import PADDLE_IMAGE from './images/paddle.png';
import BALL_IMAGE from './images/ball.png';
// Helpers
import { createBricks } from './helpers/helpers';
import { Collision } from './helpers/Collision';
import { Settings, SettingsManager } from './setup';

let gameOver: boolean = false;
let score: number = 0;
const targetFps: number = 60;
let lastTimestamp: number = 0;
const frameDuration: number = 1000 / targetFps;

function setGameOver(screen: CanvasView) {
    screen.drawInfo('Game Over!');
    gameOver = false;
}

function setGameWin(screen: CanvasView) {
    screen.drawInfo('Game Won!');
    gameOver = false;
}

function gameLoop(
    timestamp: number,
    screen: CanvasView,
    bricks: Brick[],
    paddle: Paddle,
    ball: Ball,
    collision: Collision
): void {
    let timeNow: number = performance.now();
    let deltaTime: number = (timestamp - timeNow) / frameDuration;
    lastTimestamp = timeNow;

    if (lastTimestamp >= deltaTime) {
        screen.clear();
        screen.drawBricks(bricks);
        screen.drawSprite(paddle);
        screen.drawSprite(ball);
        // Move ball
        ball.moveBall();
        // Check collision
        collision.checkWallCollision(ball, screen);
        collision.checkPaddleCollision(ball, paddle);
        const colliding: boolean =
            collision.checkCollidingWithBrick(ball, bricks);

        if (colliding) {
            score += 1;
            screen.drawScore(score);
        }
        // Move paddle and check so it won't exit the playfield
        if (
            (paddle.isMovingLeft && paddle.pos.x > 0) ||
            (paddle.isMovingRight &&
                paddle.pos.x <
                    screen.canvas.width - paddle.width)
        ) {
            paddle.movePaddle();
        }
        requestAnimationFrame((timestamp): void => {
            gameLoop(
                timestamp,
                screen,
                bricks,
                paddle,
                ball,
                collision
            );
        });
    }
}

function startGame(screen: CanvasView) {
    // Reset displays
    score = 0;
    screen.drawInfo('');
    screen.drawScore(0);
    // Create all bricks
    const bricks: Brick[] = createBricks();
    // Create a Ball
    const ball: Ball = new Ball(
        settings.BALL_SPEED,
        settings.BALL_SIZE,
        {
            x: settings.BALL_STARTX,
            y: settings.BALL_STARTY,
        },
        BALL_IMAGE
    );
    // Create a Paddle
    const paddle: Paddle = new Paddle(
        settings.PADDLE_SPEED,
        settings.PADDLE_WIDTH,
        settings.PADDLE_HEIGHT,
        {
            x: settings.PADDLE_STARTX,
            y:
                screen.canvas.height -
                settings.PADDLE_HEIGHT -
                5,
        },
        PADDLE_IMAGE
    );
    let collision: Collision = new Collision();

    gameLoop(
        lastTimestamp,
        screen,
        bricks,
        paddle,
        ball,
        collision
    );
}

// Create a new view
const view: CanvasView = new CanvasView('#playField');
export const settings: Settings =
    SettingsManager.getInstance().settings;
view.initStartButton(startGame);
