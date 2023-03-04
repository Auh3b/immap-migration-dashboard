import { AggregationTypes } from '@carto/react-core';
import { CategoryWidget } from '@carto/react-widgets';
import { Grid } from '@material-ui/core';
import { BasicWidgetType } from 'components/common/customWidgets/basicWidgetType';
import WidgetNote from 'components/common/customWidgets/WidgetNote';

const operationDefault = AggregationTypes.COUNT;
const NOTE =
  'Evidencia de niños, niñas y adolescentes (separados y no acompañados) en la ruta.';

export default function ChildrenTravelAlone({
  dataSource,
  operation,
}: BasicWidgetType) {
  return (
    <Grid item>
      <CategoryWidget
        id='travellingAlone'
        title='Presencia de NNA solos '
        dataSource={dataSource}
        column='cb_fl_id15'
        operation={operation ? operation : operationDefault}
        operationColumn='cb_fl_id15'
      />
      <WidgetNote note={NOTE} />
    </Grid>
  );
}
