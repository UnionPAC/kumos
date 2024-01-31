import { test, expect } from "vitest";
import { DOM_TYPES, h, hString } from "../h";



test("create a string virtual node", () => {
  const vNode = hString("test");

  expect(vNode).toEqual({ type: DOM_TYPES.TEXT, value: "test" });
});

test("create an element virtual node", () => {
  const tag = "div";
  const props = { id: "test", class: "container" };
  const children = [hString("helloWorld"), h("button", {}, ["Submit"])];
  const vNode = h(tag, props, children);

  expect(vNode).toEqual({
    tag,
    props,
    children: [
      { type: DOM_TYPES.TEXT, value: "helloWorld" },
      {
        tag: "button",
        props: {},
        children: [{ type: DOM_TYPES.TEXT, value: "Submit" }],
        type: DOM_TYPES.ELEMENT,
      },
    ],
    type: DOM_TYPES.ELEMENT,
  });
});
