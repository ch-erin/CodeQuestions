// 2. 工厂模式实现
// 产品基类
class Product {
  constructor(name) {
    this.name = name;
  }

  // 产品公共方法
  getInfo() {
    return `产品: ${this.name}`;
  }
}

// 具体产品1
class ConcreteProduct1 extends Product {
  constructor() {
    super("产品1");
    this.type = "类型A";
  }

  // 产品1特有方法
  specialMethod() {
    return `${this.getInfo()}, 类型: ${this.type}`;
  }
}

// 具体产品2
class ConcreteProduct2 extends Product {
  constructor() {
    super("产品2");
    this.type = "类型B";
  }

  // 产品2特有方法
  specialMethod() {
    return `${this.getInfo()}, 类型: ${this.type}`;
  }
}

// 工厂类
class Factory {
  // 根据类型创建不同产品
  createProduct(type) {
    switch (type) {
      case "product1":
        return new ConcreteProduct1();
      case "product2":
        return new ConcreteProduct2();
      default:
        throw new Error("不支持的产品类型");
    }
  }
}

// 使用示例

console.log("\n===== 工厂模式测试 =====");
const factory = new Factory();
const product1 = factory.createProduct("product1");
const product2 = factory.createProduct("product2");
console.log(product1.specialMethod()); // 产品: 产品1, 类型: 类型A
console.log(product2.specialMethod()); // 产品: 产品2, 类型: 类型B
