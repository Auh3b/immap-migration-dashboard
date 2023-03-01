import { addFilter, removeFilter } from '@carto/react-redux';
import { CategoryWidgetUI, WrapperWidgetUI } from '@carto/react-ui';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { defaultCustomWidgetProps } from './customWidgetsType';
import useWidgetFilterValues from './hooks/useWidgetFilterValues';

const EMPTY_ARRAY: [] = [];

export default function CustomCategoryWidget({
  title,
  data,
  dataSource,
  column,
  id,
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
    [column, dataSource, id, dispatch],
  );

  return (
    <WrapperWidgetUI title={title}>
      <CategoryWidgetUI
        onSelectedCategoriesChange={handleSelectedCategoriesChange}
        selectedCategories={selectedCategories}
        labels={labels}
        data={data}
      />
    </WrapperWidgetUI>
  );
}
