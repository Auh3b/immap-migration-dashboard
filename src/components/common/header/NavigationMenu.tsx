import { Grid, Tab, Tabs, makeStyles } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import { ROUTE_PATHS } from 'routes';
import useGetPathname from 'hooks/useGetPathname';

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
