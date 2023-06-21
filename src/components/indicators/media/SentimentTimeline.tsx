import { Grid, useTheme } from '@material-ui/core';
import TitleWrapper from 'components/common/TitleWrapper';
import ReactEcharts from 'components/common/customCharts/ReactEcharts';
import { METHOD_NAMES } from 'components/views/mediaViews/utils/methodName';
import { useMemo } from 'react';
import useMediaData from './hooks/useMediaData';
import NoWidgetData from 'components/common/customWidgets/NoWidgetData';
import { formatDate } from 'utils/dateHelpers';

const id = 'Serie_histórica_de_sentimiento';
const source = 'meltwater';

export default function SentimentTimeline() {
  const theme = useTheme();
  const { data, isLoading } = useMediaData({
    id,
    methodName: METHOD_NAMES.MEDIA_SENTIMENT_HISTORY,
    source,
  });

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
        data: data.map((d) => formatDate(+d[0])),
      },
      series,
    }),
    [series],
  );

  return (
    <Grid item xs={12}>
      <TitleWrapper
        title='Serie histórica de sentimiento'
        isLoading={isLoading}
      >
        <ReactEcharts option={option} style={{ height: 400 }} />
        {!data.length && !isLoading && <NoWidgetData />}
      </TitleWrapper>
    </Grid>
  );
}
