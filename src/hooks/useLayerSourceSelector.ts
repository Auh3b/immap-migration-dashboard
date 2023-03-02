import { selectSourceById } from '@carto/react-redux';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';

export default function useLayerSourceSelector(layer: any) {
  const source = useSelector((state: RootState) =>
    selectSourceById(state, layer?.source),
  );
  return source;
}
