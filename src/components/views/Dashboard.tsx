import {
  CategoryWidget,
  PieWidget,
  TimeSeriesWidget,
  BarWidget,
  HistogramWidget,
} from '@carto/react-widgets';
import hotspotSource from '../../data/sources/hotspotSource';
import { AggregationTypes, GroupDateTypes } from '@carto/react-core';
import MainView from './main/MainView';
import { MainColumnView } from 'components/common/MainColumnView';
import { Grid } from '@material-ui/core';

export default function Dashboard() {
  // [hygen] Add useEffect

  return (
    <MainView>
      {{
        left: <LeftView />,
        right: <RightView />,
        bottom: (
          <TimeSeriesWidget
            id='surveyDates'
            title='Encuestas'
            dataSource={hotspotSource.id}
            column='carto_10_1'
            stepSize={GroupDateTypes.DAYS}
          />
        ),
      }}
    </MainView>
  );
}

const xFormatValues = new Map([
  [1, '18'],
  [2, '25'],
  [3, '40'],
  [4, '64'],
  [5, '100']
])

function customFormat(value:number){
  return xFormatValues.get(value)
}

function LeftView() {
  return (
    <MainColumnView>
      <Grid item>
        <PieWidget
          id='genderDistribution'
          title='Género'
          dataSource={hotspotSource.id}
          column='carto_10_5'
          operation={AggregationTypes.COUNT}
          operationColumn='carto_10_5'
        />
      </Grid>
      <Grid item>
        <CategoryWidget
          id='ageDistribution'
          title='Tamaño de grupo de viaje'
          dataSource={hotspotSource.id}
          column='carto_10_3'
          operation={AggregationTypes.COUNT}
          operationColumn='carto_10_3'
        />
      </Grid>
      <Grid item>
      <HistogramWidget
        id='daysInTransitStay'
        title='Distribución de tamaño grupo'
        dataSource={hotspotSource.id}
        ticks={[2,3,4]}
        column='carto_10_4'
        xAxisFormatter={customFormat}
        operation={AggregationTypes.COUNT}
        onError={console.error}
        />
      </Grid>
    </MainColumnView>
  );
}

function RightView() {
  return (
    <MainColumnView>
      <Grid item>
        <CategoryWidget
          id='childrendAgeDistribution'
          title='Rango de edad de niños que están viajando'
          dataSource={hotspotSource.id}
          column='carto_1_21'
          operation={AggregationTypes.COUNT}
          operationColumn='carto_1_21'
        />
      </Grid>
      <Grid item>
        <CategoryWidget
          id='travellingAlone'
          title='NNA viajan solos'
          dataSource={hotspotSource.id}
          column='carto_1_33'
          operation={AggregationTypes.COUNT}
          operationColumn='carto_1_33'
        />
      </Grid>
      <Grid item>
        <BarWidget
          id='disabledPeople'
          title='Presencia de personas con discapacidadad'
          dataSource={hotspotSource.id}
          column='carto_1_31'
          operation={AggregationTypes.COUNT}
          operationColumn='carto_1_31'
        />
      </Grid>
      <Grid item>
        <BarWidget
          id='pregnantWoment'
          title='Embarazos'
          dataSource={hotspotSource.id}
          column='carto_1_27'
          operation={AggregationTypes.COUNT}
          operationColumn='carto_1_27'
        />
      </Grid>
    </MainColumnView>
  );
}
