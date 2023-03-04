import {
  AggregationTypes,
  groupValuesByColumn,
  _FilterTypes,
} from '@carto/react-core';
import { PieWidgetUI, WrapperWidgetUI } from '@carto/react-ui';
import { Grid, makeStyles } from '@material-ui/core';
import { ReactComponent as Woman } from 'assets/img/person-0.svg';
import { ReactComponent as Man } from 'assets/img/person-1.svg';
import { useCallback } from 'react';
import useWidgetFetch from 'components/common/customWidgets/hooks/useWidgetFetch';
import useWidgetFilterValues from 'components/common/customWidgets/hooks/useWidgetFilterValues';
import { addFilter, removeFilter } from '@carto/react-redux';
import { useDispatch } from 'react-redux';
import WidgetNote from 'components/common/customWidgets/WidgetNote';
import { BasicWidgetType } from 'components/common/customWidgets/basicWidgetType';

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
const filterType = _FilterTypes.IN;
const auxiliaryInfo = 'Distribución de la población por sexo y rango de edad.';

const LABELS = {
  'Entre 18 y 24': '18-24',
  'Entre 25 y 39': '25-39',
  'Entre 40 y 64 años': '40-64',
  '65 años o más': '65+',
};

export default function GenderComposition({ dataSource }: BasicWidgetType) {
  const { data, isLoading } = useWidgetFetch({
    id,
    dataSource,
    column,
    method: getGenderData,
  });

  return (
    <Grid item>
      <WrapperWidgetUI title='Porcentaje de género/edad' isLoading={isLoading}>
        {data && (
          <>
            <GenderByAge
              dataSource={dataSource}
              isLoading={isLoading}
              data={data[0]}
              index={0}
            />
            <GenderByAge
              dataSource={dataSource}
              isLoading={isLoading}
              data={data[1]}
              index={1}
            />
          </>
        )}
      </WrapperWidgetUI>
      <WidgetNote note={auxiliaryInfo} />
    </Grid>
  );
}

function GenderByAge({
  data,
  index,
  isLoading,
  dataSource,
}: {
  data: any[];
  index: number;
  isLoading: boolean;
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
              labels={LABELS}
              height='150px'
            />
          )}
        </Grid>
      </Grid>
    </WrapperWidgetUI>
  );
}
