/*
?=元 正向肯定预查,表示肯定是元，但不匹配
？！= 元正向否定预查,表示肯定不是元，不匹配
？<=¥ 反向肯定预查表示肯定是¥，但不匹配
？!=¥ 反向否定预查,表示肯定不是¥，不匹配
*/

// ?=,?!
const p = /m?=jj/g;

// 1. 匹配后面跟着特定字符的内容
console.log("=== 基础用法：匹配后面跟着@的字符串 ===");
const emailLocalPart = /\w+(?=@)/; // 匹配@前面的单词字符
console.log("user@example.com".match(emailLocalPart)); // ["user"]
console.log("name123@test".match(emailLocalPart)); // ["name123"]

// 2. 验证密码强度：必须包含至少一个大写字母
console.log("\n=== 密码强度验证 ===");

//

// 1. 匹配前面是特定字符的内容
console.log("=== 基础用法：匹配$符号后面的数字 ===");
const priceNumber = /(?<=\$)\d+/; // 匹配$后面的数字（不包含$）
console.log("$199".match(priceNumber)); // ["199"]
console.log("Total: $2999".match(priceNumber)); // ["2999"]

// 2. 提取带单位的数值（只取数字部分）
console.log("\n=== 提取带单位的数值 ===");
const numberWithUnit = /(?<=\d)kg/; // 匹配前面是数字的kg
const weightValue = /\d+(?=kg)/; // 结合正向预查，获取kg前面的数字
console.log("75kg".match(weightValue)); // ["75"]
console.log("Maximum 120kg".match(weightValue)); // ["120"]

// 3. 验证文件格式（匹配前面是.jpg或.png的文件名）
console.log("\n=== 验证文件格式 ===");
const imageFile = /(?<=\.)(jpg|png)$/; // 匹配.后面是jpg或png的扩展名
console.log(imageFile.test("photo.jpg")); // true
console.log(imageFile.test("data.png")); // true
console.log(imageFile.test("doc.pdf")); // false
