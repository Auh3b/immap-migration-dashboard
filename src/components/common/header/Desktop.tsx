import {
  Divider,
  Grid, Link,
  makeStyles,
  Typography,
  useMediaQuery
} from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import { ROUTE_PATHS } from 'routes';
import { CustomTheme } from 'theme';
import useGetPathname from 'hooks/useGetPathname';
import UserMenu from './UserMenu';
import AppLogos from './AppLogos';
import NavigationMenu from './NavigationMenu';
import { useStylesCommon } from './Index';

const useStylesDesktop = makeStyles((theme) => ({
  divider: {
    margin: theme.spacing(0, 3),
    color: theme.palette.primary.main,
  },
}));
export default function Desktop() {
  const classes = {
    ...useStylesCommon(),
    ...useStylesDesktop(),
  };

  const location = useGetPathname();

  const hidden = useMediaQuery((theme: CustomTheme) => theme.breakpoints.down('xs')) ||
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
