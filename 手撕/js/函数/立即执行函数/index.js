//main();
function main() {
  for (var i = 0; i < 5; i++) {
    setTimeout(() => {
      console.log(i);
    }, 1000);
  }

  for (var i = 0; i < 5; i++) {
    (function (j) {
      setTimeout(function () {
        console.log(j);
      }, 1000 * j);
    })(i);
  }
}

// fn是立即执行函数的返回值，也就是返回的函数
var obj = {
  number: 3,
  fn: (function () {
    var number;
    number = number * 2;
    number = 3;
    console.log(number);
    return function () {
      number *= 2;
      console.log(number);
    };
  })(),
};
