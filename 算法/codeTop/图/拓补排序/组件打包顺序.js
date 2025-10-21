/*
你正在维护一个基于模块联邦（Module Federation）的微前端项目。
每个子应用（组件包）在构建之前，必须保证它依赖的所有子应用已经先构建完成。
请给出一个组件包的依赖关系，求出合法的构建顺序（即拓扑排序）。
如果存在循环依赖，请返回 null 并指出哪些包形成了环。
*/

const module_map = {
  ui: ["core", "theme"],
  core: [],
  theme: ["core"],
  utils: [],
  app: ["ui", "utils"],
};

const getOrder = (packages) => {
  const result = [];
  const inDegree = new Map(); // 入度表
  const graph = new Map(); // 正向邻接表
  const nodes = new Set(); // 所有包名

  const setGraphAndNodes = (pkg) => {
    nodes.add(pkg);
    if (!graph.has(pkg)) {
      graph.set(pkg, []);
    }
  };

  for (const [pkg, deps] of Object.entries(packages)) {
    setGraphAndNodes(pkg);
    for (const dep of deps) {
      setGraphAndNodes(dep);
      graph.get(dep).push(pkg);
    }
  }

  for (const node of nodes) inDegree.set(node, 0);
  for (const [, targets] of graph) {
    for (const t of targets) inDegree.set(t, inDegree.get(t) + 1);
  }

  const queue = [...nodes].filter((n) => inDegree.get(n) === 0);

  while (queue.length) {
    const curNode = queue.shift();
    result.push(curNode);

    for (const next of graph.get(curr)) {
      inDegree.set(next, inDegree.get(next) - 1);
      if (inDegree.get(next) === 0) queue.push(next);
    }
  }

  if (result.length !== queue.size) {
    return null;
  }

  return result;
};
