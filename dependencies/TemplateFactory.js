import { executeUpdate } from '../helper/util'
import ArrayTemplate from '../dependencies/ArrayTemplate';
import TemplateContext from '../dependencies/TemplateContext';

export default class TemplateFactory {

  /**
   * 根据decorator修饰的属性返回对应的模板类型
   * @param {Object} target 修饰属性所在类的原型
   * @param {String} name 修饰属性名称
   * @param {Object} descriptor 属性修饰器
   * @param {Function} template 属性维护函数
   */
  make(target, name, descriptor, template) {
    const templateOf = this.templateOf.bind(this);
    const { initializer, value: original, configurable, enumerable } = descriptor;
    let value = null;
    TemplateContext.register(target, name,template);
    return {
      enumerable,
      configurable,
      initializer: function () {
        return templateOf(initializer ? initializer() : original, this, template);
      },
      get: () => value,
      set(v) {
        value =  templateOf(v, this, template);
        //更新组件
        executeUpdate(this);
        return value;
      }
    }
  }

  /**
   * 返回对应的template
   * @param {Any} value 属性值
   * @param {Object} target 修饰的属性所在类的实例
   * @param {Function} template 属性维护函数
   */
  templateOf(value, target, template) {
    switch (Object.prototype.toString.apply(value)) {
      case '[object Array]':
        return new ArrayTemplate(value, target, template);
      default:
        return value;
    }
  }
}