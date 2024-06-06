import { CanvasView } from './view/CanvasView';
import { Ball } from './sprites/Ball';
import { Brick } from './sprites/Brick';
import { Paddle } from './sprites/Paddle';

// Images
import PADDLE_IMAGE from './images/paddle.png';
import BALL_IMAGE from './images/ball.png';
// Level and colors
import {
  PADDLE_SPEED,
  PADDLE_WIDTH,
  PADDLE_HEIGHT,
  PADDLE_STARTX,
  BALL_SPEED,
  BALL_SIZE,
  BALL_STARTX,
  BALL_STARTY,
} from './setup';
// Helpers
import { createBricks } from './helpers';

let gameOver: boolean = false;
let score: number = 0;
const targetFps: number = 60;
let lastTimestamp = 0;
const frameDuration = 1000 / targetFps;

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
  view: CanvasView,
  bricks: Brick[],
  paddle: Paddle,
  ball: Ball
) {
  let timeNow = performance.now();
  let deltaTime = (timestamp - timeNow) / frameDuration;
  lastTimestamp = timeNow;

  if (lastTimestamp >= deltaTime) {
    view.clear();
    view.drawBricks(bricks);
    view.drawSprite(paddle);
    view.drawSprite(ball);

    // Move paddle and check so it won't exit the playfield
    if (
      (paddle.isMovingLeft && paddle.pos.x > 0) ||
      (paddle.isMovingRight && paddle.pos.x < view.canvas.width - paddle.width)
    ) {
      paddle.movePaddle();
    }
    requestAnimationFrame(timestamp =>
      gameLoop(timestamp, view, bricks, paddle, ball)
    );
  }
}

function startGame(view: CanvasView) {
  // Reset displays
  score = 0;
  view.drawInfo('');
  view.drawScore(0);
  // Create all bricks
  const bricks = createBricks();
  // Create a Ball
  const ball = new Ball(
    BALL_SPEED,
    BALL_SIZE,
    { x: BALL_STARTX, y: BALL_STARTY },
    BALL_IMAGE
  );
  // Create a Paddle
  const paddle = new Paddle(
    PADDLE_SPEED,
    PADDLE_WIDTH,
    PADDLE_HEIGHT,
    {
      x: PADDLE_STARTX,
      y: view.canvas.height - PADDLE_HEIGHT - 5,
    },
    PADDLE_IMAGE
  );

  gameLoop(lastTimestamp, view, bricks, paddle, ball);
}

// Create a new view
const view = new CanvasView('#playField');
view.initStartButton(startGame);
