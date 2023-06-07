import { CategoryWidgetUI } from '@carto/react-ui';
import { Grid } from '@material-ui/core';
import TitleWrapper from '../../common/TitleWrapper';
import { EXTERNAL_METHOD_NAMES } from 'utils/methods/methods';
import useIntroData from './hooks/useIntroData';

const title = 'Socios implementadores/Principales';
const columns = [['org_pert1'], ['org_pert2']];
const subtitle = '';
const id = 'Principales_Implementador';
const column = '';
const source = 'premise';
const methodName = EXTERNAL_METHOD_NAMES.AGGREGATE_COLUMNS;
const methodParams = {
  columns,
};
export default function PrincipalsImplementor() {
  const { data, isLoading } = useIntroData({
    id,
    column,
    source,
    methodName,
    methodParams,
  });
  return (
    <TitleWrapper title={title} subtitle={subtitle} isLoading={isLoading}>
      <Grid item>
        <CategoryWidgetUI data={data} />
      </Grid>
    </TitleWrapper>
  );
}
