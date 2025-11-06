function MathChain(num) {
  return {
    value: num,

    add: function (n) {
      this.value += n;
      return this;
    },

    subtract: function (n) {
      this.value -= n;
      return this;
    },

    multiply: function (n) {
      this.value *= n;
      return this;
    },

    getResult: function () {
      return this.value;
    },
  };
}
