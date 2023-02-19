import { makeStyles } from '@material-ui/core/styles';
import { Divider, Grid, Typography } from '@material-ui/core';
import MediaContainer from 'components/common/media/MediaContainer';
import { FormulaWidget } from '@carto/react-widgets';
import hotspotSource from 'data/sources/hotspotSource';
import { AggregationTypes } from '@carto/react-core';
import { PieWidgetUI } from '@carto/react-ui';
import MainView from './main/MainView';
import { useOutletContext } from 'react-router-dom';

const colors = ['#1877f2', '#075e54', '#1da1f2', '#9146ff'];

const data = [
  {
    name: 'Facebook',
    value: Math.floor(5050 * 0.45),
  },
  {
    name: 'WhatsApp',
    value: Math.floor(5050 * 0.25),
  },
  {
    name: 'Twitter',
    value: Math.floor(5050 * 0.2),
  },
  {
    name: 'Others',
    value: Math.floor(5050 * 0.1),
  },
];

const useStyles = makeStyles(() => ({
  media: {},
  title: {
    padding: 5,
  },
  content: {
    marginBottom: 10,
  },
}));

export default function Media() {
  const classes = useStyles();

  // [hygen] Add useEffect

  return (
    <MainView>
      {{
        left:<>
            <Grid item className={classes.content}>
        <FormulaWidget
          id='participantCount'
          title='Participación por red social'
          dataSource={hotspotSource.id}
          column='carto_10_e'
          operation={AggregationTypes.SUM}
        />
      </Grid>
      <Divider />
      <Grid item className={classes.content}>
        <Typography variant='h6' className={classes.title}>
          Participación por red social
        </Typography>
        <PieWidgetUI data={data} color={colors} />
      </Grid>
      <Divider />
      <Grid item className={classes.content}>
        <MediaContainer />
      </Grid>
        </>,
      }}
    </MainView>
    // <Grid container direction='column' className={classes.media}>
      // <Grid item className={classes.content}>
      //   <FormulaWidget
      //     id='participantCount'
      //     title='Participación por red social'
      //     dataSource={hotspotSource.id}
      //     column='carto_10_e'
      //     operation={AggregationTypes.SUM}
      //   />
      // </Grid>
      // <Divider />
      // <Grid item className={classes.content}>
      //   <Typography variant='h6' className={classes.title}>
      //     Participación por red social
      //   </Typography>
      //   <PieWidgetUI data={data} color={colors} />
      // </Grid>
      // <Divider />
      // <Grid item className={classes.content}>
      //   <MediaContainer />
      // </Grid>
    // </Grid>
  );
}
