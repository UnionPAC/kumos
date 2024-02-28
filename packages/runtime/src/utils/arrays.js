export function toArray(possibleArray) {
  return Array.isArray(possibleArray) ? possibleArray : [possibleArray];
}

export function withoutNulls(arr) {
  return arr.filter((item) => item != null);
}
