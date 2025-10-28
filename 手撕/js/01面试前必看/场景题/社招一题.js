setTimeout(() => {
  console.log(1);
});

const p = new Promise((resolve) => {
  console.log(2);
  //改变Promise状态，已完成，传入参数4
  resolve(3);
  Promise.resolve(4).then(console.log);
  console.log(5);
});

console.log(7);

new Promise((resolve) => {
  setTimeout(() => {
    resolve(3);
  }, 1000);
}).then(/*xxxx*/);

console.log(p);
