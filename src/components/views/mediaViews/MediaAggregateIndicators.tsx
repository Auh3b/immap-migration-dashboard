import {
  Grid,
  Paper,
  Typography,
  makeStyles,
  useTheme,
  withStyles,
} from '@material-ui/core';
import {
  faHashtag,
  faNewspaper,
  faSquareRss,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import {
  faFacebook,
  faReddit,
  faTiktok,
  faTwitter,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';
import SourceIndictor from 'components/indicators/media/utils/SourceIndictor';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MouseEvent, useContext, useMemo } from 'react';
import ComponentFallback from 'components/common/ComponentFallback';
import { MEDIA_SOURCES, SOURCE_COLOR } from './utils/mediaUtils';
import { METHOD_NAMES } from './utils/methodName';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import { addMediaFilter, removeMediaFilter } from 'store/mediaSlice';
import { useDispatch, useSelector } from 'react-redux';
import { _FilterTypes } from '@carto/react-core';
import useMediaData from 'components/indicators/media/hooks/useMediaData';
import TopLoading from 'components/common/TopLoading';
import getSourceFilter from 'components/indicators/media/utils/getSourceFilter';
import { UNICEF_COLORS } from 'theme';
import { MEDIA_SOURCES_NAMES } from './utils/mediaUtils';
import { MediaCountryContext } from './utils';

const source = 'meltwater';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginBottom: theme.spacing(2),
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
  root: {
    flexWrap: 'wrap',
  },
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
    width: 'auto',
    height: '100%',
  },
  selected: {
    backgroundColor: 'rgba(0,0,0,0)',
    border: '3px solid' + UNICEF_COLORS[0] + ' !important',
  },
}))(ToggleButton);

const valueFormatter = Object.fromEntries(MEDIA_SOURCES_NAMES);

export default function MediaAggregateIndicators({ isLoading }: any) {
  const dispatch = useDispatch();
  const theme = useTheme();
  const classes = useStyles();
  const viewFilter = useContext(MediaCountryContext) || '';
  const id = 'menciones_sociales' + (viewFilter ? `_${viewFilter}` : '');
  //@ts-ignore
  const filters = useSelector((state) => state.media.filters);
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
    viewFilter,
  });

  const handleSourceChange = (
    _event: MouseEvent<HTMLElement>,
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
        valueFormatter,
      }),
    );
  };

  return (
    <Grid item className={classes.root}>
      {isLoadingWidget && <TopLoading />}
      <Paper variant={'outlined'} className={classes.paper}>
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
              // @ts-expect-error
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

export const FA_MAP = new Map([
  [MEDIA_SOURCES.NEWS, faNewspaper],
  [MEDIA_SOURCES.FACEBOOK, faFacebook],
  [MEDIA_SOURCES.TWITTER, faTwitter],
  [MEDIA_SOURCES.TIKTOK, faTiktok],
  [MEDIA_SOURCES.REDDIT, faReddit],
  [MEDIA_SOURCES.YOUTUBE, faYoutube],
  [MEDIA_SOURCES.FORUMS, faUser],
  [MEDIA_SOURCES.MENCIONES_TOTALES, faHashtag],
  [MEDIA_SOURCES.SOCIAL_BLOGS, faSquareRss],
]);
