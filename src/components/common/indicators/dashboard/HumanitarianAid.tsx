import { CategoryWidgetUI, WrapperWidgetUI } from '@carto/react-ui';
//@ts-ignore
import { Grid } from '@material-ui/core';
import {
  AggregationTypes,
  groupValuesByColumn,
  _FilterTypes,
} from '@carto/react-core';
import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addFilter, removeFilter, selectSourceById } from '@carto/react-redux';
import mainSource from 'data/sources/mainSource';
import { RootState } from 'store/store';
import useWidgetFetch from 'hooks/useWidgetFetch';

const CATEGORY_ABREVATIONS = new Map([
  [0, 'Ninguna'],
  [1, 'Alimentación o kit de alimentación'],
  [2, ' Alojamiento temporal / albergue'],
  [3, 'Salud, primeros auxilios o atención médica'],
  [4, 'Agua potable'],
  [5, 'Duchas o baños'],
  [6, 'Kit de inodoro o elementos de higiene'],
  [7, 'Información / asistencia legal'],
  [8, 'Ayuda psicológica'],
  [9, 'Dinero en efectivo'],
  [10, 'Transporte humanitario'],
  [11, 'Otro'],
]);

interface getCategoriesProps {
  data: any[];
  valuesColumns?: string[];
  keysColumn?: string;
  operation?: AggregationTypes;
}

function getCategories({
  data,
  valuesColumns,
  keysColumn,
  operation,
}: getCategoriesProps) {
  return groupValuesByColumn({
    data,
    valuesColumns,
    keysColumn,
    operation,
  });
}

const EMPTY_ARRAY: [] = [];

function pivotData(data: any[], column: string): any[] {
  //@ts-ignore
  const values = data.map((f) => f[column]).filter((i) => i !== 'null');
  const valueString: string = values.join(',');
  const valuesArray: any[] = valueString.split(',');
  const pivotedData = valuesArray
    .filter((i: string) => i.length > 0)
    .map((i: any) => Object.fromEntries(new Map([[column, i]])));
  const groupData = getCategories({
    data: pivotedData,
    valuesColumns: [column],
    keysColumn: column,
    operation: AggregationTypes.COUNT,
  });
  return groupData;
}

function useWidgetFilterValues({
  dataSource,
  id,
  column,
  type,
}: {
  dataSource: string;
  id: string;
  column: string;
  type: _FilterTypes;
}) {
  const { filters } = useSelector(
    (state) => selectSourceById(state, dataSource) || {},
  );

  return useMemo(() => {
    const filter = filters?.[column]?.[type];
    if (!filter || filter.owner !== id) {
      return null;
    }
    return filter.values;
  }, [filters, column, type, id]);
}

export default function HumanitarianAid() {
  const { hotspotsLayer } = useSelector(
    (state: RootState) => state.carto.layers,
  );
  const source = useSelector((state) =>
    selectSourceById(state, hotspotsLayer?.source),
  );
  const dispatch = useDispatch();

  const dataSource = mainSource.id;
  const column = 'ayudas_hum';
  const id = 'humanitarianAid';
  const type = _FilterTypes.STRING_SEARCH;

  const { data, isLoading, error } = useWidgetFetch({
    layerId: 'hotspotsLayer',
    method: pivotData,
    column,
    source,
  });

  const selectedCategories =
    useWidgetFilterValues({
      dataSource,
      column,
      id,
      type,
    }) || EMPTY_ARRAY;

  const handleSelectedCategoriesChange = useCallback(
    (categories) => {
      if (categories && categories.length) {
        dispatch(
          addFilter({
            id: dataSource,
            column,
            type: _FilterTypes.STRING_SEARCH,
            values: categories,
            owner: id,
          }),
        );
      } else {
        dispatch(
          removeFilter({
            id: dataSource,
            column,
            owner: id,
          }),
        );
      }
    },
    [column, dataSource, id, dispatch],
  );

  return (
    <Grid item>
      <WrapperWidgetUI isLoading={isLoading} title='Ayudas humanitarias'>
        {error ? (
          <div>No data available</div>
        ) : (
          <CategoryWidgetUI
            onSelectedCategoriesChange={handleSelectedCategoriesChange}
            selectedCategories={selectedCategories}
            labels={Object.fromEntries(CATEGORY_ABREVATIONS)}
            id={id}
            data={data}
          />
        )}
      </WrapperWidgetUI>
    </Grid>
  );
}
