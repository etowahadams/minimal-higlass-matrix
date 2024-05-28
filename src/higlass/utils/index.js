export { default as DenseDataExtrema1D } from "./DenseDataExtrema1D";
export { default as DenseDataExtrema2D } from "./DenseDataExtrema2D";

import { mean, sum, variance, deviation } from "d3-array";

/**
 * Return an array of values that are present in this dictionary
 *
 * @template {object} T
 * @param {T} dictionary
 * @returns {Array<T[keyof T]>}
 */
export function dictValues(dictionary) {
  /** @type {Array<T[keyof T]>} */
  const values = [];

  for (const key in dictionary) {
    if (dictionary.hasOwnProperty(key)) {
      values.push(dictionary[key]);
    }
  }

  return values;
}

/**
 * Calculate the maximum non-zero value in the data
 * @param {ArrayLike<number>} data - An array of values
 * @returns {number} The maximum non-zero value in the array
 */
export function maxNonZero(data) {
  const epsilon = 0.0000001;
  /**
   * Calculate the minimum non-zero value in the data
   *
   * Parameters
   * ----------
   *  data: Float32Array
   *    An array of values
   *
   * Returns
   * -------
   *  minNonZero: float
   *    The minimum non-zero value in the array
   */
  let maxNonZeroNum = Number.MIN_SAFE_INTEGER;

  for (let i = 0; i < data.length; i++) {
    const x = data[i];

    if (x < epsilon && x > -epsilon) {
      continue;
    }

    if (x > maxNonZeroNum) {
      maxNonZeroNum = x;
    }
  }

  return maxNonZeroNum;
}

/**
 * Calculate the minimum non-zero value in the data
 * @param {ArrayLike<number>} data - An array of values
 * @returns {number} The minimum non-zero value in the array
 */
export function minNonZero(data) {
  const epsilon = 0.0000001;
  /**
   * Calculate the minimum non-zero value in the data
   *
   * Parameters
   * ----------
   *  data: Float32Array
   *    An array of values
   *
   * Returns
   * -------
   *  minNonZero: float
   *    The minimum non-zero value in the array
   */
  let minNonZeroNum = Number.MAX_SAFE_INTEGER;

  for (let i = 0; i < data.length; i++) {
    const x = data[i];

    if (x < epsilon && x > -epsilon) {
      continue;
    }

    if (x < minNonZeroNum) {
      minNonZeroNum = x;
    }
  }

  return minNonZeroNum;
}

/**
 * Trim trailing slash of an URL.
 * @param {string} url - URL to be trimmed.
 * @return {string} Trimmed URL.
 */
export const trimTrailingSlash = (url) => (url || "").replace(/\/$/, "");

/** @typedef {(values: number[]) => number | undefined} Aggregation */

/**
 * Get an aggregation function from a function name.
 * @param {'mean' | 'sum' | 'variance' | 'deviation'} name - The type of aggregation.
 * If an unknown string is passed, the mean function will be used (and a warning will be logged).
 * @returns {Aggregation} The function of interest as determined by the string,
 */
export const getAggregationFunction = (name) => {
  /** @type {Aggregation} */
  let aggFunc;
  const lowerCaseName = name ? name.toLowerCase() : name;
  switch (lowerCaseName) {
    case "mean":
      aggFunc = mean;
      break;
    case "sum":
      aggFunc = sum;
      break;
    case "variance":
      aggFunc = variance;
      break;
    case "deviation":
      aggFunc = deviation;
      break;
    default:
      aggFunc = mean;
      console.warn(
        "Encountered an unsupported selectedRowsAggregationMode option."
      );
  }
  return aggFunc;
};

/**
 * Compute the size associated with a potentially 2d array of selected item indices.
 * For example, this can be used to compute the total height of a `horizontal-multivec` track
 * where rows are selected individually or in aggregation groups.
 *
 * @param {Array<unknown>} selectedItems The 1d or 2d array of items or groups of items.
 * @param {boolean} withRelativeSize Does a group of indices count as 1 unit size
 * or is its size relative to the group size?
 * @returns {number} The computed size value.
 * Between 0 and the total number of items in the (flattened) input array.
 */
export const selectedItemsToSize = (selectedItems, withRelativeSize) =>
  selectedItems.reduce(
    (/** @type {number} */ a, h) =>
      a + (Array.isArray(h) && withRelativeSize ? h.length : 1),
    0
  );

/** @param {number} ms */
export const timeout = (ms) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

/**
 * Used to create a fake pubsub object for testing purposes
 */
export const fakePubSub = {
  __fake__: true,
  publish: () => {},
  subscribe: () => ({ event: "fake", handler: () => {} }),
  unsubscribe: () => {},
  clear: () => {},
};
