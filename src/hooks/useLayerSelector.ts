import { useSelector } from 'react-redux';
import { RootState } from 'store/store';

export default function useLayerSelector() {
  const layers = useSelector((state: RootState) => state.carto.layers);
  return layers;
}
