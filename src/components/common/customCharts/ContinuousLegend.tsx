import { Grid, Typography, makeStyles } from '@material-ui/core';
import { scaleSequential } from 'd3';

const useRangeStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    top: theme.spacing(12),
    right: theme.spacing(4),
    width: '50px',
  },
  bar: {
    backgroundImage: ({ positive, neutral, negative }: any) =>
      `linear-gradient(to top, ${negative}, ${neutral}, ${positive})`,
    height: '100px',
    width: '20px',
    borderRadius: theme.shape.borderRadius,
  },
  lines: {
    '& span': {},
  },
}));

export default function ContinuousLegend({
  colorScheme,
}: {
  colorScheme: [string, string];
}) {
  const [negative, neutral, positive] = [1, 2, 3].map((a, i) =>
    //@ts-ignore
    scaleSequential(colorScheme).domain([0, 2])(i),
  );
  const classes = useRangeStyles({ negative, neutral, positive });
  return (
    <Grid container item wrap='nowrap' className={classes.root}>
      <Grid
        item
        container
        direction='column'
        justifyContent='space-between'
        alignItems='flex-start'
        className={classes.lines}
      >
        <Typography variant='overline'>Alto</Typography>
        <Typography variant='overline'></Typography>
        <Typography variant='overline'>Bajo</Typography>
      </Grid>
      <Grid item className={classes.bar}></Grid>
    </Grid>
  );
}
