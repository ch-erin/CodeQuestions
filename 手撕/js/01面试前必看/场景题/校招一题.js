async function async1() {
  console.log("async1 start");
  await async2();
  console.log("async end");
}

async function async2() {
  return new Promise((resolve, reject) => {
    console.log("async2 start");
    resolve();
  }).then((res) => {
    console.log("async2 end");
  });
}

async1();

new Promise((resolve) => {
  console.log("Promise");
  resolve();
}).then((res) => {
  console.log("Promise end");
});

console.log("script end");



