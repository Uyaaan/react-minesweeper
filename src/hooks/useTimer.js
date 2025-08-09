import { useEffect, useState } from "react";

export default function useTimer(running) {
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [running]);
  const reset = () => setSeconds(0);
  return { seconds, reset };
}
