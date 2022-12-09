import { useEffect, useRef } from 'react';

function usePrevious<T>(value: T | undefined): T | undefined {
  const ref = useRef<T | undefined>();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

export default usePrevious;
