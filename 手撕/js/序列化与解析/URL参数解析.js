function parseQueryString(url) {
  const queryString = new URL(url).search.slice(1);
  const params = {};
  const pairs = queryString.split("&");
  for (let pair of pairs) {
    const [key, value] = pair.split("=");
    if (key) {
      params[key] = value || "";
    }
  }
  return params;
}
// 输出: { key1: "value1", key2: "value2" }
console.log(parseQueryString("https://example.com/?key1=value1&key2=value2"));
