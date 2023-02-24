import {
  CategoryWidget,
  PieWidget,
  TimeSeriesWidget,
  BarWidget,
  HistogramWidget,
} from '@carto/react-widgets';
// @ts-ignore
import { fetchLayerData, MAP_TYPES, FORMATS } from '@deck.gl/carto';
import { Credentials, executeSQL } from '@carto/react-api';
import hotspotSource from '../../data/sources/hotspotSource';
import { AggregationTypes, GroupDateTypes, groupValuesByColumn } from '@carto/react-core';
import MainView from './main/MainView';
import { MainColumnView } from 'components/common/MainColumnView';
import { Grid, makeStyles } from '@material-ui/core';
import { FormulaWidgetUI, WrapperWidgetUI } from '@carto/react-ui';
import { ReactNode, useEffect, useState } from 'react';
import { SURVEY_CONCENTRATIONS_LAYER_ID } from 'components/layers/SurveyConcentrationsLayer';
import { useDispatch } from 'react-redux';
import {
  addLayer,
  removeLayer,
  addSource,
  removeSource,
} from '@carto/react-redux';

import { PregnantWoman as WomanIcon, Accessibility as ManIcon } from '@material-ui/icons';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { selectSourceById } from '@carto/react-redux';

export default function Dashboard() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(addSource(hotspotSource));

    dispatch(
      addLayer({
        id: SURVEY_CONCENTRATIONS_LAYER_ID,
        source: hotspotSource.id,
      }),
    );

    return () => {
      dispatch(removeLayer(SURVEY_CONCENTRATIONS_LAYER_ID));
      dispatch(removeSource(hotspotSource.id));
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
        <GenderIndicator />
      </Grid>
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

function GenderIndicator(){
  const [women, setWomen] = useState(0)
  const [men, setMen] = useState(0)
  const [total, setTotal] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  const { credentials } = useSelector((state: RootState) => state.carto)
  const { hotspotsLayer } = useSelector(
    (state: RootState) => state.carto.layers,
  );
  const { data: table, connection } = useSelector((state) =>
  selectSourceById(state, hotspotsLayer?.source),
  );
  
  useEffect(() => {
    async function fetchData(){
      setIsLoading(true)
      // const { data} = await fetchLayerData({
      //   type: MAP_TYPES.TABLE,
      //   source:'carto-dw-ac-4v8fnfsh.shared.carto_10_public',
      //   connection: 'carto_dw',
      //   format: FORMATS.JSON,
      // })
      // @ts-ignore
      const data:any[] = await executeSQL({
        credentials,
        query: 'SELECT * FROM shared.carto_10_public',
        connection,
        opts:{
          format: FORMATS.JSON
        }
      })

      setTotal(data.length)

      const groups  = groupValuesByColumn({
        data,
        keysColumn: 'carto_10_5',
        operation:AggregationTypes.COUNT,
        valuesColumns:['carto_10_5']
      })

      setMen(groups.filter(({name})=> name == 'Hombre').map(({value})=>(value))[0])
      setWomen(groups.filter(({name})=> name == 'Mujer').map(({value})=>(value))[0])
      setIsLoading(false)
    }

    fetchData()
  
    return () => {
      setWomen(0)
      setMen(0)
    }
  }, [])
  
  
  
  return(
    <WrapperWidgetUI
    title='Porcentaje de género/edad'
    loading={isLoading}
    >
      <GenderFormatter gender='Hombre'>
       <FormulaWidgetUI animation={false} data={men} formatter={(value:number)=>`${value} (${value/total*100}%)`}/>
      </GenderFormatter>
      <GenderFormatter gender="Mujer" >
        <FormulaWidgetUI animation={false} data={women} formatter={(value:number)=>`${value} (${value/total*100}%)`}/>
      </GenderFormatter>
    </WrapperWidgetUI>
  )
}

const useGenderStyles = makeStyles((theme)=>({
  container:{
    display:'flex',
    gap: '5',
    alignItems:'center'
  }
}))

function GenderFormatter({gender, children}:{gender:string, children:ReactNode}){
  const classes = useGenderStyles()

  return(
    <div className={classes.container}>
      {gender == 'Hombre'? <ManIcon /> : <WomanIcon />}
      {children}
    </div>
  )
}