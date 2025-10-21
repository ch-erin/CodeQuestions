console.log("1");

setTimeout(() => {
  console.log("2");
  Promise.resolve().then(() => {
    console.log("3");
    setTimeout(() => {
      console.log("4");
    }, 0);
  });
}, 0);

new Promise((resolve) => {
  console.log("5");
  resolve();
}).then(() => {
  console.log("6");
  new Promise((resolve) => {
    console.log("7");
    setTimeout(() => {
      console.log("8");
      resolve();
    }, 0);
  }).then(() => {
    console.log("9");
  });
});

setImmediate(() => {
  console.log("10");
});

process.nextTick(() => {
  console.log("11");
});

console.log("12");
