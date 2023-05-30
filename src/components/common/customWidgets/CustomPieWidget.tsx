import { addFilter, removeFilter } from '@carto/react-redux';
import { PieWidgetUI } from '@carto/react-ui';
import useWidgetFetch from './hooks/useWidgetFetch';
import { lazy, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { defaultCustomWidgetProps } from './customWidgetsType';
import useWidgetFilterValues from './hooks/useWidgetFilterValues';
import { EXTENDED_PALETTE_RAND } from 'theme';
import { _FilterTypes } from '@carto/react-core';

const CustomWidgetWrapper = lazy(
  () => import('components/common/customWidgets/CustomWidgetWrapper'),
);

const EMPTY_ARRAY: [] = [];

export default function CustomPieWidget({
  id,
  title,
  method,
  dataSource,
  column,
  filterable = true,
  methodParams,
  filterType,
  filterParams = {},
  labels = {},
}: defaultCustomWidgetProps) {
  const dispatch = useDispatch();
  const selectedCategories =
    useWidgetFilterValues({
      dataSource,
      column,
      id,
      type: filterType,
    }) || EMPTY_ARRAY;

  const handleSelectedCategoriesChange = useCallback(
    (categories) => {
      if (categories && categories.length) {
        const withRegExp = filterType === _FilterTypes.STRING_SEARCH  ? categories.map((d:any) => `^(.*,|)${d}(,.*|)$`) : categories
        dispatch(
          addFilter({
            id: dataSource,
            column,
            type: filterType,
            values: withRegExp,
            params:{
              ...filterParams
            },
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
    [column, dataSource, filterType, id, dispatch],
  );

  const { data = [], isLoading, error } = useWidgetFetch({
    id,
    dataSource,
    method,
    methodParams,
    column,
  });

  console.log(id, data)

  return (
    <CustomWidgetWrapper title={title} isLoading={isLoading} onError={error}>
      <PieWidgetUI
        colors={EXTENDED_PALETTE_RAND}
        filterable={filterable}
        onSelectedCategoriesChange={handleSelectedCategoriesChange}
        selectedCategories={selectedCategories}
        labels={labels}
        data={data}
      />
    </CustomWidgetWrapper>
  );
}
