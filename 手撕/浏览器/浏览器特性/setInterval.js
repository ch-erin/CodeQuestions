function mySetInterval(callback, t) {
  let repeat = function () {
    callback();
    setTimeout(repeat, t);
  };
  setTimeout(repeat, t);
}
mySetInterval(() => {
  console.log(2);
}, 2000);
