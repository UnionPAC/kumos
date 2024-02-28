import { setAttributes } from "./attributes";
import { addEventListeners } from "./events";
import { DOM_TYPES } from "./h";

/**
 * Creates the DOM nodes for a virtual dom tree, mounts them in the DOM and modifies the virtual dom tree to include the corresponding DOM nodes and event listeners.
 *
 * @param {object} vdom the virtual dom node to mount
 * @param {HTMLElement} parentEl the parent element to mount the virtual dom node to
 */
export function mountDOM(vdom, parentEl) {
  // Different types of virtual nodes require different DOM nodes to be created
  switch (vdom.type) {
    case DOM_TYPES.TEXT:
      createTextNode(vdom, parentEl);
      break;
    case DOM_TYPES.ELEMENT:
      createElementNode(vdom, parentEl);
      break;
    case DOM_TYPES.FRAGMENT:
      createFragmentNodes(vdom, parentEl);
      break;
    default:
      throw new Error(`Can't mount DOM of type: ${vdom.type}`);
  }
}

/**
 *
 * Creates the text node for a virtual dom text node.
 * The created 'Text' is added to the 'el' property of the virtual dom.
 *
 * @param {object} vdom the virtual dom node of type 'text'
 * @param {HTMLElement} parentEl the parent element to mount the virtual dom node to
 */
function createTextNode(vdom, parentEl) {
  const { value } = vdom;

  const textNode = document.createTextNode(value);
  vdom.el = textNode; // Save a reference of the node to the vdom in the 'el' property
  
  parentEl.append(textNode); // Append to the parent element
}

/**
 * Creates the HTML element for a virtual dom element node and its children recursively.
 * The create 'Element' is added to the 'el' property of the virtual dom node.
 * If the virtual dom node includes event listeners, these are added to the virtual dom object, under the 'listeners' property.
 *
 * @param {object} vdom
 * @param {HTMLElement} parentEl
 */
function createElementNode(vdom, parentEl) {
  const { tag, children, props } = vdom;
  // Create the element node
  const element = document.createElement(tag);

  // Add the attributes and event listeners
  addProps(element, props, vdom);

  // Save a reference of the node to the vdom's 'el' property
  vdom.el = element;

  // Mount the children recursively into the element node
  children.forEach((child) => {
    mountDOM(child, element);
  });
  parentEl.append(element);
}

/**
 * Adds event listeners, classes, styles and all other attributes to the HTML Element.
 * 
 * Note: Event listeners are added to the virtual dom object, under the 'listeners' property
 *
 * @param {HTMLElement} el
 * @param {object} props
 * @param {object} vdom
 */
function addProps(el, props, vdom) {
  const { on: events, ...attributes } = props;
  vdom.listeners = addEventListeners(events, el);

  setAttributes(el, attributes);
}

/**
 * Creates the fragment for a virtual dom fragment node and its children recursively.
 * The vdom's 'el' property is set to the parentEl (HTML Element) because a fragment doesn't actually
 * get attached to the DOM, they are just an array of children, which are appended to the DOM.
 *
 * @param {object} vdom the virtual dom node of type 'fragment'
 * @param {HTMLElement} parentEl the parent element to mount the virtual dom node to
 */
function createFragmentNodes(vdom, parentEl) {
  const { children } = vdom;
  vdom.el = parentEl;

  children.forEach((child) => {
    mountDOM(child, parentEl);
  });
}
