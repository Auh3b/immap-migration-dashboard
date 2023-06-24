import { _FilterTypes } from '@carto/react-core';
import { Grid } from '@material-ui/core';
import { BasicWidgetType } from 'components/common/customWidgets/basicWidgetType';
import CustomTimelineWidget from 'components/common/customWidgets/CustomTimelineWidget';
import WidgetNote from 'components/common/customWidgets/WidgetNote';
import useWidgetEffect from '../utils/useWidgetEffect';
import { EXTERNAL_METHOD_NAMES } from 'utils/methods/methods';

const NOTE =
  'Localización de personas migrantes conectadas a Aurora en los distintos monitoreos';
const id =
  'Localización_de_personas_migrantes_conectadas_a_Aurora_en_los_distintos_monitoreos';
const title = 'Personas migrantes conectadas a Aurora';
const column = 'timeunix';
const filterType = _FilterTypes.IN;
const methodName = EXTERNAL_METHOD_NAMES.TIMELINE_VALUES_ALT;

const props = {
  id,
  title,
  column,
  filterType,
  methodName,
};

export default function MobileSurveyTimeline({ dataSource }: BasicWidgetType) {
  const { widget } = useWidgetEffect(
    <CustomTimelineWidget dataSource={dataSource} {...props} />,
    [dataSource],
  );
  return (
    <Grid item>
      {widget}
      <WidgetNote note={NOTE} />
    </Grid>
  );
}
