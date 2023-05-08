import { useState } from 'react';
import {
  Button,
  CircularProgress,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { Lock } from '@material-ui/icons';
import immapLogo from 'assets/img/immap-logo.png';
import { ReactComponent as UnicefLogo } from 'assets/img/unicef-logo-2-sp.svg';
import hero from 'assets/img/migration-reformed.png';
import { useAuth0 } from '@auth0/auth0-react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { ROUTE_PATHS } from 'routes';
import { RootState } from 'store/store';

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: 'white',
    height: '100%',
  },
  login: {
    [theme.breakpoints.up('md')]: {
      height: '100%',
      padding: theme.spacing(5, 10, 5),
    },
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(4, 5, 4),
      overflow: 'auto',
      maxHeight: 'calc(100vh - 56px) ',
    },
  },
  hero: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
  },
}));

export default function Login() {
  const accessToken = useSelector(
    (state: RootState) => state.carto.credentials.accessToken,
  );
  const classes = useStyles();

  if (accessToken) {
    return <Navigate to={ROUTE_PATHS.DEFAULT} />;
  }

  return (
    <Grid container className={classes.container}>
      <Grid item md={6}>
        <Grid
          container
          className={classes.login}
          justifyContent='flex-start'
          alignItems='flex-start'
        >
          <Content />
          <Organisations />
          <LoginFooter />
        </Grid>
      </Grid>
      <Grid item md={6} className={classes.hero}>
        <img src={hero} alt='migrants-silhouette' className={classes.image} />
      </Grid>
    </Grid>
  );
}

const useStylesContent = makeStyles((theme) => ({
  content: {
    color: theme.palette.primary.main,
  },
  title: {
    '&h6': {
      color: theme.palette.primary.dark,
    },
    [theme.breakpoints.up('lg')]: {
      ...theme.typography.h4,
    },
    [theme.breakpoints.down('lg')]: {
      ...theme.typography.h5,
    },
  },
  subtitle: {
    [theme.breakpoints.down('lg')]: {
      ...theme.typography.subtitle1,
    },
  },
  description: {
    marginTop: theme.spacing(2),
    color: '#777779',
    [theme.breakpoints.down('lg')]: {
      ...theme.typography.body1,
      fontSize: '0.75em',
    },
  },
  contact: {
    marginTop: theme.spacing(2),
    color: '#6d6e71',
  },
}));

function Content() {
  const classes = useStylesContent();

  return (
    <Grid
      item
      container
      direction='column'
      justifyContent='space-between'
      className={classes.content}
    >
      <Grid item>
        <Typography color='inherit' className={classes.title}>
          Monitoreo Flujos Migratorios Mixtos
        </Typography>
        <Typography color='inherit' className={classes.subtitle}>
          Colombia - Panamá - Costa Rica
        </Typography>
      </Grid>

      <Grid item>
        <Typography className={classes.description} color='inherit'>
          Los movimientos de población migrante por la frontera colombo-panameña
          hacia el norte del continente americano –atravesando la región del
          Darién– aumentaron significativamente en los meses de junio a octubre
          de 2021 y han mostrado la misma tendencia desde mayo de 2022 según las
          cifras reportadas por Migración Panamá.
        </Typography>
      </Grid>

      <Grid item>
        <Typography className={classes.description} color='inherit'>
          Los registros de 2022 indican movimientos de personas de 70
          nacionalidades, de las cuales el 60% corresponde a población
          proveniente de Venezuela. Solo en el mes de enero de 2023 han
          transitado más de 21 mil personas por el Darién, entre las que se
          contabilizó a más de 4000 niños, niñas y adolescentes en tránsito.
        </Typography>
      </Grid>
      <Grid item>
        <Typography className={classes.description} color='inherit'>
          En este contexto, UNICEF junto con iMMAP proponen una metodología
          novedosa para la caracterización y monitoreo de la demanda y oferta de
          servicios humanitarios a población migrante en la ruta Colombia –
          Panamá – Costa Rica con especial énfasis en niños, niñas y
          adolescentes. Este Dashboard muestra los principales resultados y
          análisis obtenidos de los datos recolectados, los cuales ayudarán,
          entre otras cosas, a la comprensión del fenómeno migratorio en esta
          región, la elaboración de planes de respuesta ante el aumento de
          volumen de migrantes, o, para generar un sistema de alertas tempranas
          a los tomadores de decisiones.
        </Typography>
      </Grid>

      <LoginButton />
    </Grid>
  );
}

const useStylesLoginButton = makeStyles((theme) => ({
  loginButton: {
    marginTop: theme.spacing(4),
  },
  button: {
    color: 'white',
    backgroundColor: theme.palette.primary.main,
    '&:hover': {
      color: theme.palette.primary.main,
    },
  },
}));

function LoginButton() {
  const [loading, setLoading] = useState(false);
  const { loginWithRedirect } = useAuth0();
  const classes = useStylesLoginButton();

  const logInWithCarto = () => {
    setLoading(true);
    loginWithRedirect();
  };

  return (
    <Grid item className={classes.loginButton}>
      <Button
        variant='contained'
        size='large'
        className={classes.button}
        onClick={logInWithCarto}
        startIcon={
          loading ? <CircularProgress color='inherit' size={24} /> : <Lock />
        }
      >
        Login
      </Button>
    </Grid>
  );
}

const useStylesOrganisation = makeStyles((theme) => ({
  organisations: {
    marginTop: theme.spacing(1),
    gap: '1.2rem',
  },
  logo: {
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      height: theme.spacing(3),
    },
    [theme.breakpoints.up('md')]: {
      width: '100%',
      height: theme.spacing(5),
    },
    objectFit: 'contain',
  },
}));

export function Organisations() {
  const classes = useStylesOrganisation();
  return (
    <Grid item container className={classes.organisations}>
      <Grid item>
        <UnicefLogo className={classes.logo} />
      </Grid>
      <Grid item>
        <img src={immapLogo} alt='iMMAP Logo' className={classes.logo} />
      </Grid>
    </Grid>
  );
}

const useFooterStyles = makeStyles((theme) => ({
  text: {
    ...theme.typography.caption,
    fontSize: '0.75em',
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down('lg')]: {
      fontSize: '0.75em',
    },
  },
  copyright: {
    bottom: theme.spacing(3),
    color: theme.palette.common.black,
  },
}));

function LoginFooter() {
  const classes = useFooterStyles();
  return (
    <>
      <Grid item>
        <Typography className={classes.text} display='block'>
          El propósito de este reporte es apoyar el seguimiento a la recolección
          de la información. En este sentido, toda la información contenida es
          preliminar y esta en proceso de revisión.
        </Typography>
        <Typography className={classes.text} display='block'>
          Fecha de actualización: 03/28/2023.
        </Typography>
        <Typography className={classes.text} display='block'>
          &copy; iMMAP {new Date(Date.now()).getFullYear()}
        </Typography>
      </Grid>
    </>
  );
}
