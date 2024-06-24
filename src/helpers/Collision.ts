import { Brick } from '~/sprites/Brick';
import { Paddle } from '~/sprites/Paddle';
import { Ball } from '~/sprites/Ball';
import { CanvasView } from '~/view/CanvasView';

export class Collision {
    isCollidingBrick(ball: Ball, brick: Brick): boolean {
        if (
            ball.pos.x < brick.pos.x + brick.width &&
            ball.pos.x + ball.width > brick.pos.x &&
            ball.pos.y < brick.pos.y + brick.height &&
            ball.pos.y + ball.height > brick.pos.y
        ) {
            return true;
        }
        return false;
    }

    checkCollidingWithBrick(
        ball: Ball,
        bricks: Brick[],
    ): boolean {
        let colliding: boolean = false;

        bricks.forEach((brick: Brick, i: number): void => {
            if (this.isCollidingBrick(ball, brick)) {
                if (brick.energy === 1) {
                    bricks.splice(i, 1);
                } else {
                    brick.energy -= 1;
                }
                colliding = true;
            }
        });
        if (colliding) ball.changeYDirection();

        return colliding;
    }

    checkWallCollision(
        ball: Ball,
        screen: CanvasView,
    ): void {
        // Check ball collision with walls
        if (
            ball.pos.x > screen.canvas.width - ball.width ||
            ball.pos.x < 0
        ) {
            ball.changeXDirection();
        }
        if (ball.pos.y < 0) {
            ball.changeYDirection();
        }
    }

    checkPaddleCollision(
        ball: Ball,
        paddle: Paddle,
    ): void {
        // Check ball collision with paddle
        if (
            ball.pos.x + ball.width >= paddle.pos.x &&
            ball.pos.x <= paddle.pos.x + paddle.width &&
            ball.pos.y + ball.height > paddle.pos.y &&
            ball.pos.y < paddle.pos.y + paddle.height
        ) {
            ball.changeYDirection();
            ball.ballAngleBounce(paddle);
        }
        // Check ball collision with the left side of the paddle
        if (
            ball.pos.x + ball.width >= paddle.pos.x &&
            ball.pos.x < paddle.pos.x &&
            ball.pos.y + ball.height > paddle.pos.y &&
            ball.pos.y < paddle.pos.y + paddle.height
        ) {
            ball.changeXDirection();
            ball.ballAngleBounce(paddle);
        }
        // Check ball collision with the right side of the paddle
        if (
            ball.pos.x <= paddle.pos.x + paddle.width &&
            ball.pos.x + ball.width > paddle.pos.x + paddle.width &&
            ball.pos.y + ball.height > paddle.pos.y &&
            ball.pos.y < paddle.pos.y + paddle.height
        ) {
            ball.changeXDirection();
            ball.ballAngleBounce(paddle);
        }
    }
}
