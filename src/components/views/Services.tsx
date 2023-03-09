import { makeStyles } from '@material-ui/core/styles';
import MainView from './main/MainView';
import mainSource from 'data/sources/mainSource';
import { lazy } from 'react';

const ServiceLeftView = lazy(() => import('./serviceViews/ServiceLeftView'));
const ServicesRightView = lazy(
  () => import('./serviceViews/ServicesRightView'),
);

const useViewStyle = makeStyles((theme) => ({
  title: {
    padding: theme.spacing(2),
  },
  divider: {
    paddingBottom: 0,
  },
}));

export default function Services() {
  const classes = useViewStyle();
  return (
    <MainView>
      {{
        left: (
          <ServiceLeftView classes={classes} dataSources={{ mainSource }} />
        ),
        right: (
          <ServicesRightView classes={classes} dataSources={{ mainSource }} />
        ),
      }}
    </MainView>
  );
}
