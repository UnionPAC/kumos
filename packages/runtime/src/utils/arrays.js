// filter null and undefined values from an array
export function withoutNulls(arr) {
  return arr.filter((item) => item != null);
}
