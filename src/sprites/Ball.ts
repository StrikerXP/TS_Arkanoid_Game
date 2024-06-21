import { Vector } from '~/types';
import { Paddle } from '~/sprites/Paddle';
import { Brick } from '~/sprites/Brick';

export class Ball {
  private speed: Vector;
  private ballImage: HTMLImageElement = new Image();

  constructor(
    speed: number,
    private ballSize: number,
    private position: Vector,
    image: string
  ) {
    this.ballSize = ballSize;
    this.position = position;
    this.speed = {
      x: 0,
      y: -speed,
    };
    this.ballImage.src = image;
  }

  // Getters
  get width(): number {
    return this.ballSize;
  }

  get height(): number {
    return this.ballSize;
  }

  get pos(): Vector {
    return this.position;
  }

  get image(): HTMLImageElement {
    return this.ballImage;
  }

  // Methods
  changeYDirection(): void {
    this.speed.y = -this.speed.y;
  }

  changeXDirection(): void {
    this.speed.x = -this.speed.x;
  }

  moveBall(): void {
    this.pos.x += this.speed.x;
    this.pos.y += this.speed.y;
  }

  handlePaddleCollision(object: Paddle | Brick): void {
    //* Method to calculate new speed vector based on collision with paddle
    const ballCenterCoords:number = this.pos.x + this.ballSize / 2;
    const objectCenterCoords: number = object.pos.x + object.width / 2;
    const collisionPoint: number = ballCenterCoords - objectCenterCoords;

    // Normalize collision point to range [-1, 1]
    const normalizedCollisionPoint: number = collisionPoint / (object.width / 2);

    // Calculate new angle
    const maxBounceAngle: number = Math.PI / 3;
    const bounceAngle: number = normalizedCollisionPoint * maxBounceAngle;

    // Calculate new speed vector
    const speed: number = Math.sqrt(Math.pow(this.speed.x, 2) + Math.pow(this.speed.y, 2));
    this.speed.x = speed * Math.sin(bounceAngle);
    this.speed.y = -speed * Math.cos(bounceAngle);
  }
}
