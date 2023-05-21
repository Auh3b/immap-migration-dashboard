import { Grid, Typography, makeStyles } from '@material-ui/core';
import FilterableIcon from 'components/common/customIcons/FilterableIcon';
import { PropsWithChildren } from 'react';
import TopLoading from './TopLoading';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    padding: theme.spacing(2),
    gap: theme.spacing(1),
    [theme.breakpoints.down('lg')]: {
      padding: theme.spacing(1),
    },
  },
  titleHead: {},
  title: {
    color: 'inherit',
    ...theme.typography.overline,
    fontWeight: 'bold',
    fontSize: theme.spacing(2),
  },
  subtitle: {
    color: 'inherit',
    [theme.breakpoints.up('md')]: {
      ...theme.typography.caption,
      fontSize: theme.spacing(2),
    },
    [theme.breakpoints.down('md')]: {
      ...theme.typography.caption,
      fontSize: '0.5rem',
    },
  },
  indicator: {},
}));

export interface TitleWrapperProps extends PropsWithChildren<any> {
  title?: string;
  subtitle?: string;
  isLoading?: Boolean;
  filterable?: Boolean;
}

export default function TitleWrapper(props: TitleWrapperProps) {
  const classes = useStyles();
  const { title, subtitle, isLoading, children, filterable } = props;
  return (
    <Grid
      item
      container
      wrap='nowrap'
      direction='column'
      justifyContent='space-between'
      className={classes.root}
    >
      <Grid
        item
        container
        spacing={2}
        wrap='nowrap'
        className={classes.titleHead}
      >
        <Grid item xs={11} style={{ flexGrow: 1 }}>
          {title && <Typography className={classes.title}>{title}</Typography>}
          {subtitle && (
            <Typography className={classes.subtitle}>{subtitle}</Typography>
          )}
        </Grid>

        {filterable && (
          <Grid item xs style={{ justifySelf: 'flex-start' }}>
            <FilterableIcon fill='#D0D0D0' height={15} width={'100%'} />
          </Grid>
        )}
      </Grid>
      {isLoading && <TopLoading />}
      <Grid item className={classes.indicator}>
        {children}
      </Grid>
    </Grid>
  );
}
