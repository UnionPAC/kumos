import { test, expect } from "vitest";
import { assert } from "../utils/assert";

test("doesn't throw an error when there is a condition passed", () => {
  expect(() => assert()).toThrow("Assertion failed");
});

test("throws an error when there is no condition passed", () => {
  expect(() => assert(true)).not.toThrow();
});

test("passing custom message", () => {
  const customErrorMessage = "Test";
  expect(() => assert(false, customErrorMessage)).toThrow(customErrorMessage);
});
