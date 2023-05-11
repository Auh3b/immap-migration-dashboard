import { lazy } from 'react';
import ProtectedRoute from 'components/common/ProtectedRoute';
import DefaultView from 'components/common/DefaultView';
import { Navigate } from 'react-router-dom';

const Main = lazy(
  () => import(/* webpackPrefetch: true */ 'components/views/main/Main'),
);
const NotFound = lazy(() => import('components/views/NotFound'));
const Login = lazy(() => import('components/views/Login'));
const Services = lazy(() => import('components/views/Services'));
const MigrationFlow = lazy(() => import('components/views/MigrationFlow'));
const Media = lazy(() => import('components/views/Media'));
const Dashboard = lazy(() => import('components/views/Dashboard'));
const PremiseService = lazy(() => import('components/views/PremiseService'));
const Nna = lazy(() => import('components/views/Nna'));
const DinámicaAurora = lazy(() => import('components/views/DinámicaAurora'));
const Introduction = lazy(() => import('components/views/Introduction'));
// [hygen] Import views

const DEFAULT_ROUTE = '/board';

const BOARD_ROUTES = {
  SERVICES: DEFAULT_ROUTE + '/feedback_servicios',
  MIGRATION_FLOW: DEFAULT_ROUTE + '/flujos_migratorios',
  MEDIA: DEFAULT_ROUTE + '/redes_sociales',
  DASHBOARD: DEFAULT_ROUTE + '/inicio',
  PREMISE_SERVICE: DEFAULT_ROUTE + '/servicios',
  CHILDREN: DEFAULT_ROUTE + '/nna',
  DINÁMICA_AURORA: DEFAULT_ROUTE + '/conexiones_en_la_ruta',
};

export const ROUTE_PATHS = {
  LOGIN: '/login',
  DEFAULT: '/',
  NOT_FOUND: '/404',
  INTRODUCTION: '/intro',
  ...BOARD_ROUTES,
  // [hygen] Add path routes
};

const routes = [
  {
    path: ROUTE_PATHS.DEFAULT,
    element: (
      <ProtectedRoute>
        <DefaultView>
          <Main />
        </DefaultView>
      </ProtectedRoute>
    ),
    children: [
      { path: '/', element: <Navigate to={ROUTE_PATHS.INTRODUCTION} /> },
      { path: ROUTE_PATHS.SERVICES, element: <Services /> },
      { path: ROUTE_PATHS.MIGRATION_FLOW, element: <MigrationFlow /> },
      { path: ROUTE_PATHS.MEDIA, element: <Media /> },
      { path: ROUTE_PATHS.DASHBOARD, element: <Dashboard /> },
      { path: ROUTE_PATHS.PREMISE_SERVICE, element: <PremiseService /> },
      { path: ROUTE_PATHS.CHILDREN, element: <Nna /> },
      { path: ROUTE_PATHS.DINÁMICA_AURORA, element: <DinámicaAurora /> },
      // [hygen] Add routes
    ],
  },
  { path: ROUTE_PATHS.INTRODUCTION, element: <Introduction /> },
  { path: ROUTE_PATHS.LOGIN, element: <Login /> },
  {
    path: '*',
    element: (
      <DefaultView>
        <NotFound />
      </DefaultView>
    ),
  },
];

export default routes;
