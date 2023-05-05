import { Typography } from '@material-ui/core';
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
} from '@material-ui/lab';
import { useEffect, useMemo, useRef, useState } from 'react';
import { defaultCustomWidgetProps } from './customWidgetsType';
//@ts-ignore
import {fetchLayerData} from '@deck.gl/carto'
import CustomWidgetWrapper from './CustomWidgetWrapper';
import timelineSource from 'data/sources/timelineSource'

export default function CustomTimelineWidget({
  id,
  title,
  dataSource,
  method,
  column,
  methodParams,
}: defaultCustomWidgetProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [_data, setData] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    fetchLayerData({
      ...timelineSource,
      source: timelineSource.data,
      format: 'json',
    })
      .then(({ data }: any) => {
        setData(data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const data: any = useMemo(() => {
    if (_data.length > 0) {
      return method(_data, column, methodParams);
    }
    return [];
  }, [_data]);

  return (
    <CustomWidgetWrapper title={title} isLoading={isLoading}>
      {data.length > 0 && !isLoading && <CustomTimelineUI data={data} />}
    </CustomWidgetWrapper>
  );
}

function CustomTimelineUI({ data }: { data: TimelineItemContent[] }) {
  const lastItem = useRef(data.length - 1);

  return (
    <Timeline align='right'>
      {data.map(({ name, value, id, color }, index) => (
        <TimelineItem key={id}>
          <TimelineOppositeContent>
            <Typography variant='overline'>{value}</Typography>
            {/* <FormulaWidgetUI data={value}/> */}
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot style={{ backgroundColor: color }} />
            {lastItem.current !== index && <TimelineConnector />}
          </TimelineSeparator>
          <TimelineContent>
            <Typography variant='overline'>{name}</Typography>
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  );
}

interface TimelineItemContent extends Record<string, any> {
  name: string;
  value: number;
  color?: string;
}
