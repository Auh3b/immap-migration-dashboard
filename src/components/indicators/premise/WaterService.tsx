import { AggregationTypes, _FilterTypes } from '@carto/react-core';
import { Grid } from '@material-ui/core';
import { BasicWidgetType } from 'components/common/customWidgets/basicWidgetType';
import CustomStackedBarWidget from 'components/common/customWidgets/CustomStackedBarWidget';
import { defaultCustomWidgetProps } from 'components/common/customWidgets/customWidgetsType';
import WidgetNote from 'components/common/customWidgets/WidgetNote';
import groupedColumns from '../utils/groupedColumns';
import useWidgetEffect from '../utils/useWidgetEffect';
import stackedBarCategories from '../utils/stackedBarCategories';

const title = 'Servicio de agua';
const NOTE =
  'Capacidad diaria, personas atendidas ayer y promedio diario atendido de personas por el servicio de servicio de agua';
const id = 'waterServices';
const column = '';
const filterType = _FilterTypes.IN;
const method = stackedBarCategories;
const methodParams = {
  columns: ['prom_agua_', 'serv_agua', 'prom_agua1'],
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

export default function WaterService({ dataSource }: BasicWidgetType) {
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
