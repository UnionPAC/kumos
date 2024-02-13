import { DOM_TYPES } from "./h";

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

function createTextNode(vdom, parentEl) {
  const { value } = vdom;

  const textNode = document.createTextNode(value);
  vdom.el = textNode; // Save a reference of the node
  parentEl.append(textNode); // Append to the parent element
}

function createElementNode(vdom, parentEl) {}

function createFragmentNodes(vdom, parentEl) {}
