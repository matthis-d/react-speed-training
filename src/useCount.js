import { useState } from "react";

export function useCount() {
  const [count, setCount] = useState(0);

  function increment() {
    setCount(prevCount => prevCount + 1);
  }

  function decrement() {
    setCount(prevCount => prevCount - 1);
  }

  return {
    count,
    increment,
    decrement
  };
}
