import { AggregationTypes, groupValuesByColumn, _FilterTypes } from "@carto/react-core";
import { Grid } from "@material-ui/core";
import { BasicWidgetType } from "components/common/customWidgets/basicWidgetType";
import CustomPieWidget from "components/common/customWidgets/CustomPieWidget";
import WidgetNote from "components/common/customWidgets/WidgetNote";

const labels = {
  1 : 'Fácil',
  2 : 'Regular',
  3 : 'Difícil'
}

const NOTE = 'Percepción de accesibilidad a servicios humanitarios'
const id ='accessServicesAdult'
const title ='Accesibilidad'
const column = 'cb_fl_co_1'
const filterType = _FilterTypes.IN
const operationDefault = AggregationTypes.COUNT 

const method = (input: any[], column:string):any[] =>{
  return groupValuesByColumn({
    data: input,
    keysColumn: column,
    valuesColumns: [column],
    operation: operationDefault
  })
}

export function ServiceAccessAdult({dataSource, operation}: BasicWidgetType) {
  return (
    <Grid item>
       <CustomPieWidget
        id={id}
        title={title}
        dataSource={dataSource} 
        filterType={filterType}
        column={column}  
        method={method}
        labels={labels}
      />
      <WidgetNote note={NOTE} />
    </Grid>
  )
}
  