import { Grid, Tab, Tabs, makeStyles } from '@material-ui/core';
import { NavLink, Navigate, useNavigate } from 'react-router-dom';
import { BOARD_ROUTE_DEFAULT, ROUTE_PATHS } from 'routes';
import useGetPathname from 'hooks/useGetPathname';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { setMessage } from 'store/appSlice';

const useStylesNavigationMenu = makeStyles((theme) => ({
  navTabs: {
    '& .MuiTabs-indicator': {
      backgroundColor: theme.palette.primary || theme.palette.secondary,
    },
  },
}));

export default function NavigationMenu({
  column = false,
}: {
  column?: boolean;
}) {
  // const phase2Routes = [ROUTE_PATHS.SERVICES, ROUTE_PATHS.SERVICIO_FEEDBACK_2];
  // @ts-ignore
  const phase = useSelector((state) => state.app.phase);
  const navigate = useNavigate();
  const classes = useStylesNavigationMenu();
  const pathname = useGetPathname();
  const dispatch = useDispatch();

  // useEffect(() => {
  //   if (phase === 2 && phase2Routes.includes(pathname)) {
  //     navigate(ROUTE_PATHS.INTRODUCTION);
  //     dispatch(
  //       setMessage({
  //         text: `Página de <span style="text-transform: capitalize; font-weight: bold">
  //         ${pathname.replaceAll('_', ' ')}
  //         </span> no disponible en la Ronda 2`,
  //         severity: 'info',
  //       }),
  //     );
  //   }
  // }, [phase, pathname]);
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
          to={'/' + BOARD_ROUTE_DEFAULT + '/' + ROUTE_PATHS.PREMISE_SERVICE}
        />
        <Tab
          label='Feedback Servicios'
          value='feedback_servicios'
          component={NavLink}
          to={'/' + BOARD_ROUTE_DEFAULT + '/' + ROUTE_PATHS.SERVICES}
        />
        <Tab
          label='Feedback Servicios 2'
          value='servicio_feedback_2'
          component={NavLink}
          to={'/' + BOARD_ROUTE_DEFAULT + '/' + ROUTE_PATHS.SERVICIO_FEEDBACK_2}
        />
        <Tab
          label='Flujos Migratorios'
          value='flujos_migratorios'
          component={NavLink}
          to={'/' + BOARD_ROUTE_DEFAULT + '/' + ROUTE_PATHS.MIGRATION_FLOW}
        />
        <Tab
          label='Conexiones en la ruta'
          value='conexiones_en_la_ruta'
          component={NavLink}
          to={'/' + BOARD_ROUTE_DEFAULT + '/' + ROUTE_PATHS.DINÁMICA_AURORA}
        />
        <Tab
          label='Redes sociales'
          value='redes_sociales'
          component={NavLink}
          to={'/' + BOARD_ROUTE_DEFAULT + '/' + ROUTE_PATHS.MEDIA}
        />
      </Tabs>
    </Grid>
  );
}
