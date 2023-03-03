import { AggregationTypes } from '@carto/react-core';
import { selectSourceById } from '@carto/react-redux';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { CategoryWidget } from '@carto/react-widgets';
import { Grid } from '@material-ui/core';
import WidgetNote from 'components/common/customWidgets/WidgetNote';

const NOTE = 'Distribución de tamaño de grupo de viaje'
const TITLE = 'Tamaño de grupo de viaje'

export default function GroupSizeDistribution() {
  const { hotspotsLayer } = useSelector(
    (state: RootState) => state.carto.layers,
  );
  const source = useSelector((state) =>
    selectSourceById(state, hotspotsLayer?.source),
  );

  return (
    <Grid item>
      <CategoryWidget
        id='tripComposition'
        column='acompanan'
        title={TITLE}
        dataSource={source.id}
        operation={AggregationTypes.COUNT}
      />
      <WidgetNote note={NOTE}/>
    </Grid>
  );
}
