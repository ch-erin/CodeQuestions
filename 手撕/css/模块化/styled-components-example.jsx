// Styled-Components 示例 (CSS-in-JS)
import styled from "styled-components";

// 创建样式化组件
const Button = styled.button`
  padding: 8px 16px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  font-size: 14px;

  /* 动态样式 */
  background-color: ${(props) => (props.primary ? "#007bff" : "#e9ecef")};
  color: ${(props) => (props.primary ? "white" : "#212529")};

  &:hover {
    opacity: 0.9;
  }
`;

// 使用组件
function App() {
  return (
    <div>
      <Button>普通按钮</Button>
      <Button primary>主要按钮</Button>
    </div>
  );
}
