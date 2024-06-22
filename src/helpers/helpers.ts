import { Brick } from '../sprites/Brick';
import { adjustDefaultSettings, BRICK_IMAGES, defaultSettings, Settings } from '../setup';
import { CanvasDimension } from '~/types';
import { settings } from '../index';

export function createBricks(): Brick[] {
    return settings.LEVEL.reduce((acc: Brick[], val: number, i: number): Brick[] => {
        const row: number = Math.floor((i + 1) / settings.STAGE_COLS);
        const col: number = i % settings.STAGE_COLS;

        const x: number = settings.STAGE_PADDING + col * (settings.BRICK_WIDTH + settings.BRICK_PADDING);
        const y: number = settings.STAGE_PADDING + row * (settings.BRICK_HEIGHT + settings.BRICK_PADDING);

        if (val === 0) return acc;

        return [
            ...acc,
            new Brick(
                settings.BRICK_WIDTH,
                settings.BRICK_HEIGHT,
                { x, y },
                settings.BRICK_ENERGY[val],
                BRICK_IMAGES[val],
            ),
        ];
    }, [] as Brick[]);
}

function initializeCanvas(): HTMLCanvasElement | null {
    return document.querySelector('#playField');
}
export function calculateBrickDimensions(canvasDimension: CanvasDimension, stageDimension: number, defaultSize: number): number {
    const canvas: HTMLCanvasElement | null = initializeCanvas();
    return canvas ? Math.floor((canvas[canvasDimension] - defaultSettings.STAGE_PADDING * 2) / stageDimension) - defaultSettings.BRICK_PADDING : defaultSize;
}

export function calculateStartXPosition(objectDimension: number, defaultSize: number): number {
    const canvas: HTMLCanvasElement | null = initializeCanvas();
    return canvas ? canvas.width / 2 - objectDimension / 2 : defaultSize;
}

export function calculateBallStartYPosition() {
    const canvas: HTMLCanvasElement | null = initializeCanvas();
    return canvas ? canvas.height - defaultSettings.PADDLE_HEIGHT - defaultSettings.BALL_SIZE - 5
        : 500;
}

export function loadSettingsFromLocalStorage(): Settings {
    const data: string | null = localStorage.getItem('gameSettings');
    let settings: Settings;

    if (data === null) {
        settings = adjustDefaultSettings();
        localStorage.setItem('gameSettings', JSON.stringify(settings));
        return settings;
    } else {
        return JSON.parse(data);
    }
}

