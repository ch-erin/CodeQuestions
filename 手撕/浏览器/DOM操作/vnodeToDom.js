// 虚拟DOM转化为真实的DOM结构
const vnode = {
  tag: "div",
  attrs: { id: "myDiv" },
  children: [
    123,
    "123456",
    { tag: "div", children: ["Hello"] },
    { tag: "span", children: ["World"] },
  ],
};

function createElementFromVNode(vnode) {
  // 1.创建一个新的DOM元素
  const dom = document.createElement(vnode.tag);

  // 2.如果虚拟节点有属性，则设置DOM元素的属性
  if (vnode.attrs) {
    Object.keys(vnode.attrs).forEach((key) => {
      dom.setAttribute(key, vnode.attrs[key]);
    });
  }

  // 3.如果虚拟节点有子节点，则递归地创建子节点DOM
  if (vnode.children) {
    vnode.children.forEach((childVode) => {
      // 如果是数字类型，转化为字符串
      if (typeof childVode === "number") {
        childVode = String(childVode);
      }
      // 对于文本节点，则直接创建文本节点
      if (typeof childVode === "string") {
        dom.appendChild(document.createTextNode(childVode));
      }
      // 对于普通节点，递归调用该函数
      else {
        dom.appendChild(createElementFromVNode(childVode));
      }
    });
  }

  // 4.返回创建的DOM元素
  return dom;
}
// 5. 调用函数，将虚拟DOM节点转换为真实DOM节点，并挂载到某个位置
const realDom = createElementFromVNode(vnode);
document.body.appendChild(realDom);
