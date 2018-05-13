import { executeUpdate } from '../helper/util';

export default class ArrayTemplate extends Array {
  constructor(value, target, template) {
    super();
    this._target = target;
    this.push.apply(this, value);
    this.template = template;
  }

  push() {
    executeUpdate(this._target);
    return super.push.apply(this, arguments);
  }
}