import { addFilter, clearFilters, removeFilter } from '@carto/react-redux';
import { PieWidgetUI, WrapperWidgetUI } from '@carto/react-ui';
import useWidgetFetch from './hooks/useWidgetFetch';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { defaultCustomWidgetProps } from './customWidgetsType';
import useWidgetFilterValues from './hooks/useWidgetFilterValues';
import { Button, Link, Typography } from '@material-ui/core';

const EMPTY_ARRAY: [] = [];

export default function CustomPieWidget({
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

  const handleClearClick = () => {
    dispatch(clearFilters(dataSource));
  };

  const { data, isLoading, error } = useWidgetFetch({
    id,
    dataSource,
    method,
    column,
  });

  return (
    <WrapperWidgetUI title={title} isLoading={isLoading} onError={error}>
      {selectedCategories && selectedCategories.length > 0 && (
        <Button onClick={handleClearClick}>Clear</Button>
      )}
      {(data.length > 0 || !isLoading) && (
        <PieWidgetUI
          onSelectedCategoriesChange={handleSelectedCategoriesChange}
          selectedCategories={selectedCategories}
          labels={labels}
          data={data}
        />
      )}
    </WrapperWidgetUI>
  );
}
