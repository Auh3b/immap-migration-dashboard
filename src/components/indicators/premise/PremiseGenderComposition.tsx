import {
  AggregationTypes,
  groupValuesByColumn,
  _FilterTypes,
} from '@carto/react-core';
import { PieWidgetUI, WrapperWidgetUI } from '@carto/react-ui';
import { Grid, makeStyles } from '@material-ui/core';
import { ReactComponent as Woman } from 'assets/img/person-0.svg';
import { ReactComponent as Man } from 'assets/img/person-1.svg';
import { useCallback, useMemo } from 'react';
import useWidgetFetch from 'components/common/customWidgets/hooks/useWidgetFetch';
import useWidgetFilterValues from 'components/common/customWidgets/hooks/useWidgetFilterValues';
import { addFilter, removeFilter } from '@carto/react-redux';
import { useDispatch } from 'react-redux';
import WidgetNote from 'components/common/customWidgets/WidgetNote';
import { BasicWidgetType } from 'components/common/customWidgets/basicWidgetType';
import LazyLoadComponent from 'components/common/LazyLoadComponent';
import PageFallback from 'components/common/PageFallback';
import TopLoading from 'components/common/TopLoading';
import MethodFunc from '../utils/methodType';
import groupCategories from '../utils/groupCategories';

const EMPTY_ARRAY: [] = [];
const PRIMARY_COLUMN = 'identifica';
const SECONDARY_COLUMN = 'edadgr';

const id = 'Sexo';
const column = PRIMARY_COLUMN;
const filterType = _FilterTypes.IN;
const NOTE = 'Sexo de identificación del personal que responde la encuesta';

const LABELS = {
  'Entre 18 y 24': '18-24',
  'Entre 25 y 39': '25-39',
  'Entre 40 y 64 años': '40-64',
  '65 años o más': '65+',
  999999: 'No aclarado',
};

function groupGenderByAge(data: any[], column: string) {
  return groupValuesByColumn({
    data,
    keysColumn: SECONDARY_COLUMN,
    valuesColumns: [column],
    operation: AggregationTypes.COUNT,
  });
}

const getGenderData: MethodFunc = (input, column) => {
  if (input.length === 0) {
    return null;
  }

  const men = input.filter((i) => i[column] === 'Hombre');
  const women = input.filter((i) => i[column] === 'Mujer');

  return [groupGenderByAge(men, column), groupGenderByAge(women, column)];
};


const useStyles = makeStyles(() => ({
  main: {
    position: 'relative',
  },
}));

export default function PremiseGenderComposition({ dataSource }: BasicWidgetType) {
  const { data, isLoading } = useWidgetFetch({
    id,
    dataSource,
    column,
    method: groupCategories,
  });

  const classes = useStyles();

  // const Men = useMemo(
  //   () => <GenderByAge dataSource={dataSource} data={data[0]} index={0} />,
  //   [data, dataSource],
  // );

  // const Women = useMemo(
  //   () => <GenderByAge dataSource={dataSource} data={data[1]} index={1} />,
  //   [data, dataSource],
  // );

  return (
    <LazyLoadComponent fallback={<PageFallback />}>
      <Grid item className={classes.main}>
        {isLoading ? <TopLoading /> : ''}
        <WrapperWidgetUI title='Sexo'>
          {data && (
            <>
              <PieWidgetUI data={data}/>
              {/* {Men}
              {Women} */}
            </>
          )}
        </WrapperWidgetUI>
        <WidgetNote note={NOTE} />
      </Grid>
    </LazyLoadComponent>
  );
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
    height: '100px',
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

function GenderByAge({
  data = [],
  index,
  dataSource,
}: {
  data: any[];
  index: number;
  dataSource: string;
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
    [dataSource, index, dispatch],
  );

  return (
    <Grid container className={classes.main}>
      <Grid item xs={4}>
        {index ? (
          <Man className={classes.icon} />
        ) : (
          <Woman className={classes.icon} />
        )}
      </Grid>
      <Grid item xs={8}>
        {data && data.length > 0 && (
          <PieWidgetUI
            onSelectedCategoriesChange={handleSelectedCategoriesChange}
            selectedCategories={selectedCategories}
            data={data}
            labels={LABELS}
            height='150px'
          />
        )}
      </Grid>
    </Grid>
  );
}

