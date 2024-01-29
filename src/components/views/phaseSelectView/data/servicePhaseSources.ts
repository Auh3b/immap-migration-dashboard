const servicePhases = [
  {
    type: 'query',
    connection: 'carto_dw',
    source: `
        With __q1 as (
          Select * FROM \`carto-dw-ac-4v8fnfsh.shared.services_round_1_22032023\`
        ),
        __q2 as (
          SELECT
          ST_CENTROID_AGG(geom) AS geom,
          COUNT(*) AS aggregated_count,
          STRING_AGG(serv_tipo1, "|") AS services,
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
          Select * FROM \`carto-dw-ac-4v8fnfsh.shared.services_round_2_18102023\`
        ),
        __q2 as (
          SELECT
          ST_CENTROID_AGG(geom) AS geom,
          COUNT(*) AS aggregated_count,
          STRING_AGG(serv_tipo1, "|") AS services,
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

export default servicePhases;
