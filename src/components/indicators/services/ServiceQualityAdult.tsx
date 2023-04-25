import { _FilterTypes } from '@carto/react-core';
import { Grid } from '@material-ui/core';
import { BasicWidgetType } from 'components/common/customWidgets/basicWidgetType';
import CustomComparativeCategoryWidget from 'components/common/customWidgets/CustomComparativeCategoryWidget';
import WidgetNote from 'components/common/customWidgets/WidgetNote';
import stackedGroupCategories from '../utils/stackedGroupCategories';
import useWidgetEffect from '../utils/useWidgetEffect';
import aidTypes from './utils/aidTypes';
import CustomColumnBarWidget from 'components/common/customWidgets/CustomColumnBarWidget';
import stackedGroupCategoriesAlt from '../utils/stackedGroupCategoryAlt';

const labels = new Map([
  [1, 'Satisfecho'],
  [2, 'Algo satisfecho'],
  [3, 'Insatisfecho'],
  [0, 'No calificado'],
]);

const colors = new Map([
  ['No calificado', '#bcbcbc'],
  ['Satisfecho', '#32a852'],
  ['Algo satisfecho', '#fa0'],
  ['Insatisfecho', '#f27'],
]);

const NOTE = 'Nivel de satisfacción del servicio prestado al migrante';
const id = 'serviceQualityAdult';
const title = 'Calidad del servicio';
const column = 'e23__cua';
const valueColumn = 'm15__que';
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
  labels,
  methodParams,
  extraProps,
  parentKey: aidTypes,
};

export default function ServiceQualityAdult({
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
