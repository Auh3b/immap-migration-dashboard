import { IconButton, Paper, makeStyles } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { useDispatch, useSelector } from 'react-redux';
import { setChartModule } from 'store/appSlice';

const useStyles = makeStyles((theme) => ({
  root: {
    display: ({ show }: any) => (show ? 'flex' : 'none'),
    justifyContent: 'center',
    alignItems: 'center',
    position: 'fixed',
    backgroundColor: 'rgba(0,0,0, 0.5)',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: theme.zIndex.modal + 100,
  },
  paper: {
    display: 'flex',
    position: 'relative',
    minWidth: '600px',
    minHeight: '480px',
  },
  close: {
    borderRadius: '100%',
    border: '1px solid ' + theme.palette.grey[100],
    position: 'absolute',
    top: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

export default function ChartModule() {
  const dispatch = useDispatch();
  //@ts-ignore
  const showChartModule = useSelector((state) => state.app.showChartModule);
  const classes = useStyles({ show: showChartModule });
  const handleModuleClose = () => {
    dispatch(setChartModule(false));
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <IconButton className={classes.close} onClick={handleModuleClose}>
          <CloseIcon />
        </IconButton>
      </Paper>
    </div>
  );
}
