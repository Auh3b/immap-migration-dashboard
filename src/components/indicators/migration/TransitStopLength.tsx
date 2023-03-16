import { _FilterTypes } from '@carto/react-core';
import { Grid } from '@material-ui/core';
import { BasicWidgetType } from 'components/common/customWidgets/basicWidgetType';
import CustomHistogramWidget from 'components/common/customWidgets/CustomHistogramWidget';
import WidgetNote from 'components/common/customWidgets/WidgetNote';
import histogramValues from '../utils/histogramValues';
import useWidgetEffect from '../utils/useWidgetEffect';

const NOTE =
  'Duración promedio de días de estadía de migrantes en zona de tránsito.';
const id = 'daysInTransitStay';
const title = 'Días de estadía';
const column = 'm30__cua';
const filterType = _FilterTypes.CLOSED_OPEN;
const method = histogramValues

const xAxisFormatter = (value: number) => {
  if (value % 1 === 0 || value === 0) {
    return value;
  }
  return '';
};

const props = {
  id,
  title,
  column,
  filterType,
  method,
  // xAxisFormatter,
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
