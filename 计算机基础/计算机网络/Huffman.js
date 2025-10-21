class HuffmanNode {
  constructor(char, frequency) {
    this.char = char; // 字符（叶子节点有效）
    this.frequency = frequency; // 频率
    this.left = null; // 左子树（0）
    this.right = null; // 右子树（1）
  }
}

class HuffmanCoding {
  constructor() {
    this.codeTable = new Map(); // 编码表：char -> 二进制字符串
    this.huffmanTree = null; // 哈夫曼树
  }

  /**
   * 统计字符频率
   * @param {string} data 原始字符串
   * @returns {Map} 字符频率映射
   */
  countFrequency(data) {
    const frequencyMap = new Map();
    for (const char of data) {
      frequencyMap.set(char, (frequencyMap.get(char) || 0) + 1);
    }
    return frequencyMap;
  }

  /**
   * 构建哈夫曼树
   * @param {Map} frequencyMap 字符频率映射
   */
  buildHuffmanTree(frequencyMap) {
    // 创建叶子节点队列（按频率升序排列）
    const nodes = Array.from(frequencyMap.entries())
      .map(([char, freq]) => new HuffmanNode(char, freq))
      .sort((a, b) => a.frequency - b.frequency);

    // 合并节点直到只剩一个根节点
    while (nodes.length > 1) {
      // 取出频率最小的两个节点
      const left = nodes.shift();
      const right = nodes.shift();

      // 创建父节点（频率为两者之和，无字符）
      const parent = new HuffmanNode(null, left.frequency + right.frequency);
      parent.left = left;
      parent.right = right;

      // 将父节点插入队列（保持升序）
      nodes.push(parent);
      nodes.sort((a, b) => a.frequency - b.frequency);
    }

    // 根节点即为哈夫曼树
    this.huffmanTree = nodes[0];
  }

  /**
   * 生成编码表（递归遍历哈夫曼树）
   */
  generateCodeTable() {
    const traverse = (node, currentCode) => {
      if (!node) return;
      // 叶子节点：记录编码
      if (node.char !== null) {
        this.codeTable.set(node.char, currentCode);
        return;
      }
      // 非叶子节点：左0右1
      traverse(node.left, currentCode + "0");
      traverse(node.right, currentCode + "1");
    };
    traverse(this.huffmanTree, "");
  }

  /**
   * 压缩数据
   * @param {string} data 原始字符串
   * @returns {object} 压缩结果（包含二进制流和树结构）
   */
  compress(data) {
    if (!data) return { binary: "", tree: null };

    // 1. 统计频率
    const frequencyMap = this.countFrequency(data);
    // 2. 构建哈夫曼树
    this.buildHuffmanTree(frequencyMap);
    // 3. 生成编码表
    this.generateCodeTable();

    // 4. 生成二进制流
    let binary = "";
    for (const char of data) {
      binary += this.codeTable.get(char);
    }

    // 返回压缩结果（二进制流+哈夫曼树，树用于解压）
    return {
      binary: binary,
      tree: this.huffmanTree,
      codeTable: this.codeTable, // 仅用于演示，实际中传输树结构
    };
  }

  /**
   * 解压数据
   * @param {string} binary 压缩后的二进制流
   * @param {HuffmanNode} tree 哈夫曼树
   * @returns {string} 解压后的原始字符串
   */
  decompress(binary, tree) {
    if (!binary || !tree) return "";

    let result = "";
    let currentNode = tree;

    // 遍历二进制流，按哈夫曼树路径查找字符
    for (const bit of binary) {
      // 左0右1移动节点
      currentNode = bit === "0" ? currentNode.left : currentNode.right;

      // 到达叶子节点：记录字符并重置当前节点
      if (currentNode.char !== null) {
        result += currentNode.char;
        currentNode = tree;
      }
    }

    return result;
  }
}

// 测试哈夫曼编码
function testHuffman() {
  const huffman = new HuffmanCoding();
  const data = "this is an example for huffman encoding";

  console.log("原始数据:", data);
  console.log("原始长度:", data.length * 8, "bits（假设每个字符8位）");

  // 压缩
  const { binary, tree, codeTable } = huffman.compress(data);
  console.log("\n编码表:", Object.fromEntries(codeTable));
  console.log("压缩后二进制流:", binary);
  console.log("压缩后长度:", binary.length, "bits");
  console.log(
    "压缩率:",
    (1 - binary.length / (data.length * 8)).toFixed(2) * 100 + "%"
  );

  // 解压
  const decompressedData = huffman.decompress(binary, tree);
  console.log("\n解压后数据:", decompressedData);
  console.log("解压是否正确:", decompressedData === data);
}

// 运行测试
testHuffman();
