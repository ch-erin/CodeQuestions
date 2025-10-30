// 基础理论

// js普通函数的this指向是由 "调用方式" 决定的
// 谁调用这个函数，那么这个函数的this就指向谁

function foo() {
  console.log(this);
}

foo(); // 浏览器中输出：Window 对象（非严格模式）

const obj = {
  name: "张三",
  getName: function () {
    console.log(this.name);
  },
};

obj.getName();

// 函数定义时的this指向是不确定的,一直到js引擎运行代码时才确定
// fo只复制函数的引用

const fo = obj.getName;

// call,apply等都是临时绑定,源码中对绑定的属性会进行删除，所以以最后一次为准
// bind函数则是一次绑定，永久绑定，后续的调用不会发生改变

// 回调函数 : 
