/**
 * 简化版HPACK算法实现
 * 包含核心功能：静态字典、动态字典和基本编码
 */
class HPACK {
  constructor() {
    // 1. 静态字典 - 包含常见的HTTP头部字段
    // 格式: [索引, 名称, 值]
    this.staticDictionary = [
      [1, ":authority", ""],
      [2, ":method", "GET"],
      [3, ":method", "POST"],
      [4, ":path", "/"],
      [5, ":path", "/index.html"],
      [6, ":scheme", "http"],
      [7, ":scheme", "https"],
      [8, ":status", "200"],
      [9, ":status", "404"],
      [10, ":status", "500"],
      [11, "accept-charset", ""],
      [12, "accept-encoding", "gzip, deflate"],
      [13, "accept-language", ""],
      [14, "accept-ranges", ""],
      [15, "accept", ""],
      [16, "access-control-allow-origin", ""],
      [17, "age", ""],
      [18, "allow", ""],
      [19, "authorization", ""],
      [20, "cache-control", ""],
      [21, "content-disposition", ""],
      [22, "content-encoding", ""],
      [23, "content-language", ""],
      [24, "content-length", ""],
      [25, "content-location", ""],
      [26, "content-range", ""],
      [27, "content-type", ""],
      [28, "cookie", ""],
      [29, "date", ""],
      [30, "etag", ""],
      [31, "expect", ""],
      [32, "expires", ""],
      [33, "from", ""],
      [34, "host", ""],
      [35, "if-match", ""],
      [36, "if-modified-since", ""],
      [37, "if-none-match", ""],
      [38, "if-range", ""],
      [39, "if-unmodified-since", ""],
      [40, "last-modified", ""],
      [41, "link", ""],
      [42, "location", ""],
      [43, "max-forwards", ""],
      [44, "origin", ""],
      [45, "pragma", ""],
      [46, "proxy-authenticate", ""],
      [47, "proxy-authorization", ""],
      [48, "range", ""],
      [49, "referer", ""],
      [50, "refresh", ""],
      [51, "retry-after", ""],
      [52, "server", ""],
      [53, "set-cookie", ""],
      [54, "strict-transport-security", ""],
      [55, "transfer-encoding", ""],
      [56, "user-agent", ""],
      [57, "vary", ""],
      [58, "via", ""],
      [59, "www-authenticate", ""],
    ];

    // 2. 动态字典 - 存储连接中出现的新头部
    this.dynamicDictionary = [];
    this.maxDynamicTableSize = 4096; // 默认最大大小
    this.currentDynamicTableSize = 0;

    // 3. 简单的哈夫曼编码映射表（简化版）
    // 实际HPACK使用更复杂的码表，这里仅用于演示
    this.huffmanCodes = {
      // 空格和控制字符
      " ": 0x01, // 1
      "\t": 0x02, // 10 (制表符)
      "\r": 0x03, // 11 (回车)
      "\n": 0x04, // 100 (换行)

      // 符号
      ":": 0x05, // 101
      "/": 0x06, // 110
      ".": 0x07, // 111
      "-": 0x08, // 1000
      _: 0x09, // 1001
      "=": 0x0a, // 1010
      "?": 0x0b, // 1011
      "&": 0x0c, // 1100
      "%": 0x0d, // 1101
      "#": 0x0e, // 1110
      "+": 0x0f, // 1111
      "*": 0x10, // 10000
      ",": 0x11, // 10001
      ";": 0x12, // 10010
      "!": 0x13, // 10011
      "@": 0x14, // 10100
      $: 0x15, // 10101
      "(": 0x16, // 10110
      ")": 0x17, // 10111
      "[": 0x18, // 11000
      "]": 0x19, // 11001
      "{": 0x1a, // 11010
      "}": 0x1b, // 11011
      "<": 0x1c, // 11100
      ">": 0x1d, // 11101
      "|": 0x1e, // 11110
      "^": 0x1f, // 11111

      // 小写字母
      a: 0x20, // 100000
      b: 0x21, // 100001
      c: 0x22, // 100010
      d: 0x23, // 100011
      e: 0x24, // 100100
      f: 0x25, // 100101
      g: 0x26, // 100110
      h: 0x27, // 100111
      i: 0x28, // 101000
      j: 0x29, // 101001
      k: 0x2a, // 101010
      l: 0x2b, // 101011
      m: 0x2c, // 101100
      n: 0x2d, // 101101
      o: 0x2e, // 101110
      p: 0x2f, // 101111
      q: 0x30, // 110000
      r: 0x31, // 110001
      s: 0x32, // 110010
      t: 0x33, // 110011
      u: 0x34, // 110100
      v: 0x35, // 110101
      w: 0x36, // 110110
      x: 0x37, // 110111
      y: 0x38, // 111000
      z: 0x39, // 111001

      // 大写字母
      A: 0x3a, // 111010
      B: 0x3b, // 111011
      C: 0x3c, // 111100
      D: 0x3d, // 111101
      E: 0x3e, // 111110
      F: 0x3f, // 111111
      G: 0x40, // 1000000
      H: 0x41, // 1000001
      I: 0x42, // 1000010
      J: 0x43, // 1000011
      K: 0x44, // 1000100
      L: 0x45, // 1000101
      M: 0x46, // 1000110
      N: 0x47, // 1000111
      O: 0x48, // 1001000
      P: 0x49, // 1001001
      Q: 0x4a, // 1001010
      R: 0x4b, // 1001011
      S: 0x4c, // 1001100
      T: 0x4d, // 1001101
      U: 0x4e, // 1001110
      V: 0x4f, // 1001111
      W: 0x50, // 1010000
      X: 0x51, // 1010001
      Y: 0x52, // 1010010
      Z: 0x53, // 1010011

      // 数字
      0: 0x54, // 1010100
      1: 0x55, // 1010101
      2: 0x56, // 1010110
      3: 0x57, // 1010111
      4: 0x58, // 1011000
      5: 0x59, // 1011001
      6: 0x5a, // 1011010
      7: 0x5b, // 1011011
      8: 0x5c, // 1011100
      9: 0x5d, // 1011101
    };
  }

