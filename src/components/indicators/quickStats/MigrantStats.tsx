import { AggregationTypes, aggregationFunctions } from '@carto/react-core';
import { FormulaWidgetUI } from '@carto/react-ui';
import { Collapse, Grid, Typography, makeStyles } from '@material-ui/core';
import WidgetNote from 'components/common/customWidgets/WidgetNote';
import { ReactNode, useEffect, useMemo, useState } from 'react';
import { defaultFilterFunction } from '../utils/miscelleniousFunctions';
import { numberFormatter } from 'utils/formatter';
import { format } from 'd3';
import { executeSQL } from '@carto/react-api';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';

const useStyles = makeStyles((theme) => ({
  statsContainer: {
    maxWidth: theme.breakpoints.values.sm,
    padding: theme.spacing(1),
  },
  statContainer: {
    [theme.breakpoints.down('sm')]: {
      borderBottom: `1px solid ${theme.palette.grey[200]}`,
    },
    [theme.breakpoints.up('md')]: {
      '&:nth-child(-n+3)': {
        borderBottom: `1px solid ${theme.palette.grey[200]}`,
      },
      '&:nth-child(3n+1)': {
        borderRight: `1px solid ${theme.palette.grey[200]}`,
      },
      '&:nth-child(3n)': {
        borderLeft: `1px solid ${theme.palette.grey[200]}`,
      },
      '&:nth-child(n+7)': {
        borderTop: `1px solid ${theme.palette.grey[200]}`,
      },
    },
  },
  statTitle: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

export default function MigrantStats({ isOpen }: { isOpen: boolean }) {
  const classes = useStyles();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const credentials = useSelector(
    (state: RootState) => state.carto.credentials,
  );
  const fetchPremise = async () => {
    const result = await executeSQL({
      credentials,
      connection: 'carto_dw',
      query: 'SELECT * FROM shared.Premise_22032023',
      opts: {
        format: 'json',
      },
    });
    return result;
  };
  const fetchAurora = async () => {
    const result = await executeSQL({
      credentials,
      connection: 'carto_dw',
      query: 'SELECT * FROM shared.LACRO_Marzo_2023',
      opts: {
        format: 'json',
      },
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
      <Grid xs item container className={classes.statsContainer}>
        {data && !isLoading && !error && (
          <>
            <TotalAuroraSubscriber data={data[0]} />
            <ChildrenOnAurora data={data[0]} />
            <Grid
              className={classes.statContainer}
              item
              xs={12}
              md={6}
              xl={4}
            ></Grid>
            <MigrantsReportedAtServicePoint data={data[0]} />
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
  const columns = ['e20__cua', 'e21__cua', 'e22__cua'];
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
  const columns = ['e17__cua'];
  const TotalReportedMigrants = useMemo(
    () => aggregateColumns(data, columns) + 1 || 0,
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
  const totalChildenPercent = useMemo(
    () =>
      percentValue({
        input: data,
        columns,
        divider,
      }),
    [data],
  );
  return (
    <QuickStatFormulaWidget
      data={totalChildenPercent}
      note={note}
      title={title}
      formatter={percentageFormatter}
    />
  );
}

function QuickStatFormulaWidget({
  data,
  icon,
  note,
  title,
  formatter = numberFormatter,
}: {
  data: number;
  icon?: ReactNode;
  title?: string;
  note?: string;
  formatter?: Function;
}) {
  const classes = useStyles();
  return (
    <Grid
      direction='column'
      item
      container
      xs={12}
      md={6}
      xl={4}
      className={classes.statContainer}
    >
      <Grid item xs className={classes.statTitle}>
        {title && <Typography variant='overline'>{title}</Typography>}
      </Grid>
      <Grid
        xs
        item
        direction='column'
        alignItems={icon ? 'center' : 'flex-start'}
        container
        className={classes.statTitle}
      >
        {icon && icon}
        <FormulaWidgetUI data={data} formatter={formatter} />
      </Grid>
      <Grid item xs>
        {note && <WidgetNote note={note} />}
      </Grid>
    </Grid>
  );
}

function aggregateColumns(
  input: any[],
  columns: string[],
  aggregateType: AggregationTypes = AggregationTypes.SUM,
): number {
  let totalValue: number = 0;
  const aggFn = aggregationFunctions[aggregateType];
  columns.forEach((column) => {
    const filteredData = defaultFilterFunction(input, column);
    //@ts-expect-error
    const columnTotal = aggFn(filteredData, [column]);
    //@ts-expect-error
    totalValue += columnTotal;
  });

  return totalValue;
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
  return format('.0%')(value);
}
