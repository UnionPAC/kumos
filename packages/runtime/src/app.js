import { destroyDOM } from "./destroy-dom";
import { Dispatcher } from "./dispatcher";
import { mountDOM } from "./mount-dom";
import { patchDOM } from "./patch-dom";

/**
 *
 * Creates an application with the given top-level view, initial state and reducers.
 *
 * @param {object} config the configuration object, containing the view, reducers and the initial state
 * @returns {object} the app object
 */
export function createApp({ state, view, reducers = {} }) {
  let parentEl = null;
  let vdom = null;
  let isMounted = false;

  const dispatcher = new Dispatcher();
  const subscriptions = [dispatcher.afterEveryCommand(renderApp)];

  function emit(eventName, payload) {
    dispatcher.dispatch(eventName, payload);
  }

  // Attach reducers
  for (const actionName in reducers) {
    const reducer = reducers[actionName];

    const subs = dispatcher.subscribe(actionName, (payload) => {
      state = reducer(state, payload);
    });

    subscriptions.push(subs);
  }

  /**
   * Renders the application, by first destroying the previous DOM —if any— and
   * then mounting the new view.
   *
   * In the next version, a _reconciliation algorithm_ will be used to update the
   * DOM instead of destroying and mounting the whole view.
   */
  function renderApp() {
    // if (vdom) {
    //   destroyDOM(vdom);
    // }

    const newVdom = view(state, emit);
    // mountDOM(vdom, parentEl);
    vdom = patchDOM(vdom, newVdom, parentEl);
  }

  return {
    /**
     * Mounts the application to the given host element.
     *
     * @param {Element} _parentEl the host element to mount the virtual DOM node to
     * @returns {object} the application object
     */
    mount(_parentEl) {
      if (isMounted) {
        throw new Error("The application is already mounted!");
      }
      parentEl = _parentEl;
      vdom = view(state, emit);
      mountDOM(vdom, parentEl);

      isMounted = true;

      return this;
    },

    /**
     * Unmounts the application from the host element by destroying the associated
     * DOM and unsubscribing all subscriptions.
     */
    unmount() {
      destroyDOM(vdom);
      vdom = null;
      subscriptions.forEach((unsubscribe) => unsubscribe());

      isMounted = false;
    },
    /**
     * Emits an event to the application
     *
     * @param {string} eventName the name of the event to emit
     * @param {any} payload the payload to pass to the event listeners
     */
    emit(eventName, payload) {
      emit(eventName, payload);
    },
  };
}
