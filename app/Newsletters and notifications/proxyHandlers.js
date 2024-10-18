const handlerForObservable = (observableInstance) => ({
  set: (target, prop, value) => {
    target[prop] = value;
    observableInstance.notifyObservers(target, prop);
    return true;
  },
});

export default {
  handlerForObservable
};