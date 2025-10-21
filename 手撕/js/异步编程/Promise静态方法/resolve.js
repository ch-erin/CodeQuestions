function myReslove(promise) {
  if (promise instanceof Promise) return promise;

  const isThenAble = (value) => {
    return (
      typeof value === "object" &&
      value !== null &&
      typeof value.then === "function"
    );
  };

  if (isThenAble(value)) {
    return new Promise((resolve, reject) => {
      try {
        value.then(resolve, reject);
      } catch (error) {
        reject(error);
      }
    });
  }

  return new Promise((resolve) => resolve(value));
}
