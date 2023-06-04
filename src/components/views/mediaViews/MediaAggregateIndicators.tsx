import {
  Grid,
  Paper,
  Typography,
  makeStyles,
  useTheme,
  withStyles,
} from '@material-ui/core';
import SourceIndictor from 'components/indicators/media/utils/SourceIndictor';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MouseEvent, useMemo } from 'react';
import ComponentFallback from 'components/common/ComponentFallback';
import { FA_MAP, MEDIA_SOURCES, SOURCE_COLOR } from './utils/mediaUtils';
import { METHOD_NAMES } from './utils/methodName';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import { addMediaFilter, removeMediaFilter } from 'store/mediaSlice';
import { useDispatch, useSelector } from 'react-redux';
import { _FilterTypes } from '@carto/react-core';
import useMediaData from 'components/indicators/media/hooks/useMediaData';
import TopLoading from 'components/common/TopLoading';
import getSourceFilter from 'components/indicators/media/utils/getSourceFilter';
import { UNICEF_COLORS } from 'theme';

const id = 'menciones_sociales';
const source = 'meltwater';

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
    gap: theme.spacing(0.5),
  },
  icon: {},
}));

const StyleToggleButtonGroup = withStyles((theme) => ({
  root: {},
  groupedHorizontal: {
    '&:not(:first-child)': {
      borderLeft: 'unset',
      marginLeft: 'unset',
    },
  },
}))(ToggleButtonGroup);

const StyledToggleButton = withStyles((theme) => ({
  root: {
    padding: theme.spacing(0.5),
    margin: theme.spacing(0.5),
    height: '100%',
    width: '100%',
  },
  selected: {
    backgroundColor: 'rgba(0,0,0,0)',
    border: '3px solid' + UNICEF_COLORS[0] + ' !important',
  },
}))(ToggleButton);

export default function MediaAggregateIndicators({ isLoading }: any) {
  const dispatch = useDispatch();
  const theme = useTheme();
  const classes = useStyles();

  //@ts-ignore
  const filters = useSelector((state) => state.media.filters) || {};

  const mediaSource = useMemo(
    () =>
      getSourceFilter(id, filters, source)[0] ||
      MEDIA_SOURCES.MENCIONES_TOTALES,
    [filters],
  );

  const { data, isLoading: isLoadingWidget } = useMediaData({
    id,
    methodName: METHOD_NAMES.MEDIA_AGGREGATES,
    source,
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
        {/* @ts-expect-error */}
        <StyleToggleButtonGroup
          exclusive
          onChange={handleSourceChange}
          value={mediaSource}
          className={classes.indicatorContainer}
        >
          {data.length > 0 &&
            !isLoading &&
            data.map(({ name, value }, i) => (
              //@ts-expect-error
              <StyledToggleButton key={name} value={name}>
                <SourceIndictor
                  title={name}
                  icon={
                    //@ts-ignore
                    <FontAwesomeIcon
                      className={classes.icon}
                      icon={FA_MAP.get(name)}
                      style={{
                        color:
                          mediaSource === name
                            ? SOURCE_COLOR[name]
                            : theme.palette.grey[100],
                      }}
                    />
                  }
                  data={value}
                />
              </StyledToggleButton>
            ))}
          {isLoading && <ComponentFallback />}
        </StyleToggleButtonGroup>
      </Paper>
    </Grid>
  );
}
