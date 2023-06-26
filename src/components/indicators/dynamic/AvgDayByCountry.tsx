import { Grid } from '@material-ui/core';
import { BasicWidgetType } from 'components/common/customWidgets/basicWidgetType';
import useWidgetEffect from '../utils/useWidgetEffect';
import CustomBarWidget from 'components/common/customWidgets/CustomBarWidget';
import { _FilterTypes } from '@carto/react-core';
import WidgetNote from 'components/common/customWidgets/WidgetNote';
import { EXTERNAL_METHOD_NAMES } from 'utils/methods/methods';
import { numberFormatter } from 'utils/formatter';

const title =
  'Días promedio transcurridos entre Enganche y último monitoreo por país';
const id =
  'Días_promedio_transcurridos_entre_Enganche_y_último_monitoreo_por_aís';
const column = 'pais_fin';
const NOTE =
  'Tiempo estimado (días) que ha transcurrido entre el enganche y el último país  de localización reportado';
const filterType = _FilterTypes.IN;
const methodName = EXTERNAL_METHOD_NAMES.GET_AVG_DAYS_BY_COUNTRY;
const methodParams = {
  valueColumn: 'dias',
};
const props = {
  title,
  id,
  column,
  filterType,
  methodName,
  methodParams,
  yAxisFormatter: (value: number) => numberFormatter(value),
};

export default function AvgDayByCountry({ dataSource }: BasicWidgetType) {
  const { widget } = useWidgetEffect(
    <CustomBarWidget {...props} dataSource={dataSource} />,
    [dataSource],
  );
  return (
    <Grid item>
      {widget}
      <WidgetNote note={NOTE} />
    </Grid>
  );
}
