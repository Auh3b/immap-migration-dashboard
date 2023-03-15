import { useCallback, useEffect, useRef } from 'react';

export default function useDebouce(
  callback: Function,
  delay: number,
  deps: any[],
) {
  const { reset, clear } = useTimeout(callback, delay);
  useEffect(reset, [...deps, reset]);
  useEffect(clear, []);
}

function useTimeout(callback: Function, delay: number) {
  const callbackRef = useRef(callback);
  const timeoutRef = useRef();

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const set = useCallback(() => {
    //@ts-ignore
    timeoutRef.current = setTimeout(() => callbackRef.current(), delay);
  }, [delay]);

  const clear = useCallback(() => {
    timeoutRef.current && clearTimeout(timeoutRef.current);
  }, []);

  useEffect(() => {
    set();
    return clear;
  }, [delay, set, clear]);

  const reset = useCallback(() => {
    clear();
    set();
  }, [clear, set]);

  return { reset, clear };
}
