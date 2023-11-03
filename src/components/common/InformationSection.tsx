import {
  Fab,
  Grid,
  Grow,
  IconButton,
  Paper,
  Tooltip,
  Typography,
  makeStyles,
} from '@material-ui/core';
import { ReactNode, useState } from 'react';
import ErrorIcon from '@material-ui/icons/Error';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import { UNICEF_COLORS } from 'theme';
import usePageInfo from 'hooks/usePageInfo';
import MigrationPageInfo from 'components/views/migrationViews/MigrationPageInfo';
import CloseIcon from '@material-ui/icons/Close';
import { ROUTE_PATHS } from 'routes';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    top: theme.spacing(4),
    left: theme.spacing(4),
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },
  },
}));

export default function InformationSection() {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);
  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };
  const location = usePageInfo();
  return (
    <>
      {location && (
        <Grid container className={classes.root}>
          <InfoButtion isOpen={isOpen} handleToggle={handleToggle} />
          <InfoContent
            content={location}
            handleToggle={handleToggle}
            isOpen={isOpen}
          />
        </Grid>
      )}
    </>
  );
}

const usebuttonStyle = makeStyles((theme) => ({
  root: {
    alignSelf: 'flex-start',
    [theme.breakpoints.down('md')]: {
      display: ({ isOpen }: any) => (isOpen ? 'none' : 'block'),
    },
  },
  open: {
    color: UNICEF_COLORS[0],
  },
}));

function InfoButtion({ isOpen, handleToggle }: any) {
  const classes = usebuttonStyle({ isOpen });
  return (
    <Paper className={classes.root}>
      <Tooltip title='Contexto de página'>
        <IconButton onClick={handleToggle}>
          {isOpen ? (
            <ErrorIcon className={classes.open} />
          ) : (
            <ErrorOutlineIcon />
          )}
        </IconButton>
      </Tooltip>
    </Paper>
  );
}

const useContentStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    maxWidth: theme.breakpoints.values.sm - 200,
    padding: theme.spacing(2),
    marginLeft: theme.spacing(2),
    overflowY: 'scroll',
    maxHeight: 500,
    [theme.breakpoints.down('md')]: {
      maxWidth: '85%',
      maxHeight: 300,
      marginLeft: theme.spacing(0),
    },
  },
  closeButton: {
    display: 'none',
    [theme.breakpoints.down('md')]: {
      color: theme.palette.background.paper,
      position: 'absolute',
      top: theme.spacing(0.5),
      right: theme.spacing(0.5),
      display: 'block',
      backgroundColor: UNICEF_COLORS[5],
    },
  },
}));

const CONTENT_KEY = new Map<string, ReactNode>([
  [ROUTE_PATHS.MIGRATION_FLOW, <MigrationPageInfo />],
  [
    ROUTE_PATHS.DINÁMICA_AURORA,
    <Typography>
      Nota: Total de conexiones a Aurora en las que se puede identificar la
      ubicación, latitud y longitud
    </Typography>,
  ],
]);

function InfoContent({ content = '', isOpen, handleToggle }: any) {
  const classes = useContentStyles();
  return (
    <Grow mountOnEnter={true} unmountOnExit={true} in={isOpen}>
      <Paper className={classes.root}>
        <Fab onClick={handleToggle} className={classes.closeButton}>
          <CloseIcon />
        </Fab>
        <Grid container direction='column' item>
          {content && CONTENT_KEY.get(content)}
        </Grid>
      </Paper>
    </Grow>
  );
}
