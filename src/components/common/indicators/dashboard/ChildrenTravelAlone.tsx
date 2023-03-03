import { AggregationTypes } from "@carto/react-core";
import { CategoryWidget } from "@carto/react-widgets";
import { Grid } from "@material-ui/core";
import { BasicWidgetType } from "components/common/customWidgets/basicWidgetType";

const operationDefault = AggregationTypes.COUNT

export default function ChildrenTravelAlone({dataSource, operation}:BasicWidgetType) {
  return (
  <Grid item>
    <CategoryWidget 
    id='travellingAlone' 
    title='NNA viajan solos' 
    dataSource={dataSource} 
    column='nna' 
    operation={operation ? operation : operationDefault} 
    operationColumn='nna' />
  </Grid>
  );
}
  
  