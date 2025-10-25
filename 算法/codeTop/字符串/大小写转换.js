// 字符大小写反转

let a = "ABZabz";

function reverseCase(s) {
  if (!(typeof s === "string")) return;

  let res = "";

  for (let i = 0; i < s.length; i++) {
    let char = s[i];

    let charCode = char.charCodeAt(0);

    if (charCode >= 65 && charCode <= 90) res += char.toLowerCase();
    else if (charCode >= 97 && charCode <= 122) res += char.toUpperCase();
    else {
      res += char;
    }
  }

  console.log(res);
  return res;
}
reverseCase(a);
