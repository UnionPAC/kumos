import { test, expect } from "vitest";
import { withoutNulls, toArray } from "../utils/arrays";

test("filter out nulls", () => {
  expect(withoutNulls([1, 2, null, 3])).toEqual([1, 2, 3]);
});

test("convert array to array", () => {
  const arr = [2, 3, 4];
  expect(toArray(arr)).toBe(arr);
});

test("convert non-array to array", () => {
  const str = "hello";
  expect(toArray(str)).toEqual([str]);
});
