import { Grid, Typography } from '@material-ui/core';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { METHOD_NAMES } from '../utils/methodName';
import useMediaData from 'components/indicators/media/hooks/useMediaData';
import { formatDate } from 'utils/dateHelpers';
import ScheduleIcon from '@material-ui/icons/Schedule';
import { Skeleton } from '@material-ui/lab';

export function TimeInfo() {
  const filteredTime = useSelector(
    // @ts-expect-error
    (state) => state?.media?.filters?.meltwater?.['fecha_filtro']?.values[0],
  );

  const { data: sourceTime, isLoading } = useMediaData({
    id: 'timeInfo',
    methodName: METHOD_NAMES.GET_DATE_RANGE,
    source: 'date',
  });

  const time = useMemo(() => {
    if (filteredTime) {
      return (filteredTime as number[]).map((d) =>
        formatDate(+d, 'do LLLL yyyy'),
      );
    }
    return (sourceTime as number[]).map((d) => formatDate(+d, 'do LLLL yyyy'));
  }, [sourceTime, filteredTime]);

  return (
    <Grid item>
      <Grid container style={{ gap: '16px' }}>
        <ScheduleIcon />
        {isLoading ? (
          <Skeleton style={{ width: 250 }} />
        ) : (
          <Typography>{time.join(' - ')}</Typography>
        )}
      </Grid>
    </Grid>
  );
}
