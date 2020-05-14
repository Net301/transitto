import { useState, useEffect, useCallback } from 'react';
export const IS_NUMBER = "IS_NUMBER";
export const IS_UNKNOWN = "IS_UNKNOWN";
export const IS_INCOMPARABLE = "IS_INCOMPARABLE";
export const IS_STRING = "IS_STRING";
export const IS_COLOR = "IS_COLOR";

const useTransition = (from, to, seconds = 1, callback = () => null) => {
  const cb = useCallback(() => callback(), [callback]);
  return TransitionFactory(from, to, seconds, cb);
};

const TransitionFactory = (from, to, seconds, callback) => {
  const inputType = transitionType(from, to);
  const cb = useCallback(() => callback(), [callback]);

  switch (inputType) {
    case IS_NUMBER:
      return IncrementNumber(from, to, seconds, cb);

    case IS_STRING:
      return IncrementString(from, to, seconds, () => 0);

    case IS_COLOR:
      return IncrementColor(from, to, seconds, cb);

    case IS_UNKNOWN:
    case IS_INCOMPARABLE:
    default:
      return from;
  }
};

const IncrementNumber = (from, to, seconds, callback) => {
  const cb = useCallback(() => callback(), [callback]);
  return useIncrement(from, to, seconds, cb);
};

const IncrementString = (from, to, seconds, callback) => {
  const cb = useCallback(() => callback(), [callback]);
  const fromLength = from.length;
  const toLength = to.length;
  return to.substring(from.Length, Math.round(useIncrement(fromLength, toLength, seconds, cb)));
};

const IncrementColor = (from, to, seconds, callback) => {
  const cb = useCallback(() => callback(), [callback]);
  const nullcb = useCallback(() => null, []);
  const fromRGB = hexToRgb(from);
  const toRGB = hexToRgb(to);
  const r = Math.round(useIncrement(Math.round(parseInt(fromRGB.r)), Math.round(parseInt(toRGB.r)), seconds, cb));
  const g = Math.round(useIncrement(Math.round(parseInt(fromRGB.g)), Math.round(parseInt(toRGB.g)), seconds, nullcb));
  const b = Math.round(useIncrement(Math.round(parseInt(fromRGB.b)), Math.round(parseInt(toRGB.b)), seconds, nullcb));
  return rgbToHex(r, g, b);
};

const useIncrement = (from, to, seconds, callback) => {
  const cb = useCallback(() => callback(), [callback]);
  const [transitionValue, setTransitionValue] = useState(from, to);
  useEffect(() => {
    if (to != null) {
      const velocity = getVelocityVector(from, to, seconds);
      const interval = setInterval(() => {
        setTransitionValue(transitionValue + velocity / 1000);
      }, velocity / (to - from) * seconds);

      if (transitionValue <= to && velocity < 0 || transitionValue >= to && velocity > 0) {
        setTransitionValue(to);
        clearInterval(interval);
      }

      return () => {
        clearInterval(interval);
      };
    }
  }, [seconds, transitionValue, from, to]);
  useEffect(() => {
    if (transitionValue === to) {
      cb();
    }
  }, [transitionValue, cb, to]);
  return transitionValue;
};

export const transitionType = (from, to, seconds) => {
  if (typeof from !== typeof to) {
    return IS_INCOMPARABLE;
  }

  switch (typeof from) {
    case "number":
      return IS_NUMBER;

    case "string":
      if (areColors(from, to)) {
        return IS_COLOR;
      }

      return IS_STRING;

    default:
      return IS_UNKNOWN;
  }
};
export const areColors = (from, to) => {
  return typeof from == 'string' && typeof to == 'string' && !from.search(/^#([0-9A-F]{3}){1,2}$/i) && !to.search(/^#([0-9A-F]{3}){1,2}$/i);
};
export const getVelocityVector = (from, to, seconds) => {
  if (to !== from) {
    return (to - from) / seconds;
  }

  return 0;
};
export const hexToRgb = hex => {
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function (m, r, g, b) {
    return r + r + g + g + b + b;
  });
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
};
export const rgbToHex = (r, g, b) => {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
};
export { useTransition };