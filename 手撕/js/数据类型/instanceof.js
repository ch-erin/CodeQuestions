// 判断对象类型

function myInstanceof(obj, Fn) {
  if (typeof obj !== "object" || obj !== null) return false;

  const proto = Object.getPrototypeOf(obj);

  proto !== Fn.prototype ? myInstanceof(proto, Fn) : true;
}

function myInstanceof(obj, Fn) {
  if (typeof obj !== "object" || obj !== null) return false;

  let proto = Object.getPrototypeOf(obj);

  while (proto !== null) {
    if (proto === Fn.prototype) return true;

    proto = Object.getPrototypeOf(proto);
  }

  return false;
}
