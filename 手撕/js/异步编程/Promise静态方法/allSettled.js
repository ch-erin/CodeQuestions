function myAllSettled(tasks) {
  return new Promise((reslove) => {
    const result = [];
    let resolvedCount = 0;
    const total = tasks.length;

    tasks.forEach((task, index) => {
      Promise.resolve(task)
        .then((value) => {
          result[index] = { status: "fulfilled", value };
        })
        .catch((reason) => {
          result[index] = { status: "rejected", reason };
        })
        .finally(() => {
          resolvedCount++;
          if (resolvedCount === total) reslove(result);
        });
    });
  });
}
