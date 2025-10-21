function findNthLargestDigit(str, n) {
  const digitChars = str.split("").filter((char) => /^\d$/.test(char));

  const numbers = digitChars.map((char) => parseInt(char, 10));

  console.log(numbers);
}

const testString = "a1b23c45d6e7f89g0";

findNthLargestDigit(testString);
