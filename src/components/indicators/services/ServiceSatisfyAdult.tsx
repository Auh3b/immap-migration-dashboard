import { _FilterTypes } from '@carto/react-core';
import { Grid } from '@material-ui/core';
import { BasicWidgetType } from 'components/common/customWidgets/basicWidgetType';
import WidgetNote from 'components/common/customWidgets/WidgetNote';
import useWidgetEffect from '../utils/useWidgetEffect';
import aidTypes from './utils/aidTypes';
import CustomColumnBarWidget from 'components/common/customWidgets/CustomColumnBarWidget';
import stackedGroupCategoriesAlt from '../utils/stackedGroupCategoryAlt';

const labels = new Map([
  [1, 'Sí recomendaría'],
  [2, 'No estoy seguro(a)'],
  [3, 'No recomendaría'],
  [0, 'No calificado'],
]);

const colors = new Map([
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
const method = stackedGroupCategoriesAlt;
const methodParams = {
  aidTypes,
  labels,
  valueColumn,
};

const extraProps = {
  labels,
  colors,
};

const props = {
  id,
  title,
  column,
  filterType,
  method,
  methodParams,
  labels,
  extraProps,
  parentKey: aidTypes,
};

export default function ServiceSatisfyAdult({
  dataSource,
  operation,
}: BasicWidgetType) {
  const { widget } = useWidgetEffect(
    <CustomColumnBarWidget {...props} dataSource={dataSource} />,
    [dataSource, operation],
  );
  return (
    <Grid item>
      {widget}
      <WidgetNote note={NOTE} />
    </Grid>
  );
}
