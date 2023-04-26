import { Grid } from '@material-ui/core';
import CustomWidgetWrapper from 'components/common/customWidgets/CustomWidgetWrapper';
import WidgetNote from 'components/common/customWidgets/WidgetNote';
import useWidgetFetch from 'components/common/customWidgets/hooks/useWidgetFetch';
import { useMemo } from 'react';
import MethodFunc from '../utils/methodType';
import aggregateColumns from '../utils/AggregateColumns';
import { AggregationTypes } from '@carto/react-core';
import { BasicWidgetType } from 'components/common/customWidgets/basicWidgetType';
import { FormulaWidgetUI } from '@carto/react-ui';
import { format } from 'd3';

const method: MethodFunc = (input, column) => {
  const averageDays = aggregateColumns(input, [column], AggregationTypes.AVG);
  return averageDays;
};
const title = 'Días promedio transcuridos entre Enganche y último monitoreo';
const id = 'averageElapsed';
const column = 'dias';
const NOTE =
  'Tiempo estimado (días) que ha transcurrido entre el enganche y el último push';

export default function AverageElapsedDays({ dataSource }: BasicWidgetType) {
  const { data: _data, isLoading } = useWidgetFetch({
    id,
    dataSource,
    column,
    method,
  });

  //@ts-expect-error
  const data = useMemo(() => format('.2')(_data), [_data]);

  return (
    <Grid item>
      <CustomWidgetWrapper title={title} isLoading={isLoading}>
        <FormulaWidgetUI data={data} />
      </CustomWidgetWrapper>
      <WidgetNote note={NOTE} />
    </Grid>
  );
}
