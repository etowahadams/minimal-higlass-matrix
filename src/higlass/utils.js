import { color } from "d3-color";
import { GLOBALS } from "./configs";
import { scaleLinear } from "d3-scale";
import { range } from "d3-array";
import { rgb } from "d3-color";
import ndarray from "ndarray";

/**
 * Check if a 2D or 1D point is within a rectangle or range
 * @param {number} x - The point's X coordinate.
 * @param {number} y - The point's Y coordinate.
 * @param {number} minX - The rectangle's start X coordinate.
 * @param {number} maxX - The rectangle's start X coordinate.
 * @param {number} minY - The rectangle's start X coordinate.
 * @param {number} maxY - The rectangle's start X coordinate.
 * @return {boolean} If `true` the [x,y] point is in the rectangle.
 */
export const isWithin = (x, y, minX, maxX, minY, maxY, is1d = false) =>
  is1d
    ? (x >= minX && x <= maxX) || (y >= minY && y <= maxY)
    : x >= minX && x <= maxX && y >= minY && y <= maxY;

export const fakePubSub = {
  __fake__: true,
  publish: () => {},
  subscribe: () => ({ event: "fake", handler: () => {} }),
  unsubscribe: () => {},
  clear: () => {},
};

export function uuid() {
  return Math.random().toString(36).substring(2, 10);
}

/**
 * Convert a regular color value (e.g. 'red', '#FF0000', 'rgb(255,0,0)') to a
 * hex value which is legible by PIXI
 *
 * @param {string} colorValue - Color value to convert
 * @return {number} Hex value
 */
export const colorToHex = (colorValue) => {
  /** @type {import('d3-color').RGBColor} */
  // @ts-expect-error - FIXME: `color` can return many different types
  // depending on the string input. We should probably use a different
  // the more strict `rgb` function instead?
  const c = color(colorValue);
  const hex = GLOBALS.PIXI.utils.rgb2hex([
    c.r / 255.0,
    c.g / 255.0,
    c.b / 255.0,
  ]);

  return hex;
};

/**
 * Throttle and debounce a function call
 *
 * Throttling a function call means that the function is called at most every
 * `interval` milliseconds no matter how frequently you trigger a call.
 * Debouncing a function call means that the function is called the earliest
 * after `finalWait` milliseconds wait time where the function was not called.
 * Combining the two ensures that the function is called at most every
 * `interval` milliseconds and is ensured to be called with the very latest
 * arguments after after `finalWait` milliseconds wait time at the end.
 *
 * The following imaginary scenario describes the behavior:
 *
 * MS | interval=2 and finalWait=2
 * 01. y(f, 2, 2)(args_01) => f(args_01) call
 * 02. y(f, 2, 2)(args_02) => throttled call
 * 03. y(f, 2, 2)(args_03) => f(args_03) call
 * 04. y(f, 2, 2)(args_04) => throttled call
 * 05. y(f, 2, 2)(args_05) => f(args_05) call
 * 06. y(f, 2, 2)(args_06) => throttled call
 * 07. y(f, 2, 2)(args_07) => f(args_03) call
 * 08. y(f, 2, 2)(args_08) => throttled call
 * 09. nothing
 * 10. y(f, 2, 2)(args_10) => f(args_10) call from debouncing
 *
 * @template {any[]} Args
 * @param {(...args: Args) => void} func - Function to be throttled and debounced
 * @param {number} interval - Throttle intevals in milliseconds
 * @param {number} finalWait - Debounce wait time in milliseconds
 * @return {(request: unknown, ...args: Args) => void} - Throttled and debounced function
 */
export const throttleAndDebounce = (func, interval, finalWait) => {
  /** @type {ReturnType<typeof setTimeout> | undefined} */
  let timeout;
  let blockedCalls = 0;

  const reset = () => {
    timeout = undefined;
  };

  /** @param {Args} args */
  const debounced = (...args) => {
    const later = () => {
      // Since we throttle and debounce we should check whether there were
      // actually multiple attempts to call this function after the most recent
      // throttled call. If there were no more calls we don't have to call
      // the function again.
      if (blockedCalls > 0) {
        func(...args);
        blockedCalls = 0;
      }
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, finalWait);
  };

  debounced.cancel = () => {
    clearTimeout(timeout);
    reset();
  };

  /** @param {Args} args */
  debounced.immediate = (...args) => {
    func(...args);
  };

  let wait = false;
  /**
   * @param {unknown} _request
   * @param {Args} args
   */
  const throttled = (_request, ...args) => {
    if (!wait) {
      func(...args);
      debounced(...args);

      wait = true;
      blockedCalls = 0;

      setTimeout(() => {
        wait = false;
      }, interval);
    } else {
      blockedCalls++;
    }
  };

  return throttled;
};

