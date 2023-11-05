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
const PremiseService = lazy(() => import('components/views/PremiseService'));
const DinámicaAurora = lazy(() => import('components/views/DinámicaAurora'));
const Introduction = lazy(() => import('components/views/Introduction'));
const ServicioFeedback2 = lazy(
  () => import('components/views/ServicioFeedback2'),
);
const ProjectPhaseSelect = lazy(
  () => import('components/views/ProjectPhaseSelect'),
);
// [hygen] Import views

export const BOARD_ROUTE_DEFAULT = 'board';

export const BOARD_ROUTES = {
  SERVICES: 'feedback_servicios',
  MIGRATION_FLOW: 'flujos_migratorios',
  MEDIA: 'redes_sociales',
  PREMISE_SERVICE: 'servicios',
  DINÁMICA_AURORA: 'conexiones_en_la_ruta',
  SERVICIO_FEEDBACK_2: 'servicio_feedback_2',
};

export const ROUTE_PATHS = {
  LOGIN: '/login',
  DEFAULT: '/',
  NOT_FOUND: '/404',
  INTRODUCTION: 'inicio',
  ...BOARD_ROUTES,
  PROJECT_PHASE_SELECT: '/ronda',
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
      {
        path: '/',
        element: <Navigate to={ROUTE_PATHS.PROJECT_PHASE_SELECT} />,
      },
      {
        path: BOARD_ROUTE_DEFAULT,
        children: [
          { path: ROUTE_PATHS.SERVICES, element: <Services /> },
          { path: ROUTE_PATHS.MIGRATION_FLOW, element: <MigrationFlow /> },
          { path: ROUTE_PATHS.MEDIA, element: <Media /> },
          { path: ROUTE_PATHS.PREMISE_SERVICE, element: <PremiseService /> },
          { path: ROUTE_PATHS.DINÁMICA_AURORA, element: <DinámicaAurora /> },
          {
            path: ROUTE_PATHS.SERVICIO_FEEDBACK_2,
            element: <ServicioFeedback2 />,
          },
        ],
      },
      // [hygen] Add routes
    ],
  },
  {
    path: ROUTE_PATHS.PROJECT_PHASE_SELECT,
    element: <ProjectPhaseSelect />,
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
