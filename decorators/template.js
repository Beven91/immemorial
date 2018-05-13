
import TemplateFactory from '../dependencies/TemplateFactory';

//创建模板工厂
const factory = new TemplateFactory();

export default function (template) {
  if (arguments.length <= 1) {
    return function (...args) {
      if (arguments.length === 1) {
        throw new Error('Cannot support class template');
      } else {
        //根据修饰器，返回对应的模板
        return factory.make(...args, template);
      }
    }
  } else {
    return factory.make.apply(factory, arguments);
  }
}