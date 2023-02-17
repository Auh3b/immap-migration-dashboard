import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import MediaContainer from 'components/common/media/MediaContainer';
import { FormulaWidget, PieWidget } from '@carto/react-widgets';
import hotspotSource from "data/sources/hotspotSource"
import { AggregationTypes } from '@carto/react-core';
import { PieWidgetUI } from '@carto/react-ui';


const colors = [
  '#1877f2',
  '#075e54',
  '#1da1f2',
  '#9146ff'
]

const data = [
  {
    name: 'Facebook',
    value: Math.floor(5050*0.45)
  },
  {
    name: 'WhatsApp',
    value: Math.floor(5050*0.25)
  },
  {
    name: 'Twitter',
    value: Math.floor(5050*0.20)
  },
  {
    name: 'Others',
    value: Math.floor(5050*0.10)
  }
]


const useStyles = makeStyles(() => ({
  media: {},
}));

export default function Media() {
  const classes = useStyles();

  // [hygen] Add useEffect

  return (
    <Grid container direction='column' className={classes.media}>
      <Grid item>
        <FormulaWidget 
          id='participantCount'
          title='Participación por red social'
          dataSource={hotspotSource.id}
          column='carto_10_e'
          operation={AggregationTypes.SUM}
        />
      </Grid>
      <Grid item>
        <PieWidgetUI 
          id='participationGroups'
          title='Participación por red social'
          data={data}
          color={colors}
        />
      </Grid>
      <Grid item>
        <MediaContainer />
      </Grid>
    </Grid>
  );
}
