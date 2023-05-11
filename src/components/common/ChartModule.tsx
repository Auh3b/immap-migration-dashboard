import { IconButton, Paper, makeStyles } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { ReactNode, Suspense, lazy, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeModalUrl, setChartModal } from 'store/appSlice';
import ComponentFallback from './ComponentFallback';
import mainSource from 'data/sources/mainSource'
import ChartLoadFail from './ChartLoadFail';
//@ts-ignore
import loadable from '@loadable/component';
import { RootState } from 'store/store';
import { setFeaturesReady, setViewState } from '@carto/react-redux';
import randBtwn from 'utils/randBtwn';

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
    padding: theme.spacing(2),
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
    zIndex: theme.zIndex.modal + 500
  },
}));

//@ts-ignore
const importChart = (url: string) => lazy(()=> import(`components/${url}`).catch(()=><ChartLoadFail />))

export default function ChartModal() {
  const [chart, setChart] = useState<ReactNode>(null)
  const dispatch = useDispatch();
  //@ts-ignore
  const showChartModal = useSelector((state) => state.app.showChartModal);
  //@ts-ignore
  const modalUrl = useSelector((state)=> state.app.modalUrl)
  const classes = useStyles({ show: showChartModal });
  const zoomLevel = useSelector((state: RootState)=> state.carto.viewState.zoom)
  const handleModalClose = () => {
    dispatch(setChartModal(false));
    dispatch(removeModalUrl())
  };

  const loadChart = async () => {
    if(modalUrl){
      const Chart = await importChart(modalUrl)
      setChart(<Chart dataSource={mainSource.id}/>) 
      dispatch(setViewState({zoom: zoomLevel*randBtwn(0.99, 1.01)}))
    }
  }  

  useEffect(()=>{
    loadChart()
    return ()=>{
      setChart(null)
    }
  }, [modalUrl])

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <IconButton className={classes.close} onClick={handleModalClose}>
          <CloseIcon />
        </IconButton>
        <Suspense fallback={<ComponentFallback/>}>
          {chart}
        </Suspense>
      </Paper>
    </div>
  );
}
