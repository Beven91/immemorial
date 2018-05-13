export function throwttle(handler) {
  let id = null;
  return function (...args) {
    clearTimeout(id);
    id = setTimeout(() => handler(...args), 30);
  }
}

export function executeUpdate(instance) {
  if (instance && typeof instance.forceUpdate === 'function') {
    throwttle(instance.forceUpdate.bind(instance))();
  }
}