import { useEffect, useState } from 'react';
import {
  AppBar,
  Drawer,
  Divider,
  Grid,
  IconButton,
  Tab,
  Tabs,
  Toolbar,
  Link,
  makeStyles,
  Typography,
  useMediaQuery,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import { NavLink, useLocation } from 'react-router-dom';
import { ROUTE_PATHS } from 'routes';
import { CustomTheme } from 'theme';
import useGetPathname from 'hooks/useGetPathname';
import UserMenu from './UserMenu';
import AppLogos from './AppLogos';

const useStylesCommon = makeStyles((theme) => ({
  title: {
    '& h1': {
      display: 'flex',
      fontWeight: theme.typography.fontWeightRegular,
      color: theme.palette.primary,

      '& strong': {
        marginRight: theme.spacing(0.5),
      },

      '& svg': {
        height: `${theme.typography.subtitle1.lineHeight}em`,
        marginRight: theme.spacing(1.5),
        width: 'auto',
        verticalAlign: 'bottom',
        color: 'black',
      },
    },
  },
}));

const useStyles = makeStyles((theme) => ({
  header: {
    boxShadow: 'none',
    zIndex: theme.zIndex.modal + 1,
    overflow: 'hidden',
    backgroundColor: 'white',
    // borderBottom: '0.5px solid #F4F4F4',
  },
}));

export default function Header() {
  const classes = useStyles();

  return (
    <AppBar position='static' className={classes.header}>
      <Toolbar variant='dense'>
        <Mobile />
        <Desktop />
      </Toolbar>
      <Divider />
    </AppBar>
  );
}

const useStylesDesktop = makeStyles((theme) => ({
  divider: {
    margin: theme.spacing(0, 3),
    color: theme.palette.primary.main,
  },
}));

function Desktop() {
  const classes = {
    ...useStylesCommon(),
    ...useStylesDesktop(),
  };

  const location = useGetPathname();

  const hidden =
    useMediaQuery((theme: CustomTheme) => theme.breakpoints.down('xs')) ||
    location === '';

  return hidden ? null : (
    <>
      <Link
        component={NavLink}
        to={ROUTE_PATHS.DEFAULT}
        className={classes.title}
      >
        <Typography component='h1' variant='subtitle1' noWrap>
          <AppLogos />
        </Typography>
      </Link>
      <Divider orientation='vertical' className={classes.divider}></Divider>
      <NavigationMenu />
      <Grid container item xs justifyContent='flex-end'>
        <UserMenu />
      </Grid>
    </>
  );
}

const useStylesMobile = makeStyles((theme) => ({
  menuButton: {
    margin: theme.spacing(0, 0.75, 0, -1.25),

    '& + hr': {
      marginRight: theme.spacing(1.5),
    },
  },
  drawer: {
    minWidth: 260,
  },
}));

function Mobile() {
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const classes = {
    ...useStylesCommon(),
    ...useStylesMobile(),
  };

  useEffect(() => {
    setDrawerOpen(false);
    return () => {
      setDrawerOpen(false);
    };
  }, [location]);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const hidden = useMediaQuery((theme: CustomTheme) =>
    theme.breakpoints.up('sm'),
  );

  return hidden ? null : (
    <>
      <IconButton
        className={classes.menuButton}
        color='primary'
        aria-label='menu'
        onClick={handleDrawerToggle}
      >
        {drawerOpen ? <CloseIcon /> : <MenuIcon />}
      </IconButton>
      <Divider orientation='vertical' />
      <Link
        component={NavLink}
        to={ROUTE_PATHS.DEFAULT}
        className={classes.title}
      >
        <Typography component='h1' variant='subtitle1' noWrap>
          <Divider orientation='vertical' light />
          <AppLogos />
        </Typography>
      </Link>
      <Drawer
        variant='temporary'
        anchor='left'
        open={drawerOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        PaperProps={{
          className: classes.drawer,
        }}
      >
        <Toolbar variant='dense' />
        <Grid
          container
          direction='column'
          justifyContent='space-between'
          item
          xs
        >
          <NavigationMenu column={true} />
        </Grid>
      </Drawer>
    </>
  );
}

const useStylesNavigationMenu = makeStyles((theme) => ({
  navTabs: {
    '& .MuiTabs-indicator': {
      backgroundColor: theme.palette.primary || theme.palette.secondary,
    },
  },
}));

function NavigationMenu({ column = false }: { column?: boolean }) {
  const classes = useStylesNavigationMenu();
  const pathname = useGetPathname();
  return (
    <Grid
      container
      direction={column ? 'column' : 'row'}
      className={!column ? classes.navTabs : ''}
    >
      <Tabs
        value={pathname}
        textColor='secondary'
        indicatorColor='secondary'
        orientation={column ? 'vertical' : 'horizontal'}
        variant={column ? 'fullWidth' : 'standard'}
      >
        {/* [hygen] Import links */}
        <Tab
          label='Inicio'
          value='inicio'
          component={NavLink}
          to={ROUTE_PATHS.INTRODUCTION}
        />
        <Tab
          label='Servicios'
          value='servicios'
          component={NavLink}
          to={ROUTE_PATHS.PREMISE_SERVICE}
        />
        <Tab
          label='Feedback Servicios'
          value='feedback_servicios'
          component={NavLink}
          to={ROUTE_PATHS.SERVICES}
        />
        <Tab
          label='Flujos Migratorios'
          value='flujos_migratorios'
          component={NavLink}
          to={ROUTE_PATHS.MIGRATION_FLOW}
        />
        <Tab
          label='Conexiones en la ruta'
          value='conexiones_en_la_ruta'
          component={NavLink}
          to={ROUTE_PATHS.DINÁMICA_AURORA}
        />
        <Tab
          label='Redes sociales'
          value='redes_sociales'
          component={NavLink}
          to={ROUTE_PATHS.MEDIA}
        />
      </Tabs>
    </Grid>
  );
}
