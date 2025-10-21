console.log("A");

setTimeout(() => {
  console.log("B");
  process.nextTick(() => {
    console.log("C");
  });
  new Promise((resolve) => {
    console.log("D");
    resolve();
  }).then(() => {
    console.log("E");
  });
}, 0);

setImmediate(() => {
  console.log("F");
  process.nextTick(() => {
    console.log("G");
  });
});

process.nextTick(() => {
  console.log("H");
  new Promise((resolve) => {
    console.log("I");
    resolve();
  }).then(() => {
    console.log("J");
  });
});

console.log("K");
