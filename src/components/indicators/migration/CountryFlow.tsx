import { _FilterTypes } from '@carto/react-core';
import { Grid } from '@material-ui/core';
import { BasicWidgetType } from 'components/common/customWidgets/basicWidgetType';
import CustomSunburstWidget from 'components/common/customWidgets/CustomSunburstWidget';
import WidgetNote from 'components/common/customWidgets/WidgetNote';
import useWidgetEffect from '../utils/useWidgetEffect';
import ExpandChartButton from 'components/common/ExpandChartButton';
import { COLOR_SCALE_TYPE } from '../utils/getSunburstHierarchy';
import { EXTERNAL_METHOD_NAMES } from 'utils/methods/methods';

const NOTE = 'Migración de flujo de país';
const id = 'Country Flow';
const title = 'Migración de flujo de país';
const column = 'e08_pais_';
const filterType = _FilterTypes.IN;
const method = EXTERNAL_METHOD_NAMES.GET_SUNBURST_HIERARCHY;
const methodParams = {
  lv2: 'e12_pais_',
  lv3: 'e10_pais_',
  colorScaleType: COLOR_SCALE_TYPE.SEQUENTIAL,
};

const props = {
  id,
  title,
  column,
  filterType,
  method,
  methodParams,
};

export default function CountryFlow({ dataSource }: BasicWidgetType) {
  const { widget } = useWidgetEffect(
    <CustomSunburstWidget
      actions={[
        <ExpandChartButton
          dataSource={dataSource}
          chartUrl='indicators/migration/CountryFlow'
        />,
      ]}
      dataSource={dataSource}
      {...props}
    />,

    [dataSource],
  );

  return (
    <Grid item>
      {widget}
      <WidgetNote note={NOTE} />
    </Grid>
  );
}
