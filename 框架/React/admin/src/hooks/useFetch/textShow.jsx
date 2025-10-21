import { useFetch } from "./useFetch";

function ArticleList() {
  // 发起GET请求获取文章列表
  const { data, loading, error, refetch } = useFetch(
    "https://jsonplaceholder.typicode.com/posts"
  );

  if (loading) {
    return <div style={{ padding: "20px" }}>加载文章列表中...</div>;
  }

  if (error) {
    return (
      <div style={{ color: "red", padding: "20px" }}>
        加载失败: {error.message}
        <button onClick={refetch} style={{ marginLeft: "10px" }}>
          重试
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <h2>文章列表</h2>
      <button
        onClick={refetch}
        style={{ marginBottom: "20px", padding: "8px 16px" }}
      >
        刷新列表
      </button>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {data?.slice(0, 5).map((article) => (
          <li
            key={article.id}
            style={{
              padding: "10px",
              border: "1px solid #eee",
              marginBottom: "10px",
            }}
          >
            <h3>{article.title}</h3>
            <p>{article.body.substring(0, 100)}...</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
