import { expect, test } from "vitest";
import { objectsDiff } from "../utils/objects";

test("no change", () => {
  const oldObj = { foo: "bar" };
  const newObj = { foo: "bar" };
  const { added, removed, updated } = objectsDiff(oldObj, newObj);

  expect(added).toEqual([]);
  expect(removed).toEqual([]);
  expect(updated).toEqual([]);
});

test("add key in new object", () => {
  const oldObj = { foo: "bar" };
  const newObj = { foo: "bar", color: "purple" };
  const { added, removed, updated } = objectsDiff(oldObj, newObj);

  expect(added).toEqual(["color"]);
  expect(removed).toEqual([]);
  expect(updated).toEqual([]);
});

test("removed key in new object", () => {
  const oldObj = { foo: "bar", test: 123 };
  const newObj = { test: 123 };
  const { added, updated, removed } = objectsDiff(oldObj, newObj);

  expect(added).toEqual([]);
  expect(removed).toEqual(["foo"]);
  expect(updated).toEqual([]);
});

test("update key in new object", () => {
  const oldObj = { foo: "bar" };
  const newObj = { foo: "loo" };
  const { added, removed, updated } = objectsDiff(oldObj, newObj);

  expect(added).toEqual([]);
  expect(removed).toEqual([]);
  expect(updated).toEqual(["foo"]);
});
