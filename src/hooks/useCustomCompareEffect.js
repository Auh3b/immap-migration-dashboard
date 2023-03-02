import { debounce } from '@carto/react-core';
import { useEffect, useRef } from 'react';

export default function useCustomCompareEffect(effect, deps, depsEqual) {
  const ref = useRef();

  if (!ref.current || !depsEqual(deps, ref.current)) {
    ref.current = deps;
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  debounce(useEffect(effect, ref.current), 500);
}
