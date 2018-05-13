const NAME = '@@TEMPLATE@@';

export default class TemplateContext {
  constructor(template) {
    this.template = template;
    this.templates = {}
  }

  /**
   * 注册一个模板数据
   * @param {Object} target 修饰属性所在类的原型
   * @param {String} name 修饰属性名称
   * @param {Function} template 属性维护函数
   */
  static register(target, name,template) {
    const context = target[NAME] || new TemplateContext(template);
    context.register(target, name);
    target[NAME] = context;
  }

  /**
   * 获取对应的模板数据
   */
  static getTemplates(target) {
    const context = target[NAME];
    if (context) {
      return context.getTemplates();
    } else {
      return {}
    }
  }

  /**
   * 获取对应的模板数据
   */
  getTemplates() {
    const data = {};
    Object
      .keys(this.templates)
      .map((name) => {
        data[name] = this.templates[name]()
      });
    return data;
  }

  /**
   * 注册一个模板数据
   * @param {*} target 模板标记的类的原型
   * @param {*} name  标记的属性名称
   */
  register(target, name) {
    this.templates[name] = () => {
      return target[name];
    }
  }
}