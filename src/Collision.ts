import { Brick } from '~/sprites/Brick';
import { Paddle } from '~/sprites/Paddle';
import { Ball } from '~/sprites/Ball';
import { CanvasView } from '~/view/CanvasView';

export class Collision {
    checkBallCollision(ball: Ball, paddle: Paddle, screen: CanvasView): void {
        // Check ball collision with paddle
        if (ball.pos.x + ball.width > paddle.pos.x && ball.pos.x < paddle.pos.x + paddle.width && ball.pos.y + ball.height === paddle.pos.y) {
            ball.changeYDirection()
        }
    }
}
