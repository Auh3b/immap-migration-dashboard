import { _FilterTypes } from '@carto/react-core';
import { Grid } from '@material-ui/core';
import { BasicWidgetType } from 'components/common/customWidgets/basicWidgetType';
import CustomComparativeCategoryWidget from 'components/common/customWidgets/CustomComparativeCategoryWidget';
import WidgetNote from 'components/common/customWidgets/WidgetNote';
import stackedGroupCategories from '../utils/stackedGroupCategories';
import useWidgetEffect from '../utils/useWidgetEffect';
import aidTypes from './utils/aidTypes';
import stackedGroupCategoriesAlt from '../utils/stackedGroupCategoryAlt';
import CustomColumnBarWidget from 'components/common/customWidgets/CustomColumnBarWidget';

const labels = new Map([
  [1, 'Fácil'],
  [2, 'Regular'],
  [3, 'Difícil'],
  [0, 'No calificado'],
]);

const colors = new Map([
  ['No calificado', '#bcbcbc'],
  ['Fácil', '#32a852'],
  ['Regular', '#fa0'],
  ['Difícil', '#f27'],
]);

const NOTE = 'Percepción de accesibilidad a servicios humanitarios';
const id = 'accessServicesAdult';
const title = 'Accesibilidad';
const column = 'e23__cua';
const valueColumn = 'm14_respec';
const filterType = _FilterTypes.IN;
const method = stackedGroupCategoriesAlt;
const methodParams = {
  aidTypes,
  labels,
  valueColumn,
};
const extraProps = {
  labels,
  colors
}

const props = {
  id,
  title,
  column,
  filterType,
  method,
  methodParams,
  labels,
  parentKey: aidTypes,
  extraProps,
};

export default function ServiceAccessAdult({
  dataSource,
  operation,
}: BasicWidgetType) {
  const { widget } = useWidgetEffect(
    <CustomColumnBarWidget {...props} dataSource={dataSource} />
  , [dataSource, operation]);
  return (
    <Grid item>
      {widget}
      <WidgetNote note={NOTE} />
    </Grid>
  );
}
