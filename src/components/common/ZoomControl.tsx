import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Divider,
  Grid,
  IconButton,
  makeStyles,
  Typography,
} from '@material-ui/core';
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import RemoveOutlinedIcon from '@material-ui/icons/RemoveOutlined';
import { setViewState } from '@carto/react-redux';
import { RootState } from 'store/store';

const useStyles = makeStyles((theme) => ({
  zoomControl: {
    backgroundColor: theme.palette.background.paper,
    width: 'auto',
    boxShadow: theme.shadows[1],
    borderRadius: theme.shape.borderRadius,
  },
  zoomLevel: {
    ...theme.typography.overline,
    display: 'block',
    fontSize: theme.typography.pxToRem(theme.spacing(1.85)),
    color: theme.palette.grey[600],
    textAlign: 'center',
    fontWeight: 500,
  },
}));

const MINIMUN_ZOOM_LEVEL = 0;
const MAXIMUM_ZOOM_LEVEL = 13;

export default function ZoomControl({
  className,
  showCurrentZoom,
}: {
  className?: string;
  showCurrentZoom?: boolean;
}) {
  const dispatch = useDispatch();
  const zoomLevel = useSelector((state: RootState) =>
    Math.floor(state.carto.viewState.zoom),
  );
  const classes = useStyles();

  const increaseZoom = useCallback(() => {
    const nextZoom = zoomLevel + 1;
    if (nextZoom <= MAXIMUM_ZOOM_LEVEL) {
      dispatch(setViewState({ zoom: nextZoom }));
    }
  }, [dispatch, zoomLevel]);

  const decreaseZoom = useCallback(() => {
    const nextZoom = zoomLevel - 1;
    if (nextZoom >= MINIMUN_ZOOM_LEVEL) {
      dispatch(setViewState({ zoom: nextZoom }));
    }
  }, [dispatch, zoomLevel]);

  return (
    <Grid
      container
      direction='row'
      alignItems='center'
      className={`${className} ${classes.zoomControl}`}
    >
      <IconButton onClick={decreaseZoom} aria-label='Decrease zoom'>
        <RemoveOutlinedIcon />
      </IconButton>
      <Divider orientation='vertical' flexItem />
      {showCurrentZoom && (
        // @ts-ignore
        <Box px={1} minWidth={36}>
          <Typography className={classes.zoomLevel}>{zoomLevel}</Typography>
        </Box>
      )}
      <Divider orientation='vertical' flexItem />
      <IconButton onClick={increaseZoom} aria-label='Increase zoom'>
        <AddOutlinedIcon />
      </IconButton>
    </Grid>
  );
}
