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

test("updating the class", () => {
  setAttributes(el, { class: "text-bold" });
  setAttributes(el, { class: "hidden" });

  expect(el.className).toBe("hidden");
});

test("setting styles", () => {
  setAttributes(el, { style: { color: "red", backgroundColor: "green" } });
  expect(el.style.color).toBe("red");
  expect(el.style.backgroundColor).toBe("green");
});

test("updating styles", () => {
  setAttributes(el, { style: { color: "red" } });
  setAttributes(el, { style: { color: "blue" } });
  expect(el.style.color).toBe("blue");
});

test('setting a "data-" attribute', () => {
  setAttributes(el, { "data-position": "100" });
  expect(el.dataset.position).toBe("100");
});

test.each([
  { name: "hidden", value: true, expected: true },
  { name: "hidden", value: false, expected: false },
  { name: "tabIndex", value: 1, expected: 1 },
  { name: "tabIndex", value: null, expected: -1 },
])(`Setting $name attribute to $value`, ({ name, value, expected }) => {
  setAttributes(el, { [name]: value });
  expect(el[name]).toBe(expected);
});
