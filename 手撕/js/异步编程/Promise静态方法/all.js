function all(...args) {
  const tasks = [...args];
  const length = tasks.length;

  return new Promise((resolve, reject) => {
    if (length === 0) resolve([]);

    let resolvedCount = 0;

    const result = new Array(length);

    tasks.forEach((task, index) => {
      Promise.resolve(task)
        .then((value) => {
          result[index] = value;
          resolvedCount++;

          if (resolvedCount === length) resolve(result);
        })
        .catch((error) => reject(error));
    });
  });
}
