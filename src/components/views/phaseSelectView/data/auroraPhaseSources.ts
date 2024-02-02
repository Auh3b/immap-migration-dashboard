const auroraPhases = [
  {
    type: 'query',
    connection: 'carto_dw',
    source: `
      With __q1 as (
        Select * FROM \`carto-dw-ac-4v8fnfsh.shared.LACRO_Marzo_2023\`
      ),
      __q2 as (
        SELECT
        ST_CENTROID_AGG(geom) AS geom,
        COUNT(*) AS aggregated_count,
        country_name
      FROM
        __q1
      
      GROUP BY
        country_name
      )
  
      SELECT * FROM __q2 WHERE aggregated_count > 1
      `,
    format: 'geojson',
    headers: {
      'cache-control': 'max-age=300',
    },
  },
  {
    type: 'query',
    connection: 'carto_dw',
    source: `
      With __q1 as (
        Select * FROM \`carto-dw-ac-4v8fnfsh.shared.aurora_round_2\`
      ),
      __q2 as (
        SELECT
        ST_CENTROID_AGG(geom) AS geom,
        COUNT(*) AS aggregated_count,
        country_name
      FROM
        __q1
        
      GROUP BY
        country_name
      )
  
      SELECT * FROM __q2 WHERE aggregated_count > 1
      `,
    format: 'geojson',
    headers: {
      'cache-control': 'max-age=300',
    },
  },
];

export default auroraPhases;
