import { AggregationTypes } from "@carto/react-core";
import { BarWidget } from "@carto/react-widgets";
import { Grid } from "@material-ui/core";
import { BasicWidgetType } from "components/common/customWidgets/basicWidgetType";
import WidgetNote from "components/common/customWidgets/WidgetNote";

const operationDefault = AggregationTypes.COUNT
const title = 'Identificación de personas con condición de discapacidad'
const NOTE = 'Personas con alguna condición de discapacidad (física, visual, auditiva, intelectual, etc.)'

export function PeopleWithDisability({dataSource, operation}:BasicWidgetType) {
  return (
    <Grid item>
      <BarWidget 
        id='disabledPeople' 
        title={title} 
        dataSource={dataSource} 
        column='cb_fl_id14' 
        operation={operation ? operation : operationDefault} 
        operationColumn='cb_fl_id14' 
      />
      <WidgetNote note={NOTE} />
    </Grid>)
}
  