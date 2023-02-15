import { lazy } from 'react';
import ProtectedRoute from 'components/common/ProtectedRoute';
import DefaultView from 'components/common/DefaultView';

const Main = lazy(
  () => import(/* webpackPrefetch: true */ 'components/views/main/Main'),
);
const NotFound = lazy(() => import('components/views/NotFound'));
const Login = lazy(() => import('components/views/Login'));
const Services = lazy(() => import('components/views/Services'));
const MigrationFlow = lazy(() => import('components/views/MigrationFlow'));
const Media = lazy(() => import('components/views/Media'));
// [hygen] Import views

export const ROUTE_PATHS = {
  LOGIN: '/login',
  DEFAULT: '/',
  NOT_FOUND: '/404',
  SERVICES: '/services',
  MIGRATION_FLOW: '/migration',
  MEDIA: '/media',
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
      // { path: '/', element: <Navigate to='/<your default view>' /> },
      { path: ROUTE_PATHS.SERVICES, element: <Services /> },
      { path: ROUTE_PATHS.MIGRATION_FLOW, element: <MigrationFlow /> },
      { path: ROUTE_PATHS.MEDIA, element: <Media /> },
      // [hygen] Add routes
    ],
  },
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
