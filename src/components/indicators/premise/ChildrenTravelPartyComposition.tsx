import { AggregationTypes, _FilterTypes } from '@carto/react-core';
import { Grid } from '@material-ui/core';
import { BasicWidgetType } from 'components/common/customWidgets/basicWidgetType';
import CustomBarWidget from 'components/common/customWidgets/CustomBarWidget';
import CustomStackedBarWidget from 'components/common/customWidgets/CustomStackedBarWidget';
import { defaultCustomWidgetProps } from 'components/common/customWidgets/customWidgetsType';
import WidgetNote from 'components/common/customWidgets/WidgetNote';
import groupCategories from '../utils/groupCategories';
import groupedColumns from '../utils/groupedColumns';
import stackedBarCategories from '../utils/stackedBarCategories';
import useWidgetEffect from '../utils/useWidgetEffect';

const title = 'Atención a niños, niñas y adolescentes no acompañados y separados';
const NOTE = 'Cuántos niños, niñas y adolescentes no acompañados y separados atendieron durante la semana inmediatamente anterior';
const id = 'childrenTravelPartyComposition';
const column = 'serv_dif_n';
const filterType = _FilterTypes.IN;
const method = groupedColumns;
const methodParams = {
  columns: ['cuan_nna_n', 'cuan_nna_s'],
  legend: ['Acompañados NNA', 'Separados NNA'],
  aggregateType: AggregationTypes.SUM
}

const props: defaultCustomWidgetProps = {
  title,
  column,
  id,
  filterType,
  method,
  methodParams,
};

export default function ChildrenTravelPartyComposition({ dataSource }: BasicWidgetType) {
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