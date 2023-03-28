import { _FilterTypes } from '@carto/react-core';
import { Grid } from '@material-ui/core';
import { BasicWidgetType } from 'components/common/customWidgets/basicWidgetType';
import CustomHistogramWidget from 'components/common/customWidgets/CustomHistogramWidget';
import WidgetNote from 'components/common/customWidgets/WidgetNote';
import histogramValues from '../utils/histogramValues';
import useWidgetEffect from '../utils/useWidgetEffect';

const NOTE ='Cuántos niños, niñas y adolescentes fueron atendidos durante la semana inmediatamente anterior en el punto de servicio / ayuda humanitaria.';
const id = 'childrenUnderCare';
const title = 'Identificación de NNA atendidos';
const column = 'nna_atend';
const filterType = _FilterTypes.CLOSED_OPEN;
const method = histogramValues;
const bins = 4

const props = {
  id,
  title,
  column,
  filterType,
  method,
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

