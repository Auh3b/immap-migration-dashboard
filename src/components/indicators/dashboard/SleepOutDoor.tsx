import {
  _FilterTypes,
} from '@carto/react-core';
import { Grid } from '@material-ui/core';
import { BasicWidgetType } from 'components/common/customWidgets/basicWidgetType';
import CustomBarWidget from 'components/common/customWidgets/CustomBarWidget';
import WidgetNote from 'components/common/customWidgets/WidgetNote';
import groupCategories from '../utils/groupCategories';
import useWidgetEffect from '../utils/useWidgetEffect';

const method = groupCategories;

const NOTE = 'Personas que alguna vez ha dormido en la intemperie en la ruta';
const id = 'sleepOutDoor';
const title = 'Población que duerme a la intemperie';
const column = 'dormir_int';
const filterType = _FilterTypes.IN;

const props = {
  title,
  column,
  id,
  filterType,
  method,
};

export default function SleepOutDoor({ dataSource }: BasicWidgetType) {
  const { widget } = useWidgetEffect(
    <CustomBarWidget dataSource={dataSource} {...props} />,
    [dataSource],
  );
  return (
    <Grid item>
      {widget}
      <WidgetNote note={NOTE} />
    </Grid>
  );
}
