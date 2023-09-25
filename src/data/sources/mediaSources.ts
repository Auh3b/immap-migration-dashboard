// @ts-ignore
import { MAP_TYPES } from '@deck.gl/carto';

const MEDIA_SOURCE_ID = 'media_source';

const COLUMNS = [
  'id',
  'date',
  'source',
  'volume',
  'views',
  'country',
  'topphrases',
  'topposts',
  'sentiment',
  'keywords',
  'geom',
];

const source = {
  id: MEDIA_SOURCE_ID,
  type: MAP_TYPES.QUERY,
  connection: 'carto_dw',
  data: `SELECT ${COLUMNS.join(
    ',',
  )} FROM \`carto-dw-ac-4v8fnfsh.shared.processed_meltwater_data_v3_with_location\``,
};

export default source;
