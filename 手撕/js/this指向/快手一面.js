var number = 5;
var obj = {
  number: 3,
  fn: (function () {
    var number;
    number = number * 2;
    number = 3;
    return function () {
      var num = this.number;
      num *= 3;
      console.log(num);
      number *= 2;
      console.log(number);
    };
  })(),
};

var myCall = obj.fn;
myCall.call(window);
obj.fn();
console.log(this.number);
