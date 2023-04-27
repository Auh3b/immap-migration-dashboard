import { Grid, makeStyles } from '@material-ui/core';
import TotalAurora from 'components/indicators/introduction/TotalAurora';
import TotalMigrants from 'components/indicators/introduction/TotalMigrants';
import AverageGroupSize from 'components/indicators/introduction/AverageGroupSize';
import ChildrenPercentage from 'components/indicators/introduction/ChildrenPercentage';
import TotalChronicPatients from 'components/indicators/introduction/TotalChronicPatients';
import TotalDisabled from 'components/indicators/introduction/TotalDisabled';
import TotalPregnant from 'components/indicators/introduction/TotalPregnant';
import TotalChildren from 'components/indicators/introduction/TotalChildren';
import AuroraLocation from 'components/indicators/introduction/AuroraLocation';
import MigrantNationalities from 'components/indicators/introduction/MigrantNationalities';
import { IndicatorProps } from 'components/indicators/introduction/utils/introductionTypes';
import TotalGenders from 'components/indicators/introduction/TotalGenders';
import NnaSolo from 'components/indicators/introduction/NnaSolo';
import NnaCountry from 'components/indicators/introduction/NnaCountry';

export const useMiddleStyles = makeStyles((theme) => ({
  root: {
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    maxHeight: '85vh',
    overflowY: 'auto',
    overflowX: 'hidden',
    flexGrow: 1,
  },
  indicatorsGroup: {
    '&:first-child': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.background.paper,
      '& svg g': {
        '& path, circle': {
          fill: `${theme.palette.background.paper} !important`,
        },
      },
      '& span': {
        color: theme.palette.background.paper,
      },
    },
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      gap: theme.spacing(2),
    },
  },
}));

export default function IntroMiddleView({ data, isLoading }: IndicatorProps) {
  const classes = useMiddleStyles();
  return (
    <Grid
      wrap='nowrap'
      container
      direction='column'
      item
      className={classes.root}
    >
      <Grid item container className={classes.indicatorsGroup}>
        <TotalAurora data={data} isLoading={isLoading} />
        <TotalMigrants data={data} isLoading={isLoading} />
        <AverageGroupSize data={data} isLoading={isLoading} />
        <ChildrenPercentage data={data} isLoading={isLoading} />
        <TotalGenders data={data} isLoading={isLoading} />
        <NnaSolo data={data} isLoading={isLoading} />
      </Grid>
      <Grid wrap='nowrap' item container className={classes.indicatorsGroup}>
        <AuroraLocation data={data} isLoading={isLoading} />
        <MigrantNationalities data={data} isLoading={isLoading} />
      </Grid>
      <Grid item wrap='nowrap' container className={classes.indicatorsGroup}>
        <Grid wrap='nowrap' lg={4} item container direction='column'>
          <TotalChildren data={data} isLoading={isLoading} />
          <TotalDisabled data={data} isLoading={isLoading} />
        </Grid>
        <Grid wrap='nowrap' lg={4} direction='column' item container>
          <TotalPregnant data={data} isLoading={isLoading} />
          <TotalChronicPatients data={data} isLoading={isLoading} />
        </Grid>
        <Grid item lg={4}>
          <NnaCountry data={data} isLoading={isLoading} />
        </Grid>
      </Grid>
    </Grid>
  );
}
