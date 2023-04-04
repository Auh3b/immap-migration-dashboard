import { _FilterTypes } from '@carto/react-core';
import { Grid } from '@material-ui/core';
import { BasicWidgetType } from 'components/common/customWidgets/basicWidgetType';
import CustomTimelineWidget from 'components/common/customWidgets/CustomTimelineWidget';
import WidgetNote from 'components/common/customWidgets/WidgetNote';
import { iconGroupsConfig } from 'components/layers/SurveyTimelineLayer';
import MethodFunc from '../utils/methodType';
import useWidgetEffect from '../utils/useWidgetEffect';

const timelineValueAlt: MethodFunc = (input, column, params) => {
  const { iconGroupsConfig } = params;

  let output: Record<string, any>[] = [];

  for (let { name, filterFunction, color } of iconGroupsConfig) {
    const value = input.filter(filterFunction).length;
    const outputItem = {
      id: name,
      name,
      value,
      color: `rgb(${color.join(',')})`,
    };
    output = [...output, outputItem];
  }

  return output;
};

const NOTE =
  'Localización de personas migrantes conectadas a Aurora en los distintos monitoreos';
const id = 'mobileSurveyResponseTimeline';
const title = 'Personas migrantes conectadas a Aurora';
const column = 'timeunix';
const filterType = _FilterTypes.IN;
const method = timelineValueAlt;
const methodParams = {
  iconGroupsConfig,
};

const props = {
  id,
  title,
  column,
  filterType,
  method,
  methodParams,
};

export default function MobileSurveyTimeline({
  dataSource,
  operation,
}: BasicWidgetType) {
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
