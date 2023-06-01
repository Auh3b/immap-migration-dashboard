import { _FilterTypes } from '@carto/react-core';
import { Grid } from '@material-ui/core';
import { BasicWidgetType } from 'components/common/customWidgets/basicWidgetType';
import CustomHistogramWidget from 'components/common/customWidgets/CustomHistogramWidget';
import WidgetNote from 'components/common/customWidgets/WidgetNote';
import histogramValues from '../utils/histogramValues';
import useWidgetEffect from '../utils/useWidgetEffect';
import { EXTERNAL_METHOD_NAMES } from 'utils/methods/methods';

const NOTE =
  'Cuántos niños, niñas y adolescentes fueron atendidos durante la semana inmediatamente anterior en el punto de servicio / ayuda humanitaria.';
const id = 'childrenUnderCare';
const title = 'Identificación de NNA atendidos';
const column = 'nna_atend';
const filterType = _FilterTypes.CLOSED_OPEN;
const methodName = EXTERNAL_METHOD_NAMES.HISTOGRAM_VALUES;
const bins = 6;

const props = {
  id,
  title,
  column,
  filterType,
  methodName,
  bins,
};

export default function ChildrenUnderCare({ dataSource }: BasicWidgetType) {
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
