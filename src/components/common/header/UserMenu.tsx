import { MouseEvent, useState } from 'react';
import {
  Grid,
  Link,
  Typography,
  Avatar,
  Menu,
  MenuItem,
  useMediaQuery,
  makeStyles,
} from '@material-ui/core';
import { useAuth0 } from '@auth0/auth0-react';
import { CustomTheme } from 'theme';

export const useStylesUserMenu = makeStyles((theme) => ({
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

export default function UserMenu() {
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
          {/* {smDownHidden ? null : (
            <Typography variant='caption' color='primary' noWrap>
              {user.email}
            </Typography>
          )} */}
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
      </Menu>
    </>
  );
}
