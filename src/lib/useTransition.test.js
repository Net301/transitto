import {
    areColors, getVelocityVector, hexToRgb, rgbToHex, transitionType,
    IS_NUMBER, IS_UNKNOWN, IS_INCOMPARABLE, IS_STRING, IS_COLOR
} from './useTransition'


test('areColors()', () => {
    expect(areColors('#00ff99', '#00ff99')).toBe(true);
    expect(areColors("#aaa", "#bbb")).toBe(true);
    expect(areColors('##aaa', '#bbb')).toBe(false);
    expect(areColors(1, 2)).toBe(false);
    expect(areColors()).toBe(false);
});

test('getVelocityVector()', () => {
    expect(getVelocityVector(10, 10, 1)).toBe(0);
    expect(getVelocityVector(1, 2, 1)).toBe(1);
    expect(getVelocityVector(-10, 0, 1)).toBe(10);
    expect(getVelocityVector(10, 0, 1)).toBe(-10);
});

test('hexToRgb()', () => {
    expect(hexToRgb("#000000")).toMatchObject({ "b": 0, "g": 0, "r": 0 });
    expect(hexToRgb("#ffffff")).toMatchObject({ "b": 255, "g": 255, "r": 255 });
})

test('rgbToHex()', () => {
    expect(rgbToHex(0, 0, 0)).toBe("#000000");
    expect(rgbToHex(255, 255, 255)).toBe("#ffffff");
})

test('transitionType()', () => {
    expect(transitionType(123, 1222)).toBe(IS_NUMBER);
    expect(transitionType("asds", "12esa")).toBe(IS_STRING);
    expect(transitionType("#fff", "#ccc")).toBe(IS_COLOR);
    expect(transitionType("#ffcc99", "#fff")).toBe(IS_COLOR);
})