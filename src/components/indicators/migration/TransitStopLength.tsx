import { _FilterTypes } from '@carto/react-core';
import { Grid } from '@material-ui/core';
import { BasicWidgetType } from 'components/common/customWidgets/basicWidgetType';
import WidgetNote from 'components/common/customWidgets/WidgetNote';
import useWidgetEffect from '../utils/useWidgetEffect';
import { EXTERNAL_METHOD_NAMES } from 'utils/methods/methods';
import CustomBarWidget from 'components/common/customWidgets/CustomBarWidget';

const NOTE =
  'Duración promedio de días de estadía de migrantes en zona de tránsito.';
const id = 'daysInTransitStay';
const title = 'Días de estadía';
const column = 'm30__cua';
const filterType = _FilterTypes.IN;
const methodName = EXTERNAL_METHOD_NAMES.GROUP_CATEGORIES;

const labels = Object.fromEntries([
  [1, '1 a 3 días'],
  [2, '4 a 8 días'],
  [3, '1 y 2 semanas'],
  [4, '+2 semanas'],
]);

const props = {
  id,
  title,
  column,
  filterType,
  methodName,
  labels,
};

export default function TransitStopLength({ dataSource }: BasicWidgetType) {
  const { widget } = useWidgetEffect(
    <CustomBarWidget {...props} dataSource={dataSource} />,
    [dataSource],
  );
  return (
    <Grid item>
      {widget}
      <WidgetNote note={NOTE} />
    </Grid>
  );
}
