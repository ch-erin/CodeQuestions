import { useState, useEffect, useCallback } from 'react';

interface UseFetchResult<T> {
    data: T | null;
    loading: boolean;
    error: Error | null;
    refetch: () => Promise<void>;
}

/**
 * 简化版的useFetch Hook
 * @param url 请求地址
 * @param options 请求配置，包含method、body等
 * @param autoFetch 是否自动请求，默认true
 */
export function useFetch<T = any>(
    url: string,
    options: RequestInit = {},
    autoFetch = true
): UseFetchResult<T> {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(autoFetch);
    const [error, setError] = useState<Error | null>(null);

    // 核心请求函数
    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            // 基础配置，默认JSON格式
            const baseOptions: RequestInit = {
                headers: {
                    'Content-Type': 'application/json',
                    ...options.headers,
                },
                ...options,
            };

            // 如果有body且是对象，自动序列化
            if (baseOptions.body && typeof baseOptions.body === 'object') {
                baseOptions.body = JSON.stringify(baseOptions.body);
            }

            const response = await fetch(url, baseOptions);

            if (!response.ok) {
                throw new Error(`请求失败: ${response.status}`);
            }

            // 尝试解析JSON
            const result = await response.json();
            setData(result);
        } catch (err) {
            setError(err instanceof Error ? err : new Error(String(err)));
        } finally {
            setLoading(false);
        }
    }, [url, JSON.stringify(options)]);

    // 自动请求
    useEffect(() => {
        if (autoFetch) {
            fetchData();
        }
    }, [fetchData, autoFetch]);

    return { data, loading, error, refetch: fetchData };
}
