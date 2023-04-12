import { _FilterTypes } from '@carto/react-core';
import { WrapperWidgetUI } from '@carto/react-ui';
import { Grid } from '@material-ui/core';
import { BasicWidgetType } from 'components/common/customWidgets/basicWidgetType';
import CustomBarWidget from 'components/common/customWidgets/CustomBarWidget';
import WidgetNote from 'components/common/customWidgets/WidgetNote';
import groupCategories from '../utils/groupCategories';
import useWidgetEffect from '../utils/useWidgetEffect';

export const timeOrder = [
  '12:00 am',
  '12:30 am',
  '1:00 am',
  '1:30 am',
  '2:00 am',
  '2:30 am',
  '3:00 am',
  '3:30 am',
  '4:00 am',
  '4:30 am',
  '5:00 am',
  '5:30 am',
  '6:00 am',
  '6:30 am',
  '7:00 am',
  '7:30 am',
  '8:00 am',
  '8:30 am',
  '9:00 am',
  '9:30 am',
  '10:00 am',
  '10:30 am',
  '11:00 am',
  '11:30 am',
  '12:00 pm',
  '12:30 pm',
  '1:00 pm',
  '1:30 pm',
  '2:00 pm',
  '2:30 pm',
  '3:00 pm',
  '3:30 pm',
  '4:00 pm',
  '4:30 pm',
  '5:00 pm',
  '5:30 pm',
  '6:00 pm',
  '6:30 pm',
  '7:00 pm',
  '7:30 pm',
  '8:00 pm',
  '8:30 pm',
  '9:00 pm',
  '9:30 pm',
  '10:00 pm',
  '10:30 pm',
  '11:00 pm',
  '11:30 pm',
];

const NOTE = 'Horarios de atención del punto de servicio ';
const title = 'Hora de inicio/fin de servicio (lunes a viernes)';

export default function ServiceTime({ dataSource }: BasicWidgetType) {
  return (
    <Grid item>
      <WrapperWidgetUI title={title}>
        <OpeningTime dataSource={dataSource} />
        <ClosingTime dataSource={dataSource} />
        <WidgetNote note={NOTE} />
      </WrapperWidgetUI>
    </Grid>
  );
}

const method = groupCategories;
const filterType = _FilterTypes.IN;

const openId = 'openingTime';
const openTitle = 'Hora de apertura';
const openColumn = 'inicio_ser';

const openProps = {
  id: openId,
  column: openColumn,
  title: openTitle,
  method,
  filterType,
  order: timeOrder,
};

function OpeningTime({ dataSource }: BasicWidgetType) {
  const { widget } = useWidgetEffect(
    <CustomBarWidget dataSource={dataSource} {...openProps} />,
    [dataSource],
  );
  return <Grid item>{widget}</Grid>;
}

const closeId = 'closingTime';
const closeTitle = 'Hora de cierre';
const closeColumn = 'finaliza_s';

const closeProps = {
  id: closeId,
  column: closeColumn,
  title: closeTitle,
  method,
  filterType,
  order: timeOrder,
};

function ClosingTime({ dataSource }: BasicWidgetType) {
  const { widget } = useWidgetEffect(
    <CustomBarWidget dataSource={dataSource} {...closeProps} />,
    [dataSource],
  );
  return <Grid item>{widget}</Grid>;
}
