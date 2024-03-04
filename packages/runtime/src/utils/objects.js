/**
 *
 * Compares two objects, returns the keys that have been added, removed or updated.
 *
 * _Note: The comparison is shallow, only the first level of keys is compared_
 *
 * @param {object} oldObj the old object
 * @param {object} newObj the new object
 * @returns {{added: string[], removed: string[], updated: string[]}}
 */
export function objectsDiff(oldObj, newObj) {
  const oldKeys = Object.keys(oldObj);
  const newKeys = Object.keys(newObj);

  return {
    added: newKeys.filter((key) => !(key in oldObj)),
    removed: oldKeys.filter((key) => !(key in newObj)),
    updated: newKeys.filter(
      (key) => key in oldObj && oldObj[key] !== newObj[key]
    ),
  };
}
