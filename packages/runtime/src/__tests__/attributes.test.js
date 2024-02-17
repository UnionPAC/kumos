import { beforeEach, expect, test, describe } from "vitest";
import { setAttributes } from "../attributes";

let el;

beforeEach(() => {
  el = document.createElement("div");
});

test("setting a class from a string", () => {
  setAttributes(el, {
    on: { click: () => console.log("yay!") },
    class: "foo bar",
  });

  expect(el.className).toBe("foo bar");
});

test("setting a class from an array", () => {
  const classes = ["foo", "bar", "test"];
  setAttributes(el, {
    on: { click: () => console.log("yay!") },
    class: classes,
  });

  expect(el.className).toBe("foo bar test");
});
