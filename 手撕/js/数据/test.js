var calculate = function (s) {
  const numStack = [];
  const opStack = [];
  const precedence = { "+": 1, "-": 1, "*": 2, "/": 2 };

  const compute = () => {
    const b = numStack.pop();
    const a = numStack.pop();
    const op = opStack.pop();
    switch (op) {
      case "+":
        numStack.push(a + b);
        break;
      case "-":
        numStack.push(a - b);
        break;
      case "*":
        numStack.push(a * b);
        break;
      case "/":
        numStack.push(Math.trunc(a / b));
        break;
    }
  };

  let i = 0;
  const n = s.length;

  while (i < n) {
    switch (s[i]) {
      case " ":
        i++;
        break;

      case "(":
        opStack.push(s[i]);
        i++;
        break;

      case ")":
        while (opStack.at(-1) !== "(") compute();
        opStack.pop();
        i++;
        break;

      case "+":
      case "-":
      case "*":
      case "/":
        while (
          opStack.length &&
          opStack.at(-1) !== "(" &&
          precedence[opStack.at(-1)] >= precedence[s[i]]
        ) {
          compute();
        }
        opStack.push(s[i]);
        i++;
        break;

      default:
        if (!isNaN(s[i]) || s[i] === ".") {
          let num = "";
          while (i < n && (!isNaN(s[i]) || s[i] === ".")) {
            num += s[i++];
          }
          numStack.push(Number(num));
        } else {
          i++;
        }
        break;
    }
  }

  while (opStack.length) compute();

  return numStack.pop();
};

// 测试案例
console.log(calculate("2+3*5")); // 17
console.log(calculate("(1+2)*(3+4)")); // 21
console.log(calculate("10/2+3")); // 8
console.log(calculate("5.5+3.5*2")); // 12.5
console.log(calculate("10-(3+5*2)")); // -3
console.log(calculate("8/3")); // 2
