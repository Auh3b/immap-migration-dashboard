import { AggregationTypes, _FilterTypes } from '@carto/react-core';
import { CategoryWidget } from '@carto/react-widgets';
import { Grid } from '@material-ui/core';
import { BasicWidgetType } from 'components/common/customWidgets/basicWidgetType';
import WidgetNote from 'components/common/customWidgets/WidgetNote';
import useWidgetEffect from '../utils/useWidgetEffect';

const NOTE = 'País de nacimiento del migrante que responde.';
const id = 'originCountry';
const title = 'País de nacimiento';
const column = 'pais_nacim';
const operationDefault = AggregationTypes.COUNT;

const props = {
  id,
  title,
  column,
};

export default function OriginCountry({
  dataSource,
  operation,
}: BasicWidgetType) {
  const { widget } = useWidgetEffect(
    <CategoryWidget
      {...props}
      dataSource={dataSource}
      operation={operation ? operation : operationDefault}
    />,
    [dataSource, operation],
  );
  return (
    <Grid item>
      {widget}
      <WidgetNote note={NOTE} />
    </Grid>
  );
}
