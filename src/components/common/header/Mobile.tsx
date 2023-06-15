import { useEffect, useState } from 'react';
import {
  Drawer,
  Divider,
  Grid,
  IconButton,
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
import AppLogos from './AppLogos';
import NavigationMenu from './NavigationMenu';
import { useStylesCommon } from './Index';

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
export default function Mobile() {
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
