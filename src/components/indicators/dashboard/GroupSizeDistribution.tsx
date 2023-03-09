import { AggregationTypes } from '@carto/react-core';
import { CategoryWidget } from '@carto/react-widgets';
import { Grid } from '@material-ui/core';
import WidgetNote from 'components/common/customWidgets/WidgetNote';
import { BasicWidgetType } from 'components/common/customWidgets/basicWidgetType';
import useWidgetEffect from '../utils/useWidgetEffect';

const NOTE = 'Distribución de tamaño de grupo de viaje';
const title = 'Tamaño de grupo de viaje';
const id = 'tripComposition';
const column = 'acompanan';
const operationDefault = AggregationTypes.COUNT;

const props = {
  id,
  title,
  column,
};

export default function GroupSizeDistribution({
  dataSource,
  operation,
}: BasicWidgetType) {
  const { widget } = useWidgetEffect(
    <CategoryWidget
      {...props}
      dataSource={dataSource}
      operation={operation ? operation : operationDefault}
    />,
    [dataSource, operation],
  );
  return (
    <Grid item>
      {widget}
      <WidgetNote note={NOTE} />
    </Grid>
  );
}
