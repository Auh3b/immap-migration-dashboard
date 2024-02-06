// @ts-ignore
import { MAP_TYPES } from '@deck.gl/carto';
const MEDIA_SOURCE_ID = 'media_source';

const source = {
  id: MEDIA_SOURCE_ID,
  type: MAP_TYPES.QUERY,
  connection: 'carto_dw',
  data: `SELECT 
            id, 
            source, 
            country, 
            date,
            volume, 
            views, 
            geom,  
            (
              SELECT 
                ARRAY_AGG(item.x) 
              FROM
                (SELECT
                  STRUCT(
                    JSON_VALUE_ARRAY(l, '$')[0] AS name,
                    SAFE_CAST(JSON_VALUE_ARRAY(l, '$')[1] AS INT64) AS value
                  ) as x
                FROM UNNEST(JSON_QUERY_ARRAY(sentiment)) as l
                ) AS item
            ) AS sentiment,
            (
              SELECT 
                ARRAY_AGG(item.x) 
              FROM
                (SELECT
                  STRUCT(
                    JSON_VALUE_ARRAY(l, '$')[0] AS name,
                    SAFE_CAST(JSON_VALUE_ARRAY(l, '$')[1] AS INT64) AS value
                  ) as x
                FROM UNNEST(JSON_QUERY_ARRAY(topphrases)) as l
                ) AS item
            ) AS topphrases,
            (
              SELECT 
                ARRAY_AGG(item.x) 
              FROM
                (SELECT
                  STRUCT(
                    JSON_VALUE_ARRAY(l, '$')[0] AS name,
                    SAFE_CAST(JSON_VALUE_ARRAY(l, '$')[1] AS INT64) AS value
                  ) as x
                FROM UNNEST(JSON_QUERY_ARRAY(keywords)) as l
                ) AS item
            ) AS keywords,
            (
              SELECT 
                ARRAY_AGG(item.x) 
              FROM
                (SELECT
                  STRUCT(
                    JSON_VALUE_ARRAY(l, '$')[0] AS name,
                    SAFE_CAST(JSON_VALUE_ARRAY(l, '$')[1] AS INT64) AS value
                  ) as x
                FROM UNNEST(JSON_QUERY_ARRAY(topposts)) as l
                ) AS item
            ) AS topposts
            
        FROM \`carto-dw-ac-4v8fnfsh.shared.processed_meltwater_data_v3_with_location\``,
};

export default source;

/**
 * JSON_VALUE_ARRAY(topphrases) AS topphrases1,  
    JSON_VALUE_ARRAY(keywords) AS keywords1,  
    JSON_VALUE_ARRAY(topposts) AS topposts1,  
 */
