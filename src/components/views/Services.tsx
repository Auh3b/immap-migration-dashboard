import { ServiceAccessAdult } from './../common/indicators/services/ServiceAccessAdult';
import { ServiceSatisfyAdult } from './../common/indicators/services/ServiceSatisfyAdult';
import { ServiceQualityAdult } from './../common/indicators/services/ServiceQualityAdult';
import { makeStyles } from '@material-ui/core/styles';
import MainView from './main/MainView';
import { MainColumnView } from 'components/common/MainColumnView';
import { Divider, Grid, Typography } from '@material-ui/core';
import ServiceTypeAdult from 'components/common/indicators/services/ServiceTypeAdult';
import mainSource from 'data/sources/mainSource'
import { ServiceAccessChildren } from 'components/common/indicators/services/ServiceAccessChildren';
import { ServiceQualityChildren } from 'components/common/indicators/services/ServiceQualityChildren';
import { ServiceSatisfyChildren } from 'components/common/indicators/services/ServiceSatisfyChildren';

export default function Services() {

  return (
    <MainView>
      {{
        left: <LeftView />,
        right: <RightView />,
      }}
    </MainView>
  );
}

const useViewStyle = makeStyles((theme) => ({
  title: {
    padding: theme.spacing(2),
  },
  divider: {
    borderBottom: theme.spacing(2),
    borderTop: theme.spacing(2),
  },
}));

function LeftView() {
  const classes = useViewStyle();

  return (
    <MainColumnView>
      <Grid item className={classes.title}>
        <Typography variant='subtitle1'>Calidad para adultos</Typography>
      </Grid>
      <Divider className={classes.divider} />
      <ServiceTypeAdult dataSource={mainSource.id} />
      <ServiceQualityAdult dataSource={mainSource.id} />
      <ServiceAccessAdult dataSource={mainSource.id} />
      <ServiceSatisfyAdult dataSource={mainSource.id} />
    </MainColumnView>
  );
}

function RightView() {
  const classes = useViewStyle();
  return (
    <MainColumnView>
      <Grid item className={classes.title}>
        <Typography variant='subtitle1'>Calidad para NNA</Typography>
      </Grid>
      <Divider className={classes.divider} />
      {/* <ServiceAccessChildren dataSource={mainSource.id} />
      <ServiceQualityChildren dataSource={mainSource.id} />
      <ServiceSatisfyChildren dataSource={mainSource.id} /> */}
    </MainColumnView>
  );
}
