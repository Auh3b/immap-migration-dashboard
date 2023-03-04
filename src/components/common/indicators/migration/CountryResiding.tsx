import { AggregationTypes, _FilterTypes } from "@carto/react-core";
import { CategoryWidget } from "@carto/react-widgets";
import { Grid } from "@material-ui/core";
import { BasicWidgetType } from "components/common/customWidgets/basicWidgetType";
import WidgetNote from "components/common/customWidgets/WidgetNote";

const NOTE = 'País donde residía hace un año.'
const id ='countryResiding'
const title ='País de residencia'
const column = 'pais_vivia'
const operationDefault = AggregationTypes.COUNT

export default function CountryResiding({dataSource, operation}:BasicWidgetType) {
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
  