import { Grid } from '@material-ui/core';
import TitleWrapper from 'components/common/TitleWrapper';
import CustomWordCloud from 'components/common/customCharts/CustomWordCloud';
import { METHOD_NAMES } from 'components/views/mediaViews/utils/methodName';
import { useEffect, useState } from 'react';

export default function TopPhrases({
  data: _data,
  isLoading,
  title,
  transform,
}: {
  data: any[];
  isLoading?: Boolean;
  title?: string;
  transform?: Function;
}) {
  const [data, setData] = useState([]);

  useEffect(() => {
    (async function () {
      setData(await transform(METHOD_NAMES.MEDIA_TOP_PHRASES));
    })();
    return () => {
      setData([]);
    };
  }, [_data]);

  return (
    <Grid xs={3} item>
      <TitleWrapper title='Palabras asociadas' isLoading={isLoading}>
        <CustomWordCloud data={data} />
      </TitleWrapper>
    </Grid>
  );
}
