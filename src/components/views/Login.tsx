import { useState } from 'react';
import {
  Button,
  CircularProgress,
  Grid,
  makeStyles,
  Link,
  Typography,
} from '@material-ui/core';
import { ReactComponent as CartoIcon } from 'assets/img/icon-carto-symbol.svg';
import SvgIcon from '@material-ui/core/SvgIcon';
import { ReactComponent as CartoLogoNegative } from 'assets/img/carto-logo-negative.svg';
import immapLogo from 'assets/img/immap-logo.png';
import unicefLogo from 'assets/img/unicef-logo.png'
import { useAuth0 } from '@auth0/auth0-react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { ROUTE_PATHS } from 'routes';
import { RootState } from 'store/store';

const useStyles = makeStyles((theme) => ({
  login: {
    backgroundColor: 'white',
    height: '100%',
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(8, 28, 0),
    },
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(4, 5, 0),
    },
  },
  footer: {
    position: 'absolute',
    bottom: theme.spacing(3),
    color: theme.palette.common.black,
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
    <Grid
      container
      className={classes.login}
      direction='column'
      justifyContent='flex-start'
      alignItems='flex-start'
    >
      <Grid item>
        <CartoLogoNegative />
      </Grid>

      <Content />

      <Organisations />

      <Grid item className={classes.footer}>
        <Typography variant='caption' color='inherit'>
          &copy; iMMAP {new Date(Date.now()).getFullYear()}
        </Typography>
      </Grid>
    </Grid>
  );
}

const useStylesContent = makeStyles((theme) => ({
  content: {
    [theme.breakpoints.up('md')]: {
      marginTop: theme.spacing(12),
    },
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(7),
    },
  },
  subtitle: {
    color: '#333333',
  },
  title: {
    marginTop: theme.spacing(1),
    color: '#333333',
  },
  description: {
    marginTop: theme.spacing(2),
    maxWidth: 485,
    color: '#333333',
  },
  contact: {
    marginTop: theme.spacing(2),
    color: '#333333',
  },
}));

function Content() {
  const classes = useStylesContent();

  return (
    <Grid item container direction='column' className={classes.content}>
      <Grid item className={classes.subtitle}>
        <Typography variant='subtitle1' color='inherit'>
          iMMAP
        </Typography>
      </Grid>

      <Grid item className={classes.title}>
        <Typography variant='h3' color='inherit'>
          Welcome to Migration Dashboard
        </Typography>
      </Grid>

      <Grid item className={classes.description}>
        <Typography variant='body2' color='inherit'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus architecto iure repudiandae explicabo totam quos et culpa nulla ipsum numquam suscipit ullam temporibus tempora perferendis reiciendis, animi doloremque sequi non praesentium dolorem? Harum dolorum asperiores temporibus at atque cum. Fuga, sunt saepe. Error corporis asperiores corrupti sint reprehenderit voluptatibus neque.
        </Typography>
      </Grid>

      <LoginButton />

      <Grid item className={classes.contact}>
        <Typography variant='caption' color='inherit'>
          Don't have an account yet?{' '}
        </Typography>
        <Link
          variant='caption'
          href='https://carto.com'
          target='_blank'
          color='inherit'
        >
          Contact
        </Link>
      </Grid>
    </Grid>
  );
}

const useStylesLoginButton = makeStyles((theme) => ({
  loginButton: {
    marginTop: theme.spacing(9),
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
        color='secondary'
        size='large'
        onClick={logInWithCarto}
        startIcon={
          loading ? (
            <CircularProgress size={24} />
          ) : (
            <SvgIcon component={CartoIcon}></SvgIcon>
          )
        }
      >
        Login with CARTO
      </Button>
    </Grid>
  );
}

const useStylesOrganisation = makeStyles((theme) => ({
  organisations: {
    marginTop: theme.spacing(2),
    width: '100%',
  },
}));

export function Organisations() {
  const classes = useStylesOrganisation()
  return (
    <Grid
    container 
    className={classes.organisations}>
       <Grid item xs={6}>
        <img src={unicefLogo} alt='iMMAP Logo' width={173} height={100}/>
      </Grid>
      <Grid item xs={6}>
        <img src={immapLogo} alt='iMMAP Logo' width={323} height={100}/>
      </Grid>
    </Grid>
  );
}