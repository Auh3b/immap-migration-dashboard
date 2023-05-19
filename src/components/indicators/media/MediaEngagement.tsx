import { Grid } from '@material-ui/core';
import TitleWrapper from 'components/common/TitleWrapper';

export default function MediaEngagement({
  deps,
  isLoading,
  transform,
}: {
  deps: [any[], Record<string, unknown>];
  isLoading?: Boolean;
  transform?: Function;
}) {
  return (
    <Grid item lg={6}>
      <TitleWrapper title='Serie de compromiso histórico'></TitleWrapper>
    </Grid>
  );
}
