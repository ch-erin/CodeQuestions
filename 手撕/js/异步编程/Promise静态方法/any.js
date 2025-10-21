function myAny(tasks) {
  return new Promise((resolve, reject) => {
    let length = tasks.length;
    const errors = [];

    if (length === 0) return resolve([]);

    tasks.forEach((task, index) => {
      Promise.resolve(promise)
        .then((value) => {
          resolve(value);
        })
        .catch((reason) => {
          errors[index] = reason;
          length--;

          if (length === 0)
            reject(new AggregateError(errors, "All promises were rejected"));
        });
    });
  });
}
