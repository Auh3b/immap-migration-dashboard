import {
  Grid,
  Paper,
  Typography,
  makeStyles,
  useTheme,
} from '@material-ui/core';
import SourceIndictor from 'components/indicators/media/utils/SourceIndictor';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MouseEvent, useMemo } from 'react';
import ComponentFallback from 'components/common/ComponentFallback';
import { FA_MAP, MEDIA_SOURCES } from './utils/mediaUtils';
import { METHOD_NAMES } from './utils/methodName';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import { addMediaFilter, removeMediaFilter } from 'store/mediaSlice';
import { useDispatch, useSelector } from 'react-redux';
import { _FilterTypes } from '@carto/react-core';
import useMediaData from 'components/indicators/media/hooks/useMediaData';
import TopLoading from 'components/common/TopLoading';
import getSourceFilter from 'components/indicators/media/utils/getSourceFilter';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    position: 'relative',
  },
  paper: {},
  title: {
    ...theme.typography.subtitle1,
    textTransform: 'uppercase',
    fontSize: theme.spacing(2),
    padding: theme.spacing(2),
  },
  indicatorContainer: {
    height: '100%',
    padding: theme.spacing(2),
  },
  indicatorButton: {
    height: '100%',
    width: '100%',
  },
  icon: {},
}));

const id = 'menciones_sociales';

export default function MediaAggregateIndicators({ isLoading }: any) {
  const dispatch = useDispatch();
  const theme = useTheme();
  const classes = useStyles();

  const { meltwater: filters = {} } = useSelector(
    //@ts-ignore
    (state) => state.media.filters,
  );

  const source = useMemo(
    () => getSourceFilter(id, filters) ?? MEDIA_SOURCES.MENCIONES_TOTALES,
    [filters],
  );

  const { data, isLoading: isLoadingWidget } = useMediaData({
    id,
    methodName: METHOD_NAMES.MEDIA_AGGREGATES,
  });

  const handleSourceChange = (
    event: MouseEvent<HTMLElement>,
    newSource: string,
  ) => {
    if (!newSource) {
      dispatch(
        removeMediaFilter({
          source: 'meltwater',
          column: 'source',
          owner: id,
        }),
      );
      return;
    }

    if (newSource === MEDIA_SOURCES.MENCIONES_TOTALES) {
      dispatch(
        removeMediaFilter({
          source: 'meltwater',
          column: 'source',
          owner: id,
        }),
      );
      return;
    }

    dispatch(
      addMediaFilter({
        source: 'meltwater',
        column: 'source',
        values: [newSource],
        owner: id,
        type: _FilterTypes.IN,
      }),
    );
  };

  return (
    <Grid item className={classes.root}>
      {isLoadingWidget && <TopLoading />}
      <Paper className={classes.paper}>
        <Typography className={classes.title}>
          Número de menciones por red social relacionadas con migración en la
          región
        </Typography>
        <ToggleButtonGroup
          exclusive
          onChange={handleSourceChange}
          value={source}
          className={classes.indicatorContainer}
        >
          {data.length > 0 &&
            !isLoading &&
            data.map(({ name, value }, i) => (
              <ToggleButton
                key={name}
                value={name}
                className={classes.indicatorButton}
              >
                <SourceIndictor
                  title={name}
                  icon={
                    //@ts-ignore
                    <FontAwesomeIcon
                      className={classes.icon}
                      icon={FA_MAP.get(name)}
                      style={{ color: theme.palette.grey[100] }}
                    />
                  }
                  data={value}
                />
              </ToggleButton>
            ))}
          {isLoading && <ComponentFallback />}
        </ToggleButtonGroup>
      </Paper>
    </Grid>
  );
}
