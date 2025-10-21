JSON.myParse = function (jsonString) {
  // 指针：记录当前解析位置
  let index = 0;
  // 输入字符串长度
  const length = jsonString.length;

  // 跳过空白字符（空格、制表符、换行符等）
  function skipWhitespace() {
    while (index < length) {
      const char = jsonString[index];
      if (char === " " || char === "\t" || char === "\n" || char === "\r") {
        index++;
      } else {
        break;
      }
    }
  }

  // 解析字符串（处理转义字符）
  function parseString() {
    index++; // 跳过开头的双引号 "
    let result = "";

    while (index < length) {
      const char = jsonString[index];

      if (char === '"') {
        index++; // 跳过结尾的双引号 "
        return result;
      }

      // 处理转义字符
      if (char === "\\") {
        index++;
        const escapedChar = jsonString[index];
        switch (escapedChar) {
          case '"':
            result += '"';
            break;
          case "\\":
            result += "\\";
            break;
          case "/":
            result += "/";
            break;
          case "b":
            result += "\b";
            break;
          case "f":
            result += "\f";
            break;
          case "n":
            result += "\n";
            break;
          case "r":
            result += "\r";
            break;
          case "t":
            result += "\t";
            break;
          case "u": // Unicode 转义（如 \u0061 对应 'a'）
            const hex = jsonString.slice(index + 1, index + 5);
            result += String.fromCharCode(parseInt(hex, 16));
            index += 4; // 跳过 4 位十六进制数
            break;
          default:
            result += escapedChar;
        }
      } else {
        result += char;
      }

      index++;
    }

    // 如果循环结束仍未找到闭合引号，说明格式错误
    throw new SyntaxError("Unexpected end of JSON string");
  }

  // 解析数字
  function parseNumber() {
    const start = index;

    // 处理负号
    if (jsonString[index] === "-") {
      index++;
    }

    // 处理整数部分（0 或非 0 开头的数字）
    if (jsonString[index] === "0") {
      index++;
      // 避免 0 后面直接跟数字（如 0123 是无效的）
      if (index < length && /\d/.test(jsonString[index])) {
        throw new SyntaxError("Invalid number");
      }
    } else if (/[1-9]/.test(jsonString[index])) {
      index++;
      // 处理多位数
      while (index < length && /\d/.test(jsonString[index])) {
        index++;
      }
    } else {
      // 既不是 0 也不是 1-9 开头，无效数字
      throw new SyntaxError("Invalid number");
    }

    // 处理小数部分
    if (index < length && jsonString[index] === ".") {
      index++;
      // 小数点后必须有数字
      if (index >= length || !/\d/.test(jsonString[index])) {
        throw new SyntaxError("Invalid number");
      }
      // 处理小数部分数字
      while (index < length && /\d/.test(jsonString[index])) {
        index++;
      }
    }

    // 处理指数部分（e 或 E）
    if (index < length && /[eE]/.test(jsonString[index])) {
      index++;
      // 指数部分可以有正负号
      if (index < length && /[+-]/.test(jsonString[index])) {
        index++;
      }
      // 指数后必须有数字
      if (index >= length || !/\d/.test(jsonString[index])) {
        throw new SyntaxError("Invalid number");
      }
      // 处理指数部分数字
      while (index < length && /\d/.test(jsonString[index])) {
        index++;
      }
    }

    // 截取数字字符串并转换为数字
    const numberStr = jsonString.slice(start, index);
    return Number(numberStr);
  }

  // 解析关键字（true、false、null）
  function parseKeyword() {
    // 检查当前位置开始的字符串是否匹配关键字
    if (jsonString.startsWith("true", index)) {
      index += 4;
      return true;
    } else if (jsonString.startsWith("false", index)) {
      index += 5;
      return false;
    } else if (jsonString.startsWith("null", index)) {
      index += 4;
      return null;
    }
    // 不匹配任何关键字，抛出错误
    throw new SyntaxError("Unexpected token");
  }

  // 解析数组
  function parseArray() {
    index++; // 跳过开头的 [
    const array = [];
    skipWhitespace();

    // 处理空数组
    if (index < length && jsonString[index] === "]") {
      index++;
      return array;
    }

    // 循环解析数组元素
    while (index < length) {
      array.push(parseValue()); // 递归解析元素
      skipWhitespace();

      // 处理分隔符 ,
      if (index < length && jsonString[index] === ",") {
        index++;
        skipWhitespace();
      }
      // 处理数组结束符 ]
      else if (index < length && jsonString[index] === "]") {
        index++;
        return array;
      }
      // 格式错误（缺少分隔符或结束符）
      else {
        throw new SyntaxError("Unexpected token in array");
      }
    }

    // 未找到数组结束符
    throw new SyntaxError("Unterminated array");
  }

  // 解析对象
  function parseObject() {
    index++; // 跳过开头的 {
    const object = {};
    skipWhitespace();

    // 处理空对象
    if (index < length && jsonString[index] === "}") {
      index++;
      return object;
    }

    // 循环解析对象键值对
    while (index < length) {
      // 解析键（必须是字符串）
      if (jsonString[index] !== '"') {
        throw new SyntaxError(
          "Expected property name enclosed in double quotes"
        );
      }
      const key = parseString(); // 解析键名
      skipWhitespace();

      // 处理冒号 :
      if (index < length && jsonString[index] !== ":") {
        throw new SyntaxError("Expected colon after property name");
      }
      index++; // 跳过 :
      skipWhitespace();

      // 解析值
      const value = parseValue(); // 递归解析值
      object[key] = value;
      skipWhitespace();

      // 处理分隔符 ,
      if (index < length && jsonString[index] === ",") {
        index++;
        skipWhitespace();
      }
      // 处理对象结束符 }
      else if (index < length && jsonString[index] === "}") {
        index++;
        return object;
      }
      // 格式错误
      else {
        throw new SyntaxError("Unexpected token in object");
      }
    }

    // 未找到对象结束符
    throw new SyntaxError("Unterminated object");
  }

  // 解析值（入口函数，根据当前字符决定解析类型）
  function parseValue() {
    skipWhitespace();

    if (index >= length) {
      throw new SyntaxError("Unexpected end of JSON input");
    }

    const char = jsonString[index];
    switch (char) {
      case '"':
        return parseString();
      case "{":
        return parseObject();
      case "[":
        return parseArray();
      case "-":
      case "0":
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
        return parseNumber();
      case "t":
      case "f":
      case "n":
        return parseKeyword();
      default:
        throw new SyntaxError(`Unexpected token ${char}`);
    }
  }

  // 启动解析
  const result = parseValue();

  // 解析完成后应无剩余字符（除空白）
  skipWhitespace();
  if (index < length) {
    throw new SyntaxError("Unexpected token after JSON value");
  }

  return result;
};

// 测试用例
console.log(JSON.myParse("123")); // 123
console.log(JSON.myParse('"hello \\"world\\""')); // 'hello "world"'
console.log(JSON.myParse("true")); // true
console.log(JSON.myParse("null")); // null
console.log(JSON.myParse('[1, "a", true, null]')); // [1, 'a', true, null]
console.log(JSON.myParse('{"name": "张三", "age": 20, "hobbies": ["读书"]}'));
// { name: '张三', age: 20, hobbies: ['读书'] }
console.log(JSON.myParse('{"unicode": "\\u0061"}')); // { unicode: 'a' }
console.log(JSON.myParse('{"num": -123.45e-6}')); // { num: -123.45e-6 }

// 错误测试（会抛出SyntaxError）
try {
  JSON.myParse("{a: 1}"); // 键未用双引号包裹
} catch (e) {
  console.log(e.message); // 'Expected property name enclosed in double quotes'
}

try {
  JSON.myParse("[1, 2, ]"); // 数组末尾多余逗号
} catch (e) {
  console.log(e.message); // 'Unexpected token in array'
}
