import {
  CategoryWidget,
  PieWidget,
  TimeSeriesWidget,
  BarWidget,
  HistogramWidget,
} from '@carto/react-widgets';
// @ts-ignore
import { FORMATS } from '@deck.gl/carto';
import { _executeModel } from '@carto/react-api';
import mainSource from 'data/sources/mainSource';
import {
  AggregationTypes,
  GroupDateTypes,
  groupValuesByColumn,
  _FilterTypes,
} from '@carto/react-core';
import MainView from './main/MainView';
import { MainColumnView } from 'components/common/MainColumnView';
import { Grid, makeStyles } from '@material-ui/core';
import { FormulaWidgetUI, WrapperWidgetUI } from '@carto/react-ui';
import { ReactNode, useEffect, useState } from 'react';
import { SURVEY_CONCENTRATIONS_LAYER_ID } from 'components/layers/SurveyConcentrationsLayer';
import { HOTSPOTS_LAYER_ID } from 'components/layers/HotspotsLayer';
import { useDispatch } from 'react-redux';
import {
  addLayer,
  removeLayer,
  addSource,
  removeSource,
} from '@carto/react-redux';

import {
  PregnantWoman as WomanIcon,
  Accessibility as ManIcon,
} from '@material-ui/icons';
import TopLoading from 'components/common/TopLoading';
import useExecuteQuery from 'hooks/useExecuteQuery';
import ChildrenTravellingAlone from 'components/common/indicators/dashboard/HumanitarianAid';
import ChildTravelerAges from 'components/common/indicators/dashboard/ChildTravelerAges';
import TripComposition from 'components/common/indicators/dashboard/TripComposition';

export default function Dashboard() {
  const dispatch = useDispatch();

  console.log('dashboard mounted')

  useEffect(() => {
    dispatch(
      addLayer({
        id: SURVEY_CONCENTRATIONS_LAYER_ID,
        source: mainSource.id,
      }),
    );

    return () => {
      dispatch(removeLayer(SURVEY_CONCENTRATIONS_LAYER_ID));
    };
  }, [dispatch]);

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
            dataSource={mainSource.id}
            column='created_at'
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
  [5, '100'],
]);

function customFormat(value: number) {
  return xFormatValues.get(value);
}

function LeftView() {
  return (
    <MainColumnView>
      <Grid item>
        <GenderIndicator />
      </Grid>
      <Grid item>
        <PieWidget
          id='genderDistribution'
          title='Género'
          dataSource={mainSource.id}
          column='genero'
          operation={AggregationTypes.COUNT}
          operationColumn='genero'
        />
      </Grid>
      <Grid item>
        <CategoryWidget
          id='ageGroups'
          title='Tamaño de grupo de viaje'
          dataSource={mainSource.id}
          column='rango_edad'
          operation={AggregationTypes.COUNT}
          operationColumn='rango_edad'
        />
      </Grid>
      <Grid item>
        <TripComposition />
        <HistogramWidget
          id='ageDistribution'
          title='Distribución de tamaño grupo'
          dataSource={mainSource.id}
          ticks={[18, 25, 40, 65]}
          column='edad'
          // xAxisFormatter={customFormat}
          operation={AggregationTypes.COUNT}
        />
      </Grid>
    </MainColumnView>
  );
}

function RightView() {
  return (
    <MainColumnView>
      <Grid item>
        <ChildrenTravellingAlone />
      </Grid>
      <Grid item>
        <CategoryWidget
          id='travellingAlone'
          title='NNA viajan solos'
          dataSource={mainSource.id}
          column='nna'
          operation={AggregationTypes.COUNT}
          operationColumn='nna'
        />
      </Grid>
      <Grid item>
        <ChildTravelerAges />
      </Grid>
      {/* <Grid item>
        <BarWidget
          id='disabledPeople'
          title='Presencia de personas con discapacidadad'
          dataSource={mainSource.id}
          column='cb_fl_id14'
          operation={AggregationTypes.COUNT}
          operationColumn='cb_fl_id14'
        />
      </Grid>
      <Grid item>
        <BarWidget
          id='pregnantWoment'
          title='Embarazos'
          dataSource={mainSource.id}
          column='cb_fl_id12'
          operation={AggregationTypes.COUNT}
          operationColumn='cb_fl_id12'
        />
      </Grid> */}
    </MainColumnView>
  );
}

function GenderIndicator() {
  const [women, setWomen] = useState(0);
  const [men, setMen] = useState(0);
  const [total, setTotal] = useState(0);

  const { data, isLoading } = useExecuteQuery({
    query: 'SELECT genero FROM shared.kuery24022023',
    format: FORMATS.JSON,
  });

  useEffect(() => {
    if (data && !isLoading) {
      //@ts-ignore
      setTotal(data.length);
      const groups = groupValuesByColumn({
        //@ts-ignore
        data,
        keysColumn: 'genero',
        operation: AggregationTypes.COUNT,
        valuesColumns: ['genero'],
      });

      setMen(
        groups
          .filter(({ name }) => name == 'Hombre')
          .map(({ value }) => value)[0],
      );
      setWomen(
        groups
          .filter(({ name }) => name == 'Mujer')
          .map(({ value }) => value)[0],
      );
    }

    return () => {
      setMen(0);
      setWomen(0);
    };
  }, [data, isLoading]);

  return (
    <WrapperWidgetUI title='Porcentaje de género/edad' loading={isLoading}>
      {isLoading ? <TopLoading /> : ''}
      <GenderFormatter gender='Hombre'>
        <FormulaWidgetUI
          data={men}
          formatter={(value: number) =>
            `${value} (${Math.floor((value / total) * 100)}%)`
          }
        />
      </GenderFormatter>
      <GenderFormatter gender='Mujer'>
        <FormulaWidgetUI
          data={women}
          formatter={(value: number) =>
            `${value} (${Math.floor((value / total) * 100)}%)`
          }
        />
      </GenderFormatter>
    </WrapperWidgetUI>
  );
}

const useGenderStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    gap: theme.spacing(2),
    alignItems: 'center',
  },
}));

function GenderFormatter({
  gender,
  children,
}: {
  gender: string;
  children: ReactNode;
}) {
  const classes = useGenderStyles();

  return (
    <div className={classes.container}>
      {gender == 'Hombre' ? <ManIcon /> : <WomanIcon />}
      {children}
    </div>
  );
}
