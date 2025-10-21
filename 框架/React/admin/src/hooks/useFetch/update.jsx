import { useState } from "react";
import { useFetch } from "./useFetch";

function AddTodo() {
  const [title, setTitle] = useState("");

  // 配置POST请求，手动触发
  const { loading, error, refetch } = useFetch(
    "https://jsonplaceholder.typicode.com/todos",
    {
      method: "POST",
      // 请求体（会自动转为JSON）
      body: {
        title: title,
        completed: false,
        userId: 1,
      },
    },
    false // 不自动请求
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    // 手动触发请求
    refetch().then(() => {
      alert("添加成功！");
      setTitle("");
    });
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: "20px" }}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="请输入待办事项"
        style={{ padding: "8px", width: "300px" }}
      />
      <button
        type="submit"
        disabled={loading || !title}
        style={{
          marginLeft: "10px",
          padding: "8px 16px",
          cursor: loading ? "not-allowed" : "pointer",
        }}
      >
        {loading ? "提交中..." : "添加待办"}
      </button>

      {error && (
        <div style={{ color: "red", marginTop: "10px" }}>
          错误: {error.message}
        </div>
      )}
    </form>
  );
}
