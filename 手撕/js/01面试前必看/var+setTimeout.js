// 
for (var i = 0; i < 10; i++) {
  setTimeout((i) => {
    console.log(i);
  });
}

for (var i = 0; i < 10; i++) {
  setTimeout(() => {
    console.log(i);
  });
}

for (var i = 0; i < 5; i++) {
  (function (j) {
    setTimeout(() => {
      console.log(j);
    }, 0);
  })(i);
}

for (let i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log("外层:", i);
    setTimeout(() => {
      console.log("内层:", i);
    }, 0);
  }, 0);
}

function createCallbacks() {
  const callbacks = [];
  for (var i = 0; i < 4; i++) {
    callbacks.push(() => {
      console.log(i);
    });
  }
  return callbacks;
}

const funcs = createCallbacks();
funcs.forEach((fn) => fn());

async function test() {
  for (var i = 0; i < 2; i++) {
    await new Promise((resolve) => {
      setTimeout(() => {
        console.log(i);
        resolve();
      }, 0);
    });
  }
}

test();

console.log("start");

for (let i = 0; i < 2; i++) {
  setTimeout(() => {
    console.log("timeout:", i);
  }, 0);

  Promise.resolve().then(() => {
    console.log("then:", i);
  });
}

console.log("end");
