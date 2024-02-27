import { DOM_TYPES } from "./h";
import { removeEventListeners } from "./events";

/**
 * Unmounts the DOM nodes for a virtual DOM tree recursively.
 * 
 * This also removes all 'el' references from the vdom tree and all event listeners from the DOM.
 * 
 * @param {object} vdom 
 */
export function destroyDOM(vdom) {
  const { type } = vdom;

  switch (type) {
    case DOM_TYPES.TEXT:
      removeTextNode();
      break;

    case DOM_TYPES.ELEMENT:
      removeElementNode();
      break;

    case DOM_TYPES.FRAGMENT:
      removeFragmentNode();
      break;

    default:
      throw new Error(`Can't destroy DOM of type ${type}`);
  }

  delete vdom.el; // delete property after element has been removed from the DOM
}

function removeTextNode(vdom) {
  const { el } = vdom;

  el.remove(); // removes the element from the DOM.
}

function removeElementNode(vdom) {
  const { el, children, listeners } = vdom;
  el.remove();

  children.forEach((child) => {
    destroyDOM(child);
  });

  if (listeners) {
    removeEventListeners(listeners, el);
    delete vdom.listeners;
  }
}

function removeFragmentNode(vdom) {
  const { children } = vdom;

  children.forEach((child) => {
    destroyDOM(child);
  });
}
