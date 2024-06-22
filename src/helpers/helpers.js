var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { Brick } from '../sprites/Brick';
import { BRICK_IMAGES, LEVEL, STAGE_COLS, STAGE_PADDING, BRICK_WIDTH, BRICK_HEIGHT, BRICK_PADDING, BRICK_ENERGY, } from '../setup';
export function createBricks() {
    return LEVEL.reduce(function (acc, val, i) {
        var row = Math.floor((i + 1) / STAGE_COLS);
        var col = i % STAGE_COLS;
        var x = STAGE_PADDING + col * (BRICK_WIDTH + BRICK_PADDING);
        var y = STAGE_PADDING + row * (BRICK_HEIGHT + BRICK_PADDING);
        if (val === 0)
            return acc;
        return __spreadArray(__spreadArray([], acc, true), [
            new Brick(BRICK_WIDTH, BRICK_HEIGHT, { x: x, y: y }, BRICK_ENERGY[val], BRICK_IMAGES[val]),
        ], false);
    }, []);
}
//# sourceMappingURL=helpers.js.map