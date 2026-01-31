import { useEffect, useState } from "react";

type DebounceProps = {
  value: string;
  delay: number;
};

export const useDebounce = ({ value, delay }: DebounceProps) => {
  const [inputValue, setInputValue] = useState(value);
  useEffect(() => {
    const debounceHandler = setTimeout(() => {
      setInputValue(value);
    }, delay);

    return () => clearTimeout(debounceHandler);
  }, [value, delay]);

  return inputValue;
};
