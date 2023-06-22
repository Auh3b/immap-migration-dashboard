import { _FilterTypes } from '@carto/react-core';
import { Grid } from '@material-ui/core';
import { BasicWidgetType } from 'components/common/customWidgets/basicWidgetType';
import CustomCategoryWidget from 'components/common/customWidgets/CustomCategoryWidget';
import WidgetNote from 'components/common/customWidgets/WidgetNote';
import useWidgetEffect from '../utils/useWidgetEffect';
import { EXTERNAL_METHOD_NAMES } from 'utils/methods/methods';

const CATEGORY_ABREVATIONS = new Map([
  [0, 'Ninguna'],
  [1, 'Tengo problemas de salud (o mi grupo de viaje)'],
  [2, 'Necesito descansar unos días antes de continuar	'],
  [3, 'No tengo dinero para continuar con el viaje	'],
  [4, 'Tuve problemas con autoridades migratorias'],
  [5, 'Encontré trabajo temporal	'],
  [6, 'Decidí quedarme un tiempo en el lugar que estoy'],
  [7, 'El clima no es favorable para viajar'],
  [8, 'No viajo por cuestiones de seguridad'],
]);

const NOTE = 'Razón (es) para no continuar el viaje.';
const id = 'Razón_no_continúa_viaje';
const title = 'Razón no continúa viaje';
const column = 'm29_por_qu';
const filterType = _FilterTypes.STRING_SEARCH;
const methodName = EXTERNAL_METHOD_NAMES.CONCATENATED_VALUES;
const labels = Object.fromEntries(CATEGORY_ABREVATIONS);

const props = {
  id,
  title,
  column,
  methodName,
  filterType,
  filterParams: {
    useRegExp: true,
    valueFormatter: labels
  },
  labels,
};

export default function TransitStopReason({ dataSource }: BasicWidgetType) {
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
