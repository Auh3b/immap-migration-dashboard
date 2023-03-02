import {
  AggregationTypes,
  groupValuesByColumn,
  _FilterTypes,
} from '@carto/react-core';
import { FormulaWidgetUI, PieWidgetUI, WrapperWidgetUI } from '@carto/react-ui';
import { Divider, Grid, makeStyles, Typography } from '@material-ui/core';
import { ReactComponent as Woman } from 'assets/img/person-0.svg';
import { ReactComponent as Man } from 'assets/img/person-1.svg';
import { useCallback, useMemo, useState } from 'react';
import { format, sum } from 'd3';
import mainSource from 'data/sources/mainSource';
import useWidgetFetch from 'components/common/customWidgets/hooks/useWidgetFetch';
import useWidgetFilterValues from 'components/common/customWidgets/hooks/useWidgetFilterValues';
import { addFilter, removeFilter } from '@carto/react-redux';
import { useDispatch } from 'react-redux';
import TopLoading from 'components/common/TopLoading';

const EMPTY_ARRAY: [] = [];
const PRIMARY_COLUMN = 'genero';
const SECONDARY_COLUMN = 'rango_edad';

function groupGenderByAge(data: any[], column: string) {
  return groupValuesByColumn({
    data,
    keysColumn: SECONDARY_COLUMN,
    valuesColumns: [column],
    operation: AggregationTypes.COUNT,
  });
}

function getGenderData(input: any[], column: string): any[] | null {
  if (input.length === 0) {
    return null;
  }

  const men = input.filter((i) => i[column] === 'Hombre');
  const women = input.filter((i) => i[column] === 'Mujer');

  return [groupGenderByAge(men, column), groupGenderByAge(women, column)];
}

const useGenderStyles = makeStyles((theme) => ({
  main: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  divider: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  icon: {
    objectFit: 'contain',
  },
  title: {
    padding: theme.spacing(2),
  },
  iconSmall: {
    height: '50px',
    objectFit: 'contain',
  },
  general: {
    display: 'flex',
    alignItems: 'center',
  },
}));

const id = 'genderComposition';
const column = PRIMARY_COLUMN;
const dataSource = mainSource.id;
const filterType = _FilterTypes.IN;

export default function GenderComposition() {
  const classes = useGenderStyles();
  const { data, isLoading } = useWidgetFetch({
    id,
    dataSource,
    column,
    method: getGenderData,
  });
  // console.log('fired')
  return (
    <Grid item>
      <Typography className={classes.title} variant='subtitle1'>
        Porcentaje de género/edad
      </Typography>
      <Divider />
      {data && (
        <>
          {/* @ts-ignore */}
          <GendersByPercentage isLoading={isLoading} data={data} />
          <Divider className={classes.divider} />
          <GenderByAge isLoading={isLoading} data={data[0]} index={0} />
          <GenderByAge isLoading={isLoading} data={data[1]} index={1} />
        </>
      )}
    </Grid>
  );
}

function GenderByAge({
  data,
  index,
  isLoading,
}: {
  data: any[];
  index: number;
  isLoading: boolean;
}) {
  const classes = useGenderStyles();
  const dispatch = useDispatch();

  const selectedCategories =
    useWidgetFilterValues({
      dataSource,
      column: SECONDARY_COLUMN,
      id: `${id}-pie-${index}`,
      type: filterType,
    }) || EMPTY_ARRAY;

  const handleSelectedCategoriesChange = useCallback(
    (categories) => {
      if (categories && categories.length) {
        dispatch(
          addFilter({
            id: dataSource,
            column: SECONDARY_COLUMN,
            type: filterType,
            values: categories,
            owner: `${id}-pie-${index}`,
          }),
        );
      } else {
        dispatch(
          removeFilter({
            id: dataSource,
            column: SECONDARY_COLUMN,
            owner: `${id}-pie-${index}`,
          }),
        );
      }
    },
    [column, dataSource, filterType, id, dispatch],
  );

  return (
    <WrapperWidgetUI
      isLoading={isLoading}
      title={index ? 'Hombre' : 'Mujer'}
      expandable={false}
    >
      <Grid container className={classes.main}>
        <Grid item xs={4}>
          {index ? (
            <Man className={classes.icon} />
          ) : (
            <Woman className={classes.icon} />
          )}
        </Grid>
        <Grid item xs={8}>
          {data && (
            <PieWidgetUI
              onSelectedCategoriesChange={handleSelectedCategoriesChange}
              selectedCategories={selectedCategories}
              data={data}
            />
          )}
        </Grid>
      </Grid>
    </WrapperWidgetUI>
  );
}

function GendersByPercentage({
  data,
  isLoading,
}: {
  data: [any[], any[]];
  isLoading: boolean;
}) {
  const classes = useGenderStyles();
  const [men, setMen] = useState(0);
  const [women, setWomen] = useState(0);
  const [total, setTotal] = useState(0);

  useMemo(() => {
    if (data[0]) {
      const menValue = sum(data[1], (v) => v.value);
      setMen(menValue);
      const womenValue = sum(data[0], (v) => v.value);
      setWomen(womenValue);
      const totalValue = menValue + womenValue;
      setTotal(totalValue);
    }
  }, [data]);

  return (
    <>
      {men && women && total && (
        <Grid container className={classes.title}>
          {isLoading ? <TopLoading /> : ''}
          <Grid container item xs={6} className={classes.main}>
            <Grid item xs={3}>
              <Woman className={classes.iconSmall} />
            </Grid>
            <Grid item xs={9}>
              <FormatedNumber number={women} total={total} />
            </Grid>
          </Grid>
          <Grid container item xs={6} className={classes.main}>
            <Grid item xs={3}>
              <Man className={classes.iconSmall} />
            </Grid>
            <Grid item xs={9}>
              <FormatedNumber number={men} total={total} />
            </Grid>
          </Grid>
        </Grid>
      )}
    </>
  );
}

function FormatedNumber({ number, total }: { number: number; total: number }) {
  return (
    <FormulaWidgetUI
      data={number}
      formatter={(value: number) =>
        `${value} (${format('.0%')(value / total)})`
      }
    />
  );
}
