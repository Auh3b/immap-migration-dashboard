import { _FilterTypes } from '@carto/react-core';
import { Grid } from '@material-ui/core';
import { BasicWidgetType } from 'components/common/customWidgets/basicWidgetType';
import CustomHistogramWidget from 'components/common/customWidgets/CustomHistogramWidget';
import WidgetNote from 'components/common/customWidgets/WidgetNote';
import useWidgetEffect from '../utils/useWidgetEffect';
import { EXTERNAL_METHOD_NAMES } from 'utils/methods/methods';

const NOTE =
  'Duración promedio de días de estadía de migrantes en zona de tránsito.';
const id = 'daysInTransitStay';
const title = 'Días de estadía';
const column = 'm30__cua';
const filterType = _FilterTypes.CLOSED_OPEN;
const methodName = EXTERNAL_METHOD_NAMES.HISTOGRAM_VALUES;

const props = {
  id,
  title,
  column,
  filterType,
  methodName,
};

export default function TransitStopLength({ dataSource }: BasicWidgetType) {
  const { widget } = useWidgetEffect(
    <CustomHistogramWidget {...props} dataSource={dataSource} />,
    [dataSource],
  );
  return (
    <Grid item>
      {widget}
      <WidgetNote note={NOTE} />
    </Grid>
  );
}
