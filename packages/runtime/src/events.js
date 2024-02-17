/**
 *
 * Add event listeners to an event target and returns an object containing the added listeners.
 *
 * @param {object} listeners The event listeners to add
 * @param {EventTarget} el The element to add the listeners to
 * @returns {object} The added listeners
 *
 * Note: The `addEventListener()` method is available because an element node is an instance of the `EventTarget` interace.
 * @see https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
 * @see https://developer.mozilla.org/en-US/docs/Web/API/EventTarget
 */
export function addEventListeners(listeners = {}, el) {
  const addedListeners = {};

  Object.entries(listeners).forEach(([eventName, handler]) => {
    const listener = addEventListener(eventName, handler, el); // create event listener
    addEventListener[eventName] = listener; // add event listener by key/value pair to our listeners obj
  });

  return addEventListener;
}

/**
 *
 * Adds an event listener to an event target and returns the listener
 *
 * @param {string} eventName the name of the event to listen to
 * @param {(event: Event) => void} handler the event handler function
 * @param {EventTarget} el the element to add the event listener to
 * @returns {(event: Event) => void} the event handler function
 */
export function addEventListener(eventName, handler, el) {
  el.addEventListener(eventName, handler);
  return handler;
}
