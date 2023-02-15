// @ts-ignore
import { MAP_TYPES } from '@deck.gl/carto';

const HOTSPOT_SOURCE_ID = 'hotspotSource';

const source = {
  id: HOTSPOT_SOURCE_ID,
  type: MAP_TYPES.TABLE,
  connection: 'carto_dw',
  data: `carto-dw-ac-4v8fnfsh.shared.carto_10_public`,
};

export default source;
