import { MouseEvent, useEffect, useMemo, useState } from 'react';
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
  Avatar,
  Menu,
  MenuItem,
  useMediaQuery,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import { NavLink, useLocation } from 'react-router-dom';
import { ReactComponent as UnicefLogo } from 'assets/img/unicef-logo-1.svg';
import { ReactComponent as ImmapLogo } from 'assets/img/immapLogoAlt.svg';
import { ROUTE_PATHS } from 'routes';
import { useAuth0 } from '@auth0/auth0-react';
import { CustomTheme } from 'theme';

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

  const hidden = useMediaQuery((theme: CustomTheme) =>
    theme.breakpoints.down('xs'),
  );

  return hidden ? null : (
    <>
      <Link
        component={NavLink}
        to={ROUTE_PATHS.DEFAULT}
        className={classes.title}
      >
        <Typography component='h1' variant='subtitle1' noWrap>
          <AppName />
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
          <AppName />
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

function AppName() {
  return (
    <>
      <UnicefLogo />
      <ImmapLogo />
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
  const location = useLocation();
  const classes = useStylesNavigationMenu();

  const pathname = useMemo(
    () => location.pathname.split('/')[1] || '',
    [location],
  );

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
          value='dashboard'
          component={NavLink}
          to={ROUTE_PATHS.DASHBOARD}
        />
        <Tab
          label='Servicios'
          value='premise_service'
          component={NavLink}
          to={ROUTE_PATHS.PREMISE_SERVICE}
        />
        <Tab
          label='Feedback Sobre Servicios'
          value='services'
          component={NavLink}
          to={ROUTE_PATHS.SERVICES}
        />
        <Tab
          label='Flujos Migratorios'
          value='migration'
          component={NavLink}
          to={ROUTE_PATHS.MIGRATION_FLOW}
        />
        <Tab
          label='Caracterización grupo de viaje'
          value='children'
          component={NavLink}
          to={ROUTE_PATHS.CHILDREN}
        />
        <Tab
          label='Conexiones en la ruta'
          value='dinamica'
          component={NavLink}
          to={ROUTE_PATHS.DINÁMICA_AURORA}
        />
        <Tab
          label='Redes sociales'
          value='media'
          component={NavLink}
          to={ROUTE_PATHS.MEDIA}
        />
      </Tabs>
    </Grid>
  );
}

const useStylesUserMenu = makeStyles((theme) => ({
  avatar: {
    cursor: 'pointer',
    width: theme.spacing(4.5),
    height: theme.spacing(4.5),
    marginLeft: theme.spacing(1),
  },
  menu: {
    zIndex: theme.zIndex.modal + 10,
  },
}));

function UserMenu() {
  const { logout, user } = useAuth0();
  const [anchorEl, setAnchorEl] = useState<
    (EventTarget & (HTMLAnchorElement | HTMLSpanElement)) | null
  >(null);
  const classes = useStylesUserMenu();

  const smDownHidden = useMediaQuery((theme: CustomTheme) =>
    theme.breakpoints.down('sm'),
  );

  // User is NOT logged in, so display nothing
  if (!user) {
    return null;
  }

  // At this point, there is an oauthApp and the user has logged in (forceOAuthLogin mode).
  const open = Boolean(anchorEl);

  const handleMenu = (
    event: MouseEvent<HTMLAnchorElement | HTMLSpanElement>,
  ) => {
    if (!anchorEl) {
      setAnchorEl(event.currentTarget);
    } else {
      setAnchorEl(null);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout({ returnTo: window.location.origin });
    handleClose();
  };

  // Display User menu, with name, avatar + an attached menu for user-related options
  return (
    <>
      <Link
        aria-label='account of current user'
        aria-controls='menu-login'
        aria-haspopup='true'
        color='inherit'
        onClick={handleMenu}
      >
        <Grid container alignItems='center' item wrap='nowrap'>
          {smDownHidden ? null : (
            <Typography variant='caption' color='primary' noWrap>
              {user.email}
            </Typography>
          )}
          <Avatar className={classes.avatar} src={user.picture} />
        </Grid>
      </Link>
      <Menu
        id='menu-login'
        anchorEl={anchorEl}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={open}
        onClose={handleClose}
        className={classes.menu}
      >
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
        <MenuItem>
          <Link href='https://app.carto.com'>Go to CARTO</Link>
        </MenuItem>
      </Menu>
    </>
  );
}
