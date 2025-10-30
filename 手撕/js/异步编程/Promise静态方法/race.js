function myRace(tasks) {
  return new Promise((resolve, reject) => {
    tasks.forEach((task) => {
      Promise.resolve(task)
        .then((value) => resolve(value))
        .catch((error) => reject(error));
    });
  });
}
