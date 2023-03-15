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
  [1, 'Satisfecho'],
  [2, 'Algo satisfecho'],
  [3, 'Insatisfecho'],
]);

const colorMap = new Map([
  ['No calificado', '#333333'],
  ['Satisfecho', "#32a852"],
  ['Algo satisfecho',"#fa0"],
  ['Insatisfecho', "#f27"]
])

const NOTE = 'Nivel de satisfacción del servicio prestado al migrante';
const id = 'serviceQualityAdult';
const title = 'Calidad del servicio';
const column = 'm18_me_con';
const valueColumn = 'm20__que';
const filterType = _FilterTypes.IN;
const method = stackedGroupCategories;
const methodParams = {
  aidTypes,
  labels,
  valueColumn
};

const props = {
  id,
  title,
  column,
  filterType,
  method,
  methodParams,
  labels,
  colorMap
};

export default function ServiceQualityChildren({
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
