// @ts-ignore
import { MAP_TYPES } from '@deck.gl/carto';

const SERVICE_POINTS_SOURCE_ID = 'servicePointsSource';

const source = {
  id: SERVICE_POINTS_SOURCE_ID,
  type: MAP_TYPES.TABLE,
  connection: 'carto_dw',
  data: `carto-dw-ac-4v8fnfsh.shared.servicios_premise`,
};

export default source;
