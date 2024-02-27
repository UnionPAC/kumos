/**
 * Dispatcher that registers handler functions to respond to specific commands, identified by a unique name.
 *
 * The dispatcher also allows registering handler functions that run after a command is handled.
 */
export class Dispatcher {
  // The hash is the ES2020 way to make the variable private inside a class
  #subs = new Map();
  #aferHandlers = [];

  /**
   *
   * Registers a handler function that executes in response to a specific command being dispatched and returns a function that un-registers the handler.
   *
   * @param {string} commandName the name of the command to register the handler for
   * @param {(any) => void} handler the handler of the command
   * @returns {() => void} a function that un-registers the handler
   */
  subscribe(commandName, handler) {
    if (!this.#subs.has(commandName)) {
      this.#subs.set(commandName, []);
    }

    const handlers = this.#subs.get(commandName);
    if (handlers.includes(handler)) {
      return () => {}; // handler is already subscribed, and there's no need to subscribe again.
    }

    // if handler is not already subscribed, add handler
    handlers.push(handler);

    // a function that can be called to un-register the handler
    return () => {
      const index = handlers.indexOf(handler);
      handlers.splice(index, 1);
    };
  }

  /**
   * Registers a handler function that runs after each command and returns a function that un-registers the handler.
   *
   * @param {(any) => void} handler a function that runs after each command
   * @returns {() => void} a function that un-registers the handler
   */
  afterEveryCommand(handler) {
    this.#aferHandlers.push(handler);

    // a function that can be called to un-register the handler
    return () => {
      const index = this.#aferHandlers.indexOf(handler);
      this.#aferHandlers.splice(index, 1);
    };
  }

  /**
   *
   * Dispatches a command to all registered handlers and runs all handlers registered to run after each command.
   *
   * Note: Displays a warning if the command has no handlers registered
   *
   * @param {string} commandName the name of the command to dispatch
   * @param {any} payload the payload of the command
   */
  dispatch(commandName, payload) {
    if (this.#subs.has(commandName)) {
      this.#subs.get(commandName).forEach((handler) => handler(payload));
    } else {
      console.warn(`No handlers for command: ${commandName}`);
    }

    this.#aferHandlers.forEach((handler) => handler());
  }
}
