import { AggregationTypes, _FilterTypes } from '@carto/react-core';
import { Grid } from '@material-ui/core';
import { BasicWidgetType } from 'components/common/customWidgets/basicWidgetType';
import CustomStackedBarWidget from 'components/common/customWidgets/CustomStackedBarWidget';
import { defaultCustomWidgetProps } from 'components/common/customWidgets/customWidgetsType';
import WidgetNote from 'components/common/customWidgets/WidgetNote';
import stackedBarCategories from '../utils/stackedBarCategories';
import useWidgetEffect from '../utils/useWidgetEffect';

const title = 'NNA no acompañados y separados';
const NOTE =
  'Presencia de niños, niñas y adolescentes no acompañados y separados';
const id = 'childrenTravelParty';
const column = 'serv_dif_n';
const filterType = _FilterTypes.IN;
const method = stackedBarCategories;
const methodParams = {
  columns: ['nna_no_aco', 'nna_separ_'],
  legend: ['No acompañados', 'Separados'],
  aggregateType: AggregationTypes.COUNT,
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

export default function ChildrenTravelParty({ dataSource }: BasicWidgetType) {
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
