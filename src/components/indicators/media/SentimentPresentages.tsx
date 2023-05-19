import { AggregationTypes, groupValuesByColumn } from '@carto/react-core';
import { Grid, Typography, useTheme } from '@material-ui/core';
import TitleWrapper from 'components/common/TitleWrapper';
import ReactEcharts from 'components/common/customCharts/ReactEcharts';
import { MEDIA_SOURCES_NAMES } from 'components/views/mediaViews/utils/mediaUtils';
import { METHOD_NAMES } from 'components/views/mediaViews/utils/methodName';
import { sum } from 'd3';
import { useEffect, useMemo, useState } from 'react';

export default function SentimentPresentages({
  deps,
  isLoading,
  transform,
}: {
  deps: any[];
  isLoading?: Boolean;
  transform?: Function;
}) {
  const theme = useTheme();
  const [data, setData] = useState([]);

  useEffect(() => {
    (async function () {
      setData(
        await transform(METHOD_NAMES.MEDIA_SENTIMENT_PERCENTAGES, {
          filters: deps[1].meltwater ?? {},
        }),
      );
    })();
    return () => {
      setData([]);
    };
  }, [...deps]);

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
      grid: {
        top: '10%',
        left: '5%',
        right: '5%',
        bottom: '5%',
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
          const { axisValue } = params[0];
          const axisName = MEDIA_SOURCES_NAMES.get(axisValue);
          const legends = params
            .map(
              ({ color, seriesName: name, value }: any) => `
            <span style='display: flex; align-items: center; justify-content: space-between; min-width: 100px; width: 100%;'>
              <span style='display: flex; align-items: center; justify-content: space-between;'>
                <span style='background-color: ${color}; width:  10px; height: 10px; margin-right: 10px; border-radius: 100%;'></span>
                <span> ${name}</span>
              </span>
              <span>${Math.round(value * 100)}%</span>
            </span>`,
            )
            .join('');
          return `<span style='width: 150px; height: 100%; display:flex; flex-direction: column; gap: 5px;'>
              <span>${axisName}</span>
              ${legends}
            </span>`;
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
    <Grid item xs={12} lg={4}>
      <TitleWrapper
        title='Sentimiento por tipo de red social'
        isLoading={isLoading}
      >
        <ReactEcharts option={option} style={{ height: 400 }} />
      </TitleWrapper>
    </Grid>
  );
}
