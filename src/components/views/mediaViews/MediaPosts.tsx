import { Button, Fade, Grid, IconButton, Paper, Popper, Typography, makeStyles } from '@material-ui/core';
import useMediaData from 'components/indicators/media/hooks/useMediaData';
import { METHOD_NAMES } from './utils/methodName';
import TopLoading from 'components/common/TopLoading';
import ComponentFallback from 'components/common/ComponentFallback';
import SocialPost from 'components/common/media/SocialPost';
import { MouseEvent, useMemo, useState } from 'react';
import MediaTable from 'components/common/media/MediaTable';
import { numberFormatter } from 'utils/formatter';
import NoWidgetData from 'components/common/customWidgets/NoWidgetData';
import LinkIcon from '@material-ui/icons/Link';
import VisibilityIcon from '@material-ui/icons/Visibility';

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
      headerName: 'URL/ID',
      sort: true,
      width: 120,
      renderCell: (params:any) =>(
          <ViewActionButtons params={params}/>
        )
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
          {(!_data.length && !isLoading) && <NoWidgetData />}
        </Grid>
      </Paper>
    </Grid>
  );
}

const useLinkStyles = makeStyles((theme)=>({
  root:{
    gap: theme.spacing(1),
  },
  button: {
    // borderRadius: '100%',
  },
  popper:{
    zIndex: theme.zIndex.appBar
  },
  paper:{
    padding: theme.spacing(2)
  }
}))

function ViewActionButtons({params}:any){
  const { value: url, row: {source} } = params
  const classes = useLinkStyles()
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const open = Boolean(anchorEl)

  const handleToggle = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  console.log(url, anchorEl, open)
  return (
    <Grid container alignItems='center' className={classes.root}>
      {/* <IconButton color='primary' onClick={handleToggle} className={classes.button}>
        <VisibilityIcon />
      </IconButton> */}
      <Button startIcon={<LinkIcon />} component={'a'} onClick={handleToggle} href={url} target='blank' className={classes.button}>
        <Typography noWrap>
          {url}
        </Typography>
      </Button>
      {/* <Popper anchorEl={anchorEl} placement='top-end' open={open} className={classes.popper}>
        {({TransitionProps})=>(
          <Fade {...TransitionProps}>
            <Paper elevation={0} className={classes.paper}>
              Content
              <SocialPost source={source} url={url} />
            </Paper>
          </Fade>
        )}
      </Popper> */}
    </Grid>
  )
}
