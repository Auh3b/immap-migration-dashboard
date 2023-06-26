import { Grid } from '@material-ui/core';
import CustomWidgetWrapper from 'components/common/customWidgets/CustomWidgetWrapper';
import WidgetNote from 'components/common/customWidgets/WidgetNote';
import useWidgetFetch from 'components/common/customWidgets/hooks/useWidgetFetch';
import { useMemo } from 'react';
import { BasicWidgetType } from 'components/common/customWidgets/basicWidgetType';
import { FormulaWidgetUI } from '@carto/react-ui';
import { format } from 'd3';
import { EXTERNAL_METHOD_NAMES } from 'utils/methods/methods';

const title = 'Días promedio transcuridos entre Enganche y último monitoreo';
const id = 'Días_promedio_transcuridos_entre_Enganche_y_último_monitoreo';
const column = 'dias';
const NOTE =
  'Tiempo estimado (días) que ha transcurrido entre el enganche y el último push';
const methodName = EXTERNAL_METHOD_NAMES.GET_AVERAGE_ELAPSED_DAYS;

export default function AverageElapsedDays({ dataSource }: BasicWidgetType) {
  const { data: _data, isLoading } = useWidgetFetch({
    id,
    dataSource,
    column,
    methodName,
  });

  //@ts-expect-error
  const data = useMemo(() => format('.4')(_data), [_data]);

  return (
    <Grid item>
      <CustomWidgetWrapper title={title} isLoading={isLoading}>
        <FormulaWidgetUI data={data} />
      </CustomWidgetWrapper>
      <WidgetNote note={NOTE} />
    </Grid>
  );
}
