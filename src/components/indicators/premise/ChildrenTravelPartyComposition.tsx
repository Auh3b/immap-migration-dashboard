import { AggregationTypes, _FilterTypes } from '@carto/react-core';
import { Grid } from '@material-ui/core';
import { BasicWidgetType } from 'components/common/customWidgets/basicWidgetType';
import CustomStackedBarWidget from 'components/common/customWidgets/CustomStackedBarWidget';
import { defaultCustomWidgetProps } from 'components/common/customWidgets/customWidgetsType';
import WidgetNote from 'components/common/customWidgets/WidgetNote';
import useWidgetEffect from '../utils/useWidgetEffect';
import { EXTERNAL_METHOD_NAMES } from 'utils/methods/methods';

const title =
  'Atención a niños, niñas y adolescentes no acompañados y separados';
const NOTE =
  'Cuántos niños, niñas y adolescentes no acompañados y separados atendieron durante la semana inmediatamente anterior';
const id = 'childrenTravelPartyComposition';
const column = 'serv_dif_n';
const filterType = _FilterTypes.IN;
const methodName = EXTERNAL_METHOD_NAMES.GROUPED_COLUMNS;
const methodParams = {
  columns: ['cuan_nna_n', 'cuan_nna_s'],
  legend: ['Acompañados NNA', 'Separados NNA'],
  aggregateType: AggregationTypes.SUM,
};

const props: defaultCustomWidgetProps = {
  title,
  column,
  id,
  filterType,
  methodName,
  methodParams,
  stacked: true,
};

export default function ChildrenTravelPartyComposition({
  dataSource,
}: BasicWidgetType) {
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
