const version1 = "1.0.1";
const version2 = "1";



const compareVersion = function (version1, version2) {
  let arr1 = version1.split(".");
  let arr2 = version2.split(".");

  while (arr1.length || arr2.length) {
    const n1 = arr1.length ? Number(arr1.shift()) : 0;
    const n2 = arr2.length ? Number(arr2.shift()) : 0;
    
    if (n1 > n2) return 1;
    if (n1 < n2) return -1;
  }

  return 0;
};
