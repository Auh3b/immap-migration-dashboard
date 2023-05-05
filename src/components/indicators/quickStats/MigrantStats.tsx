import { AggregationTypes, aggregationFunctions } from '@carto/react-core';
import { FormulaWidgetUI } from '@carto/react-ui';
import {
  Box,
  Collapse,
  Grid,
  Paper,
  Typography,
  makeStyles,
} from '@material-ui/core';
import { ReactNode, useEffect, useMemo, useState } from 'react';
import { defaultFilterFunction } from '../utils/miscelleniousFunctions';
import { numberFormatter } from 'utils/formatter';
import { format } from 'd3';
import { executeSQL } from '@carto/react-api';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import aggregateColumns from '../utils/AggregateColumns';
//@ts-ignore
import {fetchLayerData, FORMATS} from '@deck.gl/carto'
import premiseSource from 'data/sources/premiseSource'
import mainSource from 'data/sources/mainSource'

const useStyles = makeStyles((theme) => ({
  statsContainer: {
    maxWidth: theme.breakpoints.values.sm + 50,
    padding: theme.spacing(1),
    gap: theme.spacing(1),
  },
}));

export default function MigrantStats({ isOpen }: { isOpen: boolean }) {
  const classes = useStyles();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPremise = async () => {
    const { data: result } = await fetchLayerData({
      source: premiseSource.data,
      type: premiseSource.type,
      connection: premiseSource.connection,
      format: FORMATS.JSON,
    });
    return result;
  };
  const fetchAurora = async () => {
    const { data: result } = await fetchLayerData({
      source: mainSource.data,
      type: mainSource.type,
      connection: mainSource.connection,
      format: FORMATS.JSON,
    });
    return result;
  };
  useEffect(() => {
    setIsLoading(true);
    Promise.all([fetchAurora(), fetchPremise()])
      .then((data) => setData(data))
      .catch((e) => setError(e.message))
      .finally(() => setIsLoading(false));

    return () => {
      setData(null);
      setError(null);
      setIsLoading(false);
    };
  }, []);

  return (
    <Collapse in={isOpen} unmountOnExit={true}>
      <Grid xs item container wrap='wrap' className={classes.statsContainer}>
        {data && !isLoading && !error && (
          <>
            <TotalAuroraSubscriber data={data[0]} />
            <MigrantsReportedAtServicePoint data={data[0]} />
            <QuickStatFormulaWidget />
            <ChildrenOnAurora data={data[0]} />
            <ChildrenOnPremise data={data[1]} />
            <ChildrenOnAuroraPercentage data={data[0]} />
          </>
        )}
      </Grid>
    </Collapse>
  );
}

interface QuickStatProps {
  data: any[];
}

function TotalAuroraSubscriber({ data }: QuickStatProps) {
  const title = 'Personas conectadas a Aurora';
  const note = 'Número de migrantes conectados a Aurora';
  const columns = ['objectid'];
  const totalSubs = useMemo(
    () => aggregateColumns(data, columns, AggregationTypes.COUNT) || 0,
    [data],
  );

  return <QuickStatFormulaWidget data={totalSubs} title={title} note={note} />;
}

function ChildrenOnAurora({ data }: QuickStatProps) {
  const title = 'NNA reportados Aurora';
  const note = 'NNA reportados con Aurora';
  const columns = ['e19_1__cu'];
  const totalChilden = useMemo(
    () => aggregateColumns(data, columns) || 0,
    [data],
  );
  return (
    <QuickStatFormulaWidget data={totalChilden} note={note} title={title} />
  );
}

function MigrantsReportedAtServicePoint({ data }: QuickStatProps) {
  const title = 'Personas en los grupos de viaje validados';
  const note =
    'Número de migrantes reportados haciendo uso de los puntos de servicio';
  const columns = [['e17__cua'], ['objectid']];
  const TotalReportedMigrants = useMemo(
    () =>
      (aggregateColumns(data, columns[0]) || 0) +
      (aggregateColumns(data, columns[1], AggregationTypes.COUNT) || 0),
    [data],
  );
  return (
    <QuickStatFormulaWidget
      data={TotalReportedMigrants}
      note={note}
      title={title}
    />
  );
}

function ChildrenOnPremise({ data }: QuickStatProps) {
  const title = 'NNA reportados Premise';
  const note = 'NNA reportados haciendo uso de los puntos de servicio';
  const columns = ['nna_atend'];
  const totalChilden = useMemo(
    () => aggregateColumns(data, columns) || 0,
    [data],
  );
  return (
    <QuickStatFormulaWidget data={totalChilden} note={note} title={title} />
  );
}

function ChildrenOnAuroraPercentage({ data }: QuickStatProps) {
  const title = 'Porcentaje NNA Aurora';
  const note = 'Relación entre NNA y total de personas reportadas por Aurora';
  const columns: [string[], AggregationTypes] = [
    ['e20__cua', 'e21__cua', 'e22__cua'],
    AggregationTypes.SUM,
  ];
  const divider: [string, AggregationTypes] = [
    'e17__cua',
    AggregationTypes.SUM,
  ];
  const totalChildenPercent = useMemo(() => {
    const dividerValue =
      aggregateColumns(data, [divider[0]]) +
      aggregateColumns(data, ['objectid'], AggregationTypes.COUNT);
    const totalValue = aggregateColumns(data, [...columns[0]]);

    return totalValue / dividerValue;
  }, [data]);
  return (
    <QuickStatFormulaWidget
      data={totalChildenPercent}
      note={note}
      title={title}
      formatter={percentageFormatter}
    />
  );
}

const useQuickStatStyles = makeStyles((theme) => ({
  root: {
    width: '200px',
    height: '200px',
  },
  paper: {
    width: '100%',
    height: '100%',
    padding: theme.spacing(1),
  },
  statTitle: {
    marginBottom: theme.spacing(1),
  },
}));

function QuickStatFormulaWidget({
  data,
  icon,
  note,
  title,
  formatter = numberFormatter,
}: {
  data?: number;
  icon?: ReactNode;
  title?: string;
  note?: string;
  formatter?: Function;
}) {
  const classes = useQuickStatStyles();
  return (
    <>
      {/*@ts-ignore */}
      <Box component={'div'} className={classes.root}>
        <Paper
          elevation={0}
          variant={data ? 'outlined' : 'elevation'}
          className={classes.paper}
        >
          <Grid
            direction='column'
            item
            container
            justifyContent='space-between'
            className={classes.paper}
          >
            <Grid item xs className={classes.statTitle}>
              {title && <Typography variant='overline'>{title}</Typography>}
            </Grid>
            <Grid xs item>
              {data && <FormulaWidgetUI data={data} formatter={formatter} />}
            </Grid>
            <Grid item xs>
              {note && <Typography variant='caption'>{note}</Typography>}
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </>
  );
}

function percentValue({
  input,
  columns,
  divider,
}: {
  input: any[];
  columns: [string[], AggregationTypes];
  divider: [string, AggregationTypes];
}): number {
  let percentageValue = 0;

  const [targetColumns, columnAggregateType] = columns;
  const [dividerColumn, dividerAggregateType] = divider;

  const totalValue = aggregateColumns(
    input.length === 2 ? input[0] : input,
    targetColumns,
    columnAggregateType,
  );

  const dividerValue = aggregateColumns(
    input.length === 2 ? input[1] : input,
    [dividerColumn],
    dividerAggregateType,
  );
  percentageValue = totalValue / dividerValue;

  return percentageValue;
}

function percentageFormatter(value: number) {
  return format('.2%')(value);
}
