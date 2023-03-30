import { _FilterTypes } from '@carto/react-core';
import { WrapperWidgetUI } from '@carto/react-ui';
import { Grid, makeStyles, Typography } from '@material-ui/core';
import { BasicWidgetType } from 'components/common/customWidgets/basicWidgetType';
import CustomBarWidget from 'components/common/customWidgets/CustomBarWidget';
import WidgetNote from 'components/common/customWidgets/WidgetNote';
import groupCategories from '../utils/groupCategories';
import useWidgetEffect from '../utils/useWidgetEffect';

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
};

function OpeningTime({ dataSource }: BasicWidgetType) {
  const { widget } = useWidgetEffect(
    <CustomBarWidget dataSource={dataSource} {...openProps} />,
    [dataSource],
  );
  return <Grid item>{widget}</Grid>;
}

const closeId = 'closingTime';
const closeTitle = 'Tiempo de cierre';
const closeColumn = 'finaliza_s';

const closeProps = {
  id: closeId,
  column: closeColumn,
  title: closeTitle,
  method,
  filterType,
};

function ClosingTime({ dataSource }: BasicWidgetType) {
  const { widget } = useWidgetEffect(
    <CustomBarWidget dataSource={dataSource} {...closeProps} />,
    [dataSource],
  );
  return <Grid item>{widget}</Grid>;
}
