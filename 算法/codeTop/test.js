function myAsync(generatorFunc) {
  return function (...args) {
    const generator = generatorFunc.apply(this, args);

    const step = (key, arg) => {
      return new Promise((resolve, reject) => {
        let result;

        try {
          result = generator[key](arg);
        } catch (error) {
          return reject(error);
        }

        const { value, done } = result;

        if (done) return resolve(value);

        Promise.resolve(value).then(
          (val) => step("next", val).then(resolve, reject),
          (err) => step("throw", err).then(resolve, reject)
        );
      });
    };

    return step("next");
  };
}
