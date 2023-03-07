import { GroupDateTypes } from '@carto/react-core';
import { TimeSeriesWidget } from '@carto/react-widgets';
import { Grid } from '@material-ui/core';
import { BasicWidgetType } from 'components/common/customWidgets/basicWidgetType';
import WidgetNote from 'components/common/customWidgets/WidgetNote';

const NOTE =
  'Serie de tiempo de encuestas Aurora desde inicio de operativo (Marzo 2023)';
const title = 'Recepción de respuestas Aurora';
const id = 'surveyDates';
const column = 'timedouble';

export function SurveyDates({ dataSource }: BasicWidgetType) {
  return (
    <Grid item>
      <TimeSeriesWidget
        wrapperProps={{expanded: false}}
        id={id}
        title={title}
        dataSource={dataSource}
        column={column}
        operationColumn={column}
        stepSize={GroupDateTypes.DAYS}
      />
      <WidgetNote note={NOTE} />
    </Grid>
  );
}
