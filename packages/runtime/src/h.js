import { withoutNulls } from "./utils/arrays";

// types of DOM nodes that need to be represented as virtual nodes
export const DOM_TYPES = {
  TEXT: "text",
  ELEMENT: "element",
  FRAGMENT: "fragment",
};

/**
 * Hypertext function: creates a virtual node representing an element with
 * the passed in tag.
 *
 * The props are added to the element as attributes.
 * There are some special props:
 * - `on`: an object containing event listeners to add to the element
 * - `class`: a string or array of strings to add to the element's class list
 * - `style`: an object containing CSS properties to add to the element's style
 *
 * The children are added to the element as child nodes.
 * If a child is a string, it is converted to a text node using `hString()`.
 *
 * @param {string} tag the tag name of the element
 * @param {object} props the props to add to the element
 * @param {array} children the children to add to the element
 * @returns {object} the virtual node
 */
export function h(tag, props = {}, children = []) {
  return {
    tag,
    props,
    children: mapTextNodes(withoutNulls(children)),
    type: DOM_TYPES.ELEMENT,
  };
}

/**
 * Creates a text virtual nodes
 *
 * @param {string} str the text to add to the text node
 * @returns {object} the virtual node
 */
export function hString(str) {
  return { type: DOM_TYPES.TEXT, value: str };
}

/**
 * Creates a fragment virtual node
 *
 * If a child is a string, it is converted to a text node using `hString()`.
 *
 * @param {array} vNodes the virtual nodes to wrap in a fragment
 * @returns {object} the virtual node
 */
export function hFragment(vNodes) {
  return {
    type: DOM_TYPES.FRAGMENT,
    children: mapTextNodes(withoutNulls(vNodes)),
  };
}

/**
 * Transforms strings into text virtual nodes
 * @param {array} children
 * @returns {array}
 */
function mapTextNodes(children) {
  return children.map((child) =>
    typeof child === "string" ? hString(child) : child
  );
}
