import { useEffect, useState } from "react";

const useDebounce = (value, setWaiting, limit = 500) => {
  const [debounceValue, setDebounceValue] = useState("");

  useEffect(() => {
    setWaiting(true);

    const timer = setTimeout(() => {
      setDebounceValue(value);
      setWaiting(false);
    }, limit);

    return () => {
      clearTimeout(timer);
    };
  }, [value, limit, setWaiting]);

  return debounceValue;
};

export default useDebounce;
