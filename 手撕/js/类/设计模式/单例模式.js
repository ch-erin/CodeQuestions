// 1. 单例模式实现
class Singleton {
  // 静态属性存储唯一实例
  static instance = null;

  // 私有构造函数，防止外部直接实例化
  constructor() {
    if (Singleton.instance) return Singleton.instance;
    Singleton.instance = this;
    this.data = "单例模式数据";
  }

  // 公共方法
  getData() {
    return this.data;
  }

  setData(newData) {
    this.data = newData;
  }

  // 静态方法获取实例
  static getInstance() {
    if (!Singleton.instance) {
      Singleton.instance = new Singleton();
    }
    return Singleton.instance;
  }
}

console.log("===== 单例模式测试 =====");
const singleton1 = Singleton.getInstance();
const singleton2 = Singleton.getInstance();
console.log(singleton1 === singleton2); // true (验证是同一个实例)
console.log(singleton1.getData()); // 单例模式数据
singleton1.setData("更新后的数据");
console.log(singleton2.getData()); // 更新后的数据 (验证数据共享)
