import AggregateIndicatorWidget from 'components/common/customWidgets/AggregateIndicatorWidget';
import { ReactComponent as People } from 'assets/img/Group.svg';
import iconStyles from './utils/iconStyles';
import { Grid } from '@material-ui/core';
import { EXTERNAL_METHOD_NAMES } from 'utils/methods/methods';
import useIntroData from './hooks/useIntroData';

const id = 'totalAurora'
const source = 'aurora'
const column = ''
const title = 'Personas conectadas';
const subtitle = 'En Aurora Chatbot';
const methodName  = EXTERNAL_METHOD_NAMES.AGGREGATE_COLUMNS
const methodParams = {
  columns: ['objectid']
}

export default function TotalAurora() {

  const { data, isLoading} = useIntroData({
    id,
    column,
    source,
    methodName,
    methodParams
  })

  return (
    <Grid lg={3} item wrap='nowrap' container>
      <AggregateIndicatorWidget
        title={title}
        isLoading={isLoading}
        subtitle={subtitle}
        data={data}
        icon={<People style={iconStyles} />}
      />
    </Grid>
  );
}
