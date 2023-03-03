import { AggregationTypes } from "@carto/react-core";
import { BarWidget } from "@carto/react-widgets";
import { Grid } from "@material-ui/core";
import { BasicWidgetType } from "components/common/customWidgets/basicWidgetType";
import WidgetNote from "components/common/customWidgets/WidgetNote";

const NOTE = 'Grupos de viaje con mujeres embarazadas'
const title = 'Identificación de gestantes'
const column = 'cb_fl_id12'
const operationDefault = AggregationTypes.COUNT
const id ='pregnantWoment'

export function PregnantWoment({dataSource, operation}:BasicWidgetType) {
  return (
    <Grid item>
      <BarWidget 
        id={id} 
        title={title} 
        dataSource={dataSource} 
        column={column} 
        operation={operation ? operation : operationDefault}
        operationColumn={column} />
      <WidgetNote note={NOTE} />
    </Grid>
  )
}
  