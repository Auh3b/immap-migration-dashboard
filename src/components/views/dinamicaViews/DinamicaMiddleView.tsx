import { Grid } from "@material-ui/core";
import ObservedDate from "components/indicators/premise/ObservedDate";

export default function DinamicaMiddleView({
  dataSources, classes
}:any) {
  const { premiseSource } = dataSources
  return (
    <Grid xs item>
      <ObservedDate dataSource={premiseSource}/>
    </Grid>
  )
}
