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

var myCall = obj.fn; //  number : 3
myCall.call(window); //  this.number = 5  15, 6
obj.fn(); //     9,  12
console.log(this.number); // 5
