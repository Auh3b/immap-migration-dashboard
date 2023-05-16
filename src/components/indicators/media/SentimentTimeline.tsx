import { AggregationTypes, groupValuesByColumn } from '@carto/react-core';
import { Grid, useTheme } from '@material-ui/core';
import ReactEcharts from 'components/common/customCharts/ReactEcharts';
import { useMemo } from 'react';

export default function SentimentTimeline({
  data: _data,
  isLoading,
}: {
  data: any[];
  isLoading?: Boolean;
}) {
  const theme = useTheme();

  const data = useMemo(() => {
    if (_data.length === 0) {
      return [];
    }
    try {
      //@ts-ignore
      const { sources: _sources } = _data;
      let _data2: any[] = [];
      const sources = Object.entries(_sources);
      for (let [sourceName, sourceValue] of sources) {
        //@ts-ignore
        const valueByDate = Object.entries(sourceValue);
        if (valueByDate.length !== 0) {
          for (let [date, { sentiment }] of Object.values(valueByDate)) {
            let sourceSentiment: any[] = [];
            //@ts-ignore
            for (let [key, { count }] of Object.entries(sentiment)) {
              sourceSentiment = [
                ...sourceSentiment,
                { name: key, value: count },
              ];
            }
            const sourceSentimentGroup = groupValuesByColumn({
              data: sourceSentiment,
              valuesColumns: ['value'],
              keysColumn: 'name',
              operation: AggregationTypes.SUM,
            });

            const {
              negative,
              positive,
              neutral,
              unknown: notRated,
            } = Object.fromEntries(
              sourceSentimentGroup.map(({ name, value }) => {
                return [name, value];
              }),
            );
            _data2 = [
              ..._data2,
              [date, negative ?? 0, neutral ?? 0, positive ?? 0, notRated ?? 0],
            ];
          }
        }
      }

      return _data2;
    } catch (error) {
      console.log(error);
      return [];
    }
  }, [_data]);

  const groupKey = ['name', 'Negative', 'Neutral', 'Positive', 'Not Rated'];
  const colorKey = ['#333333', '#f03b20', '#feb24c', '#ffeda0', '#999999'];

  const series = useMemo(() => {
    let groups: any[] = [];
    for (let i = 1; i < groupKey.length; i++) {
      const seriesOption = {
        type: 'line',
        name: groupKey[i],
        data: data.map((d) => d[i]),
        itemStyle: {
          color: colorKey[i],
        },
      };
      groups = [...groups, seriesOption];
    }

    return groups;
  }, [data]);

  const option = useMemo(
    () => ({
      grid: {
        containLabel: true,
      },
      legend: {},
      dataZoom: [{ type: 'inside' }],
      tooltip: {
        // padding: [theme.spacing(0.5), theme.spacing(1)],
        trigger: 'axis',
        borderWidth: 0,
        textStyle: {
          ...theme.typography.caption,
          fontSize: 12,
          lineHeight: 16,
          color: theme.palette.common.white,
        },
        //@ts-ignore
        backgroundColor: theme.palette.other.tooltip,
        // formatter({value, seriesName, color}:any){
        //   return (
        //    `<span style='display: flex; flex-direction: column; min-width: 100px;'>
        //       <span>${seriesName}</span>
        //       <span style='display: flex; width: 100%; justify-content: space-between; align-items: center;'>
        //         <span style='background-color: ${color}; width: 10px; height: 10px; border-radius: 100%;'></span>
        //         <span>${value}</span>
        //       </span>
        //     </span>`
        //   )
        // }
      },
      yAxis: {},
      xAxis: {
        type: 'category',
        data: data.map((d) => d[0]),
      },
      series,
    }),
    [series],
  );

  return (
    <Grid item xs={4}>
      <ReactEcharts option={option} />
    </Grid>
  );
}
