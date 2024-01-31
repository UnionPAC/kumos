import { test, expect } from "vitest";
import { withoutNulls } from "../utils/arrays";

test("filter out nulls", () => {
  expect(withoutNulls([1, 2, null, 3])).toEqual([1, 2, 3]);
});
