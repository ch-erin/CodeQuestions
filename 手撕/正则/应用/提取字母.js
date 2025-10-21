function extractAllLetters(str) {
  const letters = str.split("").filter((char) => /^[a-zA-Z]$/.test(char));
  return letters;
}

const testString = "a1b23c45d6e7f89g0";
console.log(extractAllLetters(testString));
// ['a', 'b', 'c', 'd', 'e', 'f', 'g']

// 纯大写
function extractUppercaseLetters(str) {
  const letters = str.split("").filter((char) => /^[A-Z]$/.test(char));
  return letters;
}

const mixedString = "A1b2C3d4E5";
console.log(extractUppercaseLetters(mixedString));
// ['A', 'C', 'E']

//纯小写
function extractLowercaseLetters(str) {
  const letters = str.split("").filter((char) => /^[a-z]$/.test(char));
  return letters;
}

console.log(extractLowercaseLetters(testString));
// ['a', 'b', 'c', 'd', 'e', 'f', 'g']
