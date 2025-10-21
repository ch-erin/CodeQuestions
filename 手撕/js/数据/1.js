const caculate = (s) => {
  const n = s.length;
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

  while (i < n) {
    const char = s[i];
    switch (char) {
      case char === " ":
        i++;
        break;
      case !isNaN(char) || char === ".":
        let num = "";
      case char === "(":
        opStack.push(char);
        i++;
    }
  }

  while (opStack.length) compute();

  return numStack.pop();
};
