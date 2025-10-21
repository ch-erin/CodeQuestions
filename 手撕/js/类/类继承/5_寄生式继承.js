function objectCopy(obj) {
  function Fun() {}
  Fun.prototype = obj;
  return new Fun();
}

function createAnthor(obj) {
  let clone = objectCopy(obj);
  clone.getName = function () {
    console.log(this.name);
  };
  return clone;
}
