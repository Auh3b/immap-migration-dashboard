import { _FilterTypes } from '@carto/react-core';
import { Grid } from '@material-ui/core';
import { BasicWidgetType } from 'components/common/customWidgets/basicWidgetType';
import CustomComparativeCategoryWidget from 'components/common/customWidgets/CustomComparativeCategoryWidget';
import WidgetNote from 'components/common/customWidgets/WidgetNote';
import stackedGroupCategories from '../utils/stackedGroupCategories';
import useWidgetEffect from '../utils/useWidgetEffect';
import aidTypes from './utils/aidTypes';

const labels = new Map([
  [0, 'No calificado'],
  [1, 'Sí recomendaría'],
  [2, 'No estoy seguro(a)'],
  [3, 'No recomendaría'],
]);

const colorMap = new Map([
  ['No calificado', '#bcbcbc'],
  ['Sí recomendaría', '#32a852'],
  ['No estoy seguro(a)', '#fa0'],
  ['No recomendaría', '#f27'],
]);

const NOTE = 'Disposición para recomendar el servicio tomado    ';
const id = 'serviceSatisfaction';
const title = 'Recomendación del servicio';
const column = 'e23__cua';
const valueColumn = 'm16_de_acu';
const filterType = _FilterTypes.IN;
const method = stackedGroupCategories;
const methodParams = {
  aidTypes,
  labels,
  valueColumn,
};

const props = {
  id,
  title,
  column,
  filterType,
  method,
  methodParams,
  labels,
  colorMap,
};

export default function ServiceSatisfyAdult({
  dataSource,
  operation,
}: BasicWidgetType) {
  const { widget } = useWidgetEffect(
    <CustomComparativeCategoryWidget {...props} dataSource={dataSource} />,
    [dataSource, operation],
  );
  return (
    <Grid item>
      {widget}
      <WidgetNote note={NOTE} />
    </Grid>
  );
}
