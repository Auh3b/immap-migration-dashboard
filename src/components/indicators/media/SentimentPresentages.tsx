import { AggregationTypes, groupValuesByColumn } from '@carto/react-core';
import { Grid, Typography, useTheme } from '@material-ui/core';
import TitleWrapper from 'components/common/TitleWrapper';
import ReactEcharts from 'components/common/customCharts/ReactEcharts';
import { MEDIA_SOURCES_NAMES } from 'components/views/mediaViews/utils/mediaUtils';
import { sum } from 'd3';
import { useMemo } from 'react';

export default function SentimentPresentages({
  data: _data,
  isLoading,
  title,
}: {
  data: any[];
  isLoading?: Boolean;
  title?: string
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
        const valueByDate = Object.values(sourceValue);
        let sourceSentiment: any[] = [];
        if (valueByDate.length !== 0) {
          for (let { sentiment } of Object.values(valueByDate)) {
            //@ts-ignore
            for (let [key, { count }] of Object.entries(sentiment)) {
              sourceSentiment = [
                ...sourceSentiment,
                { name: key, value: count },
              ];
            }
          }
          const sourceSentimentGroup = groupValuesByColumn({
            data: sourceSentiment,
            valuesColumns: ['value'],
            keysColumn: 'name',
            operation: AggregationTypes.SUM,
          });

          const sentimanetTotal = sum(
            sourceSentimentGroup,
            ({ value }) => value,
          );
          const {
            negative,
            positive,
            neutral,
            unknown: notRated,
          } = Object.fromEntries(
            sourceSentimentGroup.map(({ name, value }) => {
              return [name, value / sentimanetTotal];
            }),
          );

          _data2 = [
            ..._data2,
            [
              sourceName,
              negative ?? 0,
              neutral ?? 0,
              positive ?? 0,
              notRated ?? 0,
            ],
          ];
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
        type: 'bar',
        name: groupKey[i],
        data: data.map((d) => d[i]),
        stack: 'percentage',
        itemStyle: {
          color: colorKey[i],
        },
      };
      groups = [...groups, seriesOption];
    }
    return groups;
  }, [data]);

  const yAxis = useMemo(
    () => ({
      type: 'category',
      data: data.map((d) => d[0]),
      axisLabel: {
        formatter(value: string) {
          return MEDIA_SOURCES_NAMES.get(value) ?? 'Otro';
        },
      },
    }),
    [series],
  );

  const option = useMemo(
    () => ({
      title:{
        show: title ? true : false,
        text: title,
        textAlign: 'left',
        textVerticalAlign: 'bottom',
      },
      grid: {
        containLabel: true,
      },
      legend: {},
      tooltip: {
        trigger: 'axis',
        padding: [theme.spacing(0.5), theme.spacing(1)],
        borderWidth: 0,
        textStyle: {
          ...theme.typography.caption,
          fontSize: 12,
          lineHeight: 16,
          color: theme.palette.common.white,
        },
        //@ts-ignore
        backgroundColor: theme.palette.other.tooltip,
        formatter(params: any[]) {
          const {axisValue} = params[0]
          const axisName = MEDIA_SOURCES_NAMES.get(axisValue)
          const legends = params.map(({color, seriesName: name, value}:any) => (`
            <span style='display: flex; align-items: center; justify-content: space-between; min-width: 100px; width: 100%;'>
              <span style='display: flex; align-items: center; justify-content: space-between;'>
                <span style='background-color: ${color}; width:  10px; height: 10px; margin-right: 10px; border-radius: 100%;'></span>
                <span> ${name}</span>
              </span>
              <span>${Math.round(value*100)}%</span>
            </span>`
        )).join('')
          return (
            `<span style='width: 150px; height: 100%; display:flex; flex-direction: column; gap: 5px;'>
              <span>${axisName}</span>
              ${legends}
            </span>`
          )
        },
      },
      xAxis: {
        type: 'value',
        axisLabel: {
          formatter(value: number) {
            return Math.round(value * 100);
          },
        },
      },
      yAxis,
      series,
    }),
    [series, yAxis],
  );

  return (
    <Grid item xs={3}>
      <TitleWrapper title='Sentimiento por tipo de red social' isLoading={isLoading}>
        <ReactEcharts option={option} style={{ height: 400 }} />
      </TitleWrapper>
    </Grid>
  );
}
