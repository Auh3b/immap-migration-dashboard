import { Grid, Typography } from '@material-ui/core';
import CustomColumnChart from 'components/common/customCharts/CustomColumnChart';
import { useEffect, useMemo, useState } from 'react';
import { AggregationTypes, groupValuesByColumn } from '@carto/react-core';
import { ascending, descending } from 'd3';
import TitleWrapper from 'components/common/TitleWrapper';
import { METHOD_NAMES } from 'components/views/mediaViews/utils/methodName';
const regionName = new Intl.DisplayNames(['en'], { type: 'region' });
export default function MediaOrigin({
  data: _data,
  isLoading,
  transform,
}: {
  data: any[];
  isLoading?: Boolean;
  transform?: Function;
}) {
  const [data, setData] = useState([]);

  useEffect(() => {
    (async function () {
      setData(await transform(METHOD_NAMES.MEDIA_ORIGINS));
    })();
    return () => {
      setData([]);
    };
  }, [_data]);
  // const data = useMemo(() => {
  //   if (_data.length === 0) {
  //     return [];
  //   }

  //   try {
  //     //@ts-ignore
  //     const { sources: _sources } = _data;
  //     let _data2: any[] = [];
  //     const sources = Object.values(_sources);
  //     for (let source of sources) {
  //       //@ts-ignore
  //       const valueByDate = Object.values(source);
  //       if (valueByDate.length !== 0) {
  //         for (let { countries } of Object.values(valueByDate)) {
  //           //@ts-ignore
  //           for (let [key, { count }] of Object.entries(countries)) {
  //             _data2 = [..._data2, { name: key, value: count }];
  //           }
  //         }
  //       }
  //     }

  //     const output = groupValuesByColumn({
  //       data: _data2,
  //       valuesColumns: ['value'],
  //       keysColumn: 'name',
  //       operation: AggregationTypes.SUM,
  //     })
  //       //@ts-ignore
  //       .sort((a, b) => descending(a.value, b.value))
  //       .slice(0, 9);
  //     //@ts-ignore
  //     return output.sort((a, b) => ascending(a.value, b.value));
  //   } catch (error) {
  //     console.log(error);
  //     return [];
  //   }
  // }, [_data]);

  return (
    <Grid item xs={3}>
      <TitleWrapper title='¿De dónde escribe?' isLoading={isLoading}>
        {data.length > 0 && !isLoading && (
          <CustomColumnChart
            data={data}
            labelFormater={(name: string) => regionName.of(name.toUpperCase())}
          />
        )}
      </TitleWrapper>
    </Grid>
  );
}
