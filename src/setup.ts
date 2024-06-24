import {
    calculateBallStartYPosition,
    calculateBrickDimensions,
    calculateStartXPosition,
    loadSettingsFromLocalStorage,
} from './helpers/helpers';
import RED_BRICK_IMAGE from './images/brick-red.png';
import BLUE_BRICK_IMAGE from './images/brick-blue.png';
import GREEN_BRICK_IMAGE from './images/brick-green.png';
import YELLOW_BRICK_IMAGE from './images/brick-yellow.png';
import PURPLE_BRICK_IMAGE from './images/brick-purple.png';

export interface Settings {
    moveLeftKey: string[];
    moveRightKey: string[];
    STAGE_PADDING: number;
    STAGE_ROWS: number;
    STAGE_COLS: number;
    BRICK_PADDING: number;
    BRICK_WIDTH: number;
    BRICK_HEIGHT: number;
    PADDLE_WIDTH: number;
    PADDLE_HEIGHT: number;
    PADDLE_STARTX: number;
    PADDLE_SPEED: number;
    BALL_SPEED: number;
    BALL_SIZE: number;
    BALL_STARTX: number;
    BALL_STARTY: number;
    BRICK_ENERGY: { [key: number]: number };
    LEVEL: number[];
}

export const defaultSettings: Settings = {
    moveLeftKey: ['ArrowLeft', 'KeyA'],
    moveRightKey: ['ArrowRight', 'KeyD'],
    STAGE_PADDING: 10,
    STAGE_ROWS: 20,
    STAGE_COLS: 10,
    BRICK_PADDING: 5,
    BRICK_WIDTH: 0,
    BRICK_HEIGHT: 0,
    PADDLE_WIDTH: 150,
    PADDLE_HEIGHT: 25,
    PADDLE_STARTX: 0,
    PADDLE_SPEED: 10,
    BALL_SPEED: 5,
    BALL_SIZE: 20,
    BALL_STARTX: 0,
    BALL_STARTY: 0,
    BRICK_ENERGY: {
        1: 1,
        2: 1,
        3: 2,
        4: 2,
        5: 3,
    },
    LEVEL: [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1,
        1, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 3, 3, 3,
        3, 3, 3, 3, 3, 0, 0, 0, 4, 4, 4, 4, 4, 4, 0, 0, 0,
        0, 5, 5, 0, 0, 5, 5, 0, 0,
    ],
};

export const BRICK_IMAGES: { [key: number]: string } = {
    1: RED_BRICK_IMAGE,
    2: GREEN_BRICK_IMAGE,
    3: YELLOW_BRICK_IMAGE,
    4: BLUE_BRICK_IMAGE,
    5: PURPLE_BRICK_IMAGE,
};

export function adjustDefaultSettings(): Settings {
    defaultSettings.BRICK_WIDTH = calculateBrickDimensions(
        'width',
        defaultSettings.STAGE_COLS,
        100
    );
    defaultSettings.BRICK_HEIGHT = calculateBrickDimensions(
        'height',
        defaultSettings.STAGE_ROWS,
        30
    );
    defaultSettings.PADDLE_STARTX = calculateStartXPosition(
        defaultSettings.PADDLE_WIDTH,
        450
    );
    defaultSettings.BALL_STARTX = calculateStartXPosition(
        defaultSettings.BALL_SIZE,
        500
    );
    defaultSettings.BALL_STARTY =
        calculateBallStartYPosition();

    return defaultSettings;
}

export class SettingsManager {
    private static instance: SettingsManager;
    public settings: Settings;

    private constructor() {
        this.settings = loadSettingsFromLocalStorage();
    }

    public static getInstance(): SettingsManager {
        if (!SettingsManager.instance) {
            SettingsManager.instance =
                new SettingsManager();
        }
        return SettingsManager.instance;
    }
}
