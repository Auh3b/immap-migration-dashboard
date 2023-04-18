import { addFilter, removeFilter } from '@carto/react-redux';
import { CategoryWidgetUI, WrapperWidgetUI } from '@carto/react-ui';
import useWidgetFetch from './hooks/useWidgetFetch';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { defaultCustomWidgetProps } from './customWidgetsType';
import useWidgetFilterValues from './hooks/useWidgetFilterValues';

const EMPTY_ARRAY: [] = [];

export default function CustomCategoryWidget({
  id,
  title,
  method,
  dataSource,
  column,
  filterType,
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
        dispatch(
          addFilter({
            id: dataSource,
            column,
            type: filterType,
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
    [column, dataSource, filterType, id, dispatch],
  );

  const { data, isLoading, error } = useWidgetFetch({
    id,
    dataSource,
    method,
    column,
  });

  return (
    <WrapperWidgetUI
      title={title}
      isLoading={isLoading}
      onError={error}
      expanded={false}
    >
      <CategoryWidgetUI
        onSelectedCategoriesChange={handleSelectedCategoriesChange}
        selectedCategories={selectedCategories}
        labels={labels}
        data={data}
      />
    </WrapperWidgetUI>
  );
}
