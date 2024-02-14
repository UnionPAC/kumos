import { test, expect, describe } from "vitest";
import { DOM_TYPES, h, hString, hFragment } from "../h";

describe("h", () => {
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

  test("filters null children", () => {
    const vNode = h("div", { id: "test", class: "box" }, [
      hString("helloWorld"),
      h("button", {}, ["Submit"]),
      null,
      undefined,
    ]);

    expect(vNode).toEqual({
      tag: "div",
      type: DOM_TYPES.ELEMENT,
      props: {
        id: "test",
        class: "box",
      },
      children: [
        { type: DOM_TYPES.TEXT, value: "helloWorld" },
        {
          tag: "button",
          props: {},
          children: [{ type: DOM_TYPES.TEXT, value: "Submit" }],
          type: DOM_TYPES.ELEMENT,
        },
      ],
    });
  });

  test("maps strings to virtual text nodes", () => {
    const vNode = h("div", { id: "kiwi", class: "myBox" }, [
      "helloWorld",
      h("button", {}, ["Submit"]),
    ]);

    expect(vNode).toEqual({
      tag: "div",
      type: DOM_TYPES.ELEMENT,
      props: {
        id: "kiwi",
        class: "myBox",
      },
      children: [
        { type: DOM_TYPES.TEXT, value: "helloWorld" },
        {
          tag: "button",
          props: {},
          children: [{ type: DOM_TYPES.TEXT, value: "Submit" }],
          type: DOM_TYPES.ELEMENT,
        },
      ],
    });
  });
});

describe("hString", () => {
  test("create a string virtual node", () => {
    const vNode = hString("test");

    expect(vNode).toEqual({ type: DOM_TYPES.TEXT, value: "test" });
  });
});

describe("hFragment", () => {
  test("create a fragment virtual node", () => {
    const text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit";
    const children = [
      h("div", { class: "container" }, []),
      h("p", { class: "content" }, [hString(text)]),
    ];
    const vNode = hFragment(children);

    expect(vNode).toEqual({
      type: DOM_TYPES.FRAGMENT,
      children: [
        {
          type: DOM_TYPES.ELEMENT,
          tag: "div",
          props: { class: "container" },
          children: [],
        },
        {
          type: DOM_TYPES.ELEMENT,
          tag: "p",
          props: { class: "content" },
          children: [{ type: DOM_TYPES.TEXT, value: text }],
        },
      ],
    });
  });
  test("filters null children", () => {
    const children = [
      hString("helloWorld"),
      h("button", {}, ["Submit"]),
      null,
      undefined,
    ];
    const vNode = hFragment(children);

    expect(vNode).toEqual({
      type: DOM_TYPES.FRAGMENT,
      children: [
        { type: DOM_TYPES.TEXT, value: "helloWorld" },
        {
          tag: "button",
          props: {},
          children: [{ type: DOM_TYPES.TEXT, value: "Submit" }],
          type: DOM_TYPES.ELEMENT,
        },
      ],
    });
  });
  test("maps strings to virtual text nodes", () => {
    const children = [h("div", { class: "helloWorld" }, []), "I am a string!"];
    const vNode = hFragment(children);

    expect(vNode).toEqual({
      type: DOM_TYPES.FRAGMENT,
      children: [
        {
          tag: "div",
          type: DOM_TYPES.ELEMENT,
          props: { class: "helloWorld" },
          children: [],
        },
        { type: DOM_TYPES.TEXT, value: "I am a string!" },
      ],
    });
  });
});
