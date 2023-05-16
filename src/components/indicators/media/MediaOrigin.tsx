import { Grid } from '@material-ui/core';
import CustomColumnChart from 'components/common/customCharts/CustomColumnChart';
import { useMemo } from 'react';
import { AggregationTypes, groupValuesByColumn } from '@carto/react-core';
import { ascending, descending } from 'd3';
const regionName = new Intl.DisplayNames(['en'], { type: 'region' });
export default function MediaOrigin({
  data: _data,
  isLoading,
}: {
  data: any[];
  isLoading?: Boolean;
}) {
  const data = useMemo(() => {
    if (_data.length === 0) {
      return [];
    }

    try {
      //@ts-ignore
      const { sources: _sources } = _data;
      let _data2: any[] = [];
      const sources = Object.values(_sources);
      for (let source of sources) {
        //@ts-ignore
        const valueByDate = Object.values(source);
        if (valueByDate.length !== 0) {
          for (let { countries } of Object.values(valueByDate)) {
            //@ts-ignore
            for (let [key, { count }] of Object.entries(countries)) {
              _data2 = [..._data2, { name: key, value: count }];
            }
          }
        }
      }

      const output = groupValuesByColumn({
        data: _data2,
        valuesColumns: ['value'],
        keysColumn: 'name',
        operation: AggregationTypes.SUM,
      })
      //@ts-ignore
        .sort((a, b) => descending(a.value, b.value))
        .slice(0, 9);
      //@ts-ignore
      return output.sort((a, b) => ascending(a.value, b.value));
    } catch (error) {
      console.log(error);
      return [];
    }
  }, [_data]);

  return (
    <Grid item lg={4}>
      {data.length > 0 && !isLoading && (
        <CustomColumnChart
          data={data}
          labelFormater={(name: string) => regionName.of(name.toUpperCase())}
        />
      )}
    </Grid>
  );
}
