import { Grid, Typography } from '@material-ui/core';
import CustomColumnChart from 'components/common/customCharts/CustomColumnChart';
import { useEffect, useMemo, useState } from 'react';
import TitleWrapper from 'components/common/TitleWrapper';
import { METHOD_NAMES } from 'components/views/mediaViews/utils/methodName';
const regionName = new Intl.DisplayNames(['en'], { type: 'region' });
export default function MediaOrigin({
  data: _data,
  isLoading,
  transform,
}: {
  data: any[];
  isLoading?: Boolean;
  transform?: Function;
}) {
  const [data, setData] = useState([]);

  useEffect(() => {
    (async function () {
      setData(await transform(METHOD_NAMES.MEDIA_ORIGINS));
    })();
    return () => {
      setData([]);
    };
  }, [_data]);

  return (
    <Grid item xs={3}>
      <TitleWrapper title='¿De dónde escribe?' isLoading={isLoading}>
        {data.length > 0 && !isLoading && (
          <CustomColumnChart
            data={data}
            labelFormater={(name: string) => regionName.of(name.toUpperCase())}
          />
        )}
      </TitleWrapper>
    </Grid>
  );
}
