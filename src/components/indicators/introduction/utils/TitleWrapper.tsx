import { Grid, Typography, makeStyles } from '@material-ui/core';
import { PropsWithChildren } from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  titleHead: {
    marginBottom: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  title: {
    color: 'inherit',
    height: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      ...theme.typography.overline,
    },
    [theme.breakpoints.down('md')]: {
      ...theme.typography.overline,
    },
  },
  subtitle: {
    color: 'inherit',
    [theme.breakpoints.up('md')]: {
      ...theme.typography.caption,
    },
    [theme.breakpoints.down('md')]: {
      ...theme.typography.caption,
      fontSize: '0.5rem',
    },
  },
}));

export interface TitleWrapperProps extends PropsWithChildren<any> {
  title: string;
  subtitle?: string;
}

export default function TitleWrapper(props: TitleWrapperProps) {
  const classes = useStyles();
  const { title, subtitle, children } = props;
  return (
    <Grid item container direction='column' className={classes.root}>
      <Grid item className={classes.titleHead}>
        <Typography className={classes.title}>{title}</Typography>
        {subtitle && (
          <Typography className={classes.subtitle}>{subtitle}</Typography>
        )}
      </Grid>
      <Grid item>{children}</Grid>
    </Grid>
  );
}
