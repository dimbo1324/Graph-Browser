import handlerForObservable from "./proxyHandlers.js"
export default class Observable {
  #observersMap = new Map();
  #observersSet = new Set();
  #value;

  constructor(obj = null) {
    if (obj) {
      this.#value = new Proxy(obj, handlerForObservable(this));
    }
  }

  addObserver(eventNameOrFunction, observer) {
    if (typeof eventNameOrFunction === "string") {
      const observers = this.#observersMap.get(eventNameOrFunction) || [];
      observers.push(observer);
      this.#observersMap.set(eventNameOrFunction, observers);
    } else {
      this.#observersSet.add(eventNameOrFunction);
    }
  }

  removeObserver(eventNameOrFunction, observer) {
    if (typeof eventNameOrFunction === "string") {
      const observers = this.#observersMap.get(eventNameOrFunction);
      if (observers) {
        const index = observers.indexOf(observer);
        if (index > -1) {
          observers.splice(index, 1);
          if (observers.length === 0) {
            this.#observersMap.delete(eventNameOrFunction);
          } else {
            this.#observersMap.set(eventNameOrFunction, observers);
          }
        }
      }
    } else {
      this.#observersSet.delete(eventNameOrFunction);
    }
  }

  notifyObservers(eventName, ...args) {
    const observers = this.#observersMap.get(eventName);
    if (observers) {
      observers.forEach((observer) => observer(...args));
    }
    this.#observersSet.forEach((observer) => observer(eventName, ...args));
  }

  get value() {
    return this.#value;
  }
}