import {
  AggregationTypes,
  groupValuesByColumn,
  _FilterTypes,
} from '@carto/react-core';
import { Grid } from '@material-ui/core';
import { BasicWidgetType } from 'components/common/customWidgets/basicWidgetType';
import CustomBarWidget from 'components/common/customWidgets/CustomBarWidget';
import WidgetNote from 'components/common/customWidgets/WidgetNote';
import groupCategories from '../utils/groupCategories';

const method = groupCategories;

const NOTE = 'Personas que alguna vez ha dormido en la intemperie en la ruta';
const id = 'sleepOutDoor';
const title = 'Población que duerme a la intemperie';
const column = 'dormir_int';
const filterType = _FilterTypes.IN;

export default function SleepOutDoor({ dataSource }: BasicWidgetType) {
  return (
    <Grid item>
      <CustomBarWidget
        id={id}
        title={title}
        column={column}
        dataSource={dataSource}
        filterType={filterType}
        method={method}
      />
      <WidgetNote note={NOTE} />
    </Grid>
  );
}
