import {
  Grid,
  Paper,
  Typography,
  makeStyles,
  useTheme,
} from '@material-ui/core';
import SourceIndictor from 'components/indicators/media/utils/SourceIndictor';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MouseEvent, useEffect, useMemo, useState } from 'react';
import ComponentFallback from 'components/common/ComponentFallback';
import { FA_MAP, MEDIA_SOURCES } from './utils/mediaUtils';
import { METHOD_NAMES } from './utils/methodName';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import { addMediaFilter, removeMediaFilter } from 'store/mediaSlice';
import { useDispatch } from 'react-redux';
import { _FilterTypes } from '@carto/react-core';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
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

const id = 'sourceAggregrate';

export default function MediaAggregateIndicators({
  deps,
  isLoading,
  transform,
}: any) {
  const dispatch = useDispatch();
  const theme = useTheme();
  const classes = useStyles();
  const [source, setSource] = useState(MEDIA_SOURCES.MENCIONES_TOTALES);
  const [data, setData] = useState([]);

  const filters = useMemo(() => {
    const currentFilters = { ...deps[1].meltwater };
    if (!currentFilters) {
      return {};
    }

    if (!currentFilters[id]) {
      return currentFilters;
    }
    delete currentFilters[id];
    return currentFilters;
  }, [deps]);

  useEffect(() => {
    (async function () {
      setData(
        await transform(METHOD_NAMES.MEDIA_AGGREGATES, {
          filters: filters ?? {},
        }),
      );
    })();
    return () => {
      setData([]);
    };
  }, [...deps, dispatch]);

  const handleSourceChange = (
    event: MouseEvent<HTMLElement>,
    newSource: string,
  ) => {
    if (!newSource) {
      setSource(MEDIA_SOURCES.MENCIONES_TOTALES);
      dispatch(
        removeMediaFilter({
          source: 'meltwater',
          column: 'source',
          owner: id,
        }),
      );
    } else if (newSource === source) {
      dispatch(
        removeMediaFilter({
          source: 'meltwater',
          column: 'source',
          owner: id,
        }),
      );
      setSource(MEDIA_SOURCES.MENCIONES_TOTALES);
    } else if (newSource === MEDIA_SOURCES.MENCIONES_TOTALES) {
      dispatch(
        removeMediaFilter({
          source: 'meltwater',
          column: 'source',
          owner: id,
        }),
      );
      setSource(MEDIA_SOURCES.MENCIONES_TOTALES);
    } else {
      dispatch(
        addMediaFilter({
          source: 'meltwater',
          column: 'source',
          values: [newSource],
          owner: id,
          type: _FilterTypes.IN,
        }),
      );
      setSource(newSource);
    }
    console.log(newSource);
  };

  return (
    <Grid item className={classes.root}>
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
