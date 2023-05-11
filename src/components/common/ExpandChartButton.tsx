import { IconButton } from '@material-ui/core';
import ZoomOutMapIcon from '@material-ui/icons/ZoomOutMap';
import { useDispatch, useSelector } from 'react-redux';
import { setChartModal, setModalUrl } from 'store/appSlice';
export default function ExpandChartButton({ chartUrl }: { chartUrl: string }) {
  const dispatch = useDispatch();
  const handleExpandChart = () => {
    dispatch(setChartModal(true));
    dispatch(setModalUrl(chartUrl));
  };
  //@ts-ignore
  const showChartModal = useSelector(state => state.app.showChartModal) ?? false
  return (
    <IconButton disabled={showChartModal} onClick={handleExpandChart}>
      <ZoomOutMapIcon />
    </IconButton>
  );
}
