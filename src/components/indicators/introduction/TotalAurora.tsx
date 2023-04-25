import AggregateIndicatorWidget from 'components/common/customWidgets/AggregateIndicatorWidget';
import { ReactComponent as People } from 'assets/img/Group.svg';
import { useMemo } from 'react';
import iconStyles from './utils/iconStyles';
import { Grid, makeStyles } from '@material-ui/core';
import TotalGenders from './TotalGenders';

const title = 'Personas conectadas';
const subtitle = 'En Aurora Chatbot';
const useStyles = makeStyles((theme) => ({
  root: {},
}));

export default function TotalAurora({
  data: _data,
  isLoading,
}: {
  data: any[];
  isLoading: Boolean;
}) {
  const classes = useStyles();
  const data = useMemo(() => {
    if (_data) {
      return _data.length;
    }
    return 0;
  }, [_data]);

  return (
    <Grid lg={3} direction='column' item wrap='nowrap' container className={classes.root}>
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
