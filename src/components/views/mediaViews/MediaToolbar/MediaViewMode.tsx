import { Grid, makeStyles } from '@material-ui/core';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import { MouseEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getViewMode, setViewMode } from 'store/mediaSlice';

const buttonStyles = makeStyles((theme) => ({
  button: {
    padding: theme.spacing(1),
    marginLeft: theme.spacing(2),
  },
}));

export default function MediaViewMode() {
  const classes = { ...buttonStyles() };
  const dispatch = useDispatch();
  // @ts-ignore
  const mode = useSelector((state) => getViewMode(state.media));

  const handleModeChange = (_e: MouseEvent<HTMLElement>, newMode: number) => {
    dispatch(setViewMode(newMode));
  };
  return (
    <Grid item>
      <ToggleButtonGroup value={mode} exclusive onChange={handleModeChange}>
        <ToggleButton className={classes.button} value={0}>
          Single
        </ToggleButton>
        <ToggleButton className={classes.button} value={1}>
          Duel
        </ToggleButton>
      </ToggleButtonGroup>
    </Grid>
  );
}
