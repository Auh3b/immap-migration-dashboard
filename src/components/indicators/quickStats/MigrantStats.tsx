import { AggregationTypes, aggregationFunctions, groupValuesByColumn } from '@carto/react-core'
import { FormulaWidgetUI } from '@carto/react-ui'
import { Collapse, Grid, Paper, Typography, makeStyles } from '@material-ui/core'
import WidgetNote from 'components/common/customWidgets/WidgetNote'
import useWidgetFetch from 'components/common/customWidgets/hooks/useWidgetFetch'
import mainSource from 'data/sources/mainSource'
import { ReactNode, useMemo } from 'react'
import { defaultFilterFunction } from '../utils/miscelleniousFunctions'
import { numberFormatter } from 'utils/formatter'

const id = 'migrantStats'
const dataSource = mainSource.id

const useStyles = makeStyles((theme)=>({
  statsContainer:{
    maxWidth: theme.breakpoints.values.sm,
    padding: theme.spacing(1),
  },
  statContainer:{
    marginBottom: theme.spacing(2)
  },
  statTitle:{
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  }
}))

export default function MigrantStats({isOpen}:{isOpen: boolean}) {
  const classes = useStyles()
  const {
    data,
    isLoading
  } = useWidgetFetch({
    id,
    dataSource,
  })


  return (
    <Collapse in={isOpen} unmountOnExit={true}>
      <Grid xs item container className={classes.statsContainer}>
        {(data.length > 0 && !isLoading) &&
        <>
          <TotalAuroraSubscriber data={data} />
          <ChildrenOnAurora data={data} />
          <MigrantsReportedAtServicePoint data={data} />
          <ChildrenOnPremise data={data}/>
          <ChildrenOnAuroraPercentage data={data} />
          <ChildrenOnPremisePercentage data={data} />
        </>

        }
      </Grid>
    </Collapse>
  )
}

interface QuickStatProps{
  data: any[]
}

function TotalAuroraSubscriber({
  data
}: QuickStatProps){
  const title = 'Personas conectadas a Aurora'
  const note = 'Número de migrantes conectados a Aurora'
  const columns = ['e17__cua']
  const totalSubs = useMemo(()=>aggregateColumns(data, columns) || 0, [data])
  
  return (
    <QuickStatFormulaWidget data={totalSubs} title={title} note={note}/>
  )
}

function ChildrenOnAurora({
  data
}:QuickStatProps){
  const title = 'NNA reportados Aurora'
  const note = 'NNA reportados con Aurora'
  const columns = ['e20__cua', 'e21__cua', 'e22__cua']
  const totalChilden = useMemo(()=>aggregateColumns(data, columns) || 0, [data])
  return(
    <QuickStatFormulaWidget data={totalChilden} note={note} title={title} />
  )
}

function MigrantsReportedAtServicePoint({
  data
}: QuickStatProps){
  const title = 'Personas conectadas a Aurora'
  const note = 'Número de migrantes reportados haciendo uso de los puntos de servicio'
  const columns = ['e17__cua']
  const TotalReportedMigrants = useMemo(()=>aggregateColumns(data, columns) || 0, [data])
  return(
    <QuickStatFormulaWidget data={TotalReportedMigrants} note={note} title={title} />
  )
}

function ChildrenOnPremise({
  data
}:QuickStatProps){
  const title = 'NNA reportados Premise'
  const note = 'NNA reportados haciendo uso de los puntos de servicio'
  const columns = ['nna_atend']
  const totalChilden = useMemo(()=>aggregateColumns(data, columns) || 0, [data])
  return(
    <QuickStatFormulaWidget data={totalChilden} note={note} title={title} />
  )
}

function ChildrenOnAuroraPercentage({
  data
}:QuickStatProps){
  const title = 'Porcentaje NNA Aurora'
  const note = 'Relación entre NNA y total de personas reportadas por Aurora'
  const columns:[string[], AggregationTypes] = [['e20__cua', 'e21__cua', 'e22__cua'], AggregationTypes.SUM]
  const divider:[string, AggregationTypes] = ['nna_atend', AggregationTypes.SUM]
  const totalChildenPercent = useMemo(()=>percentValue({
    input: data,
    columns,
    divider
  }), [data])
  return(
    <QuickStatFormulaWidget data={totalChildenPercent} note={note} title={title} />
  )
}

function ChildrenOnPremisePercentage({
  data
}:QuickStatProps){
  const title = 'Porcentaje NNA reportado Puntos de servicio'
  const note = 'Relación entre NNA y total de personas haciendo uso de los puntos de servicio'
  const columns:[string[], AggregationTypes] = [['e17__cua'], AggregationTypes.SUM]
  const divider:[string, AggregationTypes] = ['id', AggregationTypes.COUNT]
  const totalChildenPercent = useMemo(()=>percentValue({
    input: data,
    columns,
    divider
  }), [data])
  return(
    <QuickStatFormulaWidget data={totalChildenPercent} note={note} title={title} />
  )
}



function QuickStatFormulaWidget({data, icon, note, title}:{data:number, icon?: ReactNode, title?: string, note?: string}){
  const classes = useStyles()
  return(
    <Grid direction='column' item container xs={12} md={6} xl={4} className={classes.statContainer}>
        <Grid item xs className={classes.statTitle}>
          {title && (
            <Typography variant='overline'>
              {title}
            </Typography>
          )}
        </Grid>
        <Grid xs item direction='column' alignItems={icon ? 'center' : 'flex-start'} container className={classes.statTitle}>
          {icon && icon}
          <FormulaWidgetUI data={data} formatter={numberFormatter}/>
        </Grid>
        <Grid item xs>
          {note && <WidgetNote note={note}/>}
        </Grid>
    </Grid>
  )
}

function aggregateColumns(input: any[], columns: string[], aggregateType: AggregationTypes = AggregationTypes.SUM):number{
  console.log(input)

  let totalValue: number = 0
  const aggFn = aggregationFunctions[aggregateType]
  columns.forEach((column)=>{
    const filteredData = defaultFilterFunction(input, column)
    //@ts-expect-error
    const columnTotal = aggFn(filteredData, [column])
    //@ts-expect-error
    totalValue += columnTotal
  })

  return totalValue
}

function percentValue({
  input,
  columns,
  divider,
}:{
  input: any[],
  columns: [string[], AggregationTypes],
  divider: [string, AggregationTypes],
}):number{
  let percentageValue = 0

  const [targetColumns, columnAggregateType] = columns
  const [dividerColumn, dividerAggregateType] = divider

  const totalValue = aggregateColumns(input, targetColumns, columnAggregateType)
  const dividerValue = aggregateColumns(input, [dividerColumn], dividerAggregateType)

  percentageValue = dividerValue > 0 ? totalValue/dividerValue : totalValue

  return percentageValue
}
