import { AggregationTypes } from "@carto/react-core";
import { HistogramWidget } from "@carto/react-widgets";
import { Grid } from "@material-ui/core";
import { BasicWidgetType } from "components/common/customWidgets/basicWidgetType";
import WidgetNote from "components/common/customWidgets/WidgetNote";

const NOTE = 'Duración promedio de días de estadía de migrantes en zona de tránsito.'
const id ='daysInTransitStay'
const title ='Días de estadía'
const column = 'pais_vivia'
const operationDefault = AggregationTypes.COUNT

export function TransitStopLength({dataSource, operation}:BasicWidgetType) {
  return (
    <Grid item>
      <HistogramWidget 
        id={id}
        title={title} 
        dataSource={dataSource} 
        ticks={[1, 2, 3, 4]} 
        column={column} 
        operation={operation ? operation : operationDefault} 
        onError={console.error} />
      <WidgetNote note={NOTE} />
    </Grid>)
}
  