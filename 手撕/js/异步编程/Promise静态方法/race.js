function myRace(tasks) {
  return new Promise((resolve, reject) => {
    tasks.forEach((task) => {
      Promise.resolve(task).then(resolve).catch(reject);
    });
  });
}