  /**
   * 查找静态字典中匹配的条目
   * @param {string} name 头部名称
   * @param {string} value 头部值
   * @returns {number|null} 匹配的索引，无匹配则返回null
   */
  findStaticEntry(name, value) {
    for (const [index, entryName, entryValue] of this.staticDictionary) {
      if (entryName === name && entryValue === value) {
        return index;
      }
    }
    return null;
  }

  /**
   * 查找静态字典中仅名称匹配的条目
   * @param {string} name 头部名称
   * @returns {number|null} 匹配的索引，无匹配则返回null
   */
  findStaticNameEntry(name) {
    for (const [index, entryName] of this.staticDictionary) {
      if (entryName === name) {
        return index;
      }
    }
    return null;
  }

  /**
   * 查找动态字典中匹配的条目
   * @param {string} name 头部名称
   * @param {string} value 头部值
   * @returns {number|null} 匹配的索引，无匹配则返回null
   */
  findDynamicEntry(name, value) {
    for (let i = 0; i < this.dynamicDictionary.length; i++) {
      const [entryName, entryValue] = this.dynamicDictionary[i];
      if (entryName === name && entryValue === value) {
        // 动态字典索引 = 静态字典大小 + 位置索引 + 1
        return this.staticDictionary.length + i + 1;
      }
    }
    return null;
  }

  /**
   * 将条目添加到动态字典
   * @param {string} name 头部名称
   * @param {string} value 头部值
   */
  addToDynamicDictionary(name, value) {
    // 计算条目的大小（名称长度 + 值长度 + 32字节开销）
    const entrySize = name.length + value.length + 32;

    // 如果超过最大大小，先清理空间
    while (
      this.currentDynamicTableSize + entrySize > this.maxDynamicTableSize &&
      this.dynamicDictionary.length > 0
    ) {
      const removed = this.dynamicDictionary.shift();
      this.currentDynamicTableSize -=
        removed[0].length + removed[1].length + 32;
    }

    // 添加新条目到动态字典的末尾
    this.dynamicDictionary.push([name, value]);
    this.currentDynamicTableSize += entrySize;
  }

  /**
   * 简化的哈夫曼编码
   * @param {string} str 要编码的字符串
   * @returns {string} 编码后的二进制字符串
   */
  huffmanEncode(str) {
    let result = "";
    for (const char of str) {
      if (this.huffmanCodes[char]) {
        // 将十六进制转换为二进制字符串
        result += this.huffmanCodes[char].toString(2).padStart(4, "0");
      } else {
        // 对于未定义的字符，使用UTF-8编码
        result += char.charCodeAt(0).toString(2).padStart(8, "0");
      }
    }
    return result;
  }

