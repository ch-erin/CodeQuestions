function f(s) {
  return s.replace(/-\w/g, function (x) {
    return x.slice(1).toUpperCase();
  });
}

// 测试案例
console.log(f("hello-world")); // "helloWorld"
console.log(f("user-name-age")); // "userNameAge"
console.log(f("vue-react-js")); // "vueReactJs"
console.log(f("a-b-c-d")); // "aBCD"
console.log(f("single")); // "single"（无连字符时原样返回）
console.log(f("css-class-name")); // "cssClassName"（常见的 CSS 类名转驼峰）
