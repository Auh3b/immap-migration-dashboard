import { AggregationTypes, _FilterTypes } from '@carto/react-core';
import { CategoryWidget } from '@carto/react-widgets';
import { Grid } from '@material-ui/core';
import { BasicWidgetType } from 'components/common/customWidgets/basicWidgetType';
import WidgetNote from 'components/common/customWidgets/WidgetNote';

const labels = {
  1: 'Ubicaciones de la ayuda humanitaria',
};

const NOTE =
  'Tipo de información requerida sobre la ayuda humanitaria en la ruta';
const id = 'transitInformation';
const title = 'Necesidades de información';
const column = 'cb_fl_c_14';
const operationDefault = AggregationTypes.COUNT;

export default function TransitInfomation({
  dataSource,
  operation,
}: BasicWidgetType) {
  return (
    <Grid item>
      <CategoryWidget
        id={id}
        title={title}
        dataSource={dataSource}
        column={column}
        operation={operation ? operation : operationDefault}
        labels={labels}
      />
      <WidgetNote note={NOTE} />
    </Grid>
  );
}
