import { WrapperWidgetUI } from '@carto/react-ui';
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
import { useRef } from 'react';
import { defaultCustomWidgetProps } from './customWidgetsType';
import useWidgetFetch from './hooks/useWidgetFetch';
import CustomWidgetWrapper from './CustomWidgetWrapper';

export default function CustomTimelineWidget({
  id,
  title,
  dataSource,
  method,
  column,
  methodParams,
}: defaultCustomWidgetProps) {
  const { data, isLoading } = useWidgetFetch({
    id,
    method,
    column,
    dataSource,
    methodParams,
  });

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
