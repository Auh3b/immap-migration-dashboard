import useDebouce from 'components/common/customWidgets/hooks/useDebouce';
import { useRef } from 'react';

export default function useCustomCompareEffect(effect, deps, depsEqual) {
  const ref = useRef();

  if (!ref.current || !depsEqual(deps, ref.current)) {
    ref.current = deps;
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useDebouce(effect, 100, ref.current);
}
