import { AggregationTypes } from '@carto/react-core';
import { CategoryWidget } from '@carto/react-widgets';
import { Grid } from '@material-ui/core';
import WidgetNote from 'components/common/customWidgets/WidgetNote';
import { BasicWidgetType } from 'components/common/customWidgets/basicWidgetType';

const NOTE = 'Distribución de tamaño de grupo de viaje'
const title = 'Tamaño de grupo de viaje'
const id = 'tripComposition'
const column ='acompanan'
const operationDefault = AggregationTypes.COUNT

export default function GroupSizeDistribution({dataSource, operation}:BasicWidgetType) {

  return (
    <Grid item>
      <CategoryWidget
        id={id}
        column={column}
        title={title}
        dataSource={dataSource}
        operation={operation ? operation : operationDefault}
      />
      <WidgetNote note={NOTE}/>
    </Grid>
  );
}
