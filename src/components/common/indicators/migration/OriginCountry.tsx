import { AggregationTypes, _FilterTypes } from "@carto/react-core";
import { CategoryWidget } from "@carto/react-widgets";
import { Grid } from "@material-ui/core";
import { BasicWidgetType } from "components/common/customWidgets/basicWidgetType";
import WidgetNote from "components/common/customWidgets/WidgetNote";

const NOTE = 'País de nacimiento del migrante que responde.'
const id ='originCountry'
const title ='País de nacimiento'
const column = 'pais_nacim'
const operationDefault = AggregationTypes.COUNT

export default function OriginCountry({dataSource, operation}:BasicWidgetType) {
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