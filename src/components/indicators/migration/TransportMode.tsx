import { _FilterTypes } from '@carto/react-core';
import { Grid } from '@material-ui/core';
import { BasicWidgetType } from 'components/common/customWidgets/basicWidgetType';
import CustomCategoryWidget from 'components/common/customWidgets/CustomCategoryWidget';
import WidgetNote from 'components/common/customWidgets/WidgetNote';
import concatenatedValues from '../utils/concatenatedValues';
import useWidgetEffect from '../utils/useWidgetEffect';
import { EXTERNAL_METHOD_NAMES } from 'utils/methods/methods';

const CATEGORY_ABREVATIONS = new Map([
  [0, 'Ninguna'],
  [1, 'Bus'],
  [2, 'Barco'],
  [3, 'Avión'],
  [4, 'Han caminado'],
  [5, 'otro'],
]);

const NOTE = 'Medios de transporte empleados durante la ruta';
const id = 'transportMode';
const title = 'Medios de transporte';
const column = 'e14_medios';
const filterType = _FilterTypes.STRING_SEARCH;
const methodName = EXTERNAL_METHOD_NAMES.CONCATENATED_VALUES;
const labels = Object.fromEntries(CATEGORY_ABREVATIONS);

const props = {
  id,
  title,
  column,
  methodName,
  filterType,
  labels,
  filterParams:{
    useRegExp: true
  }
};

export default function TransportMode({ dataSource }: BasicWidgetType) {
  const { widget } = useWidgetEffect(
    <CustomCategoryWidget {...props} dataSource={dataSource} />,
    [dataSource],
  );
  return (
    <Grid item>
      {widget}
      <WidgetNote note={NOTE} />
    </Grid>
  );
}
