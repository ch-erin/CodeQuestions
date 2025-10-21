let user = { name: "Alice", age: 20 };

// 函数内部修改对象属性
function updateUser(obj) {
  obj.age = 21; // 修改参数的属性（指向原始对象的引用）
  obj.gender = "female"; // 新增属性
}

updateUser(user);
console.log(user); // { name: "Alice", age: 21, gender: "female" } → 原始对象被改变

// 2
let myMap = new Map([["a", 1]]);

function updateMap(map) {
  map.set("a", 2); // 修改 Map 的键值
  map.set("b", 3); // 新增键值
}

updateMap(myMap);
console.log(myMap); // Map(2) { "a" => 2, "b" => 3 } → 原始 Map 被改变

//3.
let arr = [1, 2, 3];

function updateArray(array) {
  array[0] = 10; // 通过索引修改元素
  array.push(4); // 新增元素（改变数组长度）
}

updateArray(arr);
console.log(arr); // [10, 2, 3, 4] → 原始数组被改变

// js中

let user_2 = { name: "Alice", age: 20 };
user_2 = {};
console.log(user_2);
