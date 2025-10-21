function main() {
  const str = "a(bc)d(ef)g";
  const regex = /\(([^)]+)\)/g;
  const result = [];
  let match;
  while ((match = regex.exec(str)) !== null) {
    result.push(match[1]); // 取捕获组1（括号内的内容）
  }
  console.log(result); // 输出: ['bc', 'ef']
}

main();
