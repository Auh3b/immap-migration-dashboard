import { AggregationTypes } from '@carto/react-core';
import { CategoryWidget } from '@carto/react-widgets';
import { Grid } from '@material-ui/core';
import { BasicWidgetType } from 'components/common/customWidgets/basicWidgetType';
import WidgetNote from 'components/common/customWidgets/WidgetNote';
import useWidgetEffect from '../utils/useWidgetEffect';

const operationDefault = AggregationTypes.COUNT;
const NOTE = 'Rango de edades de grupo de viaje';
const id = 'travelGroupAges';
const title = 'Edades grupo de viaje';
const column = 'edadgr';

const props = {
  id,
  title,
  column,
};

export default function TravelGroupAges({
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
