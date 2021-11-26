import { useEffect, useRef, useState } from "react";

const usePersistenceState = (key, initValue) => {
  const firstRender = useRef(false);
  const [value, setValue] = useState(localStorage.getItem(key) || initValue);

  useEffect(() => {
    if (!firstRender.current) {
      firstRender.current = true;
      return;
    } else {
      localStorage.setItem(key, value);
    }
  }, [key, value]);

  return [value, setValue];
};

export default usePersistenceState;
