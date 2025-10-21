//将一个或多个源对象的可枚举属性复制到目标对象，并返回目标对象
function myAssign(target, ...sources) {
  if (target === null) {
    throw new TypeError("Cannot convert undefined or null to object");
  }

  const to = Object(target);

  for (const source of sources) {
    if (source === null) continue;

    for (const key in source) {
      if (Object.hasOwnProperty.call(source, key)) {
        to[key] = source[key];
      }
    }
  }

  return to;
}
