import { useMemo } from 'react';
import Source, { SOURCE_MAP_TYPES, SourceProps } from '../Source';

type MapSource = SourceProps;

interface UseDynamicSourceProps {
  source: MapSource;
  type: SOURCE_MAP_TYPES;
  columns?: string[];
  phase?: number;
}

export default function useDynamicSource(props: UseDynamicSourceProps) {
  const source = new Source({
    ...props.source,
  });

  return useMemo(
    () =>
      source.setPhase(props.phase).getSourceQuery(props.type, props.columns),
    [props.columns, props.type, props.phase],
  );
}
