import { makeStyles } from '@material-ui/core/styles';
import { Button, Grid, Typography } from '@material-ui/core';
import { ReactComponent as UnicefLogo } from 'assets/img/unicef.svg';
import { ReactComponent as ImmapLogo } from 'assets/img/immapLogoAlt.svg';
import { useEffect, useMemo, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ROUTE_PATHS } from 'routes';
import { UNICEF_COLORS } from 'theme';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import { RootState } from 'store/store';
import { useSelector } from 'react-redux';
import { executeSQL } from '@carto/react-api';
import TotalAurora from 'components/indicators/introduction/TotalAurora';
import TotalMigrants from 'components/indicators/introduction/TotalMigrants';
import AverageGroupSize from 'components/indicators/introduction/AverageGroupSize';
import ChildrenPercentage from 'components/indicators/introduction/ChildrenPercentage';
import TotalChronicPatients from 'components/indicators/introduction/TotalChronicPatients';
import TotalDisabled from 'components/indicators/introduction/TotalDisabled';
import TotalPregnant from 'components/indicators/introduction/TotalPregnant';
import TotalChildren from 'components/indicators/introduction/TotalChildren';
import OrganisationCount from 'components/indicators/introduction/OrganisationCount';
import AuroraLocation from 'components/indicators/introduction/AuroraLocation';
import MigrantNationalities from 'components/indicators/introduction/MigrantNationalities';
import TopOrganisations from 'components/indicators/introduction/TopOrganisations';
import TopSurveyLocation from 'components/indicators/introduction/TopSurveyLocation';
import PrincipalsImplementor from 'components/indicators/introduction/PrincipalsImplementor';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

const useStyles = makeStyles((theme) => ({
  introduction: {
    position: 'relative',
    height: '100%',
    [theme.breakpoints.down('lg')]: {
      paddingTop: theme.spacing(1),
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
    [theme.breakpoints.down('sm')]: {
      maxHeight: '100vh',
      overflowY: 'scroll',
    },
    [theme.breakpoints.up('lg')]: {
      paddingTop: theme.spacing(2),
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      paddingBottom: theme.spacing(2),
    },
  },
}));

export default function Introduction() {
  const classes = useStyles();

  // [hygen] Add useEffect

  return (
    <Grid
      container
      direction='column'
      wrap='nowrap'
      className={classes.introduction}
    >
      <IntroHeader />
      <IntroContent />
    </Grid>
  );
}

const useHeaderStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  logoContainer: {
    [theme.breakpoints.down('sm')]: {
    },
  },
  logo: {
    [theme.breakpoints.down('md')]: {
      height: theme.spacing(2),
      display: 'none',
    },
    [theme.breakpoints.up('md')]: {
      display: 'none',
      height: theme.spacing(4),
    },
  },
  headerText: {
    flexGrow: 2,
  },
  title: {
    [theme.breakpoints.down('xl')]: {
      ...theme.typography.h6,
    },
    [theme.breakpoints.up('xl')]: {
      ...theme.typography.h4,
    },
  },
  subtitle: {
    [theme.breakpoints.up('md')]: {
      fontSize: '1em',
    },
  },
}));

function IntroHeader() {
  const classes = useHeaderStyles();
  return (
    <Grid
      container
      wrap='nowrap'
      justifyContent='space-between'
      item
      className={classes.root}
    >
      <Grid md={12} lg={8} item className={classes.headerText}>
        <Typography className={classes.title} color='primary'>
          Monitoreo a la Respuesta y Flujos Migratorios Mixtos
        </Typography>
        <Typography className={classes.subtitle}>
          Recolección de datos: 6 de marzo a 04 de abril – Necoclí, Panamá y
          Costa Rica
        </Typography>
      </Grid>
      <Grid
        wrap='nowrap'
        item
        container
        alignItems='center'
        justifyContent='flex-end'
        className={classes.logoContainer}
      >
        <Grid item>
          <UnicefLogo className={classes.logo} />
        </Grid>
        <Grid item>
          <ImmapLogo className={classes.logo} />
        </Grid>
        <ExitButton />
      </Grid>
    </Grid>
  );
}

const useContentStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      flexGrow: 0,
      gap: theme.spacing(2)
    },
  },
}));

function IntroContent() {
  const classes = useContentStyles();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const credentials = useSelector(
    (state: RootState) => state.carto.credentials,
  );
  const fetchPremise = async () => {
    const result = await executeSQL({
      credentials,
      connection: 'carto_dw',
      query: 'SELECT * FROM shared.Premise_22032023',
      opts: {
        format: 'json',
      },
    });
    return result;
  };
  const fetchAurora = async () => {
    const result = await executeSQL({
      credentials,
      connection: 'carto_dw',
      query: 'SELECT * FROM shared.LACRO_Marzo_2023',
      opts: {
        format: 'json',
      },
    });
    return result;
  };
  useEffect(() => {
    setIsLoading(true);
    Promise.all([fetchAurora(), fetchPremise()])
      .then((data) => setData(data))
      .catch((e) => setError(e.message))
      .finally(() => setIsLoading(false));

    return () => {
      setData(null);
      setError(null);
      setIsLoading(false);
    };
  }, []);

  return (
    <Grid container wrap='nowrap' item className={classes.root}>
      <LeftPanel />
      <MiddlePanel data={data} isLoading={isLoading} />
      <RightPanel data={data} isLoading={isLoading} />
    </Grid>
  );
}

const useLeftStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(2),
    paddingRight: theme.spacing(2),
    BorderRight: `1px solid ${UNICEF_COLORS[0]}`,
    flexWrap: 'nowrap',
    [theme.breakpoints.down('lg')]: {
      paddingTop: theme.spacing(1),
    },
    [theme.breakpoints.down('md')]: {
      justifyContent: 'flex-start',
    },
  },
  subtitle: {
    ...theme.typography.caption,
    marginBottom: theme.spacing(2),
  },
  description: {
    [theme.breakpoints.down('lg')]: {
      ...theme.typography.body1,
      fontSize: '0.75rem',
    },
  },
}));

function LeftPanel() {
  const classes = useLeftStyles();
  return (
    <Grid
      container
      direction='column'
      justifyContent='space-between'
      item
      lg={3}
      md={12}
      className={classes.root}
    >
      <Grid item>
        <Typography variant='subtitle1'>Nota metodológica</Typography>
        <Typography className={classes.subtitle}>A Aurora Chatbot</Typography>
        <Typography className={classes.description}>
          El propósito de este reporte es apoyar el seguimiento a la recolección
          de la información. En este sentido, toda la información contenida es
          preliminar y esta en proceso de revisión.
        </Typography>
      </Grid>
      <Grid item container spacing={2} alignItems='center'>
        <Grid item>
          <CalendarTodayIcon />
        </Grid>
        <Grid item>
          <Typography variant='overline'>
            06 de marzo al 03 de abril.
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}

const useMiddleStyles = makeStyles((theme) => ({
  root: {
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
      gap: theme.spacing(2)
    },
  },
}));

interface DataContentPanel {
  data: any[];
  isLoading?: Boolean;
}

function MiddlePanel({ data, isLoading }: DataContentPanel) {
  const classes = useMiddleStyles();
  const [Aurora, Premise] = useMemo(() => {
    if (data) {
      return data;
    }
    return [null, null];
  }, [data]);
  return (
    <Grid
      wrap='nowrap'
      container
      direction='column'
      item
      className={classes.root}
    >
      <Grid wrap='nowrap' item container className={classes.indicatorsGroup}>
        <TotalAurora data={Aurora} isLoading={isLoading} />
        <TotalMigrants data={Aurora} isLoading={isLoading} />
        <AverageGroupSize data={Aurora} isLoading={isLoading} />
        <ChildrenPercentage data={Aurora} isLoading={isLoading} />
      </Grid>
      <Grid wrap='nowrap' item container className={classes.indicatorsGroup}>
        <AuroraLocation data={Aurora} isLoading={isLoading} />
        <MigrantNationalities data={Aurora} isLoading={isLoading} />
      </Grid>
      <Grid wrap='nowrap' item container className={classes.indicatorsGroup}>
        <TotalChildren data={Aurora} isLoading={isLoading} />
        <TotalPregnant data={Aurora} isLoading={isLoading} />
      </Grid>
      <Grid wrap='nowrap' item container className={classes.indicatorsGroup}>
        <TotalDisabled data={Aurora} isLoading={isLoading} />
        <TotalChronicPatients data={Aurora} isLoading={isLoading} />
      </Grid>
    </Grid>
  );
}

const useRightStyles = makeStyles((theme) => ({
  root: {
    overflowY: 'auto',
    height: '100%',
    maxHeight: '85vh',
    BorderLeft: `1px solid ${UNICEF_COLORS[0]}`,
    [theme.breakpoints.down('md')]: {
      overflow: 'none',
      height: 'none',
      maxHeight: 'none',
    },
  },
}));

function RightPanel({ data, isLoading }: DataContentPanel) {
  const [Aurora, Premise] = useMemo(() => {
    if (data) {
      return data;
    }
    return [null, null];
  }, [data]);
  const classes = useRightStyles();
  return (
    <Grid
      container
      wrap='nowrap'
      direction='column'
      item
      md={12}
      lg={3}
      className={classes.root}
    >
      <OrganisationCount data={Premise} isLoading={isLoading} />
      <TopSurveyLocation data={Premise} isLoading={isLoading} />
      <TopOrganisations data={Premise} isLoading={isLoading} />
      <PrincipalsImplementor data={Premise} isLoading={isLoading} />
    </Grid>
  );
}

const useButtonStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down('sm')]: {
      position: 'fixed',
      bottom: theme.spacing(2),
      right: theme.spacing(2),
      zIndex: 1,
    },
  },
  button: {
    padding: theme.spacing(1),
    borderRadius: theme.spacing(4),
    color: theme.palette.primary.main,
    borderColor: theme.palette.primary.main,
    '&:hover':{
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.background.paper,
      opacity: 0.5,
    },
    [theme.breakpoints.down('sm')]: {
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5]
    }
  },
}));

function ExitButton() {
  const classes = useButtonStyles();
  return (
    <Grid item className={classes.root}>
      <Button
        component={NavLink}
        to={ROUTE_PATHS.DASHBOARD}
        variant='outlined'
        size='large'
        className={classes.button}
        endIcon={<ArrowForwardIcon />}
      >
        Dashboard
      </Button>
    </Grid>
  );
}
