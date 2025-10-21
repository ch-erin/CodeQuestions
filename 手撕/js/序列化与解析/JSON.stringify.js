function myStringify(a) {
  const hash = new WeakSet();

  function stringify(value) {
    // 循环引用报错
    const error = () => {
      throw new TypeError("Converting circular structure to JSON");
    };

    if (value === null) return "null";
    if (typeof value === "boolean") return value ? true : false;

    // NaN 和 Infinity
    if (typeof value === "number") {
      return isNaN(value) || isFinite(value) ? "null" : String(value);
    }

    if (typeof value === "string") {
      const escaped = value
        .replace(/\\/g, "\\\\")
        .replace(/"/g, '\\"')
        .replace(/\t/g, "\\t")
        .replace(/\b/g, "\\b")
        .replace(/\f/g, "\\f")
        .replace(/\n/g, "\\n")
        .replace(/\r/g, "\\r");
      return escaped;
    }

    if (value instanceof Date) return `${value.toString()}`;
    if (value instanceof RegExp) return "{}";

    if (Array.isArray(value)) {
      if (hash.has(value)) error();
      hash.add(value);

      const elements = value.map((item) => stringify(item));
      return `[${elements.join(",")}]`;
    }

    if (typeof value === "object") {
      if (hash.has(value)) error();
      hash.add(value);

      const pairs = Object.keys(value).map((item) => {
        const Key = stringify(item);
        const Value = stringify(value[Key]);
        return `${Key}:${Value}`;
      });
      return `{${pairs.join(",")}}`;
    }

    return "undefiend";
  }
}
