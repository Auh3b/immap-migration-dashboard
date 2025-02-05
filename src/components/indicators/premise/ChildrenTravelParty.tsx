import { _FilterTypes } from '@carto/react-core';
import { Grid } from '@material-ui/core';
import { BasicWidgetType } from 'components/common/customWidgets/basicWidgetType';
import CustomStackedBarWidget from 'components/common/customWidgets/CustomStackedBarWidget';
import { defaultCustomWidgetProps } from 'components/common/customWidgets/customWidgetsType';
import WidgetNote from 'components/common/customWidgets/WidgetNote';
import useWidgetEffect from '../utils/useWidgetEffect';
import { EXTERNAL_METHOD_NAMES } from 'utils/methods/methods';

const title = 'NNA no acompañados y separados';
const NOTE =
  'Presencia de niños, niñas y adolescentes no acompañados y separados';
const id = 'childrenTravelParty';
const column = 'serv_dif_n';
const filterType = _FilterTypes.IN;
const methodName = EXTERNAL_METHOD_NAMES.STACKED_BAR_CATEGORIES;
const methodParams = {
  columns: ['nna_no_aco', 'nna_separ_'],
  legend: ['No acompañados', 'Separados'],
};

const props: defaultCustomWidgetProps = {
  title,
  column,
  id,
  filterType,
  methodName,
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