/** @typedef {[string, number]} ChromsizeRow */

/**
 * @typedef CumulativeChromsizeEntry
 * @property {number} id
 * @property {string} chr
 * @property {number} pos
 */

/**
 * @typedef ParsedChromsizes
 * @property {CumulativeChromsizeEntry[]} cumPositions
 * @property {Record<string, CumulativeChromsizeEntry>} chrPositions
 * @property {number} totalLength
 * @property {Record<string, number>} chromLengths
 */

/**
 * Parse an array of chromsizes, for example that result from reading rows of a chromsizes CSV file.
 *
 * @param {ArrayLike<ChromsizeRow>} data - Array of [chrName, chrLen] "tuples".
 * @returns {ParsedChromsizes}
 */
export function parseChromsizesRows(data) {
  /** @type {Array<CumulativeChromsizeEntry>} */
  const cumValues = [];
  /** @type {Record<string, number>} */
  const chromLengths = {};
  /** @type {Record<string, CumulativeChromsizeEntry>} */
  const chrPositions = {};

  let totalLength = 0;

  for (let i = 0; i < data.length; i++) {
    const length = Number(data[i][1]);
    totalLength += length;

    const newValue = {
      id: i,
      chr: data[i][0],
      pos: totalLength - length,
    };

    cumValues.push(newValue);
    chrPositions[newValue.chr] = newValue;
    chromLengths[data[i][0]] = length;
  }

  return {
    cumPositions: cumValues,
    chrPositions,
    totalLength,
    chromLengths,
  };
}

/**
 * Convert a regular color value (e.g. 'red', '#FF0000', 'rgb(255,0,0)') to a
 * RGBA array, with support for the value "transparent".
 *
 * @param {string} colorValue - An RGB(A) color value to convert.
 * @return {[r: number, g: number, b: number, a: number]} An RGBA array.
 */
export const colorToRgba = (colorValue) => {
  if (colorValue === "transparent") {
    return [255, 255, 255, 0];
  }
  /** @type {import('d3-color').RGBColor} */
  // @ts-expect-error - FIXME: `color` can return many different types
  // depending on the string input. We should probably use a different
  // the more strict `rgb` function instead?
  const c = color(colorValue);
  return [c.r, c.g, c.b, 255];
};

import { bisector } from "d3-array";

const chromInfoBisector = bisector(
  (/** @type {{ pos: number }} */ d) => d.pos
).left;

/**
 * @template {string} Name
 * @typedef {[name: Name, pos: number, offset: number, insertPoint: number ]} ChromosomePosition
 */

/**
 * Convert an absolute genome position to a chromosome position.
 * @template {string} Name
 * @param {number} absPosition - Absolute genome position.
 * @param {import('../types').ChromInfo<Name>} chromInfo - Chromosome info object.
 * @return {ChromosomePosition<Name> | null} The chromosome position.
 */
export const absToChr = (absPosition, chromInfo) => {
  if (!chromInfo || !chromInfo.cumPositions || !chromInfo.cumPositions.length) {
    return null;
  }

  let insertPoint = chromInfoBisector(chromInfo.cumPositions, absPosition);
  const lastChr = chromInfo.cumPositions[chromInfo.cumPositions.length - 1].chr;
  const lastLength = chromInfo.chromLengths[lastChr];

  if (insertPoint > 0) {
    insertPoint -= 1;
  }

  let chrPosition = Math.floor(
    absPosition - chromInfo.cumPositions[insertPoint].pos
  );
  let offset = 0;

  if (chrPosition < 0) {
    // before the start of the genome
    offset = chrPosition - 1;
    chrPosition = 1;
  }

  if (
    insertPoint === chromInfo.cumPositions.length - 1 &&
    chrPosition > lastLength
  ) {
    // beyond the last chromosome
    offset = chrPosition - lastLength;
    chrPosition = lastLength;
  }

  return [
    chromInfo.cumPositions[insertPoint].chr,
    chrPosition,
    offset,
    insertPoint,
  ];
};

/**
 * Convert a color domain to a 255 element array of [r,g,b,a]
 * values (all from 0 to 255). The last color (255) will always be
 * transparent
 */
export const colorDomainToRgbaArray = (colorRange, noTansparent = false) => {
  // we should always have at least two values in the color range
  const domain = colorRange.map((x, i) => i * (255 / (colorRange.length - 1)));

  const d3Scale = scaleLinear().domain(domain).range(colorRange);

  const fromX = noTansparent ? 255 : 254;

  const rgbaArray = range(fromX, -1, -1)
    .map(d3Scale)
    .map((x) => {
      const r = rgb(x);
      return [r.r, r.g, r.b, r.opacity * 255];
    });

  // add a transparent color at the end for missing values and, more
  // importantly, non-existing values such as the empty upper right or lower
  // left triangle of tiles on the diagonal.
  if (rgbaArray.length < 256) rgbaArray.push([255, 255, 255, 0]);

  return rgbaArray;
};

