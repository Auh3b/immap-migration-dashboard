import { AggregationTypes, _FilterTypes } from '@carto/react-core';
import { Grid } from '@material-ui/core';
import { BasicWidgetType } from 'components/common/customWidgets/basicWidgetType';
import CustomStackedBarWidget from 'components/common/customWidgets/CustomStackedBarWidget';
import { defaultCustomWidgetProps } from 'components/common/customWidgets/customWidgetsType';
import WidgetNote from 'components/common/customWidgets/WidgetNote';
import groupedColumns from '../utils/groupedColumns';
import useWidgetEffect from '../utils/useWidgetEffect';

const title = 'Servicio de alimentación y nutrición por día';
const NOTE = 'Capacidad diaria, personas atendidas ayer y promedio diario atendido de personas por el servicio de alimentación y nutrición por día';
const id = 'foodServices';
const column = '';
const filterType = _FilterTypes.IN;
const method = groupedColumns;
const methodParams = {
  columns: ['tipo_alime', 'pers_alim','prom_pers_'],
  legend: ['Capacidad diaria', 'Sirvió ayer', 'Promedio diario'],
  aggregateType: AggregationTypes.SUM
}

const props: defaultCustomWidgetProps = {
  title,
  column,
  id,
  filterType,
  method,
  methodParams,
  stacked: true,
};

export default function FoodService({ dataSource }: BasicWidgetType) {
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
