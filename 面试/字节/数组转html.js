function arrayToHtml(arr) {
  function render(items) {
    return items
      .map((item) => {
        if (Array.isArray(item)) {
          return `<li>${arrayToHtml(item)}</li>`;
        }
        return `<li>${escapeHtml(String(item))}</li>`;
      })
      .join("");
  }

  return `<ul>${render(arr)}</ul>`;
}

function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;") // & -> &amp;
    .replace(/</g, "&lt;") // < -> &lt;
    .replace(/>/g, "&gt;") // > -> &gt;
    .replace(/"/g, "&quot;") // " -> &quot;
    .replace(/'/g, "&#039;") // ' -> &#039;
    .replace(/`/g, "&#96;") // ` -> &#96;
    .replace(/=/g, "&#61;") // = -> &#61;
    .replace(/\//g, "&#47;");
}

const nestedArray = [
  "一级项目1",
  ["二级项目1", "二级项目2", ["三级项目1", "三级项目2"], "二级项目3"],
  "一级项目2",
  ["二级项目4"],
];

const res = arrayToHtml(nestedArray);
console.log(JSON.stringify(res));
