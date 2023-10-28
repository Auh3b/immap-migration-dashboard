import PhaseContent from './phaseSelectView/PhaseContent';
import PhaseDeckMap from './phaseSelectView/PhaseDeckMap';
import { Grid } from '@material-ui/core';
import { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { setPhase } from 'store/appSlice';
import { useDispatch, useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  projectPhaseSelect: {
    width: '100%',
    flexGrow: 1,
    backgroundColor: theme.palette.common.white,
    padding: theme.spacing(4),
  },
}));

export default function ProjectPhaseSelect() {
  const dispatch = useDispatch();
  const classes = useStyles();
  // @ts-ignore
  const phase = useSelector((state) => state.app.phase);
  useEffect(() => {
    dispatch(setPhase(null));
  }, []);
  // [hygen] Add useEffect

  return (
    <Grid
      container
      justifyContent={'space-between'}
      className={classes.projectPhaseSelect}
    >
      <Grid item md={6} container direction='column'>
        <PhaseContent phase={phase} />
      </Grid>
      <Grid item md={5}>
        <PhaseDeckMap />
      </Grid>
    </Grid>
  );
}
