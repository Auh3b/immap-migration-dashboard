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
  [1, 'Fácil'],
  [2, 'Regular'],
  [3, 'Difícil'],
]);

const colorMap = new Map([
  ['No calificado', '#bcbcbc'],
  ['Fácil', '#32a852'],
  ['Regular', '#fa0'],
  ['Difícil', '#f27'],
]);

const NOTE = 'Percepción de accesibilidad a servicios humanitarios';
const id = 'accessServicesAdult';
const title = 'Accesibilidad';
const column = 'm18_me_con';
const valueColumn = 'm19_respec';
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

export default function ServiceAccessChildren({
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
