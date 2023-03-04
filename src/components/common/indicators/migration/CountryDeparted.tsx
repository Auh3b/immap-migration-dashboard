import { AggregationTypes, _FilterTypes } from "@carto/react-core";
import { CategoryWidget } from "@carto/react-widgets";
import { Grid } from "@material-ui/core";
import { BasicWidgetType } from "components/common/customWidgets/basicWidgetType";
import WidgetNote from "components/common/customWidgets/WidgetNote";

const NOTE = 'País desde donde inicia el flujo migratorio'
const id ='countryDeparted'
const title ='País inicial de flujo'
const column = 'pais_inici'
const operationDefault = AggregationTypes.COUNT

export default function CountryDeparted({dataSource, operation}:BasicWidgetType) {
  return( 
    <Grid item>
      <CategoryWidget 
        id={id}
        title={title}
        dataSource={dataSource} 
        column={column}  
        operation={operation ? operation : operationDefault}
      />
      <WidgetNote note={NOTE} />
    </Grid>
  )
}