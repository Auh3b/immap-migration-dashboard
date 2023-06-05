import { CategoryWidgetUI } from '@carto/react-ui';
import { Grid } from '@material-ui/core';
import TitleWrapper from '../../common/TitleWrapper';
import { EXTERNAL_METHOD_NAMES } from 'utils/methods/methods';
import useIntroData from './hooks/useIntroData';

const title = 'Socios implementadores/Principales';
const columns = [['org_pert1'], ['org_pert2']];
const subtitle = '';
const id = 'principalsImplementor';
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
  // const data = useMemo(() => {
  //   if (_data) {
  //     const principles = aggregateColumns(
  //       _data,
  //       columns[0],
  //       AggregationTypes.COUNT,
  //     );
  //     const implementors = aggregateColumns(
  //       _data,
  //       columns[1],
  //       AggregationTypes.COUNT,
  //     );
  //     return [
  //       {
  //         name: 'Principales',
  //         value: principles,
  //       },
  //       {
  //         name: 'Implementadores',
  //         value: implementors,
  //       },
  //     ];
  //   }
  // }, [_data]);
  return (
    <TitleWrapper title={title} subtitle={subtitle} isLoading={isLoading}>
      <Grid item>
        <CategoryWidgetUI data={data} />
      </Grid>
    </TitleWrapper>
  );
}
