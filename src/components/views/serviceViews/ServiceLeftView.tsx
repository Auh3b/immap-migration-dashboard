import { Divider, Grid, Typography } from "@material-ui/core";
import { MainColumnView } from "components/common/MainColumnView";
import { lazy } from "react";

const ServiceAccessAdult = lazy(()=>import ("components/indicators/services/ServiceAccessAdult"))
const ServiceQualityAdult = lazy(()=>import ("components/indicators/services/ServiceQualityAdult"))
const ServiceSatisfyAdult = lazy(()=>import ("components/indicators/services/ServiceSatisfyAdult"))
const ServiceTypeAdult = lazy(()=>import ("components/indicators/services/ServiceTypeAdult"))

export default function ServiceLeftView({dataSources, classes}:any) {
  const { mainSource } = dataSources
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
  )
}
  