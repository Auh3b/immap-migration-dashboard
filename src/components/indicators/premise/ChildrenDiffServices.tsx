import { _FilterTypes } from '@carto/react-core';
import { Grid } from '@material-ui/core';
import { BasicWidgetType } from 'components/common/customWidgets/basicWidgetType';
import CustomCategoryWidget from 'components/common/customWidgets/CustomCategoryWidget';
import WidgetNote from 'components/common/customWidgets/WidgetNote';
import concatenatedValues from '../utils/concatenatedValues';
import useWidgetEffect from '../utils/useWidgetEffect';
import { EXTERNAL_METHOD_NAMES } from 'utils/methods/methods';

const CATEGORY_ABREVATIONS = new Map([
  [1, 'Apoyo Psicosocial'],
  [2, 'Gestión de casos de violencias basadas en género'],
  [3, 'Entrega de kits'],
  [4, 'Alimentación'],
  [5, 'Baños para niños, niñas o adolescentes'],
  [6, 'Cuidados alternativos (hogares temporales de cuidado)'],
  [7, 'Otro'],
]);

const NOTE =
  'Cuales servicios diferenciados para niños niñas y adolescentes se ofrecen en el punto de servicio / ayuda humanitaria?';
const id = 'childrenDifferentiatedServices';
const title = 'Cuales servicios diferenciados';
const column = 'cual_ser_1';
const filterType = _FilterTypes.STRING_SEARCH;
const methodName = EXTERNAL_METHOD_NAMES.CONCATENATED_VALUES;
const labels = Object.fromEntries(CATEGORY_ABREVATIONS);

const props = {
  id,
  title,
  column,
  methodName,
  filterType,
  filterParams:{
    useRegExp: true
  },
  labels,
};

export default function ChildrenDiffServices({ dataSource }: BasicWidgetType) {
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
