function renderTpl(tpl, data) {
  Object.keys(data).forEach((k) => {
    tpl = tpl.replace(`{${k}}`, data[k]);
  });
  return tpl;
}

let tpl = "你好，我们公司是{company}，我们部门是{bu}";
let tplData = {
  company: "阿里巴巴",
  bu: "天猫精灵",
};

const str = renderTpl(tpl, tplData);
console.log(str); // 你好，我们公司是阿里巴巴，我们部门是天猫精灵

// 最终输出结果为：你好，我们公司是阿里巴巴，我们部门是天猫精灵。
