import { ref, watch, watchEffect, isRef } from "vue";

export function useFetch(url, options = {}, autoFetch = true) {
  // 响应式状态
  const data = ref(null);
  const loading = ref(isRef(autoFetch) ? autoFetch.value : autoFetch);
  const error = ref(null);

  // 取值工具函数（处理响应式/非响应式参数）
  const getVal = (val) => (isRef(val) ? val.value : val);

  // 核心请求函数
  const fetchData = async () => {
    loading.value = true;
    error.value = null;
    try {
      const currentUrl = getVal(url);
      const currentOptions = getVal(options);

      if (!currentUrl) throw new Error("URL不能为空");

      // 合并配置并处理请求体
      const config = {
        headers: {
          "Content-Type": "application/json",
          ...currentOptions.headers,
        },
        ...currentOptions,
      };
      if (
        config.body &&
        typeof config.body === "object" &&
        !(config.body instanceof FormData)
      ) {
        config.body = JSON.stringify(config.body);
      }

      // 发送请求并处理响应
      const res = await fetch(currentUrl, config);
      if (!res.ok) throw new Error(`请求失败: ${res.status}`);

      data.value = res.headers.get("content-type")?.includes("json")
        ? await res.json()
        : await res.text();
    } catch (err) {
      error.value = err instanceof Error ? err : new Error(String(err));
    } finally {
      loading.value = false;
    }
  };

  // 自动请求逻辑
  watchEffect(() => getVal(autoFetch) && fetchData());

  // 依赖变化时重新请求
  watch(
    [() => getVal(url), () => getVal(options), () => getVal(autoFetch)],
    ([newUrl, newOpts, newAuto], [oldUrl, oldOpts]) => {
      if (newAuto && (newUrl !== oldUrl || newOpts !== oldOpts)) fetchData();
    },
    { deep: true }
  );

  return { data, loading, error, refetch: fetchData };
}
