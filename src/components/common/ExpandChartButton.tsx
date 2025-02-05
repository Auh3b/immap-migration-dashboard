import { IconButton, makeStyles } from '@material-ui/core';
import ZoomOutMapIcon from '@material-ui/icons/ZoomOutMap';
import { useDispatch, useSelector } from 'react-redux';
import { setChartModal, setModalDataSource, setModalUrl } from 'store/appSlice';

const useStyles = makeStyles((theme) => ({
  root: {
    display: ({ show }: any) => (show ? 'none' : 'block'),
  },
}));

export default function ExpandChartButton({
  chartUrl,
  dataSource,
}: {
  chartUrl: string;
  dataSource: string;
}) {
  const dispatch = useDispatch();
  const handleExpandChart = () => {
    dispatch(setChartModal(true));
    dispatch(setModalUrl(chartUrl));
    dispatch(setModalDataSource(dataSource));
  };
  const showChartModal =
    //@ts-ignore
    useSelector((state) => state.app.showChartModal) ?? false;
  const classes = useStyles({ show: showChartModal });
  return (
    <IconButton
      className={classes.root}
      disabled={showChartModal}
      onClick={handleExpandChart}
    >
      <ZoomOutMapIcon />
    </IconButton>
  );
}
