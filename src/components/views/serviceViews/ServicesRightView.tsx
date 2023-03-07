import { Divider, Grid, Typography } from '@material-ui/core';
import { MainColumnView } from 'components/common/MainColumnView';

export default function ServicesRightView({ dataSources, classes }: any) {
  // const { mainSource } = dataSources;
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
