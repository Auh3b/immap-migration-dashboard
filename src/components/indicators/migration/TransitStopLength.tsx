import { _FilterTypes } from '@carto/react-core';
import { Grid } from '@material-ui/core';
import { BasicWidgetType } from 'components/common/customWidgets/basicWidgetType';
import CustomHistogramWidget from 'components/common/customWidgets/CustomHistogramWidget';
import WidgetNote from 'components/common/customWidgets/WidgetNote';

const NOTE =
  'Duración promedio de días de estadía de migrantes en zona de tránsito.';
const id = 'daysInTransitStay';
const title = 'Días de estadía';
const column = 'cb_fl_c_23';
const filterType = _FilterTypes.CLOSED_OPEN;
const min = 0;
const max = 2;
const ticks = [0, 1, 2];
const method = (input: any[], column: string) => {
  const target = input.map((i: any) => i[column]);
  if (target) {
    return target;
  }
  return [];
};

const props = {
  id,
  title,
  column,
  filterType,
  min,
  max,
  method,
  ticks,
};

export default function TransitStopLength({ dataSource }: BasicWidgetType) {
  return (
    <Grid item>
      <CustomHistogramWidget {...props} dataSource={dataSource} />
      <WidgetNote note={NOTE} />
    </Grid>
  );
}
