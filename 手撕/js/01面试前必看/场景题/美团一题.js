async function async1() {
  console.log("async1 start");
  await async2();
  console.log("async1 end");
}
async function async2() {
  console.log("async2");
}

console.log("start");
async1();
setTimeout(() => {
  console.log("timer1");
  Promise.resolve().then(function () {
    console.log("promise1");
  });
}, 0);

Promise.resolve().then(function () {
  console.log("promise2");
});

new Promise((resolve) => {
  console.log("Promise3");
  resolve();
}).then(() => {
  console.log("Promise3 then");
});
console.log("end");
