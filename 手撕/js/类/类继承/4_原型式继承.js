function copy(obj) {
  function Fun() {}
  Fun.prototype = obj;
  return new Fun();
}

function copy(obj) {
  let newObj = {};
  Object.setPrototypeOf(newObj, obj);
  return newObj;
}

// 一样的