/**
 * Download a file to the user's computer.
 * @param {string} filename - Name of the file to download
 * @param {string | Blob} stringOrBlob - Contents of the file to download
 */
export function download(filename, stringOrBlob) {
  // yanked from here
  // https://stackoverflow.com/questions/3665115/create-a-file-in-memory-for-user-to-download-not-through-server

  const blob =
    typeof stringOrBlob === "string"
      ? new Blob([stringOrBlob], { type: "application/octet-stream" })
      : stringOrBlob;
  const elem = window.document.createElement("a");
  elem.href = window.URL.createObjectURL(blob);
  elem.download = filename;
  document.body.appendChild(elem);
  elem.click();
  document.body.removeChild(elem);
  URL.revokeObjectURL(elem.href);
}

export const ndarrayAssign = (target, source) => {
  const numSource = +source;
  const isScalar = !Number.isNaN(numSource);

  if (isScalar) {
    if (target.dimension === 1) {
      for (let i = 0; i < target.shape[0]; ++i) {
        target.set(i, numSource);
      }
    } else {
      for (let i = 0; i < target.shape[0]; ++i) {
        for (let j = 0; j < target.shape[1]; ++j) {
          target.set(i, j, numSource);
        }
      }
    }
  } else {
    const ty = target.shape[0];
    const tx = target.shape[1];
    const sy = source.shape[0];
    const sx = source.shape[1];

    if (ty !== sy || tx !== sx) {
      console.warn(
        "Cannot assign source to target ndarray as the dimensions do not match",
        ty,
        sy,
        tx,
        sx
      );
      return;
    }

    if (target.dimension === 1) {
      for (let i = 0; i < target.shape[0]; ++i) {
        target.set(i, source.get(i));
      }
    } else {
      for (let i = 0; i < target.shape[0]; ++i) {
        for (let j = 0; j < target.shape[1]; ++j) {
          target.set(i, j, source.get(i, j));
        }
      }
    }
  }
};

export const ndarrayToList = (arr) => {
  const size = arr.shape.reduce((s, x) => s * x, 1);
  const list = new Array(size);

  if (arr.dimension === 1) {
    let l = 0;
    for (let i = 0; i < arr.shape[0]; ++i) {
      list[l] = arr.get(i);
      l++;
    }
  } else {
    let l = 0;
    for (let i = 0; i < arr.shape[0]; ++i) {
      for (let j = 0; j < arr.shape[1]; ++j) {
        list[l] = arr.get(i, j);
        l++;
      }
    }
  }

  return list;
};

export const ndarrayFlatten = (arr) => {
  if (arr.shape.length === 1) return arr;

  return ndarray(ndarrayToList(arr));
};

/**
 * Exposed map function. You can do cool stuff with that!
 *
 * @description
 * The pure map function is more powerful because it can be used on data types
 * other than Array too.
 *
 * @template T, B
 * @param {(item: T, idx?: number) => B} f - Mapping function.
 * @return {(x: Array<T>) => Array<B>} Mapped array.
 */
// @ts-expect-error - TS can't infer the type of the returned function.
const map = (f) => (x) => Array.prototype.map.call(x, f);

/**
 * Convert an object into array which entries are the prop values of the object
 *
 * @param {Object} obj - Object to be arrayified
 * @return {Array} Array of the object.
 */
export const objVals = (obj) => map((key) => obj[key])(Object.keys(obj));

export { default as showMousePosition } from './mouse-position';

/**
 * Factory function for a value to RGB color converter
 *
 * @template T
 * @param {(value: number) => number} valueScale - Value scaling function.
 * @param {Array<T>} colorScale - Color scale array.
 * @param {number} pseudoCounts - Pseudo counts used as a pseudocount to prevent taking the log of 0.
 * @param {number} eps - Epsilon.
 * @return {(value: number) => T} RGB color array.
 */
export const valueToColor =
  (valueScale, colorScale, pseudoCounts = 0, eps = 0.000001) =>
  (value) => {
    let rgbIdx = 255;

    if (value > eps) {
      // values less than espilon are considered NaNs and made transparent
      // (rgbIdx 255)
      rgbIdx = Math.max(
        0,
        Math.min(255, Math.floor(valueScale(value + pseudoCounts))),
      );
    }

    return colorScale[rgbIdx];
  };
