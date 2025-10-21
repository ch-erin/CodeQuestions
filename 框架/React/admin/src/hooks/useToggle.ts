import { useState, useCallback } from 'react';

function useToggle(initialValue = false) {
    const [state, setState] = useState(initialValue);

    // 切换状态
    const toggle = useCallback(() => {
        setState(prev => !prev);
    }, []);

    const setTrue = useCallback(() => setState(true), []);
    const setFalse = useCallback(() => setState(false), []);

    return [state, toggle, setTrue, setFalse]
}