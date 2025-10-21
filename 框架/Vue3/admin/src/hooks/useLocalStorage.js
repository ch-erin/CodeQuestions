import { ref, watch } from "vue";

export function useLocalStorage(key, initialValue) {
  const storedValue = localStorage.getItem(key);
  const state = ref(
    storedValue !== null ? JSON.parse(storedValue) : initialValue
  );

  watch(
    state,
    (newValue) => {
      localStorage.setItem(key, JSON.stringify(newValue));
    },
    { deep: true }
  );

  return state;
}
