import { Grid, useTheme } from '@material-ui/core';
import TitleWrapper from 'components/common/TitleWrapper';
import ReactEcharts from 'components/common/customCharts/ReactEcharts';
import { METHOD_NAMES } from 'components/views/mediaViews/utils/methodName';
import { useEffect, useMemo, useState } from 'react';

export default function SentimentTimeline({
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
        await transform(METHOD_NAMES.MEDIA_SENTIMENT_HISTORY, {
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
        top: '10%',
        left: '5%',
        right: '5%',
        bottom: '5%',
        containLabel: true,
      },
      legend: {},
      dataZoom: [{ type: 'inside' }],
      tooltip: {
        padding: [theme.spacing(0.5), theme.spacing(1)],
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
    <Grid item xs={6}>
      <TitleWrapper
        title='Serie histórica de sentimiento'
        isLoading={isLoading}
      >
        <ReactEcharts option={option} style={{ height: 400 }} />
      </TitleWrapper>
    </Grid>
  );
}
