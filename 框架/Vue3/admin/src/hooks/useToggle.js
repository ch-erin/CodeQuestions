import { ref } from "vue";

export function useToggle(initialValue = false) {
  const state = ref(initialValue);

  // 切换状态（可选传参强制设置值）
  const toggle = (value) => {
    state.value = value !== undefined ? value : !state.value;
  };

  return {
    state, // 响应式状态
    toggle, // 切换方法
    setTrue: () => toggle(true), // 强制设为true
    setFalse: () => toggle(false), // 强制设为false
  };
}
