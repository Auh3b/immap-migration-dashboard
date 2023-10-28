import { Grid, Link, Typography } from '@material-ui/core';
import AppLogos from 'components/common/header/AppLogos';
import { useStylesCommon } from 'components/common/header/Index';
import UserMenu from 'components/common/header/UserMenu';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { ROUTE_PATHS } from 'routes';

export default function PhaseHeader() {
  const classes = {
    ...useStylesCommon(),
  };

  return (
    <Grid
      container
      alignItems={'center'}
      style={{ padding: '8px 24px', backgroundColor: 'white' }}
    >
      <Link
        component={NavLink}
        to={ROUTE_PATHS.DEFAULT}
        className={classes.title}
      >
        <Typography component='h1' variant='subtitle1' noWrap>
          <AppLogos />
        </Typography>
      </Link>
      <Grid container item xs justifyContent='flex-end'>
        <UserMenu />
      </Grid>
    </Grid>
  );
}
