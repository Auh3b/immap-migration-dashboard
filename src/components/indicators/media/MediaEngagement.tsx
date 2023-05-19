import { Grid } from '@material-ui/core';
import TitleWrapper from 'components/common/TitleWrapper';
import CustomGriddedLineChart from 'components/common/customCharts/CustomGriddedLineChart';
import { METHOD_NAMES } from 'components/views/mediaViews/utils/methodName';
import { useEffect, useState } from 'react';

export default function MediaEngagement({
  deps,
  isLoading,
  transform,
}: {
  deps: [any[], Record<string, unknown>];
  isLoading?: Boolean;
  transform?: Function;
}) {
  const [data, setData] = useState([]);

  useEffect(() => {
    (async function () {
      setData(
        await transform(METHOD_NAMES.MEDIA_ENGAGEMENT_HISTORY, {
          filters: deps[1].meltwater ?? {},
        }),
      );
    })();
    return () => {
      setData([]);
    };
  }, [...deps]);

  return (
    <Grid item xs={12}>
      <TitleWrapper title='Serie de compromiso histórico'>
        <CustomGriddedLineChart data={data} />
      </TitleWrapper>
    </Grid>
  );
}
