import { AggregationTypes, _FilterTypes } from '@carto/react-core';
import { Grid } from '@material-ui/core';
import { BasicWidgetType } from 'components/common/customWidgets/basicWidgetType';
import CustomStackedBarWidget from 'components/common/customWidgets/CustomStackedBarWidget';
import { defaultCustomWidgetProps } from 'components/common/customWidgets/customWidgetsType';
import WidgetNote from 'components/common/customWidgets/WidgetNote';
import useWidgetEffect from '../utils/useWidgetEffect';
import singleStackBarValues from '../utils/singleStackBarValues';

const title = 'Servicio de higiene';
const NOTE =
  'Capacidad diaria, personas atendidas ayer y promedio diario atendido de personas por el servicio de higiene';
const id = 'hygieneServices';
const column = '';
const filterType = _FilterTypes.IN;
const method = singleStackBarValues;
const methodParams = {
  columns: ['serv_hig_d', 'serv_hig_a', 'prom_ser_h'],
  legend: ['Capacidad diaria', 'Personas atendidas ayer', 'Promedio diario'],
  aggregateType: AggregationTypes.SUM,
};

const props: defaultCustomWidgetProps = {
  title,
  column,
  id,
  filterType,
  method,
  methodParams,
  stacked: false,
};

export default function HygieneService({ dataSource }: BasicWidgetType) {
  const { widget } = useWidgetEffect(
    <CustomStackedBarWidget dataSource={dataSource} {...props} />,
    [dataSource],
  );
  return (
    <Grid item>
      {widget}
      <WidgetNote note={NOTE} />
    </Grid>
  );
}