  /**
   * 压缩HTTP头部字段
   * @param {Array} headers 头部数组，格式: [[name, value], ...]
   * @returns {Array} 压缩后的帧数据
   */
  compress(headers) {
    const compressedFrames = [];

    for (const [name, value] of headers) {
      // 1. 先检查是否在静态字典中完全匹配
      const staticIndex = this.findStaticEntry(name, value);
      if (staticIndex) {
        // 完全匹配静态字典，使用索引表示 (最高位为0)
        compressedFrames.push({
          type: "indexed",
          data: staticIndex.toString(2).padStart(8, "0"), // 8位表示
        });
        continue;
      }

      // 2. 检查是否在动态字典中完全匹配
      const dynamicIndex = this.findDynamicEntry(name, value);
      if (dynamicIndex) {
        // 完全匹配动态字典，使用索引表示 (最高位为0)
        compressedFrames.push({
          type: "indexed",
          data: dynamicIndex.toString(2).padStart(8, "0"),
        });
        continue;
      }

      // 3. 检查是否名称在静态字典中匹配
      const staticNameIndex = this.findStaticNameEntry(name);
      if (staticNameIndex) {
        // 名称匹配静态字典，只需编码值
        const valueEncoded = this.huffmanEncode(value);
        // 格式: 最高位10表示名称索引，值使用哈夫曼编码
        compressedFrames.push({
          type: "name-indexed",
          nameIndex: staticNameIndex,
          value: valueEncoded,
        });
        // 添加到动态字典
        this.addToDynamicDictionary(name, value);
        continue;
      }

      // 4. 名称不在静态字典中，需要编码名称和值
      const nameEncoded = this.huffmanEncode(name);
      const valueEncoded = this.huffmanEncode(value);
      // 格式: 最高位11表示名称和值都需要编码
      compressedFrames.push({
        type: "literal",
        name: nameEncoded,
        value: valueEncoded,
      });
      // 添加到动态字典
      this.addToDynamicDictionary(name, value);
    }

    return compressedFrames;
  }

  /**
   * 解压缩HTTP头部字段
   * @param {Array} compressedFrames 压缩后的帧数据
   * @returns {Array} 解压缩后的头部数组
   */
  decompress(compressedFrames) {
    const headers = [];

    for (const frame of compressedFrames) {
      if (frame.type === "indexed") {
        // 索引类型，从静态或动态字典中查找
        const index = parseInt(frame.data, 2);
        if (index <= this.staticDictionary.length) {
          // 静态字典条目
          const [, name, value] = this.staticDictionary[index - 1];
          headers.push([name, value]);
        } else {
          // 动态字典条目
          const dynamicIndex = index - this.staticDictionary.length - 1;
          const [name, value] = this.dynamicDictionary[dynamicIndex];
          headers.push([name, value]);
        }
      } else if (frame.type === "name-indexed") {
        // 名称索引类型，值是编码后的
        const [, name] = this.staticDictionary[frame.nameIndex - 1];
        // 简化处理，实际需要哈夫曼解码
        const value = frame.value; // 这里应该是解码后的值
        headers.push([name, value]);
      } else if (frame.type === "literal") {
        // 字面量类型，名称和值都是编码后的
        // 简化处理，实际需要哈夫曼解码
        const name = frame.name; // 这里应该是解码后的值
        const value = frame.value; // 这里应该是解码后的值
        headers.push([name, value]);
      }
    }

    return headers;
  }
}

// 测试HPACK实现
function testHPACK() {
  const hpack = new HPACK();

  // 要压缩的HTTP头部
  const headers = [
    [":method", "GET"],
    [":path", "/index.html"],
    ["host", "example.com"],
    ["user-agent", "Mozilla/5.0"],
    ["accept", "text/html"],
  ];

  console.log("原始头部:", headers);

  // 压缩头部
  const compressed = hpack.compress(headers);
  console.log("压缩后的帧数据:", compressed);

  // 解压缩头部
  const decompressed = hpack.decompress(compressed);
  console.log("解压缩后的头部:", decompressed);

  // 再次压缩相同的头部，观察动态字典的效果
  const compressedAgain = hpack.compress(headers);
  console.log("第二次压缩后的帧数据(利用动态字典):", compressedAgain);
}

// 运行测试
testHPACK();
