import { beforeEach, expect, test, vi } from "vitest";
import { destroyDOM } from "../destroy-dom";
import { mountDOM } from "../mount-dom";
import { h, hString } from "../h";

beforeEach(() => {
  document.body.innerHTML = "";
});

test("destroy a text element", () => {
  // Mount text node to DOM
  const vdom = hString("helloWorld");
  mountDOM(vdom, document.body);
  expect(document.body.innerHTML).toBe("helloWorld");
  expect(vdom.el).toBeInstanceOf(Text);

  // Destroy DOM with text node
  destroyDOM(vdom);
  expect(document.body.innerHTML).toBe("");
  expect(allElementsHaveBeenDestroyed(vdom)).toBe(true);
});

test("destroy an html element (h) and its children", () => {
  // Mount element to DOM
  const vdom = h("div", {}, [
    h("h1", {}, [hString("Hello!")]),
    h("p", {}, [hString("I am a description")]),
  ]);

  mountDOM(vdom, document.body);
  expect(document.body.innerHTML).toBe(
    "<div><h1>Hello!</h1><p>I am a description</p></div>"
  );
  expect(vdom.el).toBeInstanceOf(HTMLDivElement);

  // Destroy DOM
  destroyDOM(vdom);
  expect(document.body.innerHTML).toBe("");
  expect(allElementsHaveBeenDestroyed(vdom)).toBe(true);
});

test("removes event listeners from html element", () => {
  const handler = vi.fn();
  const vdom = h("button", { on: { click: handler } }, [hString("Click Me")]);

  mountDOM(vdom, document.body);
  console.log(`DOM after initial mount: ${document.body.innerHTML}`);

  const buttonEl = vdom.el;
  console.log(`buttonEl before destroyDOM: ${buttonEl}`);
  buttonEl.click();

  expect(handler).toHaveBeenCalledTimes(1);

  destroyDOM(vdom);
  console.log(`buttonEl after destroyDOM: ${buttonEl}`);
  buttonEl.click();

  setTimeout(() => {
    expect(handler).toHaveBeenCalledTimes(1);
  }, 2000);
});

test("destroy a fragment", () => {});

/**
 *
 * Checks whether a given virtual DOM node and all its descendants have corresponding real DOM elements.
 * If any of them have not been destroyed, the function returns false; otherwise, it returns true.
 *
 * @param {object} vdom the virtual dom to check
 * @returns {boolean} a boolean that states if all elements have been destroyed
 */
function allElementsHaveBeenDestroyed(vdom) {
  if (vdom.el) {
    return false;
  }

  return vdom.children?.every(allElementsHaveBeenDestroyed) ?? true;
}
