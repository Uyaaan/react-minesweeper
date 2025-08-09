import { useCallback, useRef } from "react";

export default function useLongPress(onLongPress, onClick, { delay = 400 } = {}) {
  const timerRef = useRef(null);
  const start = useCallback((e) => {
    e.preventDefault();
    timerRef.current = setTimeout(() => onLongPress(e), delay);
  }, [onLongPress, delay]);
  const clear = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = null;
  }, []);
  const click = useCallback((e) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
      onClick(e);
    }
  }, [onClick]);
  return { onMouseDown: start, onMouseUp: clear, onMouseLeave: clear, onTouchStart: start, onTouchEnd: click };
}
