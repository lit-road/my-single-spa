// css 沙箱
/**
 * Represents a proxy sandbox that allows controlled access to the global window object.
 */
export class ProxySandbox {
  proxy: ProxyConstructor;
  running: boolean = false;

  constructor() {
    // Create a fake window object
    const fakeWindow = Object.create(window);
    const _ = this;
    // Create a proxy for the fake window object
    const proxy: ProxyConstructor = new Proxy(fakeWindow, {
      /**
       * Sets the value of a property on the fake window object.
       * @param target - The target object (fake window).
       * @param p - The property name.
       * @param value - The value to set.
       * @returns Always returns true.
       */
      set(target, p: string, value) {
        if (_.running) {
          target[p] = value;
        }
        return true;
      },

      /**
       * Gets the value of a property from the fake window object.
       * @param target - The target object (fake window).
       * @param p - The property name.
       * @returns The value of the property.
       */
      get(target, p) {
        switch (p) {
          case "window":
          case "self":
          case "globalThis":
            return proxy;
        }
        if (
          !window.hasOwnProperty.call(target, p) &&
          target.hasOwnProperty(p)
        ) {
          const value = target[p];
          if (value instanceof Function) {
            return value.bind(window);
          }
          return value;
        }
        return target[p];
      },
    });

    this.proxy = proxy;
  }

  /**
   * Activates the sandbox, allowing access to the global window object.
   */
  active() {
    this.running = true;
  }

  /**
   * Deactivates the sandbox, preventing access to the global window object.
   */
  inactive() {
    this.running = false;
  }
}
