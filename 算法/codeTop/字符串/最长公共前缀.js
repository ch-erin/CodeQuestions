function LCP(arr) {
  if (arr.length < 1) return [];
  let profix = arr[0];

  for (let i = 0; i < arr.length; i++) {
    while (arr[i].indexOf(profix)) {
      profix = profix.substring(0, profix.length - 1);
      if (!profix) return "";
    }
  }

  return profix;
}
