import { Grid, Typography, makeStyles } from '@material-ui/core';
import { FormulaWidgetUI } from '@carto/react-ui';
import { numberFormatter } from 'utils/formatter';
import { ReactNode } from 'react';
import TitleWrapper, {
  TitleWrapperProps,
} from 'components/indicators/introduction/utils/TitleWrapper';

interface AggregateIndicatorProps extends TitleWrapperProps {
  isLoading?: Boolean;
  data: number;
  icon: ReactNode;
  gridSize?: number | Boolean | string;
  formatter?: any;
}

export default function AggregateIndicatorWidget(
  props: AggregateIndicatorProps,
) {
  const {
    title,
    subtitle,
    data,
    isLoading = false,
    icon,
    formatter = numberFormatter,
  } = props;
  return (
    <TitleWrapper title={title} subtitle={subtitle}>
      <Grid spacing={1} wrap='nowrap' container alignItems='center'>
        <Grid item xs={3}>
          {icon}
        </Grid>
        {data && !isLoading && (
          <Grid xs={5} item>
            <FormulaWidgetUI data={data} formatter={formatter} />
          </Grid>
        )}
      </Grid>
    </TitleWrapper>
  );
}
