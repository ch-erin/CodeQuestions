/**
 * 简化版图片懒加载模块
 * 功能：监听图片元素进入视口时加载图片
 */
function initLazyLoading(options = {}) {
  // 合并配置
  const {
    selector = ".lazy-image",
    rootMargin = "100px 0px",
    onLoaded,
  } = options;

  // 获取所有需要懒加载的图片
  const lazyImages = document.querySelectorAll(selector);
  if (!lazyImages.length) return;

  // 加载图片处理函数
  const loadImage = (img) => {
    img.src = img.dataset.src;
    img.onload = () => {
      img.classList.remove("loading");
      img.classList.add("loaded");
      onLoaded && onLoaded(img);
    };
  };

  // 检查元素是否在视口内
  const inViewport = (el) => {
    const rect = el.getBoundingClientRect();
    return rect.top <= window.innerHeight && rect.bottom >= 0;
  };

  // 使用IntersectionObserver实现懒加载
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            loadImage(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin }
    );

    lazyImages.forEach((img) => observer.observe(img));
  }
  // 降级处理
  else {
    lazyImages.forEach((img) => inViewport(img) && loadImage(img));
  }

  // 返回手动检查方法
  return {
    check: () =>
      lazyImages.forEach(
        (img) =>
          inViewport(img) && img.classList.contains("loading") && loadImage(img)
      ),
  };
}
