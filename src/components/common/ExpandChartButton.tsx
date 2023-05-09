import { IconButton } from '@material-ui/core';
import ZoomOutMapIcon from '@material-ui/icons/ZoomOutMap';
import { useDispatch } from 'react-redux';
import { setChartModule } from 'store/appSlice';
export default function ExpandChartButton() {
  const dispatch = useDispatch();
  const handleExpandChart = () => {
    dispatch(setChartModule(true));
  };
  return (
    <IconButton onClick={handleExpandChart}>
      <ZoomOutMapIcon />
    </IconButton>
  );
}
