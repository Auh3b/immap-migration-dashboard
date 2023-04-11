import { Grid, IconButton, Paper, makeStyles } from '@material-ui/core';
import { useState } from 'react';
import BarChartIcon from '@material-ui/icons/BarChart';
import AssessmentIcon from '@material-ui/icons/Assessment';
import MigrantStats from './MigrantStats';

const useStyles = makeStyles((theme) => ({
  container: {
    position: 'absolute',
    top: theme.spacing(4),
    right: theme.spacing(4),
  },
  collapse: {
    '& .MuiCollapse-hidden': {
      width: 0,
      transition: 'width 500ms ease-in-out',
    },
  },
}));

export default function QuickStats() {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <Paper className={classes.container}>
      <Grid container item className={classes.collapse}>
        <MigrantStats isOpen={isOpen} />
        <Grid xs item>
          <IconButton
            onClick={handleToggle}
            style={{ color: isOpen ? '#1CABE2' : '#333333' }}
          >
            {isOpen ? <AssessmentIcon /> : <BarChartIcon />}
          </IconButton>
        </Grid>
      </Grid>
    </Paper>
  );
}
