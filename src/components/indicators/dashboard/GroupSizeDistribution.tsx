import { _FilterTypes } from '@carto/react-core';
import { Grid } from '@material-ui/core';
import WidgetNote from 'components/common/customWidgets/WidgetNote';
import { BasicWidgetType } from 'components/common/customWidgets/basicWidgetType';
import useWidgetEffect from '../utils/useWidgetEffect';
import CustomHistogramWidget from 'components/common/customWidgets/CustomHistogramWidget';
import histogramValues from '../utils/histogramValues';

const NOTE = 'Distribución de tamaño de grupo de viaje';
const title = 'Tamaño de grupo de viaje';
const id = 'tripComposition';
const column = 'e17__cua';
const method = histogramValues;
const filterType = _FilterTypes.CLOSED_OPEN;
const bins = 4;

const props = {
  id,
  title,
  column,
  method,
  filterType,
  bins,
};

export default function GroupSizeDistribution({
  dataSource,
  operation,
}: BasicWidgetType) {
  const { widget } = useWidgetEffect(
    <CustomHistogramWidget {...props} dataSource={dataSource} />,
    [dataSource, operation],
  );
  return (
    <Grid item>
      {widget}
      <WidgetNote note={NOTE} />
    </Grid>
  );
}
