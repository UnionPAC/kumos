import { afterEach, test, expect, vi } from "vitest";
import { h, hFragment, hString } from "../h";
import { mountDOM } from "../mount-dom";

afterEach(() => {
  document.body.innerHTML = "";
});

test("Cannot mount an element without a parent element", () => {
  const vdom = h("div", {}, [hString("Hello!")]);
  expect(() => mountDOM(vdom)).toThrow();
});

test("Mount a text element in a parent element", () => {
  const vdom = hString("test");
  mountDOM(vdom, document.body);

  expect(document.body.innerHTML).toBe("test");
});

test("Saves a reference to the created text in the vdom element", () => {
  const vdom = hString("helloWorld");
  mountDOM(vdom, document.body);

  expect(vdom.el).toBeInstanceOf(Text);
  expect(vdom.el.textContent).toBe("helloWorld");
});

test("Mount an element in a parent element", () => {
  const vdom = h("div", {}, [h("h1", {}, ["Heading!"])]);
  mountDOM(vdom, document.body);

  expect(document.body.innerHTML).toBe("<div><h1>Heading!</h1></div>");
});

test("Saves a reference to the created element in the vdom", () => {
  const vdom = h("div", {}, [h("h1", {}, ["Heading!"])]);
  mountDOM(vdom, document.body);

  expect(vdom.el).toBeInstanceOf(HTMLDivElement);
});

test("Cannot mount a fragment without a parent element", () => {
  const vdom = hFragment([h("div", {}, ["Hello"]), hString("World")]);

  expect(() => mountDOM(vdom)).toThrow();
});

test("Mount a fragment in a parent element", () => {
  const vdom = hFragment([h("div", {}, ["Hello"]), hString("World")]);
  mountDOM(vdom, document.body);

  expect(document.body.innerHTML).toBe("<div>Hello</div>World");
});

test("Mount a fragment within a fragment inside a parent element", () => {
  const vdom = hFragment([
    h("div", {}, ["Hello"]),
    hFragment([h("div", {}, ["World"])]),
  ]);

  mountDOM(vdom, document.body);
  expect(document.body.innerHTML).toBe("<div>Hello</div><div>World</div>");
});

test("Mount a fragment with children and attributes", () => {
  const vdom = hFragment([
    h("div", { class: "text-red" }, [hString("Hello")]),
    h("span", { class: "text-blue" }, [hString("World")]),
  ]);

  mountDOM(vdom, document.body);

  expect(document.body.innerHTML).toBe(
    '<div class="text-red">Hello</div><span class="text-blue">World</span>'
  );
});

test("Mount an element with an id", () => {
  const vdom = h("div", { id: "mainContent" }, [hString("helloWorld")]);
  mountDOM(vdom, document.body);

  expect(document.body.innerHTML).toBe(
    '<div id="mainContent">helloWorld</div>'
  );
});

test("Mount an element with a class", () => {
  const vdom = h("div", { class: "text-3xl" }, [hString("helloWorld")]);
  mountDOM(vdom, document.body);

  expect(document.body.innerHTML).toBe(
    '<div class="text-3xl">helloWorld</div>'
  );
});

test("Mount an element with a list of classes using one string", () => {
  const vdom = h("div", { class: "text-bold underline" }, [
    hString("helloWorld"),
  ]);
  mountDOM(vdom, document.body);

  expect(document.body.innerHTML).toBe(
    '<div class="text-bold underline">helloWorld</div>'
  );
});

test("Mount an element with a list of classes using an array of strings", () => {
  const vdom = h("div", { class: ["text-bold", "underline"] }, [
    hString("helloWorld"),
  ]);
  mountDOM(vdom, document.body);

  expect(document.body.innerHTML).toBe(
    '<div class="text-bold underline">helloWorld</div>'
  );
});

test("Mount an element with event handlers", () => {
  const onClick = vi.fn();
  const vdom = h("div", { on: { click: onClick } });
  mountDOM(vdom, document.body);

  vdom.el?.click();

  expect(onClick).toBeCalledTimes(1);
  expect(onClick).toBeCalledWith(expect.any(MouseEvent));
});

test("Mounts an element with styles", () => {
  const vdom = h("div", { style: { color: "red" } }, [hString("helloWorld")]);
  mountDOM(vdom, document.body);
  const el = vdom.el;

  expect(document.body.innerHTML).toBe(
    '<div style="color: red;">helloWorld</div>'
  );
  expect(el.style.color).toBe("red");
});
