import { GroupDateTypes } from '@carto/react-core';
import { TimeSeriesWidget } from '@carto/react-widgets';
import { Grid } from '@material-ui/core';
import { BasicWidgetType } from 'components/common/customWidgets/basicWidgetType';
import WidgetNote from 'components/common/customWidgets/WidgetNote';
import useWidgetEffect from '../utils/useWidgetEffect';

const NOTE =
  'Serie de tiempo de encuestas Aurora desde inicio de operativo (Marzo 2023)';
const title = 'Recepción de respuestas Aurora';
const id = 'surveyDates';
const column = 'timeunix';
const wrapperProps = { expanded: false };
const stepSize = GroupDateTypes.DAYS;

const props = {
  id,
  title,
  column,
  wrapperProps,
  stepSize,
};

export function SurveyDates({ dataSource }: BasicWidgetType) {
  const { widget } = useWidgetEffect(
    <TimeSeriesWidget {...props} dataSource={dataSource} />,
    [dataSource],
  );
  return (
    <Grid item>
      {widget}
      <WidgetNote note={NOTE} />
    </Grid>
  );
}
