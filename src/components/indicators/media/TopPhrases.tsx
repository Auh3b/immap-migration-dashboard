import { AggregationTypes, groupValuesByColumn } from '@carto/react-core';
import { Grid } from '@material-ui/core';
import TitleWrapper from 'components/common/TitleWrapper';
import CustomWordCloud from 'components/common/customCharts/CustomWordCloud';
import { useMemo } from 'react';

export default function TopPhrases({
  data: _data = [],
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
          for (let { topPhrases } of Object.values(valueByDate)) {
            //@ts-ignore
            for (let [key, { count }] of Object.entries(topPhrases)) {
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
    <Grid xs={3} item>
      <TitleWrapper title='Palabras asociadas' isLoading={isLoading}>
        <CustomWordCloud data={data} />
      </TitleWrapper>
    </Grid>
  );
}
