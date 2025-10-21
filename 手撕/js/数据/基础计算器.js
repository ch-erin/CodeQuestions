/**
 * 简化版中缀表达式计算器（假设输入均为合法表达式）
 * @param {string} expression 中缀表达式，如 "2+3*5"、"(1+2)*(3+4)"
 * @returns {number} 计算结果
 */
function calculateInfix(expression) {
  // 中缀转后缀表达式
  function infixToPostfix(infix) {
    const output = [];
    const operators = [];
    const precedence = { "+": 1, "-": 1, "*": 2, "/": 2 }; //优先级
    let numBuffer = "";

    for (const char of infix) {
      if (char === " ") continue;

      // 处理数字和小数点
      if (!isNaN(char) || char === ".") {
        numBuffer += char;
        continue;
      }

      // 刷新数字缓冲区
      if (numBuffer) {
        output.push(numBuffer);
        numBuffer = "";
      }

      // 处理左括号
      if (char === "(") {
        operators.push(char);
        continue;
      }

      // 处理右括号
      if (char === ")") {
        while (operators.at(-1) !== "(") {
          output.push(operators.pop());
        }
        operators.pop();
        continue;
      }

      // 处理运算符
      while (
        operators.length &&
        operators.at(-1) !== "(" &&
        precedence[operators.at(-1)] >= precedence[char]
      ) {
        output.push(operators.pop());
      }

      operators.push(char);
    }

    // 处理剩余内容
    if (numBuffer) output.push(numBuffer);
    while (operators.length) output.push(operators.pop());

    return output;
  }

  // 计算后缀表达式
  function calculatePostfix(postfix) {
    const stack = [];
    for (const token of postfix) {
      if (!isNaN(token)) {
        stack.push(Number(token));
      } else {
        const num2 = stack.pop();
        const num1 = stack.pop();
        switch (token) {
          case "+":
            stack.push(num1 + num2);
            break;
          case "-":
            stack.push(num1 - num2);
            break;
          case "*":
            stack.push(num1 * num2);
            break;
          case "/":
            stack.push(num1 / num2);
            break;
        }
      }
    }
    return stack.pop();
  }

  return calculatePostfix(infixToPostfix(expression));
}
