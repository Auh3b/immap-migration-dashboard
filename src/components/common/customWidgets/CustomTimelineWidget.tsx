import { Typography, makeStyles } from '@material-ui/core';
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
} from '@material-ui/lab';
import { useMemo } from 'react';
import { defaultCustomWidgetProps } from './customWidgetsType';
import useWidgetFetch from './hooks/useWidgetFetch';
import CustomWidgetWrapper from './CustomWidgetWrapper';

export default function CustomTimelineWidget({
  id,
  title,
  dataSource,
  methodName,
  column,
  methodParams,
}: defaultCustomWidgetProps) {
  const { data, isLoading } = useWidgetFetch({
    id,
    methodName,
    column,
    dataSource,
    methodParams,
  });

  return (
    <CustomWidgetWrapper title={title} isLoading={isLoading}>
      {!data.length ? null : (
        <>
          <CustomTimelineUI data={data} />
          <GapLegend />
        </>
      )}
    </CustomWidgetWrapper>
  );
}

function CustomTimelineUI({ data }: { data: TimelineItemContent[] }) {
  const lastItem = useMemo(() => data.length - 1, [data]);

  return (
    <Timeline align='right'>
      {data.map(({ name, value, id, color, index: indexId }, index) => {
        const nextIndex = index + 1;
        const gap = indexId - data[nextIndex]?.index || indexId;
        const isGapped = Boolean(gap < -1);
        const isLastIndex = Boolean(lastItem === index);
        return (
          <TimelineItem key={id}>
            <TimelineOppositeContent>
              <Typography variant='overline'>{value}</Typography>
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot style={{ backgroundColor: color }} />
              {isLastIndex ? null : isGapped ? (
                <CustomTimelineConnector number={gap} />
              ) : (
                <TimelineConnector />
              )}
            </TimelineSeparator>
            <TimelineContent>
              <Typography variant='overline'>{name}</Typography>
            </TimelineContent>
          </TimelineItem>
        );
      })}
    </Timeline>
  );
}

interface TimelineItemContent extends Record<string, any> {
  name: string;
  value: number;
  color?: string;
}

const useConnectorStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  dots: {
    width: '100%',
    backgroundColor: 'white',
    height: '5px',
  },
  gap: {
    ...theme.typography.caption,
    position: 'absolute',
    borderRadius: '100%',
    backgroundColor: '#777777',
    padding: '1px 6px',
    color: '#ffffff',
    transform: 'translate(20%, -50%)',
    top: '50%',
    right: '-20px',
  },
}));

function CustomTimelineConnector(props: { number?: number }) {
  const classes = useConnectorStyles();
  const { number } = props;
  return (
    <TimelineConnector className={classes.root}>
      {[1, 2, 3, 4].map((d) => (
        <div className={classes.dots}></div>
      ))}
      {number ? <span className={classes.gap}>{(number + 1) * -1}</span> : null}
    </TimelineConnector>
  );
}

const useGapStyles = makeStyles((theme) => ({
  gap: {
    ...theme.typography.caption,
    borderRadius: '100%',
    backgroundColor: '#777777',
    padding: '1px 6px',
    color: '#ffffff',
  },
}));

function GapLegend() {
  const classes = useGapStyles();
  return (
    <div>
      <span className={classes.gap}>#</span> significa el número de no estar
      disponibles Empujar respuestas en el área delimitador
    </div>
  );
}
