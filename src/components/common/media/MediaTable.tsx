import { MouseEvent, useMemo, useState } from 'react';
import TitleWrapper from '../TitleWrapper';
import {
  ClickAwayListener,
  Fade,
  Grid,
  IconButton,
  Paper,
  Popper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  makeStyles,
} from '@material-ui/core';
import LinkIcon from '@material-ui/icons/Link';
import VisibilityIcon from '@material-ui/icons/Visibility';
import SocialPost from './SocialPost';
import { format } from 'd3';
import { formatDate } from 'utils/dateHelpers';

const useStyles = makeStyles((theme) => ({
  root: {},
  paper: {},
  tableContainer: {
    height: '300px',
  },
  tableBody: {},
  tableCell: {
    maxWidth: 150,
  },
  tableFooter: {
    height: 20,
  },
}));

export default function MediaTable({
  data = [],
  columnConfig,
  source,
  viewFilter,
}: {
  data: any[];
  source: string;
  columnConfig: any[];
  sortBy?: string;
  sortDirection?: 'asc' | 'des';
  viewFilter?: string;
}) {
  const classes = useStyles();
  const rows = useMemo(() => {
    if (data.length) {
      return data.filter(({ source: parentSource }) => parentSource === source);
    }
    return [];
  }, [data]);

  return (
    <Grid item xs={12} lg={viewFilter ? 12 : 4} className={classes.root}>
      <TitleWrapper title={`Top ${source} Posts`}>
        <Paper variant='outlined' className={classes.paper}>
          <TableContainer className={classes.tableContainer}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  {columnConfig
                    .filter(({ hide }) => !hide)
                    .map(({ headerName }) => (
                      <TableCell key={headerName}>{headerName}</TableCell>
                    ))}
                </TableRow>
              </TableHead>
              <TableBody className={classes.tableBody}>
                {rows.map(({ id, date, source, value, url }) => (
                  <TableRow key={id}>
                    <TableCell className={classes.tableCell}>
                      <Typography noWrap>{formatDate(+date)}</Typography>
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      <Typography noWrap>{source}</Typography>
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      <Typography noWrap>{format('.2s')(value)}</Typography>
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      <ViewActionButtons url={url} source={source} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <div id='table-footer' className={classes.tableFooter} />
        </Paper>
      </TitleWrapper>
    </Grid>
  );
}

const useLinkStyles = makeStyles((theme) => ({
  root: {
    gap: theme.spacing(1),
  },
  button: {
    borderRadius: '100%',
  },
  popper: {
    zIndex: theme.zIndex.modal,
  },
  paper: {
    opacity: ({ open }: any) => (open ? 1 : 0),
    visibility: ({ open }: any) => (open ? 'visible' : 'hidden'),
    padding: theme.spacing(2),
  },
}));

function ViewActionButtons({ url, source }: any) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);
  const classes = useLinkStyles({ open });

  const handleToggle = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleClickAway = () => {
    setAnchorEl(null);
  };

  return (
    <Grid container alignItems='center' className={classes.root}>
      <ClickAwayListener onClickAway={handleClickAway}>
        <IconButton
          color='primary'
          onClick={handleToggle}
          className={classes.button}
        >
          <VisibilityIcon />
        </IconButton>
      </ClickAwayListener>
      <IconButton
        component={'a'}
        onClick={handleToggle}
        href={url}
        target='blank'
        className={classes.button}
      >
        <LinkIcon />
      </IconButton>
      <Popper
        anchorEl={anchorEl}
        placement='left-start'
        open={open}
        className={classes.popper}
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps}>
            <SocialPost source={source} url={url} />
          </Fade>
        )}
      </Popper>
    </Grid>
  );
}
