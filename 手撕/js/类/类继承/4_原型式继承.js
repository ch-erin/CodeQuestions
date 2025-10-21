function copy(obj) {
  function Fun() {}
  Fun.prototype = obj;
  return new Fun();
}
