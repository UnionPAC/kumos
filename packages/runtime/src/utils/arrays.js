/**
 * Filter null and undefined values from an array.
 * @param {array} arr - The array to be filtered
 * @returns {array} Array with no null or undefined values
 */
export function withoutNulls(arr) {
  return arr.filter((item) => item != null);
}
