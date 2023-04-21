import {
  Grid,
  Grow,
  IconButton,
  Paper,
  Typography,
  makeStyles,
} from '@material-ui/core';
import { useState } from 'react';
import ErrorIcon from '@material-ui/icons/Error';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import { UNICEF_COLORS } from 'theme';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    top: theme.spacing(4),
    left: theme.spacing(4),
  },
}));

export default function InformationSection() {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);
  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <Grid container className={classes.root}>
      <InfoButtion isOpen={isOpen} handleToggle={handleToggle} />
      <InfoContent isOpen={isOpen} />
    </Grid>
  );
}

const usebuttonStyle = makeStyles((theme) => ({
  root: {
    alignSelf: 'flex-start',
  },
  open: {
    color: UNICEF_COLORS[0],
  },
}));

function InfoButtion({ isOpen, handleToggle }: any) {
  const classes = usebuttonStyle();
  return (
    <Paper className={classes.root}>
      <IconButton onClick={handleToggle}>
        {isOpen ? <ErrorIcon className={classes.open} /> : <ErrorOutlineIcon />}
      </IconButton>
    </Paper>
  );
}

const useContentStyles = makeStyles((theme) => ({
  root: {
    maxWidth: theme.breakpoints.values.sm,
    padding: theme.spacing(2),
    marginLeft: theme.spacing(2),
  },
}));

function InfoContent({ content = '', isOpen }: any) {
  const classes = useContentStyles();
  return (
    <Grow mountOnEnter={true} unmountOnExit={true} in={isOpen}>
      <Paper className={classes.root}>
        <Grid container direction='column' item>
          <Typography variant='overline'>
            Este espacio está reservado para información perteneciente a la
            sección que está viendo actualmente.
          </Typography>
        </Grid>
      </Paper>
    </Grow>
  );
}
