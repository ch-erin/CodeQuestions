import { useState, useEffect, useCallback } from "react";

/**
 * @param {string} url - 请求地址
 * @param {RequestInit} options - fetch配置项
 * @param {boolean} autoFetch - 是否自动请求，默认true
 * @returns {Object} 包含data, loading, error和refetch的对象
 */
export function useFetch(url, options = {}, autoFetch = true) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(autoFetch);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // 基础配置，默认JSON格式
      const baseOptions = {
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
        ...options,
      };

      // 处理请求体（对象自动转为JSON字符串）
      if (baseOptions.body && typeof baseOptions.body === "object") {
        baseOptions.body = JSON.stringify(baseOptions.body);
      }

      const response = await fetch(url, baseOptions);
      if (!response.ok) {
        throw new Error(`请求失败: ${response.status}`);
      }

      // 解析响应数据
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      setLoading(false);
    }
  }, [url, JSON.stringify(options)]);

  useEffect(() => {
    if (autoFetch) {
      fetchData();
    }
  }, [fetchData, autoFetch]);

  return { data, loading, error, refetch: fetchData };
}
