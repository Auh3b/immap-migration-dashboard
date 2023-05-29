import { Grid, Paper, makeStyles } from '@material-ui/core';
import useMediaData from 'components/indicators/media/hooks/useMediaData';
import { METHOD_NAMES } from './utils/methodName';
import TopLoading from 'components/common/TopLoading';
import ComponentFallback from 'components/common/ComponentFallback';
import { useMemo } from 'react';
import MediaTable from 'components/common/media/MediaTable';
import { numberFormatter } from 'utils/formatter';
import NoWidgetData from 'components/common/customWidgets/NoWidgetData';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
  },
  paper: {},
  content: {
    paddingLeft: theme.spacing(6),
    paddingRight: theme.spacing(6),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
}));

const id = 'media_posts';

export default function MediaPosts({ isLoading }: { isLoading: Boolean }) {
  const classes = useStyles();
  const { data: _data, isLoading: isDataLoading } = useMediaData({
    id,
    methodName: METHOD_NAMES.MEDIA_TOP_POSTS,
  });
  const columnConfig = [
    {
      field: 'id',
      hide: true,
    },
    {
      field: 'date',
      headerName: 'Date',
      type: 'date',
      sort: true,
      width: 120,
    },
    {
      field: 'source',
      headerName: 'Source',
      sort: true,
      width: 120,
    },
    {
      field: 'value',
      headerName: 'Views',
      type: 'number',
      valueFormatter: (params: any) => numberFormatter(params.value),
      sort: true,
      width: 120,
    },
    {
      field: 'url',
      headerName: 'Preview/Link',
      sort: true,
      width: 120,
    },
    {
      field: 'name',
      hide: true,
    },
  ];
  const sources = useMemo(() => {
    if (_data.length) {
      const _sources = Array.from(
        new Set(_data.map(({ source }: any) => source)),
      );
      return [..._sources];
    }
    return [];
  }, [_data]);

  return (
    <Grid item className={classes.root}>
      <Paper className={classes.paper}>
        {isDataLoading && <TopLoading />}
        <Grid
          container
          justifyContent='space-between'
          className={classes.content}
          alignItems='flex-start'
        >
          {isLoading && <ComponentFallback />}
          {sources.length &&
            sources.map((source) => (
              <MediaTable
                key={source}
                data={_data}
                source={source}
                columnConfig={columnConfig}
              />
            ))}
          {!_data.length && !isLoading && <NoWidgetData />}
        </Grid>
      </Paper>
    </Grid>
  );
}
